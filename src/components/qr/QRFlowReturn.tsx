
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

interface QRFlowReturnProps {
  employee: Employee;
  items: FlowItem[];
  onSubmit: (details: Record<string, any>) => void;
}

const QRFlowReturn: React.FC<QRFlowReturnProps> = ({ employee, items, onSubmit }) => {
  const [selectedState, setSelectedState] = useState('');
  const [observations, setObservations] = useState('');

  const returnStates = [
    'Devolução em perfeito estado',
    'Desgaste normal pelo uso',
    'Danificado durante operação',
    'Perdido em campo',
    'Defeito de fabricação identificado',
    'EPI com CA vencido',
    'Kit incompleto na devolução',
    'Item contaminado (químico/biológico)',
    'Substituição por modelo superior',
    'Devolução por término de contrato',
    'Item não utilizado (devolução integral)',
    'Danificado no transporte'
  ];

  const handleSubmit = () => {
    // Enviar detalhes da devolução
    onSubmit({
      'Estado': selectedState || 'Não informado',
      'Observações': observations || 'Nenhuma observação',
      'Registro': 'Automático',
      'Data/Hora': new Date().toLocaleString('pt-BR'),
      'Usuário': employee.name
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Seleção do estado de devolução */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Estado de Devolução</h3>
        <div className="max-h-60 overflow-y-auto pr-2 space-y-1">
          <RadioGroup value={selectedState} onValueChange={setSelectedState}>
            {returnStates.map((state) => (
              <div key={state} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
                <RadioGroupItem value={state} id={`state-${state}`} />
                <Label htmlFor={`state-${state}`} className="cursor-pointer w-full">
                  {state}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-medium">Observações</h3>
          <Textarea 
            placeholder="Informe observações relevantes sobre a devolução..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handleSubmit} disabled={!selectedState}>
          Prosseguir
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default QRFlowReturn;
