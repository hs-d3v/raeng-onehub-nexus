
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Wrench, FileText, Calendar, Package2, HardHat, User, Truck, CheckCircle, Trash2, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "maintenance" | "document" | "schedule" | "supply" | "safety" | "employee" | "machine";
  date: Date;
  read: boolean;
  urgent: boolean;
}

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "not001",
      title: "Manutenção Agendada",
      message: "A retroescavadeira (MAQ001) tem manutenção programada para amanhã às 14:00.",
      type: "maintenance",
      date: new Date(new Date().setHours(new Date().getHours() - 2)),
      read: false,
      urgent: false
    },
    {
      id: "not002",
      title: "Estoque Baixo de Cimento",
      message: "O estoque de Cimento Portland está abaixo do nível mínimo. Considere fazer um novo pedido.",
      type: "supply",
      date: new Date(new Date().setHours(new Date().getHours() - 5)),
      read: false,
      urgent: true
    },
    {
      id: "not003",
      title: "Contrato Expirado",
      message: "O contrato CONT-2023-002 (Shopping Center Norte) expira em 3 dias.",
      type: "document",
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      read: true,
      urgent: true
    },
    {
      id: "not004",
      title: "Inspeção de EPIs",
      message: "Lembrete: A inspeção mensal de EPIs está agendada para sexta-feira.",
      type: "safety",
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      read: false,
      urgent: false
    },
    {
      id: "not005",
      title: "Novo Funcionário",
      message: "Pedro Santos foi adicionado como Operador de Máquinas. Atribua EPIs e treinamentos necessários.",
      type: "employee",
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      read: true,
      urgent: false
    },
    {
      id: "not006",
      title: "Máquina em Manutenção",
      message: "A escavadeira (MAQ004) foi enviada para manutenção e ficará indisponível por 3 dias.",
      type: "machine",
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      read: true,
      urgent: false
    },
    {
      id: "not007",
      title: "Reunião de Segurança",
      message: "Reunião mensal de segurança agendada para segunda-feira às 9:00.",
      type: "schedule",
      date: new Date(new Date().setDate(new Date().getDate() - 4)),
      read: true,
      urgent: false
    },
    {
      id: "not008",
      title: "Alerta de Segurança",
      message: "Foram reportadas condições inseguras no Canteiro 2. Vistoria necessária imediatamente.",
      type: "alert",
      date: new Date(new Date().setMinutes(new Date().getMinutes() - 30)),
      read: false,
      urgent: true
    },
  ]);

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "maintenance":
        return <Wrench className="h-5 w-5 text-blue-600" />;
      case "document":
        return <FileText className="h-5 w-5 text-yellow-600" />;
      case "schedule":
        return <Calendar className="h-5 w-5 text-purple-600" />;
      case "supply":
        return <Package2 className="h-5 w-5 text-green-600" />;
      case "safety":
        return <HardHat className="h-5 w-5 text-orange-600" />;
      case "employee":
        return <User className="h-5 w-5 text-brand-blue" />;
      case "machine":
        return <Truck className="h-5 w-5 text-gray-600" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} h atrás`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
    }
    
    return date.toLocaleDateString('pt-BR');
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notificação excluída",
      description: "A notificação foi excluída com sucesso.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Notificações lidas",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram removidas.",
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "urgent") return notification.urgent;
    
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.urgent).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Notificações</h1>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-sm">
              {unreadCount} não lida{unreadCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" /> Marcar Todas Como Lidas
          </Button>
          <Button variant="outline" onClick={clearAllNotifications}>
            <Archive className="mr-2 h-4 w-4" /> Arquivar Todas
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Central de Notificações</CardTitle>
          <CardDescription>
            Gerencie todas as suas notificações e alertas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Bell size={16} />
                <span>Todas</span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>Não Lidas</span>
                {unreadCount > 0 && <Badge variant="secondary" className="ml-1">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="urgent" className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Urgentes</span>
                {urgentCount > 0 && <Badge variant="destructive" className="ml-1">{urgentCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <Wrench size={16} />
                <span>Manutenção</span>
              </TabsTrigger>
              <TabsTrigger value="supply" className="flex items-center gap-2">
                <Package2 size={16} />
                <span>Suprimentos</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start p-4 rounded-lg border ${notification.read ? '' : 'bg-muted/30'} ${notification.urgent ? 'border-red-200' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'font-bold' : ''}`}>
                            {notification.title}
                            {notification.urgent && (
                              <Badge variant="destructive" className="ml-2">Urgente</Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(notification.date)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-foreground/80">
                          {notification.message}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 mt-1 opacity-0 hover:opacity-100 focus:opacity-100" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <h3 className="mt-2 text-lg font-medium">Nenhuma notificação</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Você não tem notificações {activeTab !== 'all' ? 'deste tipo' : ''} no momento.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
