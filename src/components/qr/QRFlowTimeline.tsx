
import React from 'react';
import { motion } from 'framer-motion';
import { Check, User, Package, FileText, Check as CheckIcon, Repeat2 as Exchange } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type FlowStep = 'auth' | 'items' | 'details' | 'confirm' | 'complete';
type FlowType = 'delivery' | 'return' | 'exchange' | 'application' | null;

interface QRFlowTimelineProps {
  currentStep: FlowStep;
  flowType: FlowType;
}

const QRFlowTimeline: React.FC<QRFlowTimelineProps> = ({ currentStep, flowType }) => {
  // Access auth context to potentially customize the flow based on user role
  const { user } = useAuth();
  
  // Definir cores com base no tipo de fluxo
  const getFlowColor = (): string => {
    switch (flowType) {
      case 'delivery':
        return 'rgb(37, 99, 235)'; // blue
      case 'return':
        return 'rgb(234, 88, 12)'; // orange
      case 'exchange':
        return 'rgb(124, 58, 237)'; // purple
      case 'application':
        return 'rgb(22, 163, 74)'; // green
      default:
        return 'rgb(107, 114, 128)'; // gray
    }
  };

  // Ordem das etapas do fluxo
  const steps: FlowStep[] = ['auth', 'items', 'details', 'confirm', 'complete'];
  
  // Informações para cada etapa
  const stepInfo: Record<FlowStep, { label: string; icon: React.ElementType }> = {
    auth: { label: 'Autenticação', icon: User },
    items: { label: 'Itens', icon: Package },
    details: { label: 'Detalhes', icon: FileText },
    confirm: { label: 'Confirmação', icon: CheckIcon },
    complete: { label: 'Concluído', icon: Check }
  };

  // Verificar se a etapa está completa
  const isStepComplete = (step: FlowStep): boolean => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    return stepIndex < currentIndex;
  };

  // Verificar se a etapa está ativa
  const isStepActive = (step: FlowStep): boolean => {
    return step === currentStep;
  };
  
  // Cor do fluxo
  const flowColor = getFlowColor();
  
  return (
    <div className="flex justify-between items-center py-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* Etapa */}
          <motion.div 
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isStepComplete(step) 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : isStepActive(step) 
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
              }`}
              style={isStepActive(step) ? { color: flowColor } : {}}
              animate={isStepActive(step) ? {
                scale: [1, 1.05, 1],
                transition: { repeat: Infinity, duration: 2 }
              } : {}}
            >
              {isStepComplete(step) ? (
                <Check className="h-5 w-5" />
              ) : (
                React.createElement(stepInfo[step].icon, { className: "h-5 w-5" })
              )}
            </motion.div>
            <span className="text-xs mt-2 text-center hidden sm:block">
              {stepInfo[step].label}
            </span>
          </motion.div>
          
          {/* Linha de conexão */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-2">
              <div className="h-0.5 bg-gray-200 dark:bg-gray-700 relative">
                {isStepComplete(step) && (
                  <motion.div 
                    className="h-full bg-green-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QRFlowTimeline;
