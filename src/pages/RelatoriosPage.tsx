
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, FileSpreadsheet, Download, Calendar, Filter, Printer, BarChart2, ChevronRight, CheckCircle2, FileCheck2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BarChart from '@/components/charts/BarChart';

const RelatoriosPage = () => {
  // Dados simulados para gráficos
  const consumoEPIsPorMesData = [
    { name: 'Jan', Capacetes: 25, Luvas: 85, Óculos: 45, Protetores: 35 },
    { name: 'Fev', Capacetes: 18, Luvas: 78, Óculos: 38, Protetores: 38 },
    { name: 'Mar', Capacetes: 22, Luvas: 92, Óculos: 42, Protetores: 32 },
    { name: 'Abr', Capacetes: 30, Luvas: 80, Óculos: 50, Protetores: 30 },
    { name: 'Mai', Capacetes: 28, Luvas: 88, Óculos: 48, Protetores: 35 },
    { name: 'Jun', Capacetes: 32, Luvas: 95, Óculos: 52, Protetores: 38 },
  ];
  
  const consumoEPIsPorMesKeys = [
    { key: 'Capacetes', name: 'Capacetes', color: '#2563eb' },
    { key: 'Luvas', name: 'Luvas', color: '#16a34a' },
    { key: 'Óculos', name: 'Óculos', color: '#ea580c' },
    { key: 'Protetores', name: 'Protetores', color: '#7c3aed' },
  ];
  
  // Relatórios recentes
  const relatoriosRecentes = [
    {
      id: 1,
      nome: 'Consumo de EPIs por Contrato',
      categoria: 'EPIs',
      geradoEm: '30/06/2023',
      formato: 'PDF',
      usuario: 'Admin'
    },
    {
      id: 2,
      nome: 'Contratos por Status - Junho/2023',
      categoria: 'Contratos',
      geradoEm: '28/06/2023',
      formato: 'XLSX',
      usuario: 'Admin'
    },
    {
      id: 3,
      nome: 'Máquinas com Manutenção Vencida',
      categoria: 'Máquinas',
      geradoEm: '27/06/2023',
      formato: 'PDF',
      usuario: 'Admin'
    },
    {
      id: 4,
      nome: 'Absenteísmo por Departamento',
      categoria: 'Colaboradores',
      geradoEm: '25/06/2023',
      formato: 'CSV',
      usuario: 'Admin'
    },
    {
      id: 5,
      nome: 'Movimentação de Estoque - Junho/2023',
      categoria: 'Insumos',
      geradoEm: '24/06/2023',
      formato: 'XLSX',
      usuario: 'Admin'
    },
  ];
  
  // Relatórios favoritos
  const relatoriosFavoritos = [
    {
      id: 1,
      nome: 'Consumo de EPIs por Contrato',
      descricao: 'Análise detalhada do consumo de EPIs segregado por contrato',
      categoria: 'EPIs',
      ultimaExecucao: '30/06/2023'
    },
    {
      id: 2,
      nome: 'Indicadores de Segurança',
      descricao: 'Taxa de acidentes, incidentes e quase-acidentes por mês',
      categoria: 'Segurança',
      ultimaExecucao: '28/06/2023'
    },
    {
      id: 3,
      nome: 'Custos por Contrato',
      descricao: 'Análise financeira detalhada por contrato',
      categoria: 'Financeiro',
      ultimaExecucao: '25/06/2023'
    },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Relatórios</h1>
        </div>
        
        <Tabs defaultValue="gerador" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Relatórios e Análises</CardTitle>
                <TabsList>
                  <TabsTrigger value="gerador">Gerador</TabsTrigger>
                  <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
                  <TabsTrigger value="recentes">Recentes</TabsTrigger>
                  <TabsTrigger value="agendados">Agendados</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="gerador" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Categorias de relatórios */}
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-base">Categorias</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {[
                          { id: 'contratos', nome: 'Contratos', icone: FileText, cor: 'text-brand-blue', badge: 7 },
                          { id: 'colaboradores', nome: 'Colaboradores', icone: FileText, cor: 'text-brand-purple', badge: 6 },
                          { id: 'epis', nome: 'EPIs', icone: FileText, cor: 'text-brand-green', badge: 8 },
                          { id: 'ferramentas', nome: 'Ferramentas', icone: FileText, cor: 'text-brand-orange', badge: 4 },
                          { id: 'maquinas', nome: 'Máquinas', icone: FileText, cor: 'text-brand-blue', badge: 5 },
                          { id: 'insumos', nome: 'Insumos', icone: FileText, cor: 'text-brand-green', badge: 6 },
                          { id: 'financeiro', nome: 'Financeiro', icone: FileText, cor: 'text-brand-purple', badge: 9 },
                          { id: 'seguranca', nome: 'Segurança', icone: FileText, cor: 'text-brand-orange', badge: 7 },
                        ].map((categoria) => (
                          <button
                            key={categoria.id}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-md flex items-center justify-center ${categoria.cor.replace('text-', 'bg-')}/10 ${categoria.cor}`}>
                                <categoria.icone className="h-4 w-4" />
                              </div>
                              <span>{categoria.nome}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="rounded-full text-xs">
                                {categoria.badge}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Gerador de relatórios */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-base">Gerador de Relatórios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Tipo de relatório */}
                        <div className="space-y-2">
                          <Label>Tipo de Relatório</Label>
                          <Select defaultValue="consumo-epis">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de relatório" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consumo-epis">Consumo de EPIs</SelectItem>
                              <SelectItem value="movimentacao-estoque">Movimentação de Estoque</SelectItem>
                              <SelectItem value="contratos-status">Contratos por Status</SelectItem>
                              <SelectItem value="manutencoes-programadas">Manutenções Programadas</SelectItem>
                              <SelectItem value="indicadores-seguranca">Indicadores de Segurança</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Filtros */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Período</Label>
                              <DatePickerWithRange />
                            </div>
                            <div className="space-y-2">
                              <Label>Contrato</Label>
                              <Select defaultValue="todos">
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o contrato" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="todos">Todos os contratos</SelectItem>
                                  <SelectItem value="cont-001">CONT-001 - Manutenção SPCI</SelectItem>
                                  <SelectItem value="cont-002">CONT-002 - Manutenção SPDA</SelectItem>
                                  <SelectItem value="cont-003">CONT-003 - Construção Civil</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tipo de EPI</Label>
                              <Select defaultValue="todos">
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo de EPI" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="todos">Todos os tipos</SelectItem>
                                  <SelectItem value="cabeca">Proteção da Cabeça</SelectItem>
                                  <SelectItem value="maos">Proteção das Mãos</SelectItem>
                                  <SelectItem value="olhos">Proteção dos Olhos</SelectItem>
                                  <SelectItem value="auditiva">Proteção Auditiva</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Agrupamento</Label>
                              <Select defaultValue="mensal">
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o agrupamento" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="diario">Diário</SelectItem>
                                  <SelectItem value="semanal">Semanal</SelectItem>
                                  <SelectItem value="mensal">Mensal</SelectItem>
                                  <SelectItem value="trimestral">Trimestral</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Campos Adicionais</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {['Quantidade', 'Valor', 'Contrato', 'Colaborador', 'Local', 'Data'].map((campo) => (
                                <div key={campo} className="flex items-center space-x-2">
                                  <input type="checkbox" id={campo} className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                                  <label htmlFor={campo} className="text-sm">{campo}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Visualização */}
                        <div className="rounded-md border border-gray-200 p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-medium">Pré-visualização</h3>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" /> Filtrar
                              </Button>
                              <Button variant="outline" size="sm">
                                <BarChart2 className="h-4 w-4 mr-2" /> Gráfico
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileSpreadsheet className="h-4 w-4 mr-2" /> Tabela
                              </Button>
                            </div>
                          </div>
                          
                          <BarChart 
                            title="Consumo de EPIs por Mês" 
                            data={consumoEPIsPorMesData} 
                            dataKeys={consumoEPIsPorMesKeys} 
                          />
                        </div>
                        
                        {/* Opções de exportação */}
                        <div className="pt-4 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
                          <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm">Formato:</Label>
                              <Select defaultValue="pdf">
                                <SelectTrigger className="w-24 h-8">
                                  <SelectValue placeholder="Formato" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pdf">PDF</SelectItem>
                                  <SelectItem value="xlsx">Excel</SelectItem>
                                  <SelectItem value="csv">CSV</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="salvar-favorito" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                              <label htmlFor="salvar-favorito" className="text-sm">Salvar como favorito</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="agendar" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                              <label htmlFor="agendar" className="text-sm">Agendar envio recorrente</label>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">
                              <Printer className="h-4 w-4 mr-2" /> Imprimir
                            </Button>
                            <Button className="bg-brand-blue hover:bg-brand-blue/90">
                              <Download className="h-4 w-4 mr-2" /> Gerar Relatório
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="favoritos" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatoriosFavoritos.map((relatorio) => (
                    <Card key={relatorio.id} className="flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <Badge variant="outline" className={
                              relatorio.categoria === 'EPIs' ? 'bg-brand-green/10 text-brand-green' :
                              relatorio.categoria === 'Segurança' ? 'bg-brand-orange/10 text-brand-orange' :
                              'bg-brand-purple/10 text-brand-purple'
                            }>
                              {relatorio.categoria}
                            </Badge>
                            <CardTitle className="text-base leading-tight">{relatorio.nome}</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 pb-2">
                        <p className="text-sm text-gray-500">{relatorio.descricao}</p>
                        <p className="text-xs text-gray-400 mt-2">Última execução: {relatorio.ultimaExecucao}</p>
                      </CardContent>
                      <div className="p-3 pt-0 mt-auto">
                        <div className="flex justify-between gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Calendar className="h-4 w-4 mr-2" /> Agendar
                          </Button>
                          <Button size="sm" className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
                            <FileText className="h-4 w-4 mr-2" /> Gerar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">Ver Todos os Favoritos</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="recentes" className="space-y-6">
                <div className="flex justify-between items-center">
                  <Input placeholder="Buscar nos relatórios recentes..." className="max-w-md" />
                  <div className="flex gap-2">
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todas as categorias</SelectItem>
                        <SelectItem value="epis">EPIs</SelectItem>
                        <SelectItem value="contratos">Contratos</SelectItem>
                        <SelectItem value="maquinas">Máquinas</SelectItem>
                        <SelectItem value="colaboradores">Colaboradores</SelectItem>
                        <SelectItem value="insumos">Insumos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" /> Filtros
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 p-3 border-b border-gray-200 text-sm font-medium">
                    <div className="col-span-5">Nome do Relatório</div>
                    <div className="col-span-2">Categoria</div>
                    <div className="col-span-2">Gerado em</div>
                    <div className="col-span-1">Formato</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {relatoriosRecentes.map((relatorio) => (
                      <div key={relatorio.id} className="grid grid-cols-12 p-3 items-center hover:bg-gray-50 transition-colors">
                        <div className="col-span-5 flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-md flex items-center justify-center ${
                            relatorio.categoria === 'EPIs' ? 'bg-brand-green/10 text-brand-green' :
                            relatorio.categoria === 'Contratos' ? 'bg-brand-blue/10 text-brand-blue' :
                            relatorio.categoria === 'Máquinas' ? 'bg-brand-orange/10 text-brand-orange' :
                            relatorio.categoria === 'Colaboradores' ? 'bg-brand-purple/10 text-brand-purple' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="truncate">{relatorio.nome}</div>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className={
                            relatorio.categoria === 'EPIs' ? 'bg-brand-green/10 text-brand-green' :
                            relatorio.categoria === 'Contratos' ? 'bg-brand-blue/10 text-brand-blue' :
                            relatorio.categoria === 'Máquinas' ? 'bg-brand-orange/10 text-brand-orange' :
                            relatorio.categoria === 'Colaboradores' ? 'bg-brand-purple/10 text-brand-purple' :
                            'bg-gray-100 text-gray-600'
                          }>
                            {relatorio.categoria}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-sm text-gray-500">{relatorio.geradoEm}</div>
                        <div className="col-span-1 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {relatorio.formato}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Mostrando 5 de 28 relatórios</span>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" disabled>
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm">
                        Próximo
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="agendados" className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Automação de Relatórios</h3>
                      <p className="text-sm text-gray-600">Configure relatórios para serem gerados e enviados automaticamente conforme a frequência desejada.</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 p-3 border-b border-gray-200 text-sm font-medium">
                    <div className="col-span-4">Relatório</div>
                    <div className="col-span-2">Frequência</div>
                    <div className="col-span-2">Próximo Envio</div>
                    <div className="col-span-2">Destinatários</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {[
                      { 
                        id: 1, 
                        nome: 'Consumo de EPIs por Contrato', 
                        frequencia: 'Semanal',
                        proximo: '07/07/2023',
                        destinatarios: 3,
                        status: 'Ativo'
                      },
                      { 
                        id: 2, 
                        nome: 'Indicadores de Segurança', 
                        frequencia: 'Mensal',
                        proximo: '01/08/2023',
                        destinatarios: 5,
                        status: 'Ativo'
                      },
                      { 
                        id: 3, 
                        nome: 'Vencimentos de Contratos', 
                        frequencia: 'Diário',
                        proximo: '01/07/2023',
                        destinatarios: 2,
                        status: 'Ativo'
                      },
                      { 
                        id: 4, 
                        nome: 'Custos por Contrato', 
                        frequencia: 'Mensal',
                        proximo: '01/08/2023',
                        destinatarios: 4,
                        status: 'Pausado'
                      },
                    ].map((agendamento) => (
                      <div key={agendamento.id} className="grid grid-cols-12 p-3 items-center hover:bg-gray-50 transition-colors">
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                            <FileCheck2 className="h-4 w-4" />
                          </div>
                          <div className="truncate">{agendamento.nome}</div>
                        </div>
                        <div className="col-span-2 text-sm">
                          {agendamento.frequencia}
                        </div>
                        <div className="col-span-2 text-sm">
                          {agendamento.proximo}
                        </div>
                        <div className="col-span-2 text-sm">
                          {agendamento.destinatarios} destinatários
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-2">
                          <Badge className={
                            agendamento.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {agendamento.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    <Calendar className="h-4 w-4 mr-2" /> Agendar Novo Relatório
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
        
        {/* Sugestões de Relatórios */}
        <Card>
          <CardHeader>
            <CardTitle>Sugestões de Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  id: 1, 
                  nome: 'Análise de Eficiência Operacional', 
                  descricao: 'Compare custos, tempo e recursos utilizados por contrato',
                  icone: BarChart2,
                  cor: 'text-brand-blue'
                },
                { 
                  id: 2, 
                  nome: 'Relatório de Conformidade', 
                  descricao: 'Acompanhe o cumprimento de normas e exigências legais',
                  icone: CheckCircle2,
                  cor: 'text-brand-green'
                },
                { 
                  id: 3, 
                  nome: 'Dashboard de Indicadores', 
                  descricao: 'Visão consolidada dos principais KPIs do negócio',
                  icone: FileCheck2,
                  cor: 'text-brand-purple'
                },
              ].map((sugestao) => (
                <Card key={sugestao.id} className="border border-dashed hover:border-solid hover:shadow-sm transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`h-12 w-12 rounded-full ${sugestao.cor.replace('text-', 'bg-')}/10 ${sugestao.cor} flex items-center justify-center mb-4`}>
                        <sugestao.icone className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium mb-2">{sugestao.nome}</h3>
                      <p className="text-sm text-gray-500 mb-4">{sugestao.descricao}</p>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" /> Criar Relatório
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RelatoriosPage;
