
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Paperclip, 
  Send, 
  Smile, 
  Mic, 
  Image, 
  X, 
  File
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      // Em uma implementação real, aqui enviaríamos também os arquivos
      onSendMessage(message);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Gravação finalizada",
        description: "Função de gravação em desenvolvimento",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Gravando áudio",
        description: "Função de gravação em desenvolvimento",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
      
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const attachmentOptions = [
    { icon: <Image size={18} />, label: 'Imagem', onClick: () => fileInputRef.current?.click(), accept: 'image/*' },
    { icon: <File size={18} />, label: 'Documento', onClick: () => fileInputRef.current?.click(), accept: '.pdf,.doc,.docx,.xls,.xlsx' },
  ];

  return (
    <div className="border-t bg-white dark:bg-gray-900">
      {/* Área de anexos */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2 p-2 border-b border-gray-200 dark:border-gray-700"
          >
            {attachments.map((file, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                {file.type.includes('image') ? (
                  <Image size={14} className="text-brand-blue" />
                ) : (
                  <File size={14} className="text-brand-orange" />
                )}
                <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" 
                  onClick={() => removeAttachment(index)}
                >
                  <X size={12} />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 relative">
        {/* Input para seleção de arquivos (invisível) */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload}
          accept={showAttachMenu ? attachmentOptions.find(opt => opt.label === 'Imagem')?.accept : undefined}
          multiple
        />
        
        {/* Menu de anexos */}
        <AnimatePresence>
          {showAttachMenu && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-16 left-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 px-1 border border-gray-200 dark:border-gray-700"
            >
              {attachmentOptions.map((option, index) => (
                <motion.button
                  key={index}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={option.onClick}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-9 w-9"
                type="button"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Anexar arquivos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..." 
          className="flex-1 h-9 rounded-full"
        />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-9 w-9"
                type="button"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Emojis</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={isRecording ? "default" : "outline"}
                size="icon" 
                className={`rounded-full h-9 w-9 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                type="button"
                onClick={toggleRecording}
              >
                <Mic className="h-5 w-5" />
                {isRecording && (
                  <motion.span 
                    className="absolute inset-0 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRecording ? 'Parar gravação' : 'Gravar áudio'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            type="submit"
            size="icon" 
            className="rounded-full h-9 w-9 bg-brand-blue hover:bg-brand-blue/90"
            disabled={!message.trim() && attachments.length === 0}
          >
            <Send className="h-5 w-5" />
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default ChatInput;
