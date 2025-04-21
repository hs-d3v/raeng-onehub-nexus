
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, QrCode, X, ImageOff, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import jsQR from 'jsqr';
import { QR_CONFIG, parseQRData } from '@/config/qr-config';

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
  
  // Referência para o vídeo e canvas
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scannerIntervalRef = useRef<number | null>(null);
  const permissionRetryCount = useRef(0);

  // Function to handle QR code scanning
  const handleQRScan = useCallback((qrData: string) => {
    if (isProcessing) return;
    
    if (lastScannedData === qrData && !continuous) {
      return; // Avoid duplicate scans unless continuous mode is enabled
    }
    
    setIsProcessing(true);
    setLastScannedData(qrData);
    
    toast({
      title: successMessage,
      description: `Processando leitura...`,
    });
    
    try {
      // Parse the QR data to determine what type it is
      const parsedData = parseQRData(qrData);
      
      // If not continuous scanning, we can stop the camera
      if (!continuous) {
        stopCamera();
      }
      
      // Call the onScan callback with both raw and parsed data
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
      }, 1000); // Add a small delay before allowing new scans
    }
  }, [continuous, isProcessing, lastScannedData, onScan, successMessage, toast]);

  // Process frames from the video stream
  const processVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context || video.videoWidth === 0) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Use jsQR to detect QR codes in the image
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    
    // If a QR code is detected, handle it
    if (code && code.data) {
      handleQRScan(code.data);
    }
  }, [scanning, handleQRScan]);

  // Initialize the camera
  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      // Request camera access with specific constraints
      const constraints = {
        video: {
          facingMode: 'environment', // Prefer back camera on mobile
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
        
        // Start scanning at intervals
        if (!scannerIntervalRef.current) {
          scannerIntervalRef.current = window.setInterval(() => {
            processVideoFrame();
          }, QR_CONFIG.scanner.scanInterval);
        }
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      setHasPermission(false);
      
      // Handle different error types
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
      
      // Retry if needed
      if (permissionRetryCount.current < 2) {
        permissionRetryCount.current += 1;
        setTimeout(startCamera, 1000);
      }
    }
  }, [zoomLevel, toast, processVideoFrame]);

  // Stop the camera
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

  // Toggle zoom level
  const toggleZoom = () => {
    setZoomLevel(prev => {
      const newLevel = prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1;
      
      // If we have an active stream, try to update its constraints
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const videoTrack = stream.getVideoTracks()[0];
        
        if (videoTrack && 'applyConstraints' in videoTrack) {
          try {
            videoTrack.applyConstraints({
              advanced: [{ zoom: newLevel }]
            }).catch(e => console.log('Zoom not supported on this device'));
          } catch (e) {
            console.log('Zoom not supported on this device');
          }
        }
      }
      
      return newLevel;
    });
  };

  // Handle the scan button
  const handleScanButton = () => {
    if (scanning) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Start scanning automatically if requested
  useEffect(() => {
    if (autoStartScanning) {
      startCamera();
    }
    
    // Cleanup when unmounted
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
            
            {/* Zoom button */}
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
            
            {/* Status indicator */}
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
