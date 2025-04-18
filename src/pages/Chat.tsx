
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Sistema",
      content: "Bem-vindo ao chat do RAENG OneHub! Como posso ajudar hoje?",
      timestamp: new Date(),
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "Você",
      content: newMessage,
      timestamp: new Date(),
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const systemResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "Sistema",
        content: "Obrigado pelo seu contato. Um de nossos atendentes irá responder em breve.",
        timestamp: new Date(),
        isUser: false,
      };
      
      setMessages((prev) => [...prev, systemResponse]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const startNewConversation = () => {
    toast({
      title: "Nova conversa iniciada",
      description: "Sua conversa anterior foi salva no histórico.",
    });
    
    setMessages([
      {
        id: Date.now().toString(),
        sender: "Sistema",
        content: "Nova conversa iniciada. Como posso ajudar?",
        timestamp: new Date(),
        isUser: false,
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat de Suporte</h1>
        <Button onClick={startNewConversation} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Nova Conversa
        </Button>
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle>Conversa atual</CardTitle>
          <CardDescription>
            Use este chat para se comunicar com a equipe de suporte
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="flex flex-col gap-4 p-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <div className={`bg-${message.isUser ? "primary" : "muted"} h-8 w-8 flex items-center justify-center rounded-full text-white`}>
                        {message.isUser ? "V" : "S"}
                      </div>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{message.sender}</div>
                      <div className="mt-1">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter>
          <div className="flex w-full gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;
