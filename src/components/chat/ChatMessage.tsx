
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Copy, MoreVertical, Trash } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  content: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  avatar?: string;
  status?: 'sent' | 'delivered' | 'read' | 'pending';
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  sender,
  timestamp,
  isCurrentUser,
  avatar,
  status = 'read'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Mensagem copiada!",
      description: "Texto copiado para a área de transferência",
    });
  };

  const deleteMessage = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A exclusão de mensagens será implementada em breve",
    });
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <div className="flex"><Check size={14} className="text-gray-400" /><Check size={14} className="text-gray-400 -ml-1" /></div>;
      case 'read':
        return <div className="flex"><Check size={14} className="text-brand-blue" /><Check size={14} className="text-brand-blue -ml-1" /></div>;
      case 'pending':
      default:
        return <Clock size={14} className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 mb-4 group relative",
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={avatar || "/placeholder.svg"} />
        <AvatarFallback>{sender.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col max-w-[70%]",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        <motion.div 
          className={cn(
            "rounded-lg p-3 relative",
            isCurrentUser 
              ? "bg-brand-blue text-white" 
              : "bg-gray-100 dark:bg-gray-800"
          )}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <p className="text-sm font-medium mb-1">{sender}</p>
          <p className="text-sm whitespace-pre-line">{content}</p>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute ${isCurrentUser ? 'left-0' : 'right-0'} top-0 -translate-y-1/2 ${isCurrentUser ? '-translate-x-full' : 'translate-x-full'} bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center p-0.5 gap-1`}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600" 
                  onClick={copyToClipboard}
                >
                  <Copy size={14} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <MoreVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isCurrentUser ? "start" : "end"}>
                    <DropdownMenuItem onClick={copyToClipboard}>
                      <Copy size={14} className="mr-2" />
                      Copiar mensagem
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteMessage}>
                      <Trash size={14} className="mr-2" />
                      Apagar mensagem
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">{timestamp}</span>
          {isCurrentUser && (
            <span className="flex items-center">
              {getStatusIcon()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
