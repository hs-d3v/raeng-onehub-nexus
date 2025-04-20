
import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Phone, Video, MoreVertical, Users, Star, Pin, Filter, ChevronDown, Check, Paperclip, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Tipo para uma mensagem
interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  avatar?: string;
  status?: 'sent' | 'delivered' | 'read' | 'pending';
}

// Tipo para um contato
interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  status?: 'online' | 'offline' | 'away';
  unreadCount?: number;
  isPinned?: boolean;
  isGroup?: boolean;
}

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Equipe de Manutenção',
      avatar: '/placeholder.svg',
      lastMessage: 'Já verificamos o equipamento, vamos fazer o reparo hoje.',
      time: '08:45',
      status: 'online',
      unreadCount: 3,
      isGroup: true
    },
    {
      id: '2',
      name: 'João Silva',
      avatar: '/placeholder.svg',
      lastMessage: 'Ok, entendi. Vou verificar e te retorno.',
      time: 'Ontem',
      status: 'offline',
      isPinned: true
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      avatar: '/placeholder.svg',
      lastMessage: 'Preciso dos relatórios de EPIs atualizados para amanhã.',
      time: 'Ontem',
      status: 'away',
      unreadCount: 1
    },
    {
      id: '4',
      name: 'Carlos Mendes',
      avatar: '/placeholder.svg',
      lastMessage: 'Já adicionei as novas ferramentas no sistema.',
      time: '16/04',
      status: 'online'
    },
    {
      id: '5',
      name: 'Suporte Técnico',
      lastMessage: 'Como podemos ajudar com o sistema hoje?',
      time: '15/04',
      status: 'offline',
      isGroup: true
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Carregar mensagens quando um contato é selecionado
  useEffect(() => {
    if (selectedContact) {
      // Simulação de mensagens para o contato selecionado
      const newMessages: Message[] = [
        {
          id: '1',
          content: `Olá! Como posso ajudar com relação a ${selectedContact.isGroup ? 'equipe' : 'suas tarefas'}?`,
          sender: 'Você',
          timestamp: '10:30',
          isCurrentUser: true,
          status: 'read'
        },
        {
          id: '2',
          content: `Bom dia! Precisamos discutir sobre os novos procedimentos de segurança.`,
          sender: selectedContact.name,
          timestamp: '10:32',
          isCurrentUser: false,
          avatar: selectedContact.avatar
        },
        {
          id: '3',
          content: 'Claro! Quais aspectos específicos você gostaria de abordar?',
          sender: 'Você',
          timestamp: '10:35',
          isCurrentUser: true,
          status: 'read'
        },
        {
          id: '4',
          content: 'Principalmente sobre os novos EPIs que foram adquiridos e como vamos implementar o treinamento para a equipe.',
          sender: selectedContact.name,
          timestamp: '10:40',
          isCurrentUser: false,
          avatar: selectedContact.avatar
        }
      ];
      
      setMessages(newMessages);
    } else {
      setMessages([]);
    }
  }, [selectedContact]);
  
  // Rolar para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Filtrar contatos com base na busca
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Ordenar contatos (fixados primeiro, depois por data)
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
  
  // Enviar nova mensagem
  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'Você',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simular resposta após um tempo
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Recebido. ${Math.random() > 0.5 ? 'Vamos analisar sua mensagem.' : 'Obrigado pelo contato.'}`,
        sender: selectedContact.name,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false,
        avatar: selectedContact.avatar
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex h-full">
            {/* Lista de contatos */}
            <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Buscar contatos..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="all" className="px-3 pt-3">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Não lidos</TabsTrigger>
                  <TabsTrigger value="groups" className="flex-1">Grupos</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-500">
                <span>Recentes</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                  <Filter className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {sortedContacts.length > 0 ? (
                    sortedContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                        className={`p-3 cursor-pointer relative group ${selectedContact?.id === contact.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              {contact.isGroup ? (
                                <div className="bg-brand-blue text-white h-full w-full flex items-center justify-center">
                                  <Users className="h-6 w-6" />
                                </div>
                              ) : (
                                <>
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </>
                              )}
                            </Avatar>
                            {contact.status === 'online' && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                            )}
                            {contact.status === 'away' && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                              <div className="flex items-center">
                                {contact.isPinned && (
                                  <Pin className="h-3 w-3 text-brand-blue mr-1" />
                                )}
                                <span className="text-xs text-gray-500">{contact.time}</span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                          </div>
                        </div>
                        
                        {contact.unreadCount && (
                          <Badge className="absolute right-3 bottom-3 bg-brand-blue hover:bg-brand-blue/90">{contact.unreadCount}</Badge>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-8 px-4 text-center"
                    >
                      <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-gray-400 dark:text-gray-500">Nenhum contato encontrado</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {searchQuery ? 'Tente outra busca' : 'Adicione um contato para começar'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Área de chat */}
            <div className="hidden md:flex flex-col flex-1 h-full">
              {selectedContact ? (
                <>
                  {/* Cabeçalho do chat */}
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {selectedContact.isGroup ? (
                          <div className="bg-brand-blue text-white h-full w-full flex items-center justify-center">
                            <Users className="h-5 w-5" />
                          </div>
                        ) : (
                          <>
                            <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{selectedContact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      
                      <div>
                        <h2 className="font-medium">{selectedContact.name}</h2>
                        <div className="flex items-center text-xs text-gray-500">
                          {selectedContact.status === 'online' ? (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              Online
                            </span>
                          ) : selectedContact.status === 'away' ? (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                              Ausente
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                              Offline
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Search className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Paperclip className="mr-2 h-4 w-4" />
                            Arquivos compartilhados
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Star className="mr-2 h-4 w-4" />
                            Marcar como favorito
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Pin className="mr-2 h-4 w-4" />
                            Fixar conversa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-500">
                            <Clock className="mr-2 h-4 w-4" />
                            Arquivar conversa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <ChatMessage
                          key={message.id}
                          content={message.content}
                          sender={message.sender}
                          timestamp={message.timestamp}
                          isCurrentUser={message.isCurrentUser}
                          avatar={message.avatar}
                          status={message.status}
                        />
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input de mensagem */}
                  <ChatInput onSendMessage={handleSendMessage} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                  >
                    <MessageSquare className="h-16 w-16 text-brand-blue/30 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Bem-vindo ao Chat</h2>
                    <p className="text-gray-500 mb-6">Selecione um contato para iniciar uma conversa ou continue um chat existente.</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="flex flex-col items-center justify-center p-4">
                          <User className="h-8 w-8 text-brand-blue mb-2" />
                          <h3 className="font-medium">Novo contato</h3>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="flex flex-col items-center justify-center p-4">
                          <Users className="h-8 w-8 text-brand-green mb-2" />
                          <h3 className="font-medium">Novo grupo</h3>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Versão mobile - sem chat selecionado */}
            <div className="flex flex-col flex-1 h-full md:hidden items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <MessageSquare className="h-16 w-16 text-brand-blue/30 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Chat RAENG SafeHub</h2>
                <p className="text-gray-500 mb-6">Selecione um contato para iniciar uma conversa.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;

function MessageSquare(props: { className: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
