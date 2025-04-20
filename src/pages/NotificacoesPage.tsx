
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Calendar, FileText, HardHat, Mail, MessageSquare, Smartphone, Wrench, CheckCircle2, X, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NotificacoesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notificações</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Bell className="mr-2 h-4 w-4" /> Configurar Notificações
          </Button>
        </div>
        
        <Tabs defaultValue="todas" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Centro de Notificações</CardTitle>
                <TabsList>
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="nao-lidas">Não Lidas</TabsTrigger>
                  <TabsTrigger value="importantes">Importantes</TabsTrigger>
                  <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="todas" className="space-y-6">
                <div className="flex items-center justify-between">
                  <Input placeholder="Buscar notificações..." className="max-w-md" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Marcar todas como lidas
                    </Button>
                    <Select defaultValue="recentes">
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recentes">Mais recentes</SelectItem>
                        <SelectItem value="antigas">Mais antigas</SelectItem>
                        <SelectItem value="importantes">Importantes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Grupos de notificações por data */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Hoje</h3>
                    <div className="space-y-2">
                      {[
                        {
                          id: 1,
                          tipo: 'contratos',
                          icone: FileText,
                          titulo: 'Contrato próximo do vencimento',
                          mensagem: 'O contrato #1234 (Manutenção SPCI) vence em 15 dias.',
                          hora: '10:25',
                          prioridade: 'alta',
                          lida: false
                        },
                        {
                          id: 2,
                          tipo: 'epis',
                          icone: HardHat,
                          titulo: 'Estoque crítico de EPIs',
                          mensagem: 'Luvas anti-corte estão abaixo do nível mínimo de estoque.',
                          hora: '09:18',
                          prioridade: 'media',
                          lida: false
                        },
                        {
                          id: 3,
                          tipo: 'ferramentas',
                          icone: Wrench,
                          titulo: 'Manutenção programada',
                          mensagem: 'A retroescavadeira JCB 3CX tem manutenção agendada para amanhã.',
                          hora: '08:45',
                          prioridade: 'normal',
                          lida: true
                        },
                      ].map((notificacao) => (
                        <div 
                          key={notificacao.id} 
                          className={`p-4 rounded-lg border ${notificacao.lida ? 'bg-white' : 'bg-blue-50'} ${
                            notificacao.prioridade === 'alta' ? 'border-red-200' : 
                            notificacao.prioridade === 'media' ? 'border-amber-200' : 'border-gray-200'
                          } hover:bg-gray-50 transition-colors`}
                        >
                          <div className="flex gap-4">
                            <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              notificacao.tipo === 'contratos' ? 'bg-brand-blue/10 text-brand-blue' :
                              notificacao.tipo === 'epis' ? 'bg-brand-green/10 text-brand-green' :
                              notificacao.tipo === 'ferramentas' ? 'bg-brand-orange/10 text-brand-orange' :
                              'bg-brand-purple/10 text-brand-purple'
                            }`}>
                              <notificacao.icone className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-medium">{notificacao.titulo}</h4>
                                  <p className="text-sm text-gray-600">{notificacao.mensagem}</p>
                                </div>
                                <div className="flex flex-col items-end ml-4">
                                  <span className="text-xs text-gray-500">{notificacao.hora}</span>
                                  {notificacao.prioridade === 'alta' && (
                                    <Badge className="mt-1 bg-red-100 text-red-800">Alta</Badge>
                                  )}
                                  {notificacao.prioridade === 'media' && (
                                    <Badge className="mt-1 bg-amber-100 text-amber-800">Média</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2 gap-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Marcar como lida
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">Ver detalhes</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Ontem</h3>
                    <div className="space-y-2">
                      {[
                        {
                          id: 4,
                          tipo: 'calendario',
                          icone: Calendar,
                          titulo: 'Evento amanhã',
                          mensagem: 'Treinamento de Segurança programado para amanhã às 09:00.',
                          hora: '16:30',
                          prioridade: 'normal',
                          lida: true
                        },
                        {
                          id: 5,
                          tipo: 'chat',
                          icone: MessageSquare,
                          titulo: 'Nova mensagem',
                          mensagem: 'Coordenador de Obras enviou uma nova mensagem sobre o contrato #2567.',
                          hora: '14:22',
                          prioridade: 'normal',
                          lida: true
                        },
                      ].map((notificacao) => (
                        <div 
                          key={notificacao.id} 
                          className={`p-4 rounded-lg border ${notificacao.lida ? 'bg-white' : 'bg-blue-50'} ${
                            notificacao.prioridade === 'alta' ? 'border-red-200' : 
                            notificacao.prioridade === 'media' ? 'border-amber-200' : 'border-gray-200'
                          } hover:bg-gray-50 transition-colors`}
                        >
                          <div className="flex gap-4">
                            <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              notificacao.tipo === 'calendario' ? 'bg-brand-blue/10 text-brand-blue' :
                              notificacao.tipo === 'chat' ? 'bg-brand-green/10 text-brand-green' :
                              'bg-brand-purple/10 text-brand-purple'
                            }`}>
                              <notificacao.icone className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-medium">{notificacao.titulo}</h4>
                                  <p className="text-sm text-gray-600">{notificacao.mensagem}</p>
                                </div>
                                <span className="text-xs text-gray-500 ml-4">{notificacao.hora}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2">Ver detalhes</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">Carregar mais notificações</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nao-lidas" className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Mostrando 2 notificações não lidas</p>
                  <Button variant="outline" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Marcar todas como lidas
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {[
                    {
                      id: 1,
                      tipo: 'contratos',
                      icone: FileText,
                      titulo: 'Contrato próximo do vencimento',
                      mensagem: 'O contrato #1234 (Manutenção SPCI) vence em 15 dias.',
                      hora: '10:25',
                      prioridade: 'alta',
                      lida: false
                    },
                    {
                      id: 2,
                      tipo: 'epis',
                      icone: HardHat,
                      titulo: 'Estoque crítico de EPIs',
                      mensagem: 'Luvas anti-corte estão abaixo do nível mínimo de estoque.',
                      hora: '09:18',
                      prioridade: 'media',
                      lida: false
                    },
                  ].map((notificacao) => (
                    <div 
                      key={notificacao.id} 
                      className={`p-4 rounded-lg border ${notificacao.lida ? 'bg-white' : 'bg-blue-50'} ${
                        notificacao.prioridade === 'alta' ? 'border-red-200' : 
                        notificacao.prioridade === 'media' ? 'border-amber-200' : 'border-gray-200'
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex gap-4">
                        <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          notificacao.tipo === 'contratos' ? 'bg-brand-blue/10 text-brand-blue' :
                          notificacao.tipo === 'epis' ? 'bg-brand-green/10 text-brand-green' :
                          'bg-brand-purple/10 text-brand-purple'
                        }`}>
                          <notificacao.icone className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{notificacao.titulo}</h4>
                              <p className="text-sm text-gray-600">{notificacao.mensagem}</p>
                            </div>
                            <div className="flex flex-col items-end ml-4">
                              <span className="text-xs text-gray-500">{notificacao.hora}</span>
                              {notificacao.prioridade === 'alta' && (
                                <Badge className="mt-1 bg-red-100 text-red-800">Alta</Badge>
                              )}
                              {notificacao.prioridade === 'media' && (
                                <Badge className="mt-1 bg-amber-100 text-amber-800">Média</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2 gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Marcar como lida
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">Ver detalhes</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="importantes" className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Mostrando 1 notificação importante</p>
                  <Select defaultValue="recentes">
                    <SelectTrigger className="w-[130px] h-9">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recentes">Mais recentes</SelectItem>
                      <SelectItem value="antigas">Mais antigas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  {[
                    {
                      id: 1,
                      tipo: 'contratos',
                      icone: FileText,
                      titulo: 'Contrato próximo do vencimento',
                      mensagem: 'O contrato #1234 (Manutenção SPCI) vence em 15 dias.',
                      hora: '10:25',
                      prioridade: 'alta',
                      lida: false
                    },
                  ].map((notificacao) => (
                    <div 
                      key={notificacao.id} 
                      className={`p-4 rounded-lg border ${notificacao.lida ? 'bg-white' : 'bg-blue-50'} ${
                        notificacao.prioridade === 'alta' ? 'border-red-200' : 'border-gray-200'
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex gap-4">
                        <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          notificacao.tipo === 'contratos' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-purple/10 text-brand-purple'
                        }`}>
                          <notificacao.icone className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{notificacao.titulo}</h4>
                              <p className="text-sm text-gray-600">{notificacao.mensagem}</p>
                            </div>
                            <div className="flex flex-col items-end ml-4">
                              <span className="text-xs text-gray-500">{notificacao.hora}</span>
                              <Badge className="mt-1 bg-red-100 text-red-800">Alta</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2 gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Marcar como lida
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">Ver detalhes</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="configuracoes" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Configurações de Canais */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Settings className="h-5 w-5 text-brand-blue" />
                        Canais de Notificação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label className="text-base">Notificações no Sistema</Label>
                              <p className="text-sm text-gray-500">Alertas dentro da plataforma</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label className="text-base">Email</Label>
                              <p className="text-sm text-gray-500">Enviar notificações por email</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label className="text-base">SMS</Label>
                              <p className="text-sm text-gray-500">Mensagens de texto para celular</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label className="text-base">Chat</Label>
                              <p className="text-sm text-gray-500">Notificações no chat do sistema</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Configurações por Tipo */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bell className="h-5 w-5 text-brand-blue" />
                        Tipos de Notificação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-brand-blue" />
                            <div>
                              <Label className="text-base">Contratos</Label>
                              <p className="text-sm text-gray-500">Vencimentos, renovações, etc.</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <HardHat className="h-5 w-5 text-brand-green" />
                            <div>
                              <Label className="text-base">EPIs</Label>
                              <p className="text-sm text-gray-500">Estoque, validades, etc.</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-brand-purple" />
                            <div>
                              <Label className="text-base">Eventos</Label>
                              <p className="text-sm text-gray-500">Reuniões, treinamentos, etc.</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Wrench className="h-5 w-5 text-brand-orange" />
                            <div>
                              <Label className="text-base">Manutenções</Label>
                              <p className="text-sm text-gray-500">Agendamentos, alertas, etc.</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Configurações de Preferências */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Settings className="h-5 w-5 text-brand-blue" />
                      Preferências de Notificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Frequência de notificações por email</Label>
                          <Select defaultValue="imediato">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a frequência" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="imediato">Imediato</SelectItem>
                              <SelectItem value="diario">Resumo diário</SelectItem>
                              <SelectItem value="semanal">Resumo semanal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Horário para notificações agendadas</Label>
                          <Select defaultValue="manha">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manha">Manhã (08:00)</SelectItem>
                              <SelectItem value="tarde">Tarde (14:00)</SelectItem>
                              <SelectItem value="noite">Noite (19:00)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <Label className="text-base">Som para notificações</Label>
                            <p className="text-sm text-gray-500">Tocar som ao receber notificações</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Nível mínimo de prioridade para SMS</Label>
                          <Select defaultValue="alta">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todas">Todas as notificações</SelectItem>
                              <SelectItem value="media">Média e alta</SelectItem>
                              <SelectItem value="alta">Apenas alta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Email para notificações</Label>
                          <Input defaultValue="admin@raeng.com.br" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <Label className="text-base">Notificações em tempo real</Label>
                            <p className="text-sm text-gray-500">Exibir notificações instantaneamente</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button variant="outline" className="mr-2">
                        <X className="h-4 w-4 mr-2" /> Cancelar
                      </Button>
                      <Button className="bg-brand-blue hover:bg-brand-blue/90">
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Salvar Configurações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
        
        {/* Resumo de Notificações */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                      <Bell className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">5</h3>
                    <p className="text-sm text-gray-600">Notificações Hoje</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                      <Bell className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">1</h3>
                    <p className="text-sm text-gray-600">Alta Prioridade</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">84%</h3>
                    <p className="text-sm text-gray-600">Taxa de Leitura</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                      <Bell className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">24</h3>
                    <p className="text-sm text-gray-600">Esta Semana</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NotificacoesPage;
