
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DataTable from '@/components/ui/DataTable';
import BarChart from '@/components/charts/BarChart';
import { AlertTriangle, FileText, Search, Plus, Filter, FileSpreadsheet, Printer, Download } from 'lucide-react';

const ContratosPage = () => {
  const [activeTab, setActiveTab] = useState('todos');
  
  // Dados simulados para os gráficos
  const contratosPorTipoData = [
    { name: 'Jan', SPCI: 22, SPDA: 18, Construção: 12, Outros: 8 },
    { name: 'Fev', SPCI: 24, SPDA: 16, Construção: 14, Outros: 10 },
    { name: 'Mar', SPCI: 20, SPDA: 17, Construção: 16, Outros: 9 },
    { name: 'Abr', SPCI: 25, SPDA: 19, Construção: 15, Outros: 11 },
    { name: 'Mai', SPCI: 27, SPDA: 21, Construção: 18, Outros: 8 },
    { name: 'Jun', SPCI: 30, SPDA: 24, Construção: 20, Outros: 12 },
  ];
  
  const contratosPorTipoKeys = [
    { key: 'SPCI', name: 'SPCI', color: '#2563eb' },
    { key: 'SPDA', name: 'SPDA', color: '#16a34a' },
    { key: 'Construção', name: 'Construção', color: '#ea580c' },
    { key: 'Outros', name: 'Outros', color: '#7c3aed' },
  ];
  
  const contratosPorStatusData = [
    { name: 'Jan', Vigentes: 45, Concluídos: 12, Vencidos: 5 },
    { name: 'Fev', Vigentes: 48, Concluídos: 18, Vencidos: 7 },
    { name: 'Mar', Vigentes: 52, Concluídos: 14, Vencidos: 4 },
    { name: 'Abr', Vigentes: 55, Concluídos: 12, Vencidos: 3 },
    { name: 'Mai', Vigentes: 49, Concluídos: 17, Vencidos: 2 },
    { name: 'Jun', Vigentes: 50, Concluídos: 15, Vencidos: 5 },
  ];
  
  const contratosPorStatusKeys = [
    { key: 'Vigentes', name: 'Vigentes', color: '#2563eb' },
    { key: 'Concluídos', name: 'Concluídos', color: '#16a34a' },
    { key: 'Vencidos', name: 'Vencidos', color: '#ea580c' },
  ];
  
  // Dados simulados para a tabela de contratos
  const contratosColumns = [
    { header: 'Código', accessorKey: 'codigo' },
    { header: 'Cliente', accessorKey: 'cliente' },
    { header: 'Tipo', accessorKey: 'tipo',
      cell: (value: string) => {
        let badgeClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
        switch(value) {
          case 'SPCI':
            badgeClass += "bg-brand-blue/10 text-brand-blue";
            break;
          case 'SPDA':
            badgeClass += "bg-brand-green/10 text-brand-green";
            break;
          case 'Construção':
            badgeClass += "bg-brand-orange/10 text-brand-orange";
            break;
          default:
            badgeClass += "bg-brand-purple/10 text-brand-purple";
        }
        return <span className={badgeClass}>{value}</span>;
      }
    },
    { header: 'Status', accessorKey: 'status', 
      cell: (value: string) => {
        let badgeClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
        switch(value) {
          case 'Vigente':
            badgeClass += "bg-green-100 text-green-800";
            break;
          case 'Concluído':
            badgeClass += "bg-blue-100 text-blue-800";
            break;
          case 'Vencido':
            badgeClass += "bg-red-100 text-red-800";
            break;
          default:
            badgeClass += "bg-gray-100 text-gray-800";
        }
        return <span className={badgeClass}>{value}</span>;
      }
    },
    { header: 'Valor', accessorKey: 'valor' },
    { header: 'Início', accessorKey: 'inicio' },
    { header: 'Vencimento', accessorKey: 'vencimento' },
    { header: 'Ações', accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <AlertTriangle className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];
  
  const contratosData = [
    { 
      codigo: 'CONT-001', 
      cliente: 'Empresa ABC', 
      tipo: 'SPCI', 
      status: 'Vigente', 
      valor: 'R$ 45.800,00',
      inicio: '10/01/2023',
      vencimento: '10/01/2024'
    },
    { 
      codigo: 'CONT-002', 
      cliente: 'Indústria XYZ', 
      tipo: 'SPDA', 
      status: 'Vigente', 
      valor: 'R$ 32.400,00',
      inicio: '15/02/2023',
      vencimento: '15/02/2024'
    },
    { 
      codigo: 'CONT-003', 
      cliente: 'Construção Nacional', 
      tipo: 'Construção', 
      status: 'Concluído', 
      valor: 'R$ 128.900,00',
      inicio: '05/11/2022',
      vencimento: '05/04/2023'
    },
    { 
      codigo: 'CONT-004', 
      cliente: 'Hospital Central', 
      tipo: 'SPCI', 
      status: 'Vigente', 
      valor: 'R$ 67.300,00',
      inicio: '22/03/2023',
      vencimento: '22/03/2024'
    },
    { 
      codigo: 'CONT-005', 
      cliente: 'Comércio Varejo SA', 
      tipo: 'SPDA', 
      status: 'Vencido', 
      valor: 'R$ 18.750,00',
      inicio: '30/06/2022',
      vencimento: '30/06/2023'
    },
    { 
      codigo: 'CONT-006', 
      cliente: 'Edifício Corporativo', 
      tipo: 'Outros', 
      status: 'Vigente', 
      valor: 'R$ 54.200,00',
      inicio: '12/05/2023',
      vencimento: '12/05/2024'
    },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contratos</h1>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Novo Contrato
          </Button>
        </div>
        
        {/* Dashboard de Contratos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart 
            title="Contratos por Tipo" 
            data={contratosPorTipoData} 
            dataKeys={contratosPorTipoKeys} 
          />
          <BarChart 
            title="Contratos por Status" 
            data={contratosPorStatusData} 
            dataKeys={contratosPorStatusKeys} 
          />
        </div>
        
        {/* Tabela de contratos com filtros */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Gestão de Contratos</CardTitle>
            <Tabs 
              defaultValue="todos" 
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="vigentes">Vigentes</TabsTrigger>
                  <TabsTrigger value="vencidos">Vencidos</TabsTrigger>
                  <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="h-4 w-4 mr-2" /> Exportar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" /> Imprimir
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Buscar contrato..."
                      className="pl-9 h-9"
                    />
                  </div>
                </div>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="spci">SPCI</SelectItem>
                    <SelectItem value="spda">SPDA</SelectItem>
                    <SelectItem value="construcao">Construção</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="vigente">Vigente</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="todos" className="pt-4">
                <DataTable
                  columns={contratosColumns}
                  data={contratosData}
                  itemsPerPage={10}
                />
              </TabsContent>
              <TabsContent value="vigentes" className="pt-4">
                <DataTable
                  columns={contratosColumns}
                  data={contratosData.filter(item => item.status === 'Vigente')}
                  itemsPerPage={10}
                />
              </TabsContent>
              <TabsContent value="vencidos" className="pt-4">
                <DataTable
                  columns={contratosColumns}
                  data={contratosData.filter(item => item.status === 'Vencido')}
                  itemsPerPage={10}
                />
              </TabsContent>
              <TabsContent value="concluidos" className="pt-4">
                <DataTable
                  columns={contratosColumns}
                  data={contratosData.filter(item => item.status === 'Concluído')}
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

export default ContratosPage;
