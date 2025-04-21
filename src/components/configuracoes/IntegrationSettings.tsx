
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const IntegrationSettings = () => {
  const [selectedTab, setSelectedTab] = useState("erp");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações do Sistema</CardTitle>
          <CardDescription>
            Configure integrações com sistemas externos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="erp">Sistema ERP</TabsTrigger>
              <TabsTrigger value="ponto">Ponto Eletrônico</TabsTrigger>
              <TabsTrigger value="email">E-mail</TabsTrigger>
              <TabsTrigger value="sso">Single Sign-On (SSO)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="erp">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Integração com ERP</h3>
                      <p className="text-sm text-gray-500">Conecte seu sistema ERP para sincronização de dados</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="erp-type">Sistema ERP</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o sistema ERP" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sap">SAP</SelectItem>
                            <SelectItem value="oracle">Oracle</SelectItem>
                            <SelectItem value="totvs">TOTVS</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="erp-url">URL da API</Label>
                        <Input id="erp-url" placeholder="https://" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="erp-key">Chave da API</Label>
                        <Input id="erp-key" type="password" />
                      </div>
                      
                      <Button>Testar Conexão</Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Sincronização de Dados</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-colab">Colaboradores</Label>
                          <Switch id="sync-colab" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-assets">Ativos</Label>
                          <Switch id="sync-assets" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-inventory">Inventário</Label>
                          <Switch id="sync-inventory" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-contracts">Contratos</Label>
                          <Switch id="sync-contracts" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sync-frequency">Frequência de Sincronização</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="sync-frequency">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">A cada hora</SelectItem>
                            <SelectItem value="daily">Diariamente</SelectItem>
                            <SelectItem value="weekly">Semanalmente</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button>Salvar Configurações</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ponto">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Integração com Ponto Eletrônico</h3>
                      <p className="text-sm text-gray-500">Conecte seu sistema de ponto eletrônico</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ponto-provider">Fornecedor</Label>
                        <Select>
                          <SelectTrigger id="ponto-provider">
                            <SelectValue placeholder="Selecione o fornecedor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dimep">Dimep</SelectItem>
                            <SelectItem value="madis">Madis</SelectItem>
                            <SelectItem value="henry">Henry</SelectItem>
                            <SelectItem value="secullum">Secullum</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ponto-url">URL da API</Label>
                        <Input id="ponto-url" placeholder="https://" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ponto-user">Usuário</Label>
                        <Input id="ponto-user" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ponto-pass">Senha</Label>
                        <Input id="ponto-pass" type="password" />
                      </div>
                      
                      <Button>Testar Conexão</Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Sincronização</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-entries">Registros de Ponto</Label>
                          <Switch id="sync-entries" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-absences">Ausências</Label>
                          <Switch id="sync-absences" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-holidays">Feriados</Label>
                          <Switch id="sync-holidays" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-schedules">Escalas</Label>
                          <Switch id="sync-schedules" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sync-time">Horário de Sincronização</Label>
                        <Input id="sync-time" type="time" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button>Salvar Configurações</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="email">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Configuração de E-mail</h3>
                      <p className="text-sm text-gray-500">Configure o servidor de e-mail para envio de notificações</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-server">Servidor SMTP</Label>
                        <Input id="smtp-server" placeholder="smtp.example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">Porta</Label>
                        <Input id="smtp-port" placeholder="587" />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="smtp-user">Usuário</Label>
                          <Input id="smtp-user" placeholder="user@example.com" />
                        </div>
                        
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="smtp-pass">Senha</Label>
                          <Input id="smtp-pass" type="password" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="use-ssl" />
                          <Label htmlFor="use-ssl">Usar SSL</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="use-tls" />
                          <Label htmlFor="use-tls">Usar TLS</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="from-email">E-mail de Origem</Label>
                        <Input id="from-email" placeholder="noreply@raeng.com.br" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="from-name">Nome de Exibição</Label>
                        <Input id="from-name" placeholder="Sistema OneHUB" />
                      </div>
                      
                      <Button>Testar Configurações</Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Modelos de E-mail</h4>
                      
                      <div className="border rounded-md p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Vencimento de EPI</span>
                          <Button variant="outline" size="sm">Editar</Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Novo Usuário</span>
                          <Button variant="outline" size="sm">Editar</Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Reset de Senha</span>
                          <Button variant="outline" size="sm">Editar</Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Manutenção Programada</span>
                          <Button variant="outline" size="sm">Editar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button>Salvar Configurações</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sso">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Configuração de SSO</h3>
                      <p className="text-sm text-gray-500">Configure autenticação única com provedores externos</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sso-provider">Provedor SSO</Label>
                        <Select>
                          <SelectTrigger id="sso-provider">
                            <SelectValue placeholder="Selecione o provedor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Workspace</SelectItem>
                            <SelectItem value="microsoft">Microsoft Azure AD</SelectItem>
                            <SelectItem value="okta">Okta</SelectItem>
                            <SelectItem value="onelogin">OneLogin</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-id">Client ID</Label>
                        <Input id="client-id" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="client-secret">Client Secret</Label>
                        <Input id="client-secret" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="redirect-uri">URI de Redirecionamento</Label>
                        <Input id="redirect-uri" placeholder="https://seu-dominio.com/auth/callback" />
                      </div>
                      
                      <Button>Testar Integração SSO</Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Opções Avançadas</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auto-provision">Auto-provisionamento de Usuários</Label>
                            <p className="text-xs text-gray-500">Criar automaticamente usuários na primeira autenticação</p>
                          </div>
                          <Switch id="auto-provision" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="force-sso">Forçar SSO</Label>
                            <p className="text-xs text-gray-500">Desabilitar login com usuário/senha</p>
                          </div>
                          <Switch id="force-sso" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="sync-roles">Sincronizar Funções</Label>
                            <p className="text-xs text-gray-500">Sincronizar funções de usuário do provedor SSO</p>
                          </div>
                          <Switch id="sync-roles" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="logout-url">URL de Logout</Label>
                        <Input id="logout-url" placeholder="https://provedor-sso.com/logout" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button>Salvar Configurações</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
