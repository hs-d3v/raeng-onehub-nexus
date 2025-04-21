
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/widgets/StatsCard';
import BarChart from '@/components/charts/BarChart';
import DataTable, { Column } from '@/components/ui/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  HardHat, 
  Wrench, 
  AlertTriangle, 
  Calendar
} from 'lucide-react';
import { safeFormatDate } from '@/utils/dateUtils';

const DashboardPage = () => {
  const contratosPorStatusData = [
    { name: 'Janeiro', Vigentes: 45, Concluídos: 12, Vencidos: 5 },
    { name: 'Fevereiro', Vigentes: 48, Concluídos: 18, Vencidos: 7 },
    { name: 'Março', Vigentes: 52, Concluídos: 14, Vencidos: 4 },
    { name: 'Abril', Vigentes: 55, Concluídos: 12, Vencidos: 3 },
    { name: 'Maio', Vigentes: 49, Concluídos: 17, Vencidos: 2 },
    { name: 'Junho', Vigentes: 50, Concluídos: 15, Vencidos: 5 },
  ];

  const contratosPorStatusKeys = [
    { key: 'Vigentes', name: 'Vigentes', color: '#2563eb' },
    { key: 'Concluídos', name: 'Concluídos', color: '#16a34a' },
    { key: 'Vencidos', name: 'Vencidos', color: '#ea580c' },
  ];
  
  const consumoEPIsData = [
    { name: 'Jan', Capacetes: 25, Luvas: 85, Óculos: 45, Protetores: 35 },
    { name: 'Fev', Capacetes: 18, Luvas: 78, Óculos: 38, Protetores: 38 },
    { name: 'Mar', Capacetes: 22, Luvas: 92, Óculos: 42, Protetores: 32 },
    { name: 'Abr', Capacetes: 30, Luvas: 80, Óculos: 50, Protetores: 30 },
    { name: 'Mai', Capacetes: 28, Luvas: 88, Óculos: 48, Protetores: 35 },
    { name: 'Jun', Capacetes: 32, Luvas: 95, Óculos: 52, Protetores: 38 },
  ];
  
  const consumoEPIsKeys = [
    { key: 'Capacetes', name: 'Capacetes', color: '#2563eb' },
    { key: 'Luvas', name: 'Luvas', color: '#16a34a' },
    { key: 'Óculos', name: 'Óculos', color: '#ea580c' },
    { key: 'Protetores', name: 'Protetores', color: '#7c3aed' },
  ];
  
  // Define alertasData which was missing
  const alertasData = [
    {
      id: 1,
      tipo: 'Contrato',
      descricao: 'Contrato 2023-05 próximo ao vencimento',
      prioridade: 'Alta',
      vencimento: '28/07/2023'
    },
    {
      id: 2,
      tipo: 'EPI',
      descricao: 'Estoque de capacetes abaixo do mínimo',
      prioridade: 'Média',
      vencimento: '22/07/2023'
    },
    {
      id: 3,
      tipo: 'Manutenção',
      descricao: 'Manutenção preventiva de betoneira pendente',
      prioridade: 'Alta',
      vencimento: '20/07/2023'
    },
    {
      id: 4,
      tipo: 'Contrato',
      descricao: 'Renovação de contrato de fornecimento pendente',
      prioridade: 'Média',
      vencimento: '05/08/2023'
    },
    {
      id: 5,
      tipo: 'EPI',
      descricao: 'Validade de lote de luvas próxima',
      prioridade: 'Baixa',
      vencimento: '15/08/2023'
    }
  ];
  
  const alertasColumns: Column[] = [
    { 
      header: 'Tipo', 
      accessorKey: 'tipo',
      cell: ({ row }) => {
        const value = row.original.tipo;
        const iconProps = { className: "h-4 w-4 mr-2" };
        let icon;
        let badgeClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
        
        switch(value) {
          case 'Contrato':
            icon = <FileText {...iconProps} />;
            badgeClass += "bg-brand-blue/10 text-brand-blue";
            break;
          case 'Manutenção':
            icon = <Wrench {...iconProps} />;
            badgeClass += "bg-brand-purple/10 text-brand-purple";
            break;
          case 'EPI':
            icon = <HardHat {...iconProps} />;
            badgeClass += "bg-brand-green/10 text-brand-green";
            break;
          default:
            icon = <AlertTriangle {...iconProps} />;
            badgeClass += "bg-brand-orange/10 text-brand-orange";
        }
        
        return (
          <span className={badgeClass}>
            {icon}
            {value}
          </span>
        );
      }
    },
    { header: 'Descrição', accessorKey: 'descricao' },
    { 
      header: 'Prioridade', 
      accessorKey: 'prioridade',
      cell: ({ row }) => {
        const value = row.original.prioridade;
        let badgeClass = "px-2.5 py-0.5 rounded-full text-xs font-medium ";
        
        switch(value) {
          case 'Alta':
            badgeClass += "bg-red-100 text-red-800";
            break;
          case 'Média':
            badgeClass += "bg-yellow-100 text-yellow-800";
            break;
          case 'Baixa':
            badgeClass += "bg-green-100 text-green-800";
            break;
          default:
            badgeClass += "bg-gray-100 text-gray-800";
        }
        
        return <span className={badgeClass}>{value}</span>;
      }
    },
    { header: 'Vencimento', accessorKey: 'vencimento' },
  ];
  
  const proximosVencimentosColumns: Column[] = [
    { 
      header: 'Tipo', 
      accessorKey: 'tipo',
      cell: ({ row }) => {
        const value = row.original.tipo;
        if (!value) return null;
        
        let badgeClass = "";
        switch(value) {
          case 'ASO':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'EPI':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'Treinamento':
            badgeClass = "bg-purple-100 text-purple-800";
            break;
          case 'Certificação':
            badgeClass = "bg-orange-100 text-orange-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return <Badge variant="outline" className={badgeClass}>{value}</Badge>;
      }
    },
    { header: 'Item', accessorKey: 'descricao' },
    { header: 'Colaborador', accessorKey: 'colaborador' },
    { 
      header: 'Vencimento', 
      accessorKey: 'dataVencimento',
      cell: ({ row }) => safeFormatDate(row.original.dataVencimento)
    },
    { 
      header: 'Dias Restantes', 
      accessorKey: 'diasRestantes',
      cell: ({ row }) => {
        const value = row.original.diasRestantes;
        let className = '';
        
        if (value <= 0) {
          className = 'text-red-600 font-medium';
        } else if (value <= 30) {
          className = 'text-yellow-600 font-medium';
        }
        
        return <span className={className}>{value <= 0 ? 'Vencido' : `${value} dias`}</span>;
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <Button variant="outline" size="sm" className="text-xs h-8">
          Ver Detalhes
        </Button>
      )
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Contratos Ativos" 
            value={42} 
            icon={FileText} 
            trend={{ value: 8, positive: true }} 
            iconColor="text-brand-blue"
          />
          <StatsCard 
            title="Colaboradores" 
            value={187} 
            description="154 ativos, 33 afastados" 
            icon={Users} 
            iconColor="text-brand-purple"
          />
          <StatsCard 
            title="EPIs em Estoque" 
            value={1254} 
            icon={HardHat} 
            trend={{ value: 2, positive: false }} 
            iconColor="text-brand-green"
          />
          <StatsCard 
            title="Eventos Próximos" 
            value={12} 
            description="Próximos 30 dias" 
            icon={Calendar} 
            iconColor="text-brand-orange"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart 
            title="Contratos por Status" 
            data={contratosPorStatusData} 
            dataKeys={contratosPorStatusKeys} 
          />
          <BarChart 
            title="Consumo de EPIs" 
            data={consumoEPIsData} 
            dataKeys={consumoEPIsKeys} 
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-orange" />
              Alertas e Vencimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={alertasColumns} 
              data={alertasData} 
              itemsPerPage={5} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand-blue" />
              Calendário de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 rounded-lg bg-brand-blue/10 text-brand-blue flex flex-col items-center justify-center mr-4">
                  <span className="text-xs font-semibold">JUL</span>
                  <span className="text-lg font-bold">18</span>
                </div>
                <div>
                  <h4 className="font-medium">Treinamento de Segurança</h4>
                  <p className="text-sm text-gray-500">09:00 - 12:00 | Sala de Treinamento</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 rounded-lg bg-brand-green/10 text-brand-green flex flex-col items-center justify-center mr-4">
                  <span className="text-xs font-semibold">JUL</span>
                  <span className="text-lg font-bold">21</span>
                </div>
                <div>
                  <h4 className="font-medium">Inspeção de EPIs</h4>
                  <p className="text-sm text-gray-500">13:30 - 15:30 | Almoxarifado Central</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 rounded-lg bg-brand-orange/10 text-brand-orange flex flex-col items-center justify-center mr-4">
                  <span className="text-xs font-semibold">JUL</span>
                  <span className="text-lg font-bold">25</span>
                </div>
                <div>
                  <h4 className="font-medium">Renovação de Contrato #1234</h4>
                  <p className="text-sm text-gray-500">10:00 - 11:00 | Sala de Reuniões</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand-blue" />
              Próximos Vencimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={proximosVencimentosColumns} 
              data={alertasData} 
              itemsPerPage={5} 
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
