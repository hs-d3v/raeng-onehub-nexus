import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable, { Column } from '@/components/ui/DataTable';
import BarChart from '@/components/charts/BarChart';
import { AlertCircle, Clock, HardHat, Plus, Search, Truck, Filter, Download, ShoppingCart, Calendar, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatsCard from '@/components/widgets/StatsCard';

const EPIsPage = () => {
  // Dados simulados para os gráficos
  const consumoMensalData = [
    { name: 'Jan', Capacetes: 25, Luvas: 85, Óculos: 45, Protetores: 35 },
    { name: 'Fev', Capacetes: 18, Luvas: 78, Óculos: 38, Protetores: 38 },
    { name: 'Mar', Capacetes: 22, Luvas: 92, Óculos: 42, Protetores: 32 },
    { name: 'Abr', Capacetes: 30, Luvas: 80, Óculos: 50, Protetores: 30 },
    { name: 'Mai', Capacetes: 28, Luvas: 88, Óculos: 48, Protetores: 35 },
    { name: 'Jun', Capacetes: 32, Luvas: 95, Óculos: 52, Protetores: 38 },
  ];
  
  const consumoMensalKeys = [
    { key: 'Capacetes', name: 'Capacetes', color: '#2563eb' },
    { key: 'Luvas', name: 'Luvas', color: '#16a34a' },
    { key: 'Óculos', name: 'Óculos', color: '#ea580c' },
    { key: 'Protetores', name: 'Protetores', color: '#7c3aed' },
  ];
  
  const consumoPorContratoData = [
    { name: 'CONT-001', Valor: 12500 },
    { name: 'CONT-002', Valor: 9300 },
    { name: 'CONT-003', Valor: 15200 },
    { name: 'CONT-004', Valor: 8700 },
    { name: 'CONT-005', Valor: 11400 },
    { name: 'CONT-006', Valor: 7800 },
  ];
  
  const consumoPorContratoKeys = [
    { key: 'Valor', name: 'Valor em R$', color: '#2563eb' },
  ];
  
  // Dados simulados para a tabela de EPIs
  const episColumns: Column[] = [
    { 
      header: 'EPI', 
      accessorKey: 'epi',
      cell: ({ row }) => {
        const { nome, foto, codigo } = row.original.epi;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
              <HardHat className="h-6 w-6 text-gray-600" />
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
              <span>{atual} unid.</span>
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
    { header: 'Validade', accessorKey: 'validade' },
    { header: 'Último Pedido', accessorKey: 'ultimoPedido' },
    { header: 'Almoxarifado', accessorKey: 'almoxarifado' },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MapPin className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];
  
  const episData = [
    {
      epi: { nome: 'Capacete de Segurança', foto: '', codigo: 'EPI-001' },
      categoria: 'Proteção da Cabeça',
      estoque: { atual: 45, minimo: 30, maximo: 100 },
      status: 'Adequado',
      validade: '12/05/2024',
      ultimoPedido: '15/03/2023',
      almoxarifado: 'Central'
    },
    {
      epi: { nome: 'Luvas Anti-corte', foto: '', codigo: 'EPI-002' },
      categoria: 'Proteção das Mãos',
      estoque: { atual: 28, minimo: 50, maximo: 150 },
      status: 'Crítico',
      validade: '22/07/2024',
      ultimoPedido: '05/04/2023',
      almoxarifado: 'Central'
    },
    {
      epi: { nome: 'Óculos de Proteção', foto: '', codigo: 'EPI-003' },
      categoria: 'Proteção dos Olhos',
      estoque: { atual: 65, minimo: 40, maximo: 120 },
      status: 'Adequado',
      validade: '10/08/2024',
      ultimoPedido: '18/02/2023',
      almoxarifado: 'Obra 01'
    },
    {
      epi: { nome: 'Protetor Auricular', foto: '', codigo: 'EPI-004' },
      categoria: 'Proteção Auditiva',
      estoque: { atual: 55, minimo: 45, maximo: 150 },
      status: 'Adequado',
      validade: '30/06/2024',
      ultimoPedido: '22/01/2023',
      almoxarifado: 'Central'
    },
    {
      epi: { nome: 'Máscara PFF2', foto: '', codigo: 'EPI-005' },
      categoria: 'Proteção Respiratória',
      estoque: { atual: 32, minimo: 40, maximo: 120 },
      status: 'Alerta',
      validade: '15/04/2024',
      ultimoPedido: '10/03/2023',
      almoxarifado: 'Obra 02'
    },
    {
      epi: { nome: 'Cinto de Segurança', foto: '', codigo: 'EPI-006' },
      categoria: 'Proteção contra Quedas',
      estoque: { atual: 12, minimo: 10, maximo: 30 },
      status: 'Alerta',
      validade: '28/09/2024',
      ultimoPedido: '05/05/2023',
      almoxarifado: 'Central'
    },
    {
      epi: { nome: 'Botina de Segurança', foto: '', codigo: 'EPI-007' },
      categoria: 'Proteção dos Pés',
      estoque: { atual: 38, minimo: 40, maximo: 100 },
      status: 'Alerta',
      validade: 'N/A',
      ultimoPedido: '12/02/2023',
      almoxarifado: 'Obra 01'
    },
    {
      epi: { nome: 'Respirador Semi-facial', foto: '', codigo: 'EPI-008' },
      categoria: 'Proteção Respiratória',
      estoque: { atual: 8, minimo: 15, maximo: 40 },
      status: 'Crítico',
      validade: '05/11/2023',
      ultimoPedido: '20/01/2023',
      almoxarifado: 'Central'
    },
  ];
  
  // Cards de indicadores
  const indicadoresEPIs = [
    { title: 'EPIs em Estoque', value: '1.254', icon: HardHat, iconColor: 'text-brand-blue', trend: { value: 2, positive: false } },
    { title: 'EPIs com Vencimento Próximo', value: '38', icon: Clock, iconColor: 'text-brand-orange', description: 'Próximos 30 dias' },
    { title: 'EPIs em Níveis Críticos', value: '5', icon: AlertCircle, iconColor: 'text-brand-orange', trend: { value: 3, positive: true } },
    { title: 'Pedidos em Andamento', value: '3', icon: Truck, iconColor: 'text-brand-green', description: 'Chegada prevista em 5 dias' },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">EPIs</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Novo EPI
          </Button>
        </div>
        
        {/* Cards de indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadoresEPIs.map((item, index) => (
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
        
        {/* Gráficos de EPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart 
            title="Consumo Mensal de EPIs" 
            data={consumoMensalData} 
            dataKeys={consumoMensalKeys} 
          />
          <BarChart 
            title="Consumo por Contrato (R$)" 
            data={consumoPorContratoData} 
            dataKeys={consumoPorContratoKeys} 
          />
        </div>
        
        {/* Lista de EPIs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Gestão de EPIs</CardTitle>
            <Tabs defaultValue="todos" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="criticos">Críticos</TabsTrigger>
                  <TabsTrigger value="alerta">Em Alerta</TabsTrigger>
                  <TabsTrigger value="vencendo">Vencendo</TabsTrigger>
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
                      placeholder="Buscar EPI..."
                      className="pl-9 h-9"
                    />
                  </div>
                </div>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as categorias</SelectItem>
                    <SelectItem value="cabeca">Proteção da Cabeça</SelectItem>
                    <SelectItem value="maos">Proteção das Mãos</SelectItem>
                    <SelectItem value="olhos">Proteção dos Olhos</SelectItem>
                    <SelectItem value="auditiva">Proteção Auditiva</SelectItem>
                    <SelectItem value="respiratoria">Proteção Respiratória</SelectItem>
                    <SelectItem value="quedas">Proteção contra Quedas</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Almoxarifado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="obra01">Obra 01</SelectItem>
                    <SelectItem value="obra02">Obra 02</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="todos" className="pt-4">
                <DataTable
                  columns={episColumns}
                  data={episData}
                  itemsPerPage={10}
                />
              </TabsContent>
              <TabsContent value="criticos" className="pt-4">
                <DataTable
                  columns={episColumns}
                  data={episData.filter(item => item.status === 'Crítico')}
                  itemsPerPage={10}
                />
              </TabsContent>
              <TabsContent value="alerta" className="pt-4">
                <DataTable
                  columns={episColumns}
                  data={episData.filter(item => item.status === 'Alerta')}
                  itemsPerPage={10}
                />
              </TabsContent>
              <TabsContent value="vencendo" className="pt-4">
                <DataTable
                  columns={episColumns}
                  data={episData.filter(item => 
                    new Date(item.validade.split('/').reverse().join('-')) < 
                    new Date(new Date().setMonth(new Date().getMonth() + 2))
                  )}
                  itemsPerPage={10}
                />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EPIsPage;
