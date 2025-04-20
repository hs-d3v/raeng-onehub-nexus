
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge, QrCode, Search, User, Check } from 'lucide-react';
import QRScanner from './QRScanner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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

  // Verificar se já tem usuário logado mas isso agora não afeta a autenticação do colaborador
  React.useEffect(() => {
    // Verificamos se há um usuário autenticado para mostrar informações relevantes
    if (authenticatedUser) {
      toast({
        title: "Sistema iniciado",
        description: `Usuário ${authenticatedUser.name} está operando o sistema.`,
      });
    }
  }, [authenticatedUser, toast]);

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
  const handleQRScan = async (data: string) => {
    setScanActive(false);
    
    toast({
      title: "QR Code detectado",
      description: `Processando...`,
    });
    
    try {
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

  // Lidar com autenticação biométrica (simulada)
  const handleBiometric = async (type: 'facial' | 'digital') => {
    toast({
      title: `Iniciando biometria ${type === 'facial' ? 'facial' : 'digital'}`,
      description: "Aguarde um momento...",
    });
    
    try {
      // Simular chamada à Edge Function
      const { data: response, error } = await supabase.functions.invoke('processar-biometria', {
        body: { 
          tipoBiometria: type, 
          dadosBiometricos: "SIMULAÇÃO-" + Date.now().toString(),
          empresaId: "empresa-simulada"
        }
      });
      
      if (error) throw error;
      
      if (response.success && response.colaboradorId) {
        // Em produção, aqui buscaríamos os dados completos do colaborador
        const mockEmployee: Employee = {
          id: response.colaboradorId,
          name: response.colaboradorNome || "Colaborador Teste",
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
    }
  };

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
            <Badge className="h-4 w-4" />
            <span className="hidden sm:inline">Biometria Facial</span>
          </TabsTrigger>
          <TabsTrigger value="digital" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Biometria Digital</span>
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
                          <Check className="h-4 w-4" />
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
              className="flex flex-col items-center py-8"
            >
              <User className="h-16 w-16 text-brand-green mb-4" />
              <h3 className="text-lg font-medium mb-1">Biometria Facial</h3>
              <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                Use o reconhecimento facial para identificar o colaborador automaticamente.
              </p>
              <Button onClick={() => handleBiometric('facial')}>
                <User className="mr-2 h-4 w-4" />
                Iniciar Reconhecimento Facial
              </Button>
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
              <User className="h-16 w-16 text-brand-purple mb-4" />
              <h3 className="text-lg font-medium mb-1">Biometria Digital</h3>
              <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
                Use a impressão digital para identificar o colaborador.
              </p>
              <Button onClick={() => handleBiometric('digital')}>
                <User className="mr-2 h-4 w-4" />
                Iniciar Leitura Digital
              </Button>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default EmployeeAuth;
