import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable, { Column } from '@/components/ui/DataTable';
import StatsCard from '@/components/widgets/StatsCard';
import { Plus, Search, Filter, Download, Package, Archive, Truck, AlertTriangle, ShoppingCart, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import BarChart from '@/components/charts/BarChart';

const InsumosPage = () => {
  // Cards de indicadores
  const indicadoresInsumos = [
    { title: 'Total de Insumos', value: '234', icon: Package, iconColor: 'text-brand-blue' },
    { title: 'Valor em Estoque', value: 'R$ 187.450', icon: Archive, iconColor: 'text-brand-green', trend: { value: 5, positive: true } },
    { title: 'Itens Abaixo do Mínimo', value: '18', icon: AlertTriangle, iconColor: 'text-brand-orange', trend: { value: 2, positive: false } },
    { title: 'Pedidos em Aberto', value: '7', icon: Truck, iconColor: 'text-brand-purple', description: 'R$ 32.840 em compras' },
  ];
  
  // Dados simulados para o gráfico
  const consumoMensalData = [
    { name: 'Jan', Material: 45800, Químico: 22500, Elétrico: 18700, Outros: 12400 },
    { name: 'Fev', Material: 48200, Químico: 20100, Elétrico: 17900, Outros: 11800 },
    { name: 'Mar', Material: 52400, Químico: 24300, Elétrico: 19200, Outros: 13600 },
    { name: 'Abr', Material: 50100, Químico: 23400, Elétrico: 20100, Outros: 12900 },
    { name: 'Mai', Material: 55300, Químico: 25700, Elétrico: 21500, Outros: 14200 },
    { name: 'Jun', Material: 58700, Químico: 27800, Elétrico: 22800, Outros: 15300 },
  ];
  
  const consumoMensalKeys = [
    { key: 'Material', name: 'Material Construção', color: '#2563eb' },
    { key: 'Químico', name: 'Químico', color: '#16a34a' },
    { key: 'Elétrico', name: 'Elétrico', color: '#ea580c' },
    { key: 'Outros', name: 'Outros', color: '#7c3aed' },
  ];
  
  // Dados simulados para a tabela de insumos
  const insumosColumns: Column[] = [
    { 
      header: 'Insumo', 
      accessorKey: 'insumo',
      cell: ({ row }) => {
        const { nome, codigo } = row.original.insumo;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
              <Package className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-sm">{nome}</p>
              <p className="text-xs text-gray-500">Cód: {codigo}</p>
            </div>
          </div>
        );
      }
    },
    { header: 'Categoria', accessorKey: 'categoria' },
    { header: 'Unidade', accessorKey: 'unidade' },
    { 
      header: 'Estoque', 
      accessorKey: 'estoque',
      cell: ({ row }) => {
        const { atual, minimo, maximo } = row.original.estoque;
        const porcentagem = (atual / maximo) * 100;
        let statusColor = "bg-green-500";
        
        if (atual <= minimo) {
          statusColor = "bg-red-500";
        } else if (atual <= minimo * 1.5) {
          statusColor = "bg-amber-500";
        }
        
        return (
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>{atual}</span>
              <span className="text-gray-500">Mín: {minimo} | Máx: {maximo}</span>
            </div>
            <Progress value={porcentagem} className={`h-2 ${statusColor}`} />
          </div>
        );
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        let badgeClass = "";
        switch(value) {
          case 'Adequado':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'Alerta':
            badgeClass = "bg-amber-100 text-amber-800";
            break;
          case 'Crítico':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        return <Badge className={badgeClass}>{value}</Badge>;
      }
    },
    { header: 'Valor Unit.', accessorKey: 'valorUnitario' },
    { header: 'Valor Total', accessorKey: 'valorTotal' },
    { header: 'Última Movimentação', accessorKey: 'ultimaMovimentacao' },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];
  
  const insumosData = [
    {
      insumo: { nome: 'Cimento Portland CP II', codigo: 'INS-001' },
      categoria: 'Material de Construção',
      unidade: 'Saco 50kg',
      estoque: { atual: 240, minimo: 150, maximo: 500 },
      status: 'Adequado',
      valorUnitario: 'R$ 38,50',
      valorTotal: 'R$ 9.240,00',
      ultimaMovimentacao: '28/06/2023'
    },
    {
      insumo: { nome: 'Aço CA-50 10mm', codigo: 'INS-002' },
      categoria: 'Material de Construção',
      unidade: 'Kg',
      estoque: { atual: 1850, minimo: 2000, maximo: 5000 },
      status: 'Crítico',
      valorUnitario: 'R$ 9,75',
      valorTotal: 'R$ 18.037,50',
      ultimaMovimentacao: '25/06/2023'
    },
    {
      insumo: { nome: 'Tijolo Cerâmico 9x19x29', codigo: 'INS-003' },
      categoria: 'Material de Construção',
      unidade: 'Unid.',
      estoque: { atual: 12500, minimo: 8000, maximo: 20000 },
      status: 'Adequado',
      valorUnitario: 'R$ 1,28',
      valorTotal: 'R$ 16.000,00',
      ultimaMovimentacao: '22/06/2023'
    },
    {
      insumo: { nome: 'Solvente para Tinta', codigo: 'INS-004' },
      categoria: 'Químico',
      unidade: 'Litro',
      estoque: { atual: 45, minimo: 40, maximo: 120 },
      status: 'Alerta',
      valorUnitario: 'R$ 22,80',
      valorTotal: 'R$ 1.026,00',
      ultimaMovimentacao: '26/06/2023'
    },
    {
      insumo: { nome: 'Fio Elétrico 2,5mm', codigo: 'INS-005' },
      categoria: 'Elétrico',
      unidade: 'Metro',
      estoque: { atual: 850, minimo: 500, maximo: 2000 },
      status: 'Adequado',
      valorUnitario: 'R$ 2,15',
      valorTotal: 'R$ 1.827,50',
      ultimaMovimentacao: '27/06/2023'
    },
    {
      insumo: { nome: 'Argamassa Colante AC-II', codigo: 'INS-006' },
      categoria: 'Material de Construção',
      unidade: 'Saco 20kg',
      estoque: { atual: 68, minimo: 100, maximo: 300 },
      status: 'Crítico',
      valorUnitario: 'R$ 28,90',
      valorTotal: 'R$ 1.965,20',
      ultimaMovimentacao: '24/06/2023'
    },
    {
      insumo: { nome: 'Tinta Acrílica Branca', codigo: 'INS-007' },
      categoria: 'Químico',
      unidade: 'Lata 18L',
      estoque: { atual: 32, minimo: 30, maximo: 100 },
      status: 'Alerta',
      valorUnitario: 'R$ 289,00',
      valorTotal: 'R$ 9.248,00',
      ultimaMovimentacao: '20/06/2023'
    },
    {
      insumo: { nome: 'Disjuntor Tripolar 63A', codigo: 'INS-008' },
      categoria: 'Elétrico',
      unidade: 'Unid.',
      estoque: { atual: 15, minimo: 10, maximo: 50 },
      status: 'Adequado',
      valorUnitario: 'R$ 78,50',
      valorTotal: 'R$ 1.177,50',
      ultimaMovimentacao: '21/06/2023'
    },
  ];
  
  // Últimas requisições
  const ultimasRequisicoes = [
    {
      id: 1,
      contrato: 'CONT-003',
      solicitante: 'João Silva',
      data: '29/06/2023',
      status: 'Pendente',
      itens: 8,
      valor: 'R$ 4.250,00'
    },
    {
      id: 2,
      contrato: 'CONT-001',
      solicitante: 'Maria Oliveira',
      data: '28/06/2023',
      status: 'Aprovado',
      itens: 12,
      valor: 'R$ 7.840,00'
    },
    {
      id: 3,
      contrato: 'CONT-005',
      solicitante: 'Carlos Santos',
      data: '28/06/2023',
      status: 'Entregue',
      itens: 5,
      valor: 'R$ 1.950,00'
    },
    {
      id: 4,
      contrato: 'CONT-002',
      solicitante: 'Paulo Mendes',
      data: '27/06/2023',
      status: 'Aprovado',
      itens: 10,
      valor: 'R$ 3.780,00'
    },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Insumos</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Novo Insumo
          </Button>
        </div>
        
        {/* Cards de indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadoresInsumos.map((item, index) => (
            <StatsCard 
              key={index}
              title={item.title} 
              value={item.value} 
              description={item.description} 
              icon={item.icon} 
              trend={item.trend} 
              iconColor={item.iconColor}
            />
          ))}
        </div>
        
        {/* Gráfico de consumo mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Consumo Mensal por Categoria (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              title="" 
              data={consumoMensalData} 
              dataKeys={consumoMensalKeys} 
            />
          </CardContent>
        </Card>
        
        {/* Informações de Insumos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de insumos - ocupa 2/3 */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Gestão de Insumos</CardTitle>
              <Tabs defaultValue="todos" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="criticos">Críticos</TabsTrigger>
                    <TabsTrigger value="alerta">Em Alerta</TabsTrigger>
                    <TabsTrigger value="curva-a">Curva A</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filtros
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Buscar insumo..."
                        className="pl-9 h-9"
                      />
                    </div>
                  </div>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="material">Material de Construção</SelectItem>
                      <SelectItem value="quimico">Químico</SelectItem>
                      <SelectItem value="eletrico">Elétrico</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="adequado">Adequado</SelectItem>
                      <SelectItem value="alerta">Alerta</SelectItem>
                      <SelectItem value="critico">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <TabsContent value="todos" className="pt-4">
                  <DataTable
                    columns={insumosColumns}
                    data={insumosData}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="criticos" className="pt-4">
                  <DataTable
                    columns={insumosColumns}
                    data={insumosData.filter(item => item.status === 'Crítico')}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="alerta" className="pt-4">
                  <DataTable
                    columns={insumosColumns}
                    data={insumosData.filter(item => item.status === 'Alerta')}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="curva-a" className="pt-4">
                  <DataTable
                    columns={insumosColumns}
                    data={insumosData.sort((a, b) => {
                      const valorA = parseFloat(a.valorTotal.replace('R$ ', '').replace('.', '').replace(',', '.'));
                      const valorB = parseFloat(b.valorTotal.replace('R$ ', '').replace('.', '').replace(',', '.'));
                      return valorB - valorA;
                    }).slice(0, 3)}
                    itemsPerPage={10}
                  />
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
          
          {/* Requisições recentes - ocupa 1/3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-purple" />
                Últimas Requisições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ultimasRequisicoes.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="w-14 h-14 rounded-lg bg-brand-purple/10 text-brand-purple flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-semibold">{item.data.split('/')[1]}</span>
                      <span className="text-lg font-bold">{item.data.split('/')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">Requisição #{item.id}</h4>
                          <p className="text-xs text-gray-500">Contrato: {item.contrato}</p>
                          <p className="text-xs text-gray-500">Solicitante: {item.solicitante}</p>
                        </div>
                        <Badge className={`${
                          item.status === 'Pendente' 
                            ? 'bg-amber-100 text-amber-800' 
                            : item.status === 'Aprovado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs">Itens: {item.itens}</span>
                        <span className="text-xs font-medium">{item.valor}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  Ver Todas as Requisições
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Inventário e previsões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-blue" />
              Análise de Consumo e Previsões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Top 5 Insumos mais Consumidos</h3>
                <div className="space-y-3">
                  {[
                    { nome: 'Cimento Portland CP II', valor: 'R$ 42.850,00', porcentagem: 85 },
                    { nome: 'Aço CA-50 10mm', valor: 'R$ 38.240,00', porcentagem: 75 },
                    { nome: 'Tijolo Cerâmico 9x19x29', valor: 'R$ 29.750,00', porcentagem: 65 },
                    { nome: 'Tinta Acrílica Branca', valor: 'R$ 24.280,00', porcentagem: 55 },
                    { nome: 'Argamassa Colante AC-II', valor: 'R$ 18.650,00', porcentagem: 45 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.nome}</span>
                        <span className="font-medium">{item.valor}</span>
                      </div>
                      <Progress value={item.porcentagem} max={100} className="h-2 bg-gray-100" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Previsão de Compras para Julho</h3>
                <div className="space-y-3">
                  {[
                    { nome: 'Material de Construção', valor: 'R$ 58.000,00', porcentagem: 80 },
                    { nome: 'Químico', valor: 'R$ 28.500,00', porcentagem: 60 },
                    { nome: 'Elétrico', valor: 'R$ 22.800,00', porcentagem: 55 },
                    { nome: 'Outros', valor: 'R$ 15.700,00', porcentagem: 40 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.nome}</span>
                        <span className="font-medium">{item.valor}</span>
                      </div>
                      <Progress value={item.porcentagem} max={100} className="h-2 bg-gray-100" />
                    </div>
                  ))}
                  <div className="p-3 rounded-md bg-gray-50 mt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total previsto:</span>
                      <span>R$ 125.000,00</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Ações Recomendadas</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-md border border-amber-200 bg-amber-50">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Comprar Aço CA-50 10mm</p>
                        <p className="text-xs text-gray-600">Estoque abaixo do mínimo. Comprar pelo menos 2.000 kg.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Gerar Pedido
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-md border border-amber-200 bg-amber-50">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Comprar Argamassa Colante AC-II</p>
                        <p className="text-xs text-gray-600">Estoque abaixo do mínimo. Comprar pelo menos 100 sacos.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Gerar Pedido
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-md border border-blue-200 bg-blue-50">
                    <div className="flex gap-2">
                      <Calendar className="h-5 w-5 text-blue-600 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Agendar Inventário Cíclico</p>
                        <p className="text-xs text-gray-600">Próximo inventário previsto para 15/07/2023.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Calendar className="h-4 w-4 mr-2" /> Agendar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InsumosPage;
