
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';

const CustomFields = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalizações do Sistema</CardTitle>
          <CardDescription>
            Configure campos, layouts e outras personalizações para seu ambiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campos">
            <TabsList className="mb-4">
              <TabsTrigger value="campos">Campos Customizados</TabsTrigger>
              <TabsTrigger value="layouts">Layouts</TabsTrigger>
              <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campos">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Campos Customizados</h3>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Novo Campo
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="entity">Entidade</Label>
                      <Select defaultValue="colaborador">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma entidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="colaborador">Colaborador</SelectItem>
                          <SelectItem value="epi">EPI</SelectItem>
                          <SelectItem value="ferramenta">Ferramenta</SelectItem>
                          <SelectItem value="maquina">Máquina</SelectItem>
                          <SelectItem value="insumo">Insumo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome do Campo</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Entidade</TableHead>
                        <TableHead>Obrigatório</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Certificação</TableCell>
                        <TableCell>Texto</TableCell>
                        <TableCell>Colaborador</TableCell>
                        <TableCell>Não</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Validade Técnica</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>EPI</TableCell>
                        <TableCell>Sim</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Código Interno</TableCell>
                        <TableCell>Texto</TableCell>
                        <TableCell>Máquina</TableCell>
                        <TableCell>Sim</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="layouts">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Layouts Personalizados</h3>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Novo Layout
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dashboard Principal</CardTitle>
                      <CardDescription>Layout personalizado para dashboard principal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label>Componentes</Label>
                        <div className="border p-2 rounded-md">
                          <ul className="space-y-1">
                            <li className="flex justify-between items-center p-2 bg-secondary rounded-md">
                              <span>Resumo EPIs</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">↑</Button>
                                <Button variant="ghost" size="sm">↓</Button>
                              </div>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-secondary rounded-md">
                              <span>Máquinas com Manutenção Próxima</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">↑</Button>
                                <Button variant="ghost" size="sm">↓</Button>
                              </div>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-secondary rounded-md">
                              <span>Alertas Recentes</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">↑</Button>
                                <Button variant="ghost" size="sm">↓</Button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Relatório de Produtividade</CardTitle>
                      <CardDescription>Layout personalizado para relatório de produtividade</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label>Componentes</Label>
                        <div className="border p-2 rounded-md">
                          <ul className="space-y-1">
                            <li className="flex justify-between items-center p-2 bg-secondary rounded-md">
                              <span>Gráfico de Produtividade</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">↑</Button>
                                <Button variant="ghost" size="sm">↓</Button>
                              </div>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-secondary rounded-md">
                              <span>Tabela de Metas</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">↑</Button>
                                <Button variant="ghost" size="sm">↓</Button>
                              </div>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-secondary rounded-md">
                              <span>Indicadores Comparativos</span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">↑</Button>
                                <Button variant="ghost" size="sm">↓</Button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notificacoes">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Configurações de Notificações</h3>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nova Configuração
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo de Notificação</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Sistema</TableHead>
                      <TableHead>SMS</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Vencimento de EPI</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Não</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manutenção de Máquina</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Estoque Baixo</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Não</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomFields;
