
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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

interface QRFlowApplicationProps {
  employee: Employee;
  items: FlowItem[];
  onSubmit: (details: Record<string, any>) => void;
}

const QRFlowApplication: React.FC<QRFlowApplicationProps> = ({ employee, items, onSubmit }) => {
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [observations, setObservations] = useState('');

  const handleSubmit = () => {
    // Enviar detalhes da aplicação
    onSubmit({
      'Local': location || 'Não informado',
      'Motivo': reason || 'Não informado',
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
      {/* Formulário de aplicação */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Local de Aplicação</h3>
          <Input 
            placeholder="Informe o local onde os itens serão aplicados..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Motivo da Aplicação</h3>
          <Input 
            placeholder="Informe o motivo da aplicação dos itens..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Observações</h3>
          <Textarea 
            placeholder="Informe observações relevantes sobre a aplicação..."
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
        <Button onClick={handleSubmit} disabled={!location || !reason}>
          Prosseguir
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default QRFlowApplication;
