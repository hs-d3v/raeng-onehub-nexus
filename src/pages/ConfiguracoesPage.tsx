
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TermEditor from '@/components/configuracoes/TermEditor';
import UserManagement from '@/components/configuracoes/UserManagement';
import CustomFields from '@/components/configuracoes/CustomFields';
import IntegrationSettings from '@/components/configuracoes/IntegrationSettings';
import SystemLogs from '@/components/configuracoes/SystemLogs';
import PredefinedRegisters from '@/components/configuracoes/PredefinedRegisters';

const ConfiguracoesPage = () => {
  return <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Configurações do Sistema</h1>
        
        <Tabs defaultValue="geral">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="personalizacoes">Personalizações</TabsTrigger>
            <TabsTrigger value="integracoes">Integrações</TabsTrigger>
            <TabsTrigger value="termos">Termos Digitais</TabsTrigger>
            <TabsTrigger value="cadastros">Cadastros Pré-definidos</TabsTrigger>
            <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="qrcode">QR Code & Biometria</TabsTrigger>
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
          
          <TabsContent value="usuarios">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="personalizacoes">
            <CustomFields />
          </TabsContent>
          
          <TabsContent value="integracoes">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="termos">
            <TermEditor />
          </TabsContent>
          
          <TabsContent value="cadastros">
            <PredefinedRegisters />
          </TabsContent>
          
          <TabsContent value="logs">
            <SystemLogs />
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
            <div className="grid gap-6 md:grid-cols-2 py-[32px]">
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

          <TabsContent value="qrcode">
            <div className="grid gap-6 md:grid-cols-2 py-[32px]">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de QR Code</CardTitle>
                  <CardDescription>
                    Personalize as opções de geração e leitura de QR Code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr-correction-level">Nível de Correção de Erros</Label>
                    <Select defaultValue="H">
                      <SelectTrigger id="qr-correction-level">
                        <SelectValue placeholder="Selecione o nível de correção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Baixo (7%)</SelectItem>
                        <SelectItem value="M">Médio (15%)</SelectItem>
                        <SelectItem value="Q">Quartil (25%)</SelectItem>
                        <SelectItem value="H">Alto (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Níveis mais altos fornecem maior tolerância a danos, mas geram códigos mais densos.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qr-format">Formato da Codificação</Label>
                    <Select defaultValue="json">
                      <SelectTrigger id="qr-format">
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON (Estruturado)</SelectItem>
                        <SelectItem value="encrypted">JSON Criptografado</SelectItem>
                        <SelectItem value="plain">Texto Simples</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Incluir Timestamp</Label>
                      <p className="text-sm text-gray-500">Adicionar data/hora de geração no QR</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Incluir Logo</Label>
                      <p className="text-sm text-gray-500">Inserir logo da empresa no centro do QR</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>QR Code Dinâmico</Label>
                      <p className="text-sm text-gray-500">Permitir atualização remota do conteúdo</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button className="w-full">Salvar Configurações</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Biometria</CardTitle>
                  <CardDescription>
                    Configure as opções de reconhecimento facial e digital
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="facial-confidence">Sensibilidade do Reconhecimento Facial</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="facial-confidence">
                        <SelectValue placeholder="Selecione a sensibilidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa (Mais inclusivo, menos seguro)</SelectItem>
                        <SelectItem value="medium">Média (Balanceado)</SelectItem>
                        <SelectItem value="high">Alta (Mais restritivo, mais seguro)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="digital-quality">Qualidade da Impressão Digital</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="digital-quality">
                        <SelectValue placeholder="Selecione a qualidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa (Maior aceitação)</SelectItem>
                        <SelectItem value="medium">Média (Balanceado)</SelectItem>
                        <SelectItem value="high">Alta (Maior precisão)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Verificação de vida</Label>
                      <p className="text-sm text-gray-500">Detectar se é um rosto real vs. foto</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-gray-500">Exigir QR + biometria para acesso crítico</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Registro de Presença</Label>
                      <p className="text-sm text-gray-500">Usar biometria para registrar ponto</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="biometric-models">Modelos Biométricos</Label>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Reconhecimento Facial</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Instalado</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Impressão Digital</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Instalado</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Salvar Configurações</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>;
};

export default ConfiguracoesPage;
