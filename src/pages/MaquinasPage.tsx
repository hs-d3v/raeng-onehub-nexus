
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/ui/DataTable';
import StatsCard from '@/components/widgets/StatsCard';
import { Plus, Search, Filter, Download, Truck, Wrench, CreditCard, Fuel, Calendar, FileText, BarChart2, MapPin, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const MaquinasPage = () => {
  // Cards de indicadores
  const indicadoresMaquinas = [
    { title: 'Total de Máquinas', value: '48', icon: Truck, iconColor: 'text-brand-blue' },
    { title: 'Máquinas Operacionais', value: '42', icon: Truck, iconColor: 'text-brand-green', description: '87% da frota' },
    { title: 'Em Manutenção', value: '6', icon: Wrench, iconColor: 'text-brand-orange', trend: { value: 2, positive: true } },
    { title: 'Custo Operacional', value: 'R$ 138.450', icon: CreditCard, iconColor: 'text-brand-purple', description: 'Últimos 30 dias' },
  ];
  
  // Dados simulados para a tabela de máquinas
  const maquinasColumns = [
    { 
      header: 'Máquina', 
      accessorKey: 'maquina',
      cell: ({ nome, modelo, codigo }: { nome: string, modelo: string, codigo: string }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
            <Truck className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-sm">{nome}</p>
            <p className="text-xs text-gray-500">Modelo: {modelo} | Cód: {codigo}</p>
          </div>
        </div>
      )
    },
    { header: 'Categoria', accessorKey: 'categoria' },
    { header: 'Horímetro', accessorKey: 'horimetro' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value: string) => {
        let badgeClass = "";
        switch(value) {
          case 'Operacional':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'Em Uso':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'Manutenção':
            badgeClass = "bg-amber-100 text-amber-800";
            break;
          case 'Inoperante':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        return <Badge className={badgeClass}>{value}</Badge>;
      }
    },
    { header: 'Contrato', accessorKey: 'contrato' },
    { header: 'Localização', accessorKey: 'localizacao' },
    { 
      header: 'Próx. Manutenção', 
      accessorKey: 'proximaManutencao',
      cell: ({ data, proximidade }: { data: string, proximidade: number }) => {
        let barColor = "bg-green-500";
        if (proximidade <= 30) {
          barColor = "bg-red-500";
        } else if (proximidade <= 60) {
          barColor = "bg-amber-500";
        }
        
        return (
          <div className="flex items-center gap-2">
            <span>{data}</span>
            <div className="w-16">
              <Progress value={proximidade} max={100} className={`h-2 ${barColor}`} />
            </div>
          </div>
        );
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Fuel className="h-4 w-4" />
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
  
  const maquinasData = [
    {
      maquina: { nome: 'Retroescavadeira', modelo: 'JCB 3CX', codigo: 'MAQ-001' },
      categoria: 'Escavação',
      horimetro: '1.245 h',
      status: 'Operacional',
      contrato: 'CONT-003',
      localizacao: 'Obra 01 - Terraplenagem',
      proximaManutencao: { data: '15/08/2023', proximidade: 80 }
    },
    {
      maquina: { nome: 'Pá Carregadeira', modelo: 'CAT 938K', codigo: 'MAQ-002' },
      categoria: 'Movimentação',
      horimetro: '2.560 h',
      status: 'Em Uso',
      contrato: 'CONT-001',
      localizacao: 'Obra 02 - Fundações',
      proximaManutencao: { data: '22/07/2023', proximidade: 20 }
    },
    {
      maquina: { nome: 'Caminhão Basculante', modelo: 'Volvo FMX 460', codigo: 'MAQ-003' },
      categoria: 'Transporte',
      horimetro: '45.780 km',
      status: 'Manutenção',
      contrato: 'CONT-002',
      localizacao: 'Oficina Central',
      proximaManutencao: { data: '05/07/2023', proximidade: 10 }
    },
    {
      maquina: { nome: 'Plataforma Elevatória', modelo: 'JLG 450AJ', codigo: 'MAQ-004' },
      categoria: 'Elevação',
      horimetro: '890 h',
      status: 'Operacional',
      contrato: 'CONT-004',
      localizacao: 'Almoxarifado',
      proximaManutencao: { data: '30/09/2023', proximidade: 95 }
    },
    {
      maquina: { nome: 'Compactador de Solo', modelo: 'Dynapac CA2500', codigo: 'MAQ-005' },
      categoria: 'Compactação',
      horimetro: '1.120 h',
      status: 'Em Uso',
      contrato: 'CONT-003',
      localizacao: 'Obra 01 - Pavimentação',
      proximaManutencao: { data: '10/08/2023', proximidade: 75 }
    },
    {
      maquina: { nome: 'Minicarregadeira', modelo: 'Bobcat S650', codigo: 'MAQ-006' },
      categoria: 'Movimentação',
      horimetro: '780 h',
      status: 'Inoperante',
      contrato: 'CONT-005',
      localizacao: 'Manutenção Externa',
      proximaManutencao: { data: '15/07/2023', proximidade: 30 }
    },
    {
      maquina: { nome: 'Empilhadeira', modelo: 'Toyota 8FGU25', codigo: 'MAQ-007' },
      categoria: 'Movimentação',
      horimetro: '3.450 h',
      status: 'Operacional',
      contrato: 'CONT-002',
      localizacao: 'Almoxarifado Central',
      proximaManutencao: { data: '28/08/2023', proximidade: 85 }
    },
    {
      maquina: { nome: 'Gerador', modelo: 'Stemac 150kVA', codigo: 'MAQ-008' },
      categoria: 'Energia',
      horimetro: '2.890 h',
      status: 'Manutenção',
      contrato: 'CONT-001',
      localizacao: 'Oficina Central',
      proximaManutencao: { data: '11/07/2023', proximidade: 25 }
    },
  ];
  
  // Manutenções recentes
  const manutencoesMaquinas = [
    {
      id: 1,
      maquina: 'Retroescavadeira JCB 3CX',
      codigo: 'MAQ-001',
      data: '23/06/2023',
      tipo: 'Preventiva',
      servico: 'Troca de Óleo e Filtros',
      custo: 'R$ 1.280,00'
    },
    {
      id: 2,
      maquina: 'Caminhão Basculante Volvo FMX 460',
      codigo: 'MAQ-003',
      data: '18/06/2023',
      tipo: 'Corretiva',
      servico: 'Reparo Sistema Hidráulico',
      custo: 'R$ 3.450,00'
    },
    {
      id: 3,
      maquina: 'Gerador Stemac 150kVA',
      codigo: 'MAQ-008',
      data: '10/06/2023',
      tipo: 'Preventiva',
      servico: 'Verificação Geral e Testes',
      custo: 'R$ 780,00'
    },
    {
      id: 4,
      maquina: 'Minicarregadeira Bobcat S650',
      codigo: 'MAQ-006',
      data: '05/06/2023',
      tipo: 'Corretiva',
      servico: 'Substituição Bomba Hidráulica',
      custo: 'R$ 4.250,00'
    }
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Máquinas</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Nova Máquina
          </Button>
        </div>
        
        {/* Cards de indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadoresMaquinas.map((item, index) => (
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
        
        {/* Informações de Máquinas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de máquinas - ocupa 2/3 */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Gestão de Máquinas</CardTitle>
              <Tabs defaultValue="todos" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="operacionais">Operacionais</TabsTrigger>
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
                        placeholder="Buscar máquina..."
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
                      <SelectItem value="escavacao">Escavação</SelectItem>
                      <SelectItem value="movimentacao">Movimentação</SelectItem>
                      <SelectItem value="transporte">Transporte</SelectItem>
                      <SelectItem value="elevacao">Elevação</SelectItem>
                      <SelectItem value="energia">Energia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Contrato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="cont-001">CONT-001</SelectItem>
                      <SelectItem value="cont-002">CONT-002</SelectItem>
                      <SelectItem value="cont-003">CONT-003</SelectItem>
                      <SelectItem value="cont-004">CONT-004</SelectItem>
                      <SelectItem value="cont-005">CONT-005</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <TabsContent value="todos" className="pt-4">
                  <DataTable
                    columns={maquinasColumns}
                    data={maquinasData}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="operacionais" className="pt-4">
                  <DataTable
                    columns={maquinasColumns}
                    data={maquinasData.filter(item => item.status === 'Operacional')}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="em-uso" className="pt-4">
                  <DataTable
                    columns={maquinasColumns}
                    data={maquinasData.filter(item => item.status === 'Em Uso')}
                    itemsPerPage={10}
                  />
                </TabsContent>
                <TabsContent value="manutencao" className="pt-4">
                  <DataTable
                    columns={maquinasColumns}
                    data={maquinasData.filter(item => item.status === 'Manutenção' || item.status === 'Inoperante')}
                    itemsPerPage={10}
                  />
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
          
          {/* Manutenções recentes - ocupa 1/3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-brand-orange" />
                Manutenções Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {manutencoesMaquinas.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="w-14 h-14 rounded-lg bg-brand-orange/10 text-brand-orange flex flex-col items-center justify-center shrink-0">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.maquina}</h4>
                      <p className="text-xs text-gray-500">Cód: {item.codigo}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.tipo}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.data}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-brand-blue">
                          {item.custo}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.servico}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  Ver Histórico Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Métricas e Localização */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Métricas operacionais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-brand-blue" />
                Métricas Operacionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Horas Trabalhadas</p>
                        <p className="text-2xl font-bold">12.487</p>
                        <p className="text-xs text-gray-500">Último mês</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">+8%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Consumo Combustível</p>
                        <p className="text-2xl font-bold">8.950 L</p>
                        <p className="text-xs text-gray-500">Último mês</p>
                      </div>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Tempo Parado</p>
                        <p className="text-2xl font-bold">345 h</p>
                        <p className="text-xs text-gray-500">Último mês</p>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">-3%</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <h3 className="text-sm font-medium">Máquinas com Alertas de Manutenção</h3>
                  <div className="space-y-3">
                    {maquinasData
                      .filter(item => item.proximaManutencao.proximidade <= 30)
                      .map((maquina, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-amber-50/50">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{maquina.maquina.nome} ({maquina.maquina.codigo})</p>
                          <p className="text-xs text-gray-600">
                            Manutenção em {maquina.proximaManutencao.data} | Horímetro: {maquina.horimetro}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          <Calendar className="h-4 w-4 mr-2" /> Agendar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Localização de máquinas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-green" />
                Localização de Máquinas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Mapa de Localização</p>
                </div>
                
                <div className="pt-3 space-y-3">
                  <h3 className="text-sm font-medium">Distribuição por Local</h3>
                  <div className="space-y-2">
                    {[
                      { local: 'Obra 01', quantidade: 12, cor: 'bg-brand-blue' },
                      { local: 'Obra 02', quantidade: 8, cor: 'bg-brand-green' },
                      { local: 'Almoxarifado', quantidade: 18, cor: 'bg-brand-purple' },
                      { local: 'Manutenção', quantidade: 10, cor: 'bg-brand-orange' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.cor} mr-2`}></div>
                        <p className="text-sm flex-1">{item.local}</p>
                        <p className="text-sm font-medium">{item.quantidade}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  Ver Mapa Detalhado
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MaquinasPage;
