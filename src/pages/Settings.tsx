import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Users, 
  Layers, 
  Key, 
  Building, 
  Mail, 
  Phone, 
  Upload, 
  Save, 
  Languages, 
  Wrench,
  Package2,
  FileText,
  HardHat
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // User Profile State
  const [profile, setProfile] = useState({
    name: "Administrador",
    email: "admin@raeng.com",
    phone: "(11) 99876-5432",
    jobTitle: "Administrador do Sistema",
    department: "TI"
  });
  
  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dailyDigest: false,
    maintenanceAlerts: true,
    stockAlerts: true,
    contractAlerts: true,
    securityAlerts: true
  });
  
  // Company Settings State
  const [companySettings, setCompanySettings] = useState({
    companyName: "RAENG Engenharia",
    address: "Av. Paulista, 1000, São Paulo - SP",
    phone: "(11) 3456-7890",
    email: "contato@raeng.com",
    website: "www.raeng.com",
    taxId: "12.345.678/0001-90"
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };
  
  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
  };
  
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanySettings({
      ...companySettings,
      [e.target.name]: e.target.value
    });
  };
  
  const saveSettings = (settingType: string) => {
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${settingType} foram atualizadas com sucesso.`,
    });
  };
  
  const changePassword = () => {
    toast({
      title: "Link enviado",
      description: "Um link para alterar sua senha foi enviado para o seu e-mail.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building size={16} />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Segurança</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <div className="bg-primary h-20 w-20 flex items-center justify-center rounded-full text-white text-2xl">
                    {profile.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.jobTitle}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Upload className="mr-2 h-4 w-4" /> Alterar Foto
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Cargo</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={profile.jobTitle}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    name="department"
                    value={profile.department}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Preferências de Idioma</Label>
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => saveSettings("perfil")}>
                <Save className="mr-2 h-4 w-4" /> Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>
                Personalize como e quando você recebe notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canais de Notificação</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="emailNotifications">Notificações por Email</Label>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="pushNotifications">Notificações Push</Label>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-newspaper text-muted-foreground">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                        <path d="M18 14h-8"/><path d="M18 18h-8"/><path d="M18 10h-8"/><path d="M18 6h-8"/>
                      </svg>
                      <Label htmlFor="dailyDigest">Resumo Diário</Label>
                    </div>
                    <Switch
                      id="dailyDigest"
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={(checked) => handleNotificationChange("dailyDigest", checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipos de Alertas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="maintenanceAlerts">Alertas de Manutenção</Label>
                    </div>
                    <Switch
                      id="maintenanceAlerts"
                      checked={notificationSettings.maintenanceAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("maintenanceAlerts", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package2 className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="stockAlerts">Alertas de Estoque</Label>
                    </div>
                    <Switch
                      id="stockAlerts"
                      checked={notificationSettings.stockAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("stockAlerts", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="contractAlerts">Alertas de Contratos</Label>
                    </div>
                    <Switch
                      id="contractAlerts"
                      checked={notificationSettings.contractAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("contractAlerts", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardHat className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="securityAlerts">Alertas de Segurança</Label>
                    </div>
                    <Switch
                      id="securityAlerts"
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("securityAlerts", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => saveSettings("notificações")}>
                <Save className="mr-2 h-4 w-4" /> Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Gerencie os dados da sua empresa e configurações organizacionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={companySettings.companyName}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">CNPJ</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      value={companySettings.taxId}
                      onChange={handleCompanyChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    name="address"
                    value={companySettings.address}
                    onChange={handleCompanyChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Telefone</Label>
                    <Input
                      id="companyPhone"
                      name="phone"
                      value={companySettings.phone}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      name="email"
                      value={companySettings.email}
                      onChange={handleCompanyChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={companySettings.website}
                    onChange={handleCompanyChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Logo da Empresa</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-32 flex items-center justify-center bg-muted rounded-md">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Carregar Logo
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Departamentos</h3>
                <div className="rounded-md border">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Gerenciar Departamentos</h4>
                      <p className="text-sm text-muted-foreground">Configure os departamentos da sua organização</p>
                    </div>
                    <Button variant="outline">
                      <Users className="mr-2 h-4 w-4" /> Editar Departamentos
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => saveSettings("empresa")}>
                <Save className="mr-2 h-4 w-4" /> Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Gerencie as configurações de segurança e controle de acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alterar Senha</h3>
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <p className="text-sm">
                      Altere sua senha para manter sua conta segura. Recomendamos usar uma senha forte e única.
                    </p>
                    <Button onClick={changePassword}>
                      <Key className="mr-2 h-4 w-4" /> Alterar Senha
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Autenticação de Dois Fatores</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Ativar Autenticação de Dois Fatores</div>
                      <div className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </div>
                    </div>
                    <Button variant="outline">Configurar 2FA</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gerenciamento de Usuários e Permissões</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Controle de Acesso</div>
                      <div className="text-sm text-muted-foreground">
                        Gerenciar usuários e suas permissões no sistema
                      </div>
                    </div>
                    <Button variant="outline">
                      <Layers className="mr-2 h-4 w-4" /> Gerenciar Acessos
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Logs de Atividade</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Histórico de Atividades</div>
                      <div className="text-sm text-muted-foreground">
                        Visualize registros de atividades e ações no sistema
                      </div>
                    </div>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> Ver Logs
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => saveSettings("segurança")}>
                <Save className="mr-2 h-4 w-4" /> Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
