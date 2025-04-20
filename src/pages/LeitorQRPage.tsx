import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  QrCode, 
  Search, 
  Upload, 
  Check, 
  X, 
  Clock, 
  Calendar, 
  Download, 
  Truck, 
  Package, 
  RotateCw, 
  Repeat2 as Exchange,
  Badge, 
  User, 
  FileText, 
  Signature,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import QRScanner from '@/components/qr/QRScanner';
import EmployeeAuth from '@/components/qr/EmployeeAuth';
import ItemScanner from '@/components/qr/ItemScanner';
import QRFlowTimeline from '@/components/qr/QRFlowTimeline';
import QRFlowDelivery from '@/components/qr/QRFlowDelivery';
import QRFlowReturn from '@/components/qr/QRFlowReturn';
import QRFlowExchange from '@/components/qr/QRFlowExchange';
import QRFlowApplication from '@/components/qr/QRFlowApplication';

// Tipo para os itens escaneados
interface ScannedItem {
  id: string;
  content: string;
  timestamp: string;
  type: 'qr' | 'barcode';
  status: 'success' | 'error' | 'pending';
}

// Tipo para definir o fluxo atual
type FlowType = 'delivery' | 'return' | 'exchange' | 'application' | null;

// Tipo para definir a etapa atual do fluxo
type FlowStep = 'auth' | 'items' | 'details' | 'confirm' | 'complete';

// Tipo para definir o colaborador autenticado
interface Employee {
  id: string;
  name: string;
  badge: string;
  department: string;
  position: string;
  photo?: string;
}

// Tipo para definir um item escaneado no fluxo
interface FlowItem {
  id: string;
  name: string;
  code: string;
  type: string;
  quantity: number;
}

