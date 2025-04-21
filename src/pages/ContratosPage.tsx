import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable, { Column } from '@/components/ui/DataTable';
import {
  FileText, Search, Filter, Download, PlusCircle, MoreVertical
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { safeFormatDate } from '@/utils/dateUtils';

interface Contrato {
  id: string;
  numero: string;
  cliente: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  status: string;
}

interface Aditivo {
  id: string;
  numero: string;
  contrato: string;
  descricao: string;
  data: string;
  valor: string;
  status: string;
}

const ContratosPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [date, setDate] = useState<Date>();

  const contratosData: Contrato[] = [
    {
      id: '1',
      numero: '2023-001',
      cliente: 'Empresa A',
      descricao: 'Fornecimento de materiais de escritório',
      dataInicio: '2023-01-15',
      dataTermino: '2023-12-31',
      status: 'ativo',
    },
    {
      id: '2',
      numero: '2023-002',
      cliente: 'Empresa B',
      descricao: 'Serviços de consultoria em TI',
      dataInicio: '2023-03-01',
      dataTermino: '2023-06-30',
      status: 'finalizado',
    },
    {
      id: '3',
      numero: '2023-003',
      cliente: 'Empresa C',
      descricao: 'Manutenção predial',
      dataInicio: '2023-05-10',
      dataTermino: '2023-11-15',
      status: 'pendente',
    },
    {
      id: '4',
      numero: '2023-004',
      cliente: 'Empresa D',
      descricao: 'Serviços de limpeza',
      dataInicio: '2023-02-20',
      dataTermino: '2023-12-20',
      status: 'ativo',
    },
  ];

  const aditivosData: Aditivo[] = [
    {
      id: '101',
      numero: '2023-A01',
      contrato: '2023-001',
      descricao: 'Aditivo para aumento de prazo',
      data: '2023-07-01',
      valor: 'R$ 5.000,00',
      status: 'ativo',
    },
    {
      id: '102',
      numero: '2023-A02',
      contrato: '2023-002',
      descricao: 'Aditivo para alteração de escopo',
      data: '2023-04-15',
      valor: 'R$ 2.500,00',
      status: 'pendente',
    },
    {
      id: '103',
      numero: '2023-A03',
      contrato: '2023-003',
      descricao: 'Aditivo para reajuste de valor',
      data: '2023-08-01',
      valor: 'R$ 1.000,00',
      status: 'cancelado',
    },
  ];

  const filtrarContratos = () => {
    let filtrados = [...contratosData];
    
    if (filtroStatus !== "todos") {
      filtrados = filtrados.filter(col => col.status === filtroStatus);
    }
    
    return filtrados;
  };
  
  const contratosColumns: Column[] = [
    { header: 'Número', accessorKey: 'numero' },
    { header: 'Cliente', accessorKey: 'cliente' },
    { header: 'Descrição', accessorKey: 'descricao' },
    { 
      header: 'Início', 
      accessorKey: 'dataInicio',
      cell: ({ row }) => safeFormatDate(row.original.dataInicio)
    },
    { 
      header: 'Término', 
      accessorKey: 'dataTermino',
      cell: ({ row }) => safeFormatDate(row.original.dataTermino)
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        switch(value) {
          case 'ativo':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'finalizado':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'cancelado':
            badgeClass = "bg-red-100 text-red-800";
            break;
          case 'pendente':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return <Badge className={badgeClass}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <FileText className="h-3 w-3 mr-1" /> Detalhes
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <MoreVertical className="h-3 w-3" />
          </Button>
        </div>
      )
    }
  ];

  const additiveColumns: Column[] = [
    { header: 'Número', accessorKey: 'numero' },
    { header: 'Contrato', accessorKey: 'contrato' },
    { header: 'Descrição', accessorKey: 'descricao' },
    { 
      header: 'Data', 
      accessorKey: 'data',
      cell: ({ row }) => safeFormatDate(row.original.data)
    },
    { header: 'Valor', accessorKey: 'valor' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        switch(value) {
          case 'ativo':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'pendente':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          case 'cancelado':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return <Badge className={badgeClass}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <Button variant="outline" size="sm" className="text-xs h-8">
          <FileText className="h-3 w-3 mr-1" /> Visualizar
        </Button>
      )
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contratos</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Contrato
          </Button>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg">Gestão de Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md:flex justify-between items-center mb-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar contrato..."
                  className="pl-9 h-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 mt-2 md:mt-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" /> Agendar Revisão
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3">
                      <h3 className="font-medium mb-2">Agendar Revisão</h3>
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ptBR}
                        className="rounded-md border"
                      />
                      <div className="mt-4 flex justify-end">
                        <Button
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Revisão agendada",
                              description: `Revisão agendada para ${date ? format(date, 'dd/MM/yyyy') : 'data selecionada'}.`,
                            });
                          }}
                        >
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
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
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filtros Avançados
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Exportar
                </Button>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3">Contratos Ativos</h3>
            <DataTable
              columns={contratosColumns}
              data={filtrarContratos()}
              itemsPerPage={5}
            />
            
            <h3 className="text-lg font-medium mt-8 mb-3">Aditivos Contratuais</h3>
            <DataTable
              columns={additiveColumns}
              data={aditivosData}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ContratosPage;
