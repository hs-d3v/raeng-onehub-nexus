
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Signature, FileText } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface Employee {
  id: string;
  name: string;
  badge: string;
  department: string;
  position: string;
  photo?: string;
}

interface FlowItem {
  id: string;
  name: string;
  code: string;
  type: string;
  quantity: number;
}

interface QRFlowDeliveryProps {
  employee: Employee;
  items: FlowItem[];
  onSubmit: (details: Record<string, any>) => void;
  generateDigitalTerm: boolean;
  setGenerateDigitalTerm: React.Dispatch<React.SetStateAction<boolean>>;
}

const QRFlowDelivery: React.FC<QRFlowDeliveryProps> = ({ 
  employee, 
  items, 
  onSubmit,
  generateDigitalTerm,
  setGenerateDigitalTerm
}) => {
  const [observations, setObservations] = useState('');

  const handleSubmit = () => {
    // Enviar detalhes da entrega
    onSubmit({
      'Observações': observations || 'Nenhuma observação',
      'Registro': 'Automático',
      'Data/Hora': new Date().toLocaleString('pt-BR'),
      'Usuário': employee.name,
      'Termo Digital': generateDigitalTerm ? 'Habilitado' : 'Desabilitado'
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Informações da entrega */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Observações</h3>
          <Textarea 
            placeholder="Informe observações relevantes sobre a entrega..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        {/* Opção de termo digital */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-brand-blue mt-0.5" />
            <div>
              <h3 className="font-medium">Termo Digital com Assinatura</h3>
              <p className="text-sm text-gray-500">
                Ao habilitar esta opção, um termo digital será gerado para assinatura eletrônica do colaborador.
              </p>
            </div>
          </div>
          <Switch 
            checked={generateDigitalTerm} 
            onCheckedChange={setGenerateDigitalTerm} 
          />
        </div>
        
        {/* Previsualização do termo */}
        {generateDigitalTerm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border border-dashed rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center gap-2">
                <Signature className="h-4 w-4 text-brand-blue" />
                Previsualização do Termo
              </h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded border text-sm">
              <p className="text-center font-bold mb-4">TERMO DE ENTREGA DE EQUIPAMENTOS</p>
              <p className="mb-2">
                Eu, <span className="font-medium">{employee.name}</span>, portador do crachá 
                <span className="font-medium"> {employee.badge}</span>, declaro ter recebido 
                os itens abaixo relacionados em perfeitas condições de uso:
              </p>
              <ul className="list-disc list-inside mb-4">
                {items.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.code} (Qtd: {item.quantity})
                  </li>
                ))}
              </ul>
              <p className="mb-4">
                Comprometo-me a zelar pela conservação do(s) item(ns), utilizando-o(s) exclusivamente para fins profissionais 
                e a devolvê-lo(s) quando solicitado ou ao término do contrato de trabalho.
              </p>
              <div className="text-center mt-8">
                <p>____________________________________</p>
                <p>{employee.name}</p>
                <p className="text-xs text-gray-500">Assinatura Digital</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Botões de ação */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handleSubmit}>
          Prosseguir
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default QRFlowDelivery;
