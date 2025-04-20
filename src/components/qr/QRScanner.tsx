
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, QrCode, X, ImageOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface QRScannerProps {
  onScan: (data: string) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  onCancel,
  title = "Escaneie o Código QR",
  description = "Posicione o código QR na área de escaneamento"
}) => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // Referência para o vídeo e canvas
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Iniciar a câmera
  const startCamera = async () => {
    if (!videoRef.current) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setScanning(true);
        
        // Simular detecção de QR após um tempo
        simulateQRDetection();
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      setHasPermission(false);
      toast({
        title: "Erro ao acessar câmera",
        description: "Verifique as permissões do navegador",
        variant: "destructive"
      });
    }
  };

  // Parar a câmera
  const stopCamera = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setScanning(false);
  };

  // Simular detecção de QR (em um cenário real, seria a biblioteca de detecção de QR)
  const simulateQRDetection = () => {
    // Tempo aleatório entre 1 e 3 segundos para simular detecção
    const detectionTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      if (scanning) {
        // Gerar um código QR fictício para simulação
        const qrData = `QR-${Math.floor(Math.random() * 1000)}-${Date.now()}`;
        onScan(qrData);
        stopCamera();
      }
    }, detectionTime);
  };

  // Lidar com o botão de escanear
  const handleScanButton = () => {
    if (scanning) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Limpar quando o componente for desmontado
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <motion.div 
        className={`aspect-square rounded-lg border-2 relative overflow-hidden ${scanning ? 'border-brand-blue' : 'border-gray-300 border-dashed'}`}
        animate={scanning ? { borderColor: ['#2563eb', '#60a5fa', '#2563eb'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {scanning ? (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              autoPlay 
              playsInline
            />
            <canvas ref={canvasRef} className="hidden" />
            
            <motion.div 
              className="absolute inset-0 pointer-events-none z-10"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-brand-blue rounded-lg"></div>
              
              {/* Linhas de scan */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1px bg-brand-blue/60"
                animate={{ 
                  y: ['-25%', '25%', '-25%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Cantos */}
              <div className="absolute top-[25%] left-[25%] w-5 h-5 border-t-2 border-l-2 border-brand-blue"></div>
              <div className="absolute top-[25%] right-[25%] w-5 h-5 border-t-2 border-r-2 border-brand-blue"></div>
              <div className="absolute bottom-[25%] left-[25%] w-5 h-5 border-b-2 border-l-2 border-brand-blue"></div>
              <div className="absolute bottom-[25%] right-[25%] w-5 h-5 border-b-2 border-r-2 border-brand-blue"></div>
            </motion.div>
          </>
        ) : (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <AnimatePresence mode="wait">
              {hasPermission === false ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <ImageOff className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500 max-w-xs mx-auto mb-4">
                    Não foi possível acessar a câmera. Verifique as permissões do navegador.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">Clique em "Iniciar Scanner" para começar a leitura</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      <div className="flex justify-between gap-4">
        {onCancel && (
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        )}
        
        <Button 
          className="flex-1" 
          onClick={handleScanButton}
          variant={scanning ? "secondary" : "default"}
        >
          {scanning ? (
            <>
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mr-2"
              >
                <Camera className="h-4 w-4" />
              </motion.div>
              Parar Scanner
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Iniciar Scanner
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QRScanner;
