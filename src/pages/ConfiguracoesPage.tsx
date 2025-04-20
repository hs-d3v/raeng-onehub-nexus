
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TermEditor from '@/components/configuracoes/TermEditor';

const ConfiguracoesPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Configurações do Sistema</h1>
        
        <Tabs defaultValue="geral">
          <TabsList className="mb-6">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="termos">Termos Digitais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Empresa</CardTitle>
                  <CardDescription>
                    Configure as informações básicas da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" defaultValue="RAENG Engenharia" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-cnpj">CNPJ</Label>
                    <Input id="company-cnpj" defaultValue="12.345.678/0001-90" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Endereço</Label>
                    <Input id="company-address" defaultValue="Av. Brasil, 1000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-city">Cidade</Label>
                      <Input id="company-city" defaultValue="São Paulo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-state">Estado</Label>
                      <Input id="company-state" defaultValue="SP" />
                    </div>
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>
                    Configure os parâmetros gerais do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma do Sistema</Label>
                    <Select defaultValue="pt-BR">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (United States)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select defaultValue="America/Sao_Paulo">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Selecione o fuso horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Formato de Data</Label>
                    <Select defaultValue="DD/MM/YYYY">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Selecione o formato de data" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Registros de Auditoria</Label>
                        <p className="text-sm text-gray-500">Habilitar logs detalhados de atividades</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Button className="w-full">Salvar Alterações</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notificacoes">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Notificações</CardTitle>
                  <CardDescription>
                    Defina quais notificações você deseja receber
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-gray-500">Receber notificações por e-mail</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações no Sistema</Label>
                      <p className="text-sm text-gray-500">Exibir notificações no sistema</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de Estoque</Label>
                      <p className="text-sm text-gray-500">Notificar quando o estoque estiver baixo</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de Validade</Label>
                      <p className="text-sm text-gray-500">Notificar quando itens estiverem próximos do vencimento</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resumo Semanal</Label>
                      <p className="text-sm text-gray-500">Receber resumo semanal das atividades</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Button className="w-full">Salvar Configurações</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="aparencia">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tema e Aparência</CardTitle>
                  <CardDescription>
                    Personalize a aparência do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select defaultValue="system">
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Selecione o tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema (Automático)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Cor Primária</Label>
                    <Select defaultValue="blue">
                      <SelectTrigger id="primary-color">
                        <SelectValue placeholder="Selecione a cor primária" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Azul</SelectItem>
                        <SelectItem value="green">Verde</SelectItem>
                        <SelectItem value="purple">Roxo</SelectItem>
                        <SelectItem value="orange">Laranja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Tamanho da Fonte</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="font-size">
                        <SelectValue placeholder="Selecione o tamanho da fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animações</Label>
                      <p className="text-sm text-gray-500">Habilitar animações na interface</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button className="w-full">Aplicar Tema</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personalização do Dashboard</CardTitle>
                  <CardDescription>
                    Personalize a exibição do seu dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-view">Visualização Padrão</Label>
                    <Select defaultValue="cards">
                      <SelectTrigger id="default-view">
                        <SelectValue placeholder="Selecione a visualização padrão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cards">Cards</SelectItem>
                        <SelectItem value="list">Lista</SelectItem>
                        <SelectItem value="grid">Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mostrar Gráficos</Label>
                      <p className="text-sm text-gray-500">Exibir gráficos no dashboard</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mostrar Alertas</Label>
                      <p className="text-sm text-gray-500">Exibir alertas no dashboard</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mostrar Atividade Recente</Label>
                      <p className="text-sm text-gray-500">Exibir atividades recentes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button className="w-full">Salvar Preferências</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="termos">
            <TermEditor />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ConfiguracoesPage;
