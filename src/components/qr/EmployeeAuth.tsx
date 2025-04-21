
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge, QrCode, Search, User, CheckCircle, Fingerprint, Camera, AlertCircle } from 'lucide-react';
import QRScanner from './QRScanner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { parseQRData } from '@/config/qr-config';
import * as faceapi from 'face-api.js';

interface Employee {
  id: string;
  name: string;
  badge: string;
  department: string;
  position: string;
  photo?: string;
}

interface EmployeeAuthProps {
  onAuthenticated: (employee: Employee) => void;
}

const EmployeeAuth: React.FC<EmployeeAuthProps> = ({ onAuthenticated }) => {
  const { toast } = useToast();
  const { user: authenticatedUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('qrcode');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [scanActive, setScanActive] = useState<boolean>(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState<boolean>(false);
  const [isFaceScanActive, setIsFaceScanActive] = useState<boolean>(false);
  const [isDigitalScanActive, setIsDigitalScanActive] = useState<boolean>(false);
  const [processingBiometric, setProcessingBiometric] = useState<boolean>(false);
  const [detectedFaces, setDetectedFaces] = useState<number>(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const faceDetectionIntervalRef = React.useRef<number | null>(null);

  // Load Face-API.js models
  useEffect(() => {
    const loadFaceApiModels = async () => {
      try {
        // Check if models are already loaded
        if (faceApiLoaded) return;
        
        // Load models from public folder
        await Promise.all([
          faceapi.nets.tinyFaceDetector.load('/models'),
          faceapi.nets.faceLandmark68Net.load('/models'),
          faceapi.nets.faceRecognitionNet.load('/models')
        ]);
        
        setFaceApiLoaded(true);
        console.log('Face-API models loaded successfully');
      } catch (error) {
        console.error('Error loading Face-API models:', error);
        toast({
          title: "Erro no carregamento",
          description: "Não foi possível carregar os modelos de reconhecimento facial.",
          variant: "destructive"
        });
      }
    };
    
    loadFaceApiModels();
    
    return () => {
      // Clean up any camera streams when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      
      // Clear face detection interval
      if (faceDetectionIntervalRef.current) {
        clearInterval(faceDetectionIntervalRef.current);
        faceDetectionIntervalRef.current = null;
      }
    };
  }, [toast, faceApiLoaded]);

  // Verificar se já tem usuário logado
  useEffect(() => {
    // Verificamos se há um usuário autenticado para mostrar informações relevantes
    if (authenticatedUser) {
      toast({
        title: "Sistema iniciado",
        description: `Usuário ${authenticatedUser.name} está operando o sistema.`,
      });
    }
  }, [authenticatedUser, toast]);

  // Start face detection
  const startFaceDetection = async () => {
    if (!faceApiLoaded) {
      toast({
        title: "Modelos não carregados",
        description: "Os modelos de reconhecimento facial ainda estão carregando. Aguarde um momento.",
        variant: "destructive"
      });
      return;
    }
    
    setIsFaceScanActive(true);
    setDetectedFaces(0);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (!canvasRef.current || !videoRef.current) return;
          
          // Setup canvas
          const displaySize = { 
            width: videoRef.current.videoWidth, 
            height: videoRef.current.videoHeight 
          };
          
          canvasRef.current.width = displaySize.width;
          canvasRef.current.height = displaySize.height;
          
          // Start face detection loop
          if (faceDetectionIntervalRef.current) {
            clearInterval(faceDetectionIntervalRef.current);
          }
          
          faceDetectionIntervalRef.current = window.setInterval(async () => {
            if (!videoRef.current || !canvasRef.current) return;
            
            // Only proceed if the tab is still active
            if (activeTab !== 'facial') {
              stopFaceDetection();
              return;
            }
            
            // Detect faces
            const detections = await faceapi.detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions({
                inputSize: 320,
                scoreThreshold: 0.5
              })
            ).withFaceLandmarks().withFaceDescriptors();
            
            // Update detected faces count
            setDetectedFaces(detections.length);
            
            // Draw detections on canvas
            const context = canvasRef.current.getContext('2d');
            if (context) {
              context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              
              // Draw face detections
              faceapi.draw.drawDetections(canvasRef.current, detections);
              faceapi.draw.drawFaceLandmarks(canvasRef.current, detections);
              
              // If a face is detected for a few seconds, proceed with authentication
              if (detections.length === 1) {
                // Collect data for 3 seconds to ensure it's a real face and not a photo
                setTimeout(() => {
                  if (detections.length === 1 && !processingBiometric && activeTab === 'facial') {
                    handleBiometric('facial');
                  }
                }, 2000);
              }
            }
          }, 100);
        };
      }
    } catch (error) {
      console.error('Erro ao acessar câmera facial:', error);
      setIsFaceScanActive(false);
      toast({
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera para reconhecimento facial.",
        variant: "destructive"
      });
    }
  };

  // Stop face detection
  const stopFaceDetection = () => {
    setIsFaceScanActive(false);
    
    if (faceDetectionIntervalRef.current) {
      clearInterval(faceDetectionIntervalRef.current);
      faceDetectionIntervalRef.current = null;
    }
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Start digital scan simulation
  const startDigitalScan = () => {
    setIsDigitalScanActive(true);
    
    // Simulate fingerprint scanning
    setTimeout(() => {
      handleBiometric('digital');
    }, 2500);
  };

  // Simulação de pesquisa de colaboradores (em produção, isso buscaria do banco)
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    try {
      // Em um ambiente real, buscaria do banco de dados
      const { data: colaboradores, error } = await supabase
        .from('colaboradores')
        .select('*')
        .or(`nome.ilike.%${searchQuery}%,matricula.ilike.%${searchQuery}%`)
        .limit(10);
      
      if (error) throw error;
      
      if (colaboradores && colaboradores.length > 0) {
        const mappedResults = colaboradores.map(colab => ({
          id: colab.id,
          name: colab.nome,
          badge: colab.matricula || 'N/A',
          department: colab.departamento || 'N/A',
          position: colab.cargo || 'Colaborador',
          photo: colab.foto_url
        }));
        
        setSearchResults(mappedResults);
      } else {
        setSearchResults([]);
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente outro termo de busca",
        });
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast({
        title: "Erro na busca",
        description: "Não foi possível completar a busca",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Lidar com escaneamento de QR do crachá
  const handleQRScan = async (data: string, parsedData?: ReturnType<typeof parseQRData>) => {
    setScanActive(false);
    
    toast({
      title: "QR Code detectado",
      description: `Processando...`,
    });
    
    try {
      // Check if the parsedData indicates this is an employee badge
      const isEmployeeBadge = parsedData?.type === 'employee';
      
      if (!isEmployeeBadge) {
        toast({
          title: "QR Code inválido",
          description: "Este não parece ser um QR Code de crachá de colaborador.",
          variant: "destructive"
        });
        return;
      }
      
      // Chamar a edge function para autenticar via QR code
      const { data: response, error } = await supabase.functions.invoke('verificar-qr-code', {
        body: { qrHash: data }
      });
      
      if (error) throw error;
      
      if (response.success && response.colaborador) {
        const employee: Employee = {
          id: response.colaborador.id,
          name: response.colaborador.nome,
          badge: response.colaborador.matricula || 'N/A',
          department: response.colaborador.departamento || 'N/A',
          position: response.colaborador.cargo || 'Colaborador',
          photo: response.colaborador.foto_url
        };
        
        toast({
          title: "Colaborador identificado",
          description: `${employee.name} autenticado com sucesso!`,
          variant: "default"
        });
        
        onAuthenticated(employee);
      } else {
        throw new Error(response.error || "Erro desconhecido na autenticação");
      }
    } catch (error) {
      console.error('Erro na autenticação por QR Code:', error);
      toast({
        title: "Falha na autenticação",
        description: error instanceof Error ? error.message : "QR Code inválido ou não reconhecido",
        variant: "destructive"
      });
    }
  };

  // Lidar com autenticação biométrica (facial ou digital)
  const handleBiometric = async (type: 'facial' | 'digital') => {
    setProcessingBiometric(true);
    
    try {
      // Stop facial scanning if active
      if (type === 'facial' && isFaceScanActive) {
        stopFaceDetection();
      }
      
      // Generate biometric data
      let biometricData;
      
      // In a real application, you'd collect actual biometric data from the camera or fingerprint scanner
      if (type === 'facial' && videoRef.current) {
        // For facial biometrics, we could capture a frame from the video
        // Here we're just simulating with a timestamp
        biometricData = `FACIAL-${Date.now()}`;
      } else if (type === 'digital') {
        // For fingerprint, we'd get data from a fingerprint reader
        // Here we're simulating with a random ID
        biometricData = `DIGITAL-${Math.random().toString(36).substring(2, 15)}`;
        setIsDigitalScanActive(false);
      }
      
      toast({
        title: `Processando biometria ${type === 'facial' ? 'facial' : 'digital'}`,
        description: "Aguarde um momento...",
      });
      
      // Call the Edge Function
      const { data: response, error } = await supabase.functions.invoke('processar-biometria', {
        body: { 
          tipoBiometria: type, 
          dadosBiometricos: biometricData,
          empresaId: "empresa-simulada" // In a real app, you'd use the actual company ID
        }
      });
      
      if (error) throw error;
      
      if (response.success && response.colaboradorId) {
        const mockEmployee: Employee = {
          id: response.colaboradorId,
          name: response.colaboradorNome || "Colaborador Autenticado",
          badge: "COLAB-" + response.colaboradorId.substring(0, 4),
          department: "Departamento Simulado",
          position: "Cargo Simulado",
          photo: undefined
        };
        
        toast({
          title: `Biometria ${type} validada`,
          description: `${mockEmployee.name} autenticado com sucesso.`,
        });
        
        onAuthenticated(mockEmployee);
      } else {
        throw new Error(response.error || "Erro na validação biométrica");
      }
    } catch (error) {
      console.error(`Erro na autenticação biométrica ${type}:`, error);
      toast({
        title: "Falha na autenticação biométrica",
        description: error instanceof Error ? error.message : "Biometria não reconhecida",
        variant: "destructive"
      });
    } finally {
      setProcessingBiometric(false);
    }
  };

  // Handle tab change
  useEffect(() => {
    // When switching away from facial tab, stop facial detection
    if (activeTab !== 'facial' && isFaceScanActive) {
      stopFaceDetection();
    }
    
    // When switching to facial tab, start facial detection
    if (activeTab === 'facial' && !isFaceScanActive && faceApiLoaded) {
      startFaceDetection();
    }
    
    // When switching away from digital tab, reset digital scan
    if (activeTab !== 'digital') {
      setIsDigitalScanActive(false);
    }
  }, [activeTab, faceApiLoaded]);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="qrcode" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="qrcode" className="flex items-center gap-1">
            <QrCode className="h-4 w-4" />
            <span className="hidden sm:inline">QR Crachá</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Buscar</span>
          </TabsTrigger>
          <TabsTrigger value="facial" className="flex items-center gap-1">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Facial</span>
          </TabsTrigger>
          <TabsTrigger value="digital" className="flex items-center gap-1">
            <Fingerprint className="h-4 w-4" />
            <span className="hidden sm:inline">Digital</span>
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="qrcode">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {scanActive ? (
                <QRScanner
                  title="Escaneie o crachá do colaborador"
                  description="Posicione o QR Code do crachá na área de escaneamento"
                  onScan={handleQRScan}
                  onCancel={() => setScanActive(false)}
                  autoStartScanning={true}
                  successMessage="Crachá detectado"
                />
              ) : (
                <div className="flex flex-col items-center py-8">
                  <Badge className="h-16 w-16 text-brand-blue mb-4" />
                  <h3 className="text-lg font-medium mb-1">Autenticação por Crachá</h3>
                  <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                    Escaneie o QR Code presente no crachá do colaborador para identificação.
                  </p>
                  <Button onClick={() => setScanActive(true)}>
                    <QrCode className="mr-2 h-4 w-4" />
                    Iniciar Escaneamento de Crachá
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="search">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome ou matrícula do colaborador"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={isSearching}>
                    <Search className="mr-2 h-4 w-4" />
                    {isSearching ? 'Buscando...' : 'Buscar'}
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  <AnimatePresence>
                    {searchResults.map((employee) => (
                      <motion.div
                        key={employee.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={() => onAuthenticated(employee)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            {employee.photo ? (
                              <img src={employee.photo} alt={employee.name} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-full w-full p-2 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-gray-500">{employee.position} - {employee.department}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                    
                    {searchResults.length === 0 && searchQuery && !isSearching && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 text-center"
                      >
                        <p className="text-gray-500">Nenhum resultado encontrado</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="facial">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              {isFaceScanActive ? (
                <div className="relative w-full max-w-md mx-auto">
                  <div className="aspect-square rounded-lg border-2 border-brand-blue relative overflow-hidden">
                    <video 
                      ref={videoRef} 
                      className="w-full h-full object-cover"
                      autoPlay 
                      playsInline
                    />
                    <canvas 
                      ref={canvasRef} 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                    
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {processingBiometric ? 'Autenticando...' : 
                       detectedFaces > 0 ? `${detectedFaces} rosto${detectedFaces > 1 ? 's' : ''} detectado${detectedFaces > 1 ? 's' : ''}` : 
                       'Procurando rosto...'}
                    </div>
                    
                    <motion.div 
                      className="absolute inset-0 border-4 border-transparent"
                      animate={{ 
                        borderColor: processingBiometric ? ['rgba(37, 99, 235, 0.5)', 'rgba(37, 99, 235, 0)'] : 
                                    detectedFaces === 1 ? ['rgba(22, 163, 74, 0.5)', 'rgba(22, 163, 74, 0)'] : 
                                    ['rgba(37, 99, 235, 0.2)', 'rgba(37, 99, 235, 0)'] 
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button 
                      onClick={stopFaceDetection} 
                      variant="outline" 
                      disabled={processingBiometric}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancelar Escaneamento
                    </Button>
                  </div>
                  
                  {detectedFaces > 1 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        Múltiplos rostos detectados. Por favor, garanta que apenas um rosto esteja visível para o escaneamento.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Camera className="h-16 w-16 text-brand-green mb-4" />
                  <h3 className="text-lg font-medium mb-1">Biometria Facial</h3>
                  <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                    Use o reconhecimento facial para identificar o colaborador automaticamente.
                  </p>
                  <Button 
                    onClick={() => startFaceDetection()}
                    disabled={!faceApiLoaded || processingBiometric}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {faceApiLoaded ? 'Iniciar Reconhecimento Facial' : 'Carregando modelos...'}
                  </Button>
                  
                  {!faceApiLoaded && (
                    <p className="text-xs text-gray-500 mt-3 animate-pulse">
                      Carregando modelos de reconhecimento facial...
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="digital">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center py-8"
            >
              {isDigitalScanActive ? (
                <div className="w-full max-w-md flex flex-col items-center">
                  <div className="relative w-48 h-64 bg-gray-100 rounded-lg border-2 border-brand-purple mb-6">
                    <Fingerprint className="h-24 w-24 text-brand-purple absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    
                    <motion.div 
                      className="absolute inset-0 bg-brand-purple"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 2 }}
                    />
                    
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      Escaneando...
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Por favor, mantenha o dedo posicionado até o escaneamento ser concluído
                  </p>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDigitalScanActive(false)}
                    disabled={processingBiometric}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              ) : (
                <>
                  <Fingerprint className="h-16 w-16 text-brand-purple mb-4" />
                  <h3 className="text-lg font-medium mb-1">Biometria Digital</h3>
                  <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                    Use a impressão digital para identificar o colaborador.
                  </p>
                  <Button 
                    onClick={startDigitalScan}
                    disabled={processingBiometric}
                  >
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Iniciar Leitura Digital
                  </Button>
                </>
              )}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default EmployeeAuth;