const LeitorQRPage = () => {
  const { toast } = useToast();
  
  // Estado para controlar a digitalização
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'camera' | 'image'>('camera');
  
  // Estados para o fluxo
  const [currentFlow, setCurrentFlow] = useState<FlowType>(null);
  const [currentStep, setCurrentStep] = useState<FlowStep>('auth');
  const [generateDigitalTerm, setGenerateDigitalTerm] = useState(false);
  
  // Estado para o colaborador autenticado
  const [authenticatedEmployee, setAuthenticatedEmployee] = useState<Employee | null>(null);
  
  // Estado para os itens escaneados no fluxo atual
  const [flowItems, setFlowItems] = useState<FlowItem[]>([]);
  
  // Estado para controlar os detalhes específicos de cada fluxo
  const [flowDetails, setFlowDetails] = useState<Record<string, any>>({});
  
  // Histórico de escaneamentos
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([
    {
      id: '1',
      content: 'EPI-2023-001: Capacete de Segurança',
      timestamp: '16/04/2025 08:45',
      type: 'qr',
      status: 'success'
    },
    {
      id: '2',
      content: 'MAQ-2023-042: Retroescavadeira JCB',
      timestamp: '15/04/2025 14:20',
      type: 'qr',
      status: 'success'
    },
    {
      id: '3',
      content: 'FER-2023-078: Furadeira Industrial',
      timestamp: '14/04/2025 11:15',
      type: 'barcode',
      status: 'error'
    }
  ]);
  
  // Funções para gerenciar o fluxo
  const startFlow = (flowType: FlowType) => {
    setCurrentFlow(flowType);
    setCurrentStep('auth');
    setAuthenticatedEmployee(null);
    setFlowItems([]);
    setFlowDetails({});
    
    // Resetar a geração de termo digital apenas quando iniciar o fluxo de entrega
    if (flowType === 'delivery') {
      setGenerateDigitalTerm(false);
    }
  };
  
  const nextStep = () => {
    switch (currentStep) {
      case 'auth':
        setCurrentStep('items');
        break;
      case 'items':
        setCurrentStep('details');
        break;
      case 'details':
        setCurrentStep('confirm');
        break;
      case 'confirm':
        setCurrentStep('complete');
        // Aqui seria o momento de finalizar o fluxo e salvar os dados
        completeFlow();
        break;
      default:
        break;
    }
  };
  
  const previousStep = () => {
    switch (currentStep) {
      case 'items':
        setCurrentStep('auth');
        break;
      case 'details':
        setCurrentStep('items');
        break;
      case 'confirm':
        setCurrentStep('details');
        break;
      default:
        break;
    }
  };
  
  const completeFlow = () => {
    // Adicionar ao histórico
    const newItem: ScannedItem = {
      id: Date.now().toString(),
      content: `Fluxo de ${getFlowName()} concluído: ${flowItems.length} item(s)`,
      timestamp: new Date().toLocaleString('pt-BR'),
      type: 'qr',
      status: 'success'
    };
    
    setScannedItems(prev => [newItem, ...prev]);
    
    // Mostrar toast de sucesso
    toast({
      title: `${getFlowName()} concluído com sucesso!`,
      description: flowItems.length > 1 
        ? `${flowItems.length} itens processados.` 
        : "Item processado com sucesso."
    });
    
    // Resetar fluxo após um pequeno delay para mostrar a tela de conclusão
    setTimeout(() => {
      setCurrentFlow(null);
      setCurrentStep('auth');
    }, 3000);
  };
  
  // Helper para obter o nome do fluxo atual
  const getFlowName = (): string => {
    switch (currentFlow) {
      case 'delivery':
        return 'Entrega';
      case 'return':
        return 'Devolução';
      case 'exchange':
        return 'Troca';
      case 'application':
        return 'Aplicação';
      default:
        return '';
    }
  };
  
  // Função para autenticar o colaborador (simulada)
  const handleEmployeeAuth = (employee: Employee) => {
    setAuthenticatedEmployee(employee);
    toast({
      title: "Colaborador autenticado",
      description: `${employee.name} autenticado com sucesso.`
    });
    nextStep();
  };
  
  // Função para adicionar itens ao fluxo
  const handleAddItem = (item: FlowItem) => {
    setFlowItems(prev => [...prev, item]);
    toast({
      title: "Item adicionado",
      description: `${item.name} adicionado ao fluxo de ${getFlowName()}.`
    });
  };
  
  // Função para atualizar os detalhes do fluxo
  const handleUpdateDetails = (details: Record<string, any>) => {
    setFlowDetails(prev => ({ ...prev, ...details }));
    nextStep();
  };
  
  // Filtrar itens escaneados com base na busca
  const filteredItems = scannedItems.filter(item => 
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.timestamp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Leitor QR Code
        </motion.h1>

        {currentFlow ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Cabeçalho do Fluxo */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                {currentFlow === 'delivery' && <Truck className="h-6 w-6 text-brand-blue" />}
                {currentFlow === 'return' && <RotateCw className="h-6 w-6 text-brand-orange" />}
                {currentFlow === 'exchange' && <Exchange className="h-6 w-6 text-brand-purple" />}
                {currentFlow === 'application' && <Package className="h-6 w-6 text-brand-green" />}
                <h2 className="text-xl font-semibold">Fluxo de {getFlowName()}</h2>
              </div>
              <Button variant="outline" onClick={() => setCurrentFlow(null)}>
                <X className="h-4 w-4 mr-2" /> Cancelar
              </Button>
            </div>
            
            {/* Timeline do fluxo */}
            <QRFlowTimeline 
              currentStep={currentStep} 
              flowType={currentFlow}
            />
            
            {/* Conteúdo do fluxo baseado na etapa atual */}
            <Card className="border-t-4" style={{
              borderTopColor: currentFlow === 'delivery' ? 'rgb(37, 99, 235)' : // blue
                              currentFlow === 'return' ? 'rgb(234, 88, 12)' : // orange
                              currentFlow === 'exchange' ? 'rgb(124, 58, 237)' : // purple
                              'rgb(22, 163, 74)' // green
            }}>
              <CardHeader>
                <CardTitle>
                  {currentStep === 'auth' && 'Autenticação do Colaborador'}
                  {currentStep === 'items' && 'Escaneamento de Itens'}
                  {currentStep === 'details' && 'Detalhes do Processo'}
                  {currentStep === 'confirm' && 'Confirmar Informações'}
                  {currentStep === 'complete' && 'Processo Concluído'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 'auth' && 'Autentique o colaborador usando uma das opções abaixo.'}
                  {currentStep === 'items' && 'Escaneie os itens para o processo.'}
                  {currentStep === 'details' && 'Forneça os detalhes necessários para completar o processo.'}
                  {currentStep === 'confirm' && 'Verifique todas as informações antes de finalizar.'}
                  {currentStep === 'complete' && 'O processo foi concluído com sucesso!'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {/* Etapa de autenticação */}
                  {currentStep === 'auth' && (
                    <motion.div
                      key="auth"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EmployeeAuth onAuthenticated={handleEmployeeAuth} />
                    </motion.div>
                  )}
                  
                  {/* Etapa de escaneamento de itens */}
                  {currentStep === 'items' && authenticatedEmployee && (
                    <motion.div
                      key="items"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ItemScanner 
                        employee={authenticatedEmployee} 
                        items={flowItems}
                        onAddItem={handleAddItem}
                        onContinue={nextStep}
                      />
                    </motion.div>
                  )}
                  
                  {/* Etapa de detalhes específicos do fluxo */}
                  {currentStep === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentFlow === 'delivery' && (
                        <QRFlowDelivery
                          employee={authenticatedEmployee!}
                          items={flowItems}
                          onSubmit={handleUpdateDetails}
                          generateDigitalTerm={generateDigitalTerm}
                          setGenerateDigitalTerm={setGenerateDigitalTerm}
                        />
                      )}
                      {currentFlow === 'return' && (
                        <QRFlowReturn
                          employee={authenticatedEmployee!}
                          items={flowItems}
                          onSubmit={handleUpdateDetails}
                        />
                      )}
                      {currentFlow === 'exchange' && (
                        <QRFlowExchange
                          employee={authenticatedEmployee!}
                          items={flowItems}
                          onSubmit={handleUpdateDetails}
                        />
                      )}
                      {currentFlow === 'application' && (
                        <QRFlowApplication
                          employee={authenticatedEmployee!}
                          items={flowItems}
                          onSubmit={handleUpdateDetails}
                        />
                      )}
                    </motion.div>
                  )}
                  
                  {/* Etapa de confirmação */}
                  {currentStep === 'confirm' && (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Resumo do colaborador */}
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Colaborador</h3>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            {authenticatedEmployee?.photo ? (
                              <img src={authenticatedEmployee.photo} alt={authenticatedEmployee.name} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-full w-full p-2 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{authenticatedEmployee?.name}</p>
                            <p className="text-sm text-gray-500">{authenticatedEmployee?.position} - {authenticatedEmployee?.department}</p>
                            <p className="text-xs text-gray-400">Crachá: {authenticatedEmployee?.badge}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Resumo dos itens */}
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Itens ({flowItems.length})</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {flowItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500">Código: {item.code}</p>
                              </div>
                              <div className="text-right">
                                <UIBadge variant="outline">{item.type}</UIBadge>
                                <p className="text-xs text-gray-500 mt-1">Qtd: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Detalhes do fluxo */}
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Detalhes do {getFlowName()}</h3>
                        <div className="space-y-1">
                          {Object.entries(flowDetails).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm text-gray-500">{key}:</span>
                              <span className="text-sm font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Opção de termo digital (apenas para entrega) */}
                      {currentFlow === 'delivery' && (
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <div>
                            <h3 className="font-medium">Termo Digital com Assinatura</h3>
                            <p className="text-sm text-gray-500">Gerar termo para assinatura eletrônica</p>
                          </div>
                          <Switch 
                            checked={generateDigitalTerm} 
                            onCheckedChange={setGenerateDigitalTerm} 
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={previousStep}>
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Voltar
                        </Button>
                        <Button onClick={nextStep}>
                          <Check className="h-4 w-4 mr-2" />
                          Confirmar {getFlowName()}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Etapa de conclusão */}
                  {currentStep === 'complete' && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1
                        }}
                        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                      >
                        <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                      </motion.div>
                      
                      <h2 className="text-2xl font-bold mb-2">Processo Concluído!</h2>
                      <p className="text-gray-500 max-w-md mb-6">
                        O fluxo de {getFlowName().toLowerCase()} foi concluído com sucesso para 
                        {flowItems.length > 1 ? ` ${flowItems.length} itens` : ' 1 item'}.
                      </p>
                      
                      {currentFlow === 'delivery' && generateDigitalTerm && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mb-6 p-4 border border-dashed rounded-lg max-w-md"
                        >
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <FileText className="h-5 w-5 text-brand-blue" />
                            <h3 className="font-medium">Termo Digital Gerado</h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">
                            O termo digital foi gerado e está disponível para assinatura.
                          </p>
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar Termo Digital
                          </Button>
                        </motion.div>
                      )}
                      
                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setCurrentFlow(null)}>
                          Voltar ao Início
                        </Button>
                        <Button onClick={() => startFlow(currentFlow)}>
                          <RotateCw className="h-4 w-4 mr-2" />
                          Novo {getFlowName()}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Painel de Fluxos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-brand-blue" />
                  Fluxos de Trabalho
                </CardTitle>
                <CardDescription>
                  Selecione um dos fluxos abaixo para iniciar o processo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Fluxo de Entrega */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => startFlow('delivery')}
                  >
                    <div className="p-5 bg-gradient-to-r from-brand-blue/90 to-brand-blue/70 text-white">
                      <Truck className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-bold">Entrega</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Registro de entrega de equipamentos, EPIs e outros itens aos colaboradores.
                      </p>
                      <div className="flex items-center justify-end mt-4">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Fluxo de Devolução */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => startFlow('return')}
                  >
                    <div className="p-5 bg-gradient-to-r from-brand-orange/90 to-brand-orange/70 text-white">
                      <RotateCw className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-bold">Devolução</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Processo de devolução de itens pelos colaboradores.
                      </p>
                      <div className="flex items-center justify-end mt-4">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Fluxo de Troca */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => startFlow('exchange')}
                  >
                    <div className="p-5 bg-gradient-to-r from-brand-purple/90 to-brand-purple/70 text-white">
                      <Exchange className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-bold">Troca</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Substituição de itens por novos modelos ou diferentes especificações.
                      </p>
                      <div className="flex items-center justify-end mt-4">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Fluxo de Aplicação */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => startFlow('application')}
                  >
                    <div className="p-5 bg-gradient-to-r from-brand-green/90 to-brand-green/70 text-white">
                      <Package className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-bold">Aplicação</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Registro de aplicação de insumos e materiais em projetos específicos.
                      </p>
                      <div className="flex items-center justify-end mt-4">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Leituras */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-brand-blue" />
                  Histórico de Leituras
                </CardTitle>
                <CardDescription>
                  Registros de códigos escaneados recentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input 
                    placeholder="Buscar no histórico..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                  />
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                    <span>{filteredItems.length} itens encontrados</span>
                    {filteredItems.length > 0 && (
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Exportar
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-none">
                  <AnimatePresence>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 relative group"
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-lg 
                            ${item.status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                              item.status === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 
                              'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}
                          >
                            {item.status === 'success' ? (
                              <Check className="h-5 w-5" />
                            ) : item.status === 'error' ? (
                              <X className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium truncate">{item.content}</h3>
                              <UIBadge variant="outline" className="text-xs py-0 h-5">
                                {item.type === 'qr' ? 'QR' : 'Barcode'}
                              </UIBadge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{item.timestamp}</span>
                            </div>
                          </div>
                          
                          <Dialog>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Detalhes do Item Escaneado</DialogTitle>
                                <DialogDescription>
                                  Informações completas sobre o código escaneado
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                <div className="flex flex-col space-y-1">
                                  <h4 className="text-sm font-medium">Conteúdo</h4>
                                  <p className="text-sm">{item.content}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex flex-col space-y-1">
                                    <h4 className="text-sm font-medium">Tipo</h4>
                                    <p className="text-sm">{item.type === 'qr' ? 'QR Code' : 'Código de Barras'}</p>
                                  </div>
                                  
                                  <div className="flex flex-col space-y-1">
                                    <h4 className="text-sm font-medium">Status</h4>
                                    <div className="flex items-center">
                                      {item.status === 'success' ? (
                                        <UIBadge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">Sucesso</UIBadge>
                                      ) : item.status === 'error' ? (
                                        <UIBadge className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">Erro</UIBadge>
                                      ) : (
                                        <UIBadge className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">Pendente</UIBadge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col space-y-1">
                                  <h4 className="text-sm font-medium">Data e Hora</h4>
                                  <p className="text-sm">{item.timestamp}</p>
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button variant="outline" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Exportar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-8 text-center"
                      >
                        <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-400 dark:text-gray-500">Nenhum resultado encontrado</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {searchQuery ? 'Tente outra busca' : 'Escaneie um código para começar'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LeitorQRPage;
