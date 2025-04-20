
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Badge, User, QrCode, Signature } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Employee {
  id: string;
  name: string;
  badge: string;
  department: string;
  position: string;
  photo?: string;
  hasBiometricFace?: boolean;
  hasBiometricFingerprint?: boolean;
  hasSignature?: boolean;
}

const BiometricTab = () => {
  const { toast } = useToast();
  const [activeBiometricType, setActiveBiometricType] = useState('face');
  const [processing, setProcessing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dados simulados de colaboradores
  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'João Silva',
      badge: 'COLAB-001',
      department: 'Operacional',
      position: 'Técnico de Segurança',
      photo: '/placeholder.svg',
      hasBiometricFace: true,
      hasBiometricFingerprint: false,
      hasSignature: true
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      badge: 'COLAB-002',
      department: 'Administrativo',
      position: 'Analista de RH',
      photo: '/placeholder.svg',
      hasBiometricFace: false,
      hasBiometricFingerprint: true,
      hasSignature: true
    },
    {
      id: '3',
      name: 'Carlos Santos',
      badge: 'COLAB-003',
      department: 'Técnico',
      position: 'Engenheiro Civil',
      photo: '/placeholder.svg',
      hasBiometricFace: false,
      hasBiometricFingerprint: false,
      hasSignature: false
    }
  ];

  // Simulação de pesquisa de colaboradores
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const foundEmployee = mockEmployees.find(
      emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             emp.badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSelectedEmployee(foundEmployee || null);
    
    if (!foundEmployee) {
      toast({
        title: "Colaborador não encontrado",
        description: "Verifique o nome ou matrícula informados",
        variant: "destructive"
      });
    }
  };
  
  // Capturar biometria
  const handleCaptureBiometric = (type: string) => {
    if (!selectedEmployee) {
      toast({
        title: "Nenhum colaborador selecionado",
        description: "Selecione um colaborador antes de prosseguir",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    // Simulação de processo de captura biométrica
    toast({
      title: `Iniciando captura de ${type === 'face' ? 'biometria facial' : 
                                      type === 'finger' ? 'impressão digital' : 
                                      'assinatura digital'}`,
      description: "Aguarde um momento..."
    });
    
    setTimeout(() => {
      setProcessing(false);
      
      toast({
        title: "Captura realizada com sucesso",
        description: `${type === 'face' ? 'Biometria facial' : 
                       type === 'finger' ? 'Impressão digital' : 
                       'Assinatura digital'} cadastrada para ${selectedEmployee.name}`,
      });
      
      // Atualizar status de cadastro biométrico
      if (type === 'face') {
        setSelectedEmployee({...selectedEmployee, hasBiometricFace: true});
      } else if (type === 'finger') {
        setSelectedEmployee({...selectedEmployee, hasBiometricFingerprint: true});
      } else if (type === 'signature') {
        setSelectedEmployee({...selectedEmployee, hasSignature: true});
      }
    }, 2000);
  };
  
  // Gerar QR Code de crachá
  const handleGenerateBadge = () => {
    if (!selectedEmployee) {
      toast({
        title: "Nenhum colaborador selecionado",
        description: "Selecione um colaborador antes de prosseguir",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Crachá gerado com sucesso",
      description: `QR Code do crachá gerado para ${selectedEmployee.name}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validações Biométricas</CardTitle>
        <CardDescription>
          Gerencie crachás, biometria facial, digital e assinaturas para validação nos fluxos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Área de busca de colaborador */}
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-medium">Selecionar Colaborador</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Buscar por nome ou matrícula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>
              Buscar
            </Button>
          </div>
          
          {/* Detalhes do colaborador selecionado */}
          {selectedEmployee && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-lg mt-4 bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                  {selectedEmployee.photo ? (
                    <img src={selectedEmployee.photo} alt={selectedEmployee.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-full w-full p-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-medium">{selectedEmployee.name}</h4>
                  <p className="text-sm text-gray-500">{selectedEmployee.position}</p>
                  <p className="text-sm text-gray-500">{selectedEmployee.department} | {selectedEmployee.badge}</p>
                  
                  <div className="flex gap-2 mt-2">
                    <div className={`px-2 py-1 rounded-full text-xs ${selectedEmployee.hasBiometricFace 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      Biometria Facial
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${selectedEmployee.hasBiometricFingerprint 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      Impressão Digital
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${selectedEmployee.hasSignature 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      Assinatura Digital
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Tabs para diferentes tipos de validação */}
        {selectedEmployee && (
          <Tabs defaultValue="badge" value={activeBiometricType} onValueChange={setActiveBiometricType}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="badge">Crachá</TabsTrigger>
              <TabsTrigger value="face">Facial</TabsTrigger>
              <TabsTrigger value="finger">Digital</TabsTrigger>
              <TabsTrigger value="signature">Assinatura</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badge" className="space-y-4">
              <div className="text-center p-6 border rounded-lg">
                <QrCode className="h-20 w-20 mx-auto mb-4 text-brand-blue" />
                <h3 className="text-lg font-medium mb-1">QR Code do Crachá</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Gere o QR Code para o crachá do colaborador.
                </p>
                <Button onClick={handleGenerateBadge}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Gerar QR Code do Crachá
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="face" className="space-y-4">
              <div className="text-center p-6 border rounded-lg">
                <Badge className="h-20 w-20 mx-auto mb-4 text-brand-green" />
                <h3 className="text-lg font-medium mb-1">Biometria Facial</h3>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedEmployee.hasBiometricFace 
                    ? "Biometria facial já registrada. Você pode atualizar caso necessário." 
                    : "Capture a biometria facial do colaborador para autenticação."}
                </p>
                <Button 
                  onClick={() => handleCaptureBiometric('face')}
                  disabled={processing}
                >
                  <Badge className="mr-2 h-4 w-4" />
                  {selectedEmployee.hasBiometricFace ? "Atualizar Biometria Facial" : "Capturar Biometria Facial"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="finger" className="space-y-4">
              <div className="text-center p-6 border rounded-lg">
                <User className="h-20 w-20 mx-auto mb-4 text-brand-purple" />
                <h3 className="text-lg font-medium mb-1">Impressão Digital</h3>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedEmployee.hasBiometricFingerprint 
                    ? "Impressão digital já registrada. Você pode atualizar caso necessário." 
                    : "Capture a impressão digital do colaborador para autenticação."}
                </p>
                <Button 
                  onClick={() => handleCaptureBiometric('finger')}
                  disabled={processing}
                >
                  <User className="mr-2 h-4 w-4" />
                  {selectedEmployee.hasBiometricFingerprint ? "Atualizar Impressão Digital" : "Capturar Impressão Digital"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signature" className="space-y-4">
              <div className="text-center p-6 border rounded-lg">
                <Signature className="h-20 w-20 mx-auto mb-4 text-brand-orange" />
                <h3 className="text-lg font-medium mb-1">Assinatura Digital</h3>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedEmployee.hasSignature 
                    ? "Assinatura digital já registrada. Você pode atualizar caso necessário." 
                    : "Capture a assinatura digital do colaborador para documentos."}
                </p>
                <Button 
                  onClick={() => handleCaptureBiometric('signature')}
                  disabled={processing}
                >
                  <Signature className="mr-2 h-4 w-4" />
                  {selectedEmployee.hasSignature ? "Atualizar Assinatura Digital" : "Capturar Assinatura Digital"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default BiometricTab;
