
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable, { Column } from '@/components/ui/DataTable';
import StatsCard from '@/components/widgets/StatsCard';
import { Plus, Search, Filter, Download, Tag, Wrench, Check, AlertTriangle, Clock, User, Calendar, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const FerramentasPage = () => {
  // Cards de indicadores
  const indicadoresFerramentas = [
    { title: 'Total de Ferramentas', value: '284', icon: Wrench, iconColor: 'text-brand-blue' },
    { title: 'Ferramentas Disponíveis', value: '196', icon: Check, iconColor: 'text-brand-green', description: '69% do total' },
    { title: 'Em Manutenção', value: '32', icon: AlertTriangle, iconColor: 'text-brand-orange', trend: { value: 5, positive: false } },
    { title: 'Manutenções Programadas', value: '18', icon: Calendar, iconColor: 'text-brand-purple', description: 'Próximos 30 dias' },
  ];
  
  // Dados simulados para a tabela de ferramentas
  const ferramentasColumns: Column[] = [
    { 
      header: 'Ferramenta', 
      accessorKey: 'ferramenta',
      cell: ({ row }) => {
        const { nome, codigo } = row.original.ferramenta;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
              <Wrench className="h-6 w-6 text-gray-600" />
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
    { header: 'Patrimônio', accessorKey: 'patrimonio' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        let badgeClass = "";
        switch(value) {
          case 'Disponível':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'Em Uso':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'Manutenção':
            badgeClass = "bg-amber-100 text-amber-800";
            break;
          case 'Danificada':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        return <Badge className={badgeClass}>{value}</Badge>;
      }
    },
    { 
      header: 'Responsável', 
      accessorKey: 'responsavel',
      cell: ({ row }) => {
        const value = row.original.responsavel;
        if (!value) return <span className="text-sm text-gray-500">-</span>;
        
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={value.foto} />
              <AvatarFallback>{value.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{value.nome}</span>
          </div>
        );
      }
    },
    { header: 'Localização', accessorKey: 'localizacao' },
    { header: 'Próx. Manutenção', accessorKey: 'proximaManutencao' },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Wrench className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];
  
  const ferramentasData = [
    {
      ferramenta: { nome: 'Furadeira Industrial', codigo: 'FER-001' },
      categoria: 'Elétrica',
      patrimonio: 'PT-2021-0123',
      status: 'Disponível',
      responsavel: null,
      localizacao: 'Almoxarifado Central',
      proximaManutencao: '15/08/2023'
    },
    {
      ferramenta: { nome: 'Serra Circular', codigo: 'FER-002' },
      categoria: 'Elétrica',
      patrimonio: 'PT-2021-0124',
      status: 'Em Uso',
      responsavel: { nome: 'João Silva', foto: '/placeholder.svg' },
      localizacao: 'Obra 01 - Pavimento 3',
      proximaManutencao: '22/09/2023'
    },
    {
      ferramenta: { nome: 'Martelo Demolidor', codigo: 'FER-003' },
      categoria: 'Elétrica',
      patrimonio: 'PT-2022-0045',
      status: 'Manutenção',
      responsavel: null,
      localizacao: 'Oficina de Manutenção',
      proximaManutencao: '05/08/2023'
    },
    {
      ferramenta: { nome: 'Andaime 2m', codigo: 'FER-004' },
      categoria: 'Estrutura',
      patrimonio: 'PT-2020-0234',
      status: 'Em Uso',
      responsavel: { nome: 'Carlos Santos', foto: '/placeholder.svg' },
      localizacao: 'Obra 02 - Fachada',
      proximaManutencao: '10/10/2023'
    },
    {
      ferramenta: { nome: 'Nível a Laser', codigo: 'FER-005' },
      categoria: 'Medição',
      patrimonio: 'PT-2022-0178',
      status: 'Disponível',
      responsavel: null,
      localizacao: 'Almoxarifado Central',
      proximaManutencao: '12/11/2023'
    },
    {
      ferramenta: { nome: 'Escada Extensível', codigo: 'FER-006' },
      categoria: 'Estrutura',
      patrimonio: 'PT-2021-0098',
      status: 'Danificada',
      responsavel: null,
      localizacao: 'Manutenção Externa',
      proximaManutencao: '01/08/2023'
    },
    {
      ferramenta: { nome: 'Martelete Pneumático', codigo: 'FER-007' },
      categoria: 'Pneumática',
      patrimonio: 'PT-2022-0205',
      status: 'Em Uso',
      responsavel: { nome: 'Paulo Mendes', foto: '/placeholder.svg' },
      localizacao: 'Obra 01 - Subsolo',
      proximaManutencao: '18/09/2023'
    },
    {
      ferramenta: { nome: 'Betoneira 150L', codigo: 'FER-008' },
      categoria: 'Elétrica',
      patrimonio: 'PT-2020-0087',
      status: 'Disponível',
      responsavel: null,
      localizacao: 'Almoxarifado Obra 01',
      proximaManutencao: '25/10/2023'
    },
  ];
  
  // Próximas manutenções
  const proximasManutencoes = [
    {
      id: 1,
      ferramenta: 'Martelo Demolidor',
      codigo: 'FER-003',
      data: '05/08/2023',
      tipo: 'Preventiva',
      prioridade: 'Alta'
    },
    {
      id: 2,
      ferramenta: 'Escada Extensível',
      codigo: 'FER-006',
      data: '01/08/2023',
      tipo: 'Corretiva',
      prioridade: 'Alta'
    },
    {
      id: 3,
      ferramenta: 'Furadeira Industrial',
      codigo: 'FER-001',
      data: '15/08/2023',
      tipo: 'Preventiva',
      prioridade: 'Média'
    },
    {
      id: 4,
      ferramenta: 'Serra Circular',
      codigo: 'FER-002',
      data: '22/09/2023',
      tipo: 'Preventiva',
      prioridade: 'Média'
    },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ferramentas</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Nova Ferramenta
          </Button>
        </div>
        
        {/* Cards de indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadoresFerramentas.map((item, index) => (
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
        
        {/* Informações de Ferramentas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de ferramentas - ocupa 2/3 */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Gestão de Ferramentas</CardTitle>
              <Tabs defaultValue="todos" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
                    <TabsTrigger value="em-uso">Em Uso</TabsTrigger>
                    <TabsTrigger value="manutencao">Manutenção</TabsTrigger>
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
                        placeholder="Buscar ferramenta..."
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
                      <SelectItem value="eletrica">Elétrica</SelectItem>
                      <SelectItem value="pneumatica">Pneumática</SelectItem>
                      <SelectItem value="estrutura">Estrutura</SelectItem>
                      <SelectItem value="medicao">Medição</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Localização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="almoxarifado">Almoxarifado Central</SelectItem>
                      <SelectItem value="obra01">Obra 01</SelectItem>
                      <SelectItem value="obra02">Obra 02</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <TabsContent value="todos" className="pt-4">
                  <DataTable
                    columns={ferramentasColumns}
                    data={ferramentasData}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="disponiveis" className="pt-4">
                  <DataTable
                    columns={ferramentasColumns}
                    data={ferramentasData.filter(item => item.status === 'Disponível')}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="em-uso" className="pt-4">
                  <DataTable
                    columns={ferramentasColumns}
                    data={ferramentasData.filter(item => item.status === 'Em Uso')}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="manutencao" className="pt-4">
                  <DataTable
                    columns={ferramentasColumns}
                    data={ferramentasData.filter(item => item.status === 'Manutenção' || item.status === 'Danificada')}
                    itemsPerPage={10}
                  />
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
          
          {/* Próximas manutenções - ocupa 1/3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-orange" />
                Próximas Manutenções
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximasManutencoes.map((item) => (
                  <div key={item.id} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="w-14 h-14 rounded-lg bg-brand-blue/10 text-brand-blue flex flex-col items-center justify-center mr-4">
                      <span className="text-xs font-semibold">{item.data.split('/')[1]}</span>
                      <span className="text-lg font-bold">{item.data.split('/')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.ferramenta}</h4>
                          <p className="text-xs text-gray-500">Cód: {item.codigo}</p>
                          <p className="text-xs text-gray-500">{item.tipo}</p>
                        </div>
                        <Badge className={`${
                          item.prioridade === 'Alta' 
                            ? 'bg-red-100 text-red-800' 
                            : item.prioridade === 'Média'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.prioridade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  Ver Todas as Manutenções
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Ferramentas por empréstimo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-brand-blue" />
              Empréstimos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ferramentasData
                .filter(item => item.status === 'Em Uso')
                .map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.ferramenta.nome}</p>
                      <p className="text-xs text-gray-500">
                        {item.categoria} | Patrimônio: {item.patrimonio}
                      </p>
                      <p className="text-xs text-gray-500">Localização: {item.localizacao}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.responsavel?.foto} />
                        <AvatarFallback>{item.responsavel?.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{item.responsavel?.nome}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Empréstimo: 15/07/2023</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Tag className="h-4 w-4 mr-2" /> Devolver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FerramentasPage;
