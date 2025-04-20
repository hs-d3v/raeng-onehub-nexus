
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/widgets/StatsCard';
import BarChart from '@/components/charts/BarChart';
import DataTable from '@/components/ui/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  HardHat, 
  Wrench, 
  AlertTriangle, 
  Calendar
} from 'lucide-react';

const DashboardPage = () => {
  // Dados simulados para os gráficos
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
    { name: 'Capacetes', Jan: 25, Fev: 18, Mar: 22, Abr: 30, Mai: 28, Jun: 32 },
    { name: 'Luvas', Jan: 85, Fev: 78, Mar: 92, Abr: 80, Mai: 88, Jun: 95 },
    { name: 'Óculos', Jan: 45, Fev: 38, Mar: 42, Abr: 50, Mai: 48, Jun: 52 },
    { name: 'Protetor', Jan: 35, Fev: 38, Mar: 32, Abr: 30, Mai: 35, Jun: 38 },
  ];
  
  const consumoEPIsKeys = [
    { key: 'Jan', name: 'Janeiro', color: '#2563eb' },
    { key: 'Fev', name: 'Fevereiro', color: '#16a34a' },
    { key: 'Mar', name: 'Março', color: '#ea580c' },
    { key: 'Abr', name: 'Abril', color: '#7c3aed' },
    { key: 'Mai', name: 'Maio', color: '#0891b2' },
    { key: 'Jun', name: 'Junho', color: '#db2777' },
  ];
  
  // Dados simulados para a tabela de alertas
  const alertasColumns = [
    { header: 'Tipo', accessorKey: 'tipo', 
      cell: (value: string) => {
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
    { header: 'Prioridade', accessorKey: 'prioridade',
      cell: (value: string) => {
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
  
  const alertasData = [
    { 
      tipo: 'Contrato', 
      descricao: 'Contrato #1234 - Manutenção SPCI - Vencimento próximo', 
      prioridade: 'Alta',
      vencimento: '15/07/2023' 
    },
    { 
      tipo: 'EPI', 
      descricao: 'Lote de capacetes próximos da validade', 
      prioridade: 'Média',
      vencimento: '30/07/2023' 
    },
    { 
      tipo: 'Manutenção', 
      descricao: 'Retroescavadeira - Manutenção preventiva agendada', 
      prioridade: 'Média',
      vencimento: '05/08/2023' 
    },
    { 
      tipo: 'Contrato', 
      descricao: 'Contrato #2567 - Inspeção elétrica - Renovação', 
      prioridade: 'Alta',
      vencimento: '10/08/2023' 
    },
    { 
      tipo: 'EPI', 
      descricao: 'Estoque de luvas anti-corte abaixo do mínimo', 
      prioridade: 'Baixa',
      vencimento: '18/08/2023' 
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        {/* Cards de estatísticas */}
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
        
        {/* Gráficos */}
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
        
        {/* Tabela de alertas */}
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
        
        {/* Próximos eventos */}
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
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
