import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/ui/DataTable';
import BarChart from '@/components/charts/BarChart';
import {
  UserPlus, Search, Filter, Download, UserCheck, Clock, Calendar, Award, FileText,
  AlertTriangle, Users, MoreVertical, Edit, Trash2 // Usado para o botão de menu de ações
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BiometricTab from '@/components/colaboradores/BiometricTab';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FichaTecnica from '@/components/colaboradores/FichaTecnica';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem
} from '@/components/ui/context-menu';

const ColaboradoresPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [loadingColaboradores, setLoadingColaboradores] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroDepartamento, setFiltroDepartamento] = useState("todos");

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        setLoadingColaboradores(true);
        const { data, error } = await supabase
          .from('colaboradores')
          .select('*');

        if (error) {
          throw error;
        }

        setColaboradores(data || []);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de colaboradores",
          variant: "destructive",
        });
      } finally {
        setLoadingColaboradores(false);
      }
    };

    fetchColaboradores();
  }, [toast]);
  
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

  const filtrarColaboradores = () => {
    let filtrados = [...colaboradores];
    
    if (filtroStatus !== "todos") {
      const statusValue = filtroStatus === "ativo";
      filtrados = filtrados.filter(col => col.ativo === statusValue);
    }
    
    if (filtroDepartamento !== "todos") {
      filtrados = filtrados.filter(col => col.departamento === filtroDepartamento);
    }
    
    return filtrados;
  };

  const [idExcluindo, setIdExcluindo] = useState<string | null>(null);

  // Função para excluir colaborador
  const handleExcluirColaborador = async (colaboradorId: string) => {
    if (!window.confirm("Confirma a exclusão deste colaborador?")) return;
    try {
      setIdExcluindo(colaboradorId);
      const { error } = await supabase.from('colaboradores').delete().eq('id', colaboradorId);
      if (error) throw error;
      setColaboradores(prev => prev.filter(col => col.id !== colaboradorId));
      toast({
        title: "Colaborador excluído",
        description: "O colaborador foi removido com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir este colaborador.",
        variant: "destructive",
      });
    } finally {
      setIdExcluindo(null);
    }
  };

  const colaboradoresColumns = [
    { 
      header: 'Colaborador', 
      accessorKey: 'colaborador',
      cell: (value: any, row: any) => {
        if (!row || !row.original) return null;
        
        const colaborador = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={colaborador.foto_url || "/placeholder.svg"} />
              <AvatarFallback>{colaborador.nome?.substring(0, 2).toUpperCase() || 'CO'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{colaborador.nome}</p>
              <p className="text-xs text-gray-500">Matrícula: {colaborador.matricula}</p>
            </div>
          </div>
        );
      }
    },
    { header: 'Cargo', accessorKey: 'cargo' },
    { 
      header: 'Departamento', 
      accessorKey: 'departamento',
      cell: (value: string) => {
        if (!value) return null;
        
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
    { 
      header: 'Admissão', 
      accessorKey: 'data_admissao',
      cell: (value: string) => value ? new Date(value).toLocaleDateString('pt-BR') : 'N/A'
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value: string) => {
        if (!value) return null;
        
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
    { 
      header: 'Próx. ASO', 
      accessorKey: 'proxAso',
      cell: (value: string) => {
        if (!value) return 'N/A';
        
        const dataASO = new Date(value);
        const hoje = new Date();
        const diasDiferenca = Math.floor((dataASO.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diasDiferenca < 0) {
          return (
            <div className="flex items-center">
              <Badge className="bg-red-100 text-red-800">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Vencido
              </Badge>
            </div>
          );
        } else if (diasDiferenca < 30) {
          return (
            <div className="flex items-center">
              <Badge className="bg-yellow-100 text-yellow-800">
                <Clock className="h-3 w-3 mr-1" />
                {dataASO.toLocaleDateString('pt-BR')}
              </Badge>
            </div>
          );
        } else {
          return dataASO.toLocaleDateString('pt-BR');
        }
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: (value: any, row: any) => {
        if (!row || !row.original) return null;
        const colaborador = row.original;
        return (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 p-0 flex justify-center items-center">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent align="end" className="w-40">
              <ContextMenuItem
                onClick={() => navigate(`/colaboradores/${colaborador.id}`)}
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Detalhes
                </span>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  // Para futura implementação de edição, redireciona para a página de edição (placeholder)
                  navigate(`/colaboradores/${colaborador.id}/editar`);
                }}
              >
                <span className="flex items-center gap-2">
                  <Edit className="h-4 w-4" /> Editar
                </span>
              </ContextMenuItem>
              <ContextMenuItem
                className="text-red-600 focus:bg-red-50"
                onClick={() => handleExcluirColaborador(colaborador.id)}
                disabled={idExcluindo === colaborador.id}
              >
                <span className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" /> {idExcluindo === colaborador.id ? "Excluindo..." : "Excluir"}
                </span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );
      }
    },
  ];
  
  const indicadoresRH = [
    { title: 'Total de Colaboradores', value: colaboradores.length.toString(), icon: Users, iconColor: 'text-brand-blue', trend: { value: 5, positive: true } },
    { title: 'Colaboradores Ativos', value: colaboradores.filter(c => c.ativo).length.toString(), icon: UserCheck, iconColor: 'text-brand-green', description: `${colaboradores.filter(c => !c.ativo).length} afastados ou em férias` },
    { title: 'Taxa de Absenteísmo', value: '4.2%', icon: Clock, iconColor: 'text-brand-orange', trend: { value: 0.8, positive: false } },
    { title: 'Treinamentos Pendentes', value: '8', icon: Award, iconColor: 'text-brand-purple', description: 'Próximos 30 dias' },
  ];

  const handleSaveColaborador = () => {
    setOpenDialog(false);
    const fetchColaboradores = async () => {
      try {
        setLoadingColaboradores(true);
        const { data, error } = await supabase
          .from('colaboradores')
          .select('*');

        if (error) {
          throw error;
        }

        setColaboradores(data || []);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de colaboradores",
          variant: "destructive",
        });
      } finally {
        setLoadingColaboradores(false);
      }
    };

    fetchColaboradores();
    toast({
      title: "Sucesso",
      description: "Colaborador cadastrado com sucesso",
    });
  };

  // Função para mapear os dados do colaborador para o formato esperado pelo DataTable
  const prepareColaboradoresData = (colaboradores: any[]) => {
    return colaboradores.map(col => ({
      ...col,
      status: col.ativo ? 'Ativo' : 'Inativo',
      proxAso: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 180))).toISOString().split('T')[0]
    }));
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Colaboradores</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-brand-blue hover:bg-brand-blue/90">
                <UserPlus className="mr-2 h-4 w-4" /> Novo Colaborador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Colaborador</DialogTitle>
              </DialogHeader>
              <FichaTecnica onSave={handleSaveColaborador} />
            </DialogContent>
          </Dialog>
        </div>
        
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
        
        <Tabs defaultValue="gestao" className="w-full">
          <TabsList>
            <TabsTrigger value="gestao">Gestão</TabsTrigger>
            <TabsTrigger value="validacoes">Validações</TabsTrigger>
          </TabsList>
          
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
                    <Select 
                      value={filtroDepartamento} 
                      onValueChange={setFiltroDepartamento}
                    >
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="Operacional">Operacional</SelectItem>
                        <SelectItem value="Administrativo">Administrativo</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Gestão">Gestão</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filtroStatus}
                      onValueChange={setFiltroStatus}
                    >
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {loadingColaboradores ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-pulse">Carregando colaboradores...</div>
                    </div>
                  ) : (
                    <TabsContent value="todos" className="pt-4">
                      <DataTable
                        columns={colaboradoresColumns}
                        data={prepareColaboradoresData(filtrarColaboradores())}
                        itemsPerPage={10}
                      />
                    </TabsContent>
                  )}

                  <TabsContent value="ativos" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={prepareColaboradoresData(filtrarColaboradores().filter(item => item.ativo))}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                  
                  <TabsContent value="afastados" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={prepareColaboradoresData(filtrarColaboradores().filter(item => !item.ativo))}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                  
                  <TabsContent value="ferias" className="pt-4">
                    <DataTable
                      columns={colaboradoresColumns}
                      data={prepareColaboradoresData(filtrarColaboradores().filter(item => item.ativo).slice(0, 2))}
                      itemsPerPage={10}
                    />
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </TabsContent>
          
          <TabsContent value="validacoes">
            <BiometricTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ColaboradoresPage;
