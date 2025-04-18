
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { 
  AlertTriangle, 
  Boxes, 
  Calendar, 
  FileText, 
  Users, 
  Clock,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Dados de exemplo para os gráficos
  const contractsStatusData = [
    { name: 'Ativos', value: 18 },
    { name: 'Vencendo', value: 4 },
    { name: 'Concluídos', value: 12 }
  ];
  
  const employeeStatusData = [
    { name: 'Ativos', value: 84 },
    { name: 'Afastados', value: 7 },
    { name: 'Férias', value: 9 }
  ];
  
  const stockLevelsData = [
    { name: 'EPIs', normal: 67, crítico: 12 },
    { name: 'Ferramentas', normal: 48, crítico: 8 },
    { name: 'Insumos', normal: 120, crítico: 15 },
  ];
  
  const safetyIndicatorsData = [
    { mês: 'Jan', acidentes: 2, quaseAcidentes: 5 },
    { mês: 'Fev', acidentes: 1, quaseAcidentes: 4 },
    { mês: 'Mar', acidentes: 0, quaseAcidentes: 3 },
    { mês: 'Abr', acidentes: 0, quaseAcidentes: 6 },
    { mês: 'Mai', acidentes: 1, quaseAcidentes: 4 },
    { mês: 'Jun', acidentes: 0, quaseAcidentes: 2 },
  ];
  
  const COLORS = ['#2563eb', '#ea580c', '#16a34a'];

  const upcomingEvents = [
    { id: 1, title: 'Renovação de Contrato #1245', date: '25/04/2025', type: 'contract' },
    { id: 2, title: 'Manutenção preventiva', date: '28/04/2025', type: 'maintenance' },
    { id: 3, title: 'Vencimento ASO - Carlos Silva', date: '30/04/2025', type: 'employee' },
    { id: 4, title: 'Inventário mensal', date: '01/05/2025', type: 'inventory' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-brand-blue">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contratos Ativos</p>
                <h3 className="text-2xl font-bold">18</h3>
                <p className="text-xs text-brand-green flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> 12% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-brand-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-brand-green">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Colaboradores</p>
                <h3 className="text-2xl font-bold">84</h3>
                <p className="text-xs text-brand-green flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> 3 contratações
                </p>
              </div>
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-brand-green" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-brand-orange">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alertas de Estoque</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-brand-orange flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Itens em nível crítico
                </p>
              </div>
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                <Boxes className="h-6 w-6 text-brand-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-brand-purple">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próximos Eventos</p>
                <h3 className="text-2xl font-bold">4</h3>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" /> Próximos 7 dias
                </p>
              </div>
              <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-brand-purple" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status de Contratos */}
        <Card>
          <CardHeader>
            <CardTitle>Status de Contratos</CardTitle>
            <CardDescription>Visão geral dos seus contratos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={{
                  ativos: { color: COLORS[0] },
                  vencendo: { color: COLORS[1] },
                  concluídos: { color: COLORS[2] }
                }}
              >
                <PieChart>
                  <Pie
                    data={contractsStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {contractsStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Indicadores de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Segurança</CardTitle>
            <CardDescription>Estatísticas de acidentes e quase acidentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={{
                  acidentes: { color: "#ea580c" },
                  quaseAcidentes: { color: "#2563eb" }
                }}
              >
                <LineChart data={safetyIndicatorsData}>
                  <XAxis dataKey="mês" />
                  <YAxis />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="acidentes" stroke="#ea580c" />
                  <Line type="monotone" dataKey="quaseAcidentes" stroke="#2563eb" />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Níveis de Estoque */}
        <Card>
          <CardHeader>
            <CardTitle>Níveis de Estoque</CardTitle>
            <CardDescription>Por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={{
                  normal: { color: "#16a34a" },
                  crítico: { color: "#ea580c" }
                }}
              >
                <BarChart data={stockLevelsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="normal" stackId="a" fill="#16a34a" />
                  <Bar dataKey="crítico" stackId="a" fill="#ea580c" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Calendário de Eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Calendário de Eventos</CardTitle>
            <CardDescription>Próximos eventos e vencimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {event.type === 'contract' && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-blue/10">
                      <FileText className="h-4 w-4 text-brand-blue" />
                    </div>
                  )}
                  {event.type === 'maintenance' && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-orange/10">
                      <ShieldAlert className="h-4 w-4 text-brand-orange" />
                    </div>
                  )}
                  {event.type === 'employee' && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-purple/10">
                      <Users className="h-4 w-4 text-brand-purple" />
                    </div>
                  )}
                  {event.type === 'inventory' && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-green/10">
                      <Check className="h-4 w-4 text-brand-green" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">Ver Todos os Eventos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
