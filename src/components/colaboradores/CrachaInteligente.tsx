
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, QrCode, Printer, Camera, RefreshCw, CheckCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { QRCodeSVG } from 'qrcode.react'; // Fixed import
import { generateQRData, QR_CONFIG } from '@/config/qr-config';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'; // Fixed import

interface CrachaInteligenteProps {
  colaborador?: any;
}

const CrachaInteligente: React.FC<CrachaInteligenteProps> = ({ colaborador = {} }) => {
  const { toast } = useToast();
  const [qrGerado, setQrGerado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const crachaRef = React.useRef<HTMLDivElement>(null);

  // Check if QR code exists when component loads
  useEffect(() => {
    if (colaborador?.id && colaborador?.cracha_hash) {
      setQrGerado(true);
      setQrData(colaborador.cracha_hash);
    }
  }, [colaborador]);

  const gerarQRCode = async () => {
    if (!colaborador.id) {
      toast({
        title: "Erro",
        description: "Dados do colaborador não disponíveis",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Generate unique QR data for the employee
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const qrHashBase = generateQRData('employee', colaborador.id, {
        nome: colaborador.nome,
        matricula: colaborador.matricula,
        timestamp,
        random: randomSuffix
      });

      // Save the QR hash to the database
      const { data, error } = await supabase
        .from('colaboradores')
        .update({ cracha_hash: qrHashBase })
        .eq('id', colaborador.id)
        .select();

      if (error) {
        throw error;
      }

      setQrData(qrHashBase);
      setQrGerado(true);
      toast({
        title: "QR Code gerado",
        description: "QR Code gerado com sucesso",
      });
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      toast({
        title: "Erro ao gerar QR Code",
        description: "Não foi possível gerar o QR Code. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!crachaRef.current) return;

    setIsDownloading(true);
    try {
      // Add a class to prepare for download (can apply specific styles)
      crachaRef.current.classList.add('downloading');
      
      // Capture the badge image with html2canvas
      const canvas = await html2canvas(crachaRef.current, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
      });
      
      // Remove download class
      crachaRef.current.classList.remove('downloading');
      
      // Calculate dimensions for PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85, 130], // Standard ID card size (adjust as needed)
      });
      
      // Add image to PDF - calculate sizing to fit properly
      const imgWidth = 70;
      const imgHeight = 110;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const marginX = (pageWidth - imgWidth) / 2;
      const marginY = (pageHeight - imgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
      
      // Save the PDF with the employee name
      const fileName = `cracha_${colaborador.nome?.replace(/\s+/g, '_').toLowerCase() || 'colaborador'}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "Crachá baixado",
        description: `O crachá foi salvo como ${fileName}`,
      });
    } catch (error) {
      console.error('Erro ao baixar crachá:', error);
      toast({
        title: "Erro ao fazer download",
        description: "Não foi possível gerar o PDF do crachá.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!crachaRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Erro ao imprimir",
        description: "Não foi possível abrir a janela de impressão. Verifique se os pop-ups estão permitidos.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare print document
    printWindow.document.write(`
      <html>
        <head>
          <title>Crachá - ${colaborador.nome || 'Colaborador'}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .print-container { width: 85mm; height: 130mm; overflow: hidden; }
            @media print {
              @page { size: 85mm 130mm; margin: 0; }
              .print-container { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${crachaRef.current.outerHTML}
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Crachá Inteligente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visualização do crachá */}
          <div className="flex flex-col items-center">
            <div 
              ref={crachaRef} 
              className="relative w-full max-w-[250px] bg-white border rounded-lg overflow-hidden shadow-lg"
            >
              {/* Cabeçalho do crachá */}
              <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark p-3 text-white text-center">
                <h3 className="text-lg font-bold">RAENG</h3>
                <p className="text-xs">CONSTRUÇÃO E ENGENHARIA</p>
              </div>
              
              {/* Corpo do crachá */}
              <div className="p-4 flex flex-col items-center">
                <Avatar className="w-24 h-24 border-2 border-brand-blue">
                  <AvatarImage src={colaborador.foto_url || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl bg-brand-blue/10">
                    {colaborador.nome?.substring(0, 2).toUpperCase() || 'CO'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-3 text-center">
                  <h4 className="font-bold text-lg">{colaborador.nome || 'Nome do Colaborador'}</h4>
                  <p className="text-sm text-gray-600">{colaborador.cargo || 'Cargo do Colaborador'}</p>
                  
                  <div className="mt-3 mb-3">
                    <Badge className="bg-brand-blue">{colaborador.matricula || 'MAT: 0001'}</Badge>
                  </div>
                  
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded flex items-center justify-center mb-2">
                    {qrGerado ? (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative"
                      >
                        <QRCode 
                          value={qrData} 
                          size={120} 
                          level={QR_CONFIG.generation.errorCorrectionLevel}
                          renderAs="svg"
                          includeMargin={true}
                          bgColor={QR_CONFIG.generation.color.light}
                          fgColor={QR_CONFIG.generation.color.dark}
                        />
                        <motion.div 
                          className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <CheckCircle className="h-4 w-4 text-white" />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <>
                        <QrCode className="h-12 w-12 text-gray-300" />
                        <p className="text-xs text-gray-500 absolute mt-16">QR Code não gerado</p>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {colaborador.empresa || 'RAENG Construção e Engenharia'}
                  </div>
                </div>
              </div>
              
              {/* Rodapé do crachá */}
              <div className="bg-gray-100 p-2 text-center text-xs text-gray-600">
                <p>Em caso de perda, favor devolver.</p>
                <p>Tel: (11) 1234-5678</p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                disabled={!qrGerado || isDownloading} 
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" /> Imprimir
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                disabled={!qrGerado || isDownloading}
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4 mr-2" /> 
                {isDownloading ? 'Gerando...' : 'Exportar PDF'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                disabled={!qrGerado}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Crachá - ${colaborador.nome || 'Colaborador'}`,
                      text: 'Crachá digital do colaborador'
                    }).catch(err => console.log('Erro ao compartilhar:', err));
                  } else {
                    toast({
                      title: "Compartilhamento não suportado",
                      description: "Seu navegador não suporta a API de compartilhamento.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" /> Compartilhar
              </Button>
            </div>
          </div>
          
          {/* Controles e informações */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <h3 className="font-medium text-brand-blue mb-2">Sobre o Crachá Inteligente</h3>
              <p className="text-sm text-gray-600 mb-4">
                O crachá inteligente permite identificação rápida do colaborador por QR Code, 
                controle de acesso e registro de ponto. O QR Code é único e criptografado para segurança.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-md p-3 border">
                  <h4 className="font-medium text-sm mb-1">Funcionalidades</h4>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                    <li>Identificação por QR Code</li>
                    <li>Controle de acesso</li>
                    <li>Registro de ponto</li>
                    <li>Validação de treinamentos</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-md p-3 border">
                  <h4 className="font-medium text-sm mb-1">Integração</h4>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                    <li>App Mobile</li>
                    <li>Catracas eletrônicas</li>
                    <li>Sistema de ponto</li>
                    <li>Controles de acesso</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border">
              <h3 className="font-medium mb-4">Gerenciar QR Code</h3>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Status do QR Code</p>
                  <div className="flex items-center mt-1">
                    {qrGerado ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" /> Gerado
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Não gerado
                      </Badge>
                    )}
                  </div>
                  {qrGerado && (
                    <p className="text-xs text-gray-500 mt-2">
                      Gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  )}
                </div>
                
                {qrGerado ? (
                  <Button variant="outline" onClick={() => gerarQRCode()} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? "Processando..." : "Renovar QR Code"}
                  </Button>
                ) : (
                  <Button onClick={() => gerarQRCode()} disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90">
                    <QrCode className="h-4 w-4 mr-2" />
                    {loading ? "Processando..." : "Gerar QR Code"}
                  </Button>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
                <div className="flex items-center">
                  <Camera className="h-5 w-5 text-amber-500 mr-2" />
                  <h4 className="font-medium text-sm">Cadastro de foto</h4>
                </div>
                <p className="text-xs text-gray-600 mt-1 mb-2">
                  Para o crachá inteligente, é necessário incluir uma foto do colaborador.
                </p>
                <Button variant="outline" size="sm" className="text-xs">
                  <Camera className="h-4 w-4 mr-1" /> Atualizar Foto
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border flex justify-between items-center">
              <div>
                <h3 className="font-medium">Proteção de dados</h3>
                <p className="text-xs text-gray-600 mt-1">
                  O QR Code não armazena dados pessoais sensíveis e é protegido contra clonagem.
                </p>
              </div>
              <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" /> LGPD compliant
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrachaInteligente;
