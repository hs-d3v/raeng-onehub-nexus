
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/ui/DataTable';
import BarChart from '@/components/charts/BarChart';
import { UserPlus, Search, Filter, Download, UserCheck, Clock, Calendar, Award, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BiometricTab from '@/components/colaboradores/BiometricTab';

const ColaboradoresPage = () => {
  // Dados simulados para os gráficos
  const headcountPorAreaData = [
    { name: 'Jan', Operacional: 85, Administrativo: 32, Técnico: 48, Gestão: 15 },
    { name: 'Fev', Operacional: 88, Administrativo: 34, Técnico: 47, Gestão: 15 },
    { name: 'Mar', Operacional: 90, Administrativo: 36, Técnico: 49, Gestão: 16 },
    { name: 'Abr', Operacional: 92, Administrativo: 35, Técnico: 51, Gestão: 16 },
    { name: 'Mai', Operacional: 95, Administrativo: 38, Técnico: 54, Gestão: 17 },
    { name: 'Jun', Operacional: 98, Administrativo: 40, Técnico: 55, Gestão: 18 },
  ];
  
  const headcountPorAreaKeys = [
    { key: 'Operacional', name: 'Operacional', color: '#2563eb' },
    { key: 'Administrativo', name: 'Administrativo', color: '#16a34a' },
    { key: 'Técnico', name: 'Técnico', color: '#ea580c' },
    { key: 'Gestão', name: 'Gestão', color: '#7c3aed' },
  ];
  
  const absenteismoData = [
    { name: 'Jan', Atestados: 4.5, Faltas: 1.2, Atrasos: 2.3 },
    { name: 'Fev', Atestados: 3.8, Faltas: 1.5, Atrasos: 2.1 },
    { name: 'Mar', Atestados: 5.2, Faltas: 1.8, Atrasos: 2.5 },
    { name: 'Abr', Atestados: 4.2, Faltas: 1.3, Atrasos: 2.0 },
    { name: 'Mai', Atestados: 3.9, Faltas: 1.1, Atrasos: 1.8 },
    { name: 'Jun', Atestados: 4.1, Faltas: 1.4, Atrasos: 2.2 },
  ];
  
  const absenteismoKeys = [
    { key: 'Atestados', name: 'Atestados', color: '#2563eb' },
    { key: 'Faltas', name: 'Faltas', color: '#ea580c' },
    { key: 'Atrasos', name: 'Atrasos', color: '#7c3aed' },
  ];
  
  // Dados simulados para a tabela de colaboradores
  const colaboradoresColumns = [
    { 
      header: 'Colaborador', 
      accessorKey: 'colaborador',
      cell: ({ nome, foto, matricula }: { nome: string, foto: string, matricula: string }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={foto} />
            <AvatarFallback>{nome.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{nome}</p>
            <p className="text-xs text-gray-500">Matrícula: {matricula}</p>
          </div>
        </div>
      )
    },
    { header: 'Cargo', accessorKey: 'cargo' },
    { 
      header: 'Departamento', 
      accessorKey: 'departamento',
      cell: (value: string) => {
        let color;
        switch(value) {
          case 'Operacional':
            color = 'bg-brand-blue/10 text-brand-blue';
            break;
          case 'Administrativo':
            color = 'bg-brand-green/10 text-brand-green';
            break;
          case 'Técnico':
            color = 'bg-brand-orange/10 text-brand-orange';
            break;
          case 'Gestão':
            color = 'bg-brand-purple/10 text-brand-purple';
            break;
          default:
            color = 'bg-gray-100 text-gray-800';
        }
        return <Badge variant="outline" className={color}>{value}</Badge>;
      }
    },
    { header: 'Admissão', accessorKey: 'admissao' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value: string) => {
        let badgeClass = "";
        switch(value) {
          case 'Ativo':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'Férias':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'Afastado':
            badgeClass = "bg-orange-100 text-orange-800";
            break;
          case 'Licença':
            badgeClass = "bg-purple-100 text-purple-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        return <Badge className={badgeClass}>{value}</Badge>;
      }
    },
    { header: 'Próx. ASO', accessorKey: 'proxAso' },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <UserCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];
  
  const colaboradoresData = [
    {
      colaborador: { nome: 'João Silva', foto: '/placeholder.svg', matricula: '0001' },
      cargo: 'Técnico de Segurança',
      departamento: 'Técnico',
      admissao: '15/03/2021',
      status: 'Ativo',
      proxAso: '12/08/2023'
    },
    {
      colaborador: { nome: 'Maria Oliveira', foto: '/placeholder.svg', matricula: '0002' },
      cargo: 'Engenheira Civil',
      departamento: 'Técnico',
      admissao: '22/01/2020',
      status: 'Ativo',
      proxAso: '05/09/2023'
    },
    {
      colaborador: { nome: 'Carlos Santos', foto: '/placeholder.svg', matricula: '0003' },
      cargo: 'Auxiliar Administrativo',
      departamento: 'Administrativo',
      admissao: '10/06/2022',
      status: 'Férias',
      proxAso: '18/11/2023'
    },
    {
      colaborador: { nome: 'Ana Costa', foto: '/placeholder.svg', matricula: '0004' },
      cargo: 'Gerente de Projetos',
      departamento: 'Gestão',
      admissao: '05/02/2019',
      status: 'Ativo',
      proxAso: '30/07/2023'
    },
    {
      colaborador: { nome: 'Paulo Mendes', foto: '/placeholder.svg', matricula: '0005' },
      cargo: 'Operador de Equipamentos',
      departamento: 'Operacional',
      admissao: '14/08/2021',
      status: 'Afastado',
      proxAso: '22/10/2023'
    },
    {
      colaborador: { nome: 'Fernanda Lima', foto: '/placeholder.svg', matricula: '0006' },
      cargo: 'Analista de RH',
      departamento: 'Administrativo',
      admissao: '03/04/2020',
      status: 'Ativo',
      proxAso: '09/09/2023'
    },
    {
      colaborador: { nome: 'Roberto Alves', foto: '/placeholder.svg', matricula: '0007' },
      cargo: 'Técnico Eletricista',
      departamento: 'Técnico',
      admissao: '20/09/2022',
      status: 'Ativo',
      proxAso: '15/12/2023'
    },
    {
      colaborador: { nome: 'Juliana Pereira', foto: '/placeholder.svg', matricula: '0008' },
      cargo: 'Coordenadora de Obras',
      departamento: 'Gestão',
      admissao: '11/05/2021',
      status: 'Licença',
      proxAso: '28/08/2023'
    },
  ];
  
  // Cards de indicadores
  const indicadoresRH = [
    { title: 'Total de Colaboradores', value: '211', icon: UserCheck, iconColor: 'text-brand-blue', trend: { value: 5, positive: true } },
    { title: 'Colaboradores Ativos', value: '187', icon: UserCheck, iconColor: 'text-brand-green', description: '24 afastados ou em férias' },
    { title: 'Taxa de Absenteísmo', value: '4.2%', icon: Clock, iconColor: 'text-brand-orange', trend: { value: 0.8, positive: false } },
    { title: 'Treinamentos Pendentes', value: '8', icon: Award, iconColor: 'text-brand-purple', description: 'Próximos 30 dias' },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Colaboradores</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <UserPlus className="mr-2 h-4 w-4" /> Novo Colaborador
          </Button>
        </div>
        
        {/* Cards de indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadoresRH.map((item, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                    {item.trend && (
                      <div className="flex items-center mt-2">
                        <span
                          className={`text-xs font-medium ${
                            item.trend.positive ? "text-brand-green" : "text-brand-orange"
                          }`}
                        >
                          {item.trend.positive ? "+" : "-"}{item.trend.value}%
                        </span>
                        <span className="text-xs text-gray-500 ml-1">em relação ao mês anterior</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-full bg-opacity-10 ${item.iconColor.replace('text-', 'bg-')}`}>
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Gráficos de RH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart 
            title="Headcount por Área" 
            data={headcountPorAreaData} 
            dataKeys={headcountPorAreaKeys} 
          />
          <BarChart 
            title="Índice de Absenteísmo (%)" 
            data={absenteismoData} 
            dataKeys={absenteismoKeys} 
          />
        </div>
        
        {/* Principais abas da página */}
        <Tabs defaultValue="gestao" className="w-full">
          <TabsList>
            <TabsTrigger value="gestao">Gestão</TabsTrigger>
            <TabsTrigger value="validacoes">Validações</TabsTrigger>
          </TabsList>
          
          {/* Aba de Gestão de Colaboradores */}
          <TabsContent value="gestao">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Gestão de Colaboradores</CardTitle>
                <Tabs defaultValue="todos" className="w-full">
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="todos">Todos</TabsTrigger>
                      <TabsTrigger value="ativos">Ativos</TabsTrigger>
                      <TabsTrigger value="afastados">Afastados</TabsTrigger>
                      <TabsTrigger value="ferias">Em Férias</TabsTrigger>
                    </TabsList>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filtros Avançados
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
                          placeholder="Buscar por nome, matrícula ou cargo..."
                          className="pl-9 h-9"
                        />
                      </div>
                    </div>
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="operacional">Operacional</SelectItem>
                        <SelectItem value="administrativo">Administrativo</SelectItem>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                        <SelectItem value="gestao">Gestão</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="ferias">Férias</SelectItem>
                        <SelectItem value="afastado">Afastado</SelectItem>
                        <SelectItem value="licenca">Licença</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <TabsContent value="todos" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={colaboradoresData}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                  <TabsContent value="ativos" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={colaboradoresData.filter(item => item.status === 'Ativo')}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                  <TabsContent value="afastados" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={colaboradoresData.filter(item => item.status === 'Afastado' || item.status === 'Licença')}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                  <TabsContent value="ferias" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={colaboradoresData.filter(item => item.status === 'Férias')}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </TabsContent>
          
          {/* Aba de Validações Biométricas */}
          <TabsContent value="validacoes">
            <BiometricTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ColaboradoresPage;
