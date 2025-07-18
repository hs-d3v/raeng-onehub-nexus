import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, QrCode, X, ImageOff, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { QR_CONFIG, parseQRData } from '@/config/qr-config';

const mockJsQR = (data: Uint8ClampedArray, width: number, height: number) => {
  console.log('Mock jsQR scanning...');
  return null;
};

interface QRScannerProps {
  onScan: (data: string, parsedData?: ReturnType<typeof parseQRData>) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  autoStartScanning?: boolean;
  continuous?: boolean;
  successMessage?: string;
}

const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  onCancel,
  title = "Escaneie o Código QR",
  description = "Posicione o código QR na área de escaneamento",
  autoStartScanning = false,
  continuous = false,
  successMessage = "QR Code detectado",
}) => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(autoStartScanning);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lastScannedData, setLastScannedData] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scannerIntervalRef = useRef<number | null>(null);
  const permissionRetryCount = useRef(0);

  const handleQRScan = useCallback((qrData: string) => {
    if (isProcessing) return;
    
    if (lastScannedData === qrData && !continuous) {
      return;
    }
    
    setIsProcessing(true);
    setLastScannedData(qrData);
    
    toast({
      title: successMessage,
      description: `Processando leitura...`,
    });
    
    try {
      const parsedData = parseQRData(qrData);
      
      if (!continuous) {
        stopCamera();
      }
      
      onScan(qrData, parsedData);
    } catch (error) {
      console.error('Error processing QR code data:', error);
      toast({
        title: "Erro na leitura",
        description: "Ocorreu um erro ao processar o QR code. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  }, [continuous, isProcessing, lastScannedData, onScan, successMessage, toast]);

  const processVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context || video.videoWidth === 0) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    const code = mockJsQR(imageData.data, imageData.width, imageData.height);
    
    if (code && code.data) {
      handleQRScan(code.data);
    }
  }, [scanning, handleQRScan]);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
          zoom: zoomLevel
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasPermission(true);
        setScanning(true);
        
        if (!scannerIntervalRef.current) {
          scannerIntervalRef.current = window.setInterval(() => {
            processVideoFrame();
          }, QR_CONFIG.scanner.scanInterval);
        }
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      setHasPermission(false);
      
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        toast({
          title: "Acesso à câmera negado",
          description: "Você precisa permitir o acesso à câmera para utilizar o scanner.",
          variant: "destructive"
        });
      } else if (error instanceof DOMException && error.name === "NotFoundError") {
        toast({
          title: "Câmera não encontrada",
          description: "Não foi possível encontrar uma câmera no seu dispositivo.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao acessar câmera",
          description: "Verifique as permissões do navegador e se seu dispositivo tem uma câmera disponível.",
          variant: "destructive"
        });
      }
      
      if (permissionRetryCount.current < 2) {
        permissionRetryCount.current += 1;
        setTimeout(startCamera, 1000);
      }
    }
  }, [zoomLevel, toast, processVideoFrame]);

  const stopCamera = useCallback(() => {
    if (scannerIntervalRef.current) {
      clearInterval(scannerIntervalRef.current);
      scannerIntervalRef.current = null;
    }
    
    if (!videoRef.current || !videoRef.current.srcObject) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setScanning(false);
  }, []);

  const toggleZoom = () => {
    setZoomLevel(prev => {
      const newLevel = prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1;
      
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const videoTrack = stream.getVideoTracks()[0];
        
        if (videoTrack && 'applyConstraints' in videoTrack) {
          try {
            videoTrack.applyConstraints({
              advanced: [{ width: { ideal: newLevel * 1280 }, height: { ideal: newLevel * 720 } }]
            }).catch(e => console.log('Advanced constraints not supported on this device'));
          } catch (e) {
            console.log('Advanced constraints not supported on this device');
          }
        }
      }
      
      return newLevel;
    });
  };

  const handleScanButton = () => {
    if (scanning) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    if (autoStartScanning) {
      startCamera();
    }
    
    return () => {
      if (scannerIntervalRef.current) {
        clearInterval(scannerIntervalRef.current);
      }
      stopCamera();
    };
  }, [autoStartScanning, startCamera, stopCamera]);

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
            <canvas ref={canvasRef} className="absolute top-0 left-0 opacity-0 pointer-events-none" />
            
            <motion.div 
              className="absolute inset-0 pointer-events-none z-10"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-brand-blue rounded-lg"></div>
              
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1px bg-brand-blue/60"
                animate={{ 
                  y: ['-25%', '25%', '-25%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="absolute top-[25%] left-[25%] w-5 h-5 border-t-2 border-l-2 border-brand-blue"></div>
              <div className="absolute top-[25%] right-[25%] w-5 h-5 border-t-2 border-r-2 border-brand-blue"></div>
              <div className="absolute bottom-[25%] left-[25%] w-5 h-5 border-b-2 border-l-2 border-brand-blue"></div>
              <div className="absolute bottom-[25%] right-[25%] w-5 h-5 border-b-2 border-r-2 border-brand-blue"></div>
            </motion.div>
            
            <Button
              variant="outline" 
              size="icon"
              className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
              onClick={toggleZoom}
            >
              {zoomLevel === 1 ? (
                <ZoomIn className="h-4 w-4 text-gray-700" />
              ) : (
                <ZoomOut className="h-4 w-4 text-gray-700" />
              )}
            </Button>
            
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {isProcessing ? 'Processando...' : 'Escaneando...'}
            </div>
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
          disabled={isProcessing}
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
