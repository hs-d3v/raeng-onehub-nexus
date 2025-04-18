
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Download, Calendar, PieChart, LineChart, TableProperties, Wrench, HardHat, Package2, Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";

const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#f59e0b', '#10b981'];

const Reports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("financial");
  
  // Sample data for the charts
  const financialData = [
    { name: 'Jan', revenue: 65000, expenses: 52000, profit: 13000 },
    { name: 'Fev', revenue: 78000, expenses: 60000, profit: 18000 },
    { name: 'Mar', revenue: 82000, expenses: 63000, profit: 19000 },
    { name: 'Abr', revenue: 75000, expenses: 58000, profit: 17000 },
    { name: 'Mai', revenue: 90000, expenses: 67000, profit: 23000 },
    { name: 'Jun', revenue: 95000, expenses: 70000, profit: 25000 },
  ];

  const projectStatusData = [
    { name: 'Em Andamento', value: 12 },
    { name: 'Concluídos', value: 8 },
    { name: 'Pendentes', value: 4 },
    { name: 'Atrasados', value: 2 },
  ];

  const resourceUtilizationData = [
    { name: 'Maquinas', utilization: 85 },
    { name: 'Ferramentas', utilization: 72 },
    { name: 'Equipe', utilization: 90 },
    { name: 'Materiais', utilization: 65 },
    { name: 'Veículos', utilization: 78 },
  ];

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Download iniciado",
      description: `O relatório ${reportType} está sendo gerado e baixado.`,
    });
  };

  const handleScheduleReport = () => {
    toast({
      title: "Relatório agendado",
      description: "O relatório será gerado e enviado conforme programado.",
    });
  };

  const reportTypes = [
    {
      id: "financial",
      label: "Financeiro",
      icon: <BarChart3 size={16} />,
      description: "Análise de receitas, despesas e lucros",
    },
    {
      id: "projects",
      label: "Projetos",
      icon: <PieChart size={16} />,
      description: "Estado atual dos projetos e contratos",
    },
    {
      id: "resources",
      label: "Recursos",
      icon: <LineChart size={16} />,
      description: "Utilização de recursos e equipamentos",
    },
    {
      id: "custom",
      label: "Personalizado",
      icon: <TableProperties size={16} />,
      description: "Crie relatórios personalizados",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleScheduleReport}>
            <Calendar className="mr-2 h-4 w-4" /> Agendar Relatórios
          </Button>
          <Button onClick={() => handleDownloadReport(activeTab)}>
            <Download className="mr-2 h-4 w-4" /> Baixar Relatório
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          {reportTypes.map((report) => (
            <TabsTrigger key={report.id} value={report.id} className="flex items-center gap-2">
              {report.icon}
              <span>{report.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="financial">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Financeiro</CardTitle>
                <CardDescription>
                  Análise de receitas, despesas e lucros por mês
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" name="Receita" fill="#2563eb" />
                      <Bar dataKey="expenses" name="Despesas" fill="#ea580c" />
                      <Bar dataKey="profit" name="Lucro" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>
                  Detalhes e métricas financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Receita Total (Semestre)
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-blue">
                        R$ 485.000,00
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Lucro Total (Semestre)
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-green">
                        R$ 115.000,00
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Média Mensal de Despesas
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-orange">
                        R$ 61.667,00
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Margem de Lucro
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-purple">
                        23,7%
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="text-md font-semibold mb-2">Principais Fontes de Receita</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Projetos Residenciais</span>
                        <span className="font-medium">R$ 184.300,00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Projetos Comerciais</span>
                        <span className="font-medium">R$ 155.200,00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Manutenção e Reparos</span>
                        <span className="font-medium">R$ 96.500,00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Consultoria</span>
                        <span className="font-medium">R$ 49.000,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status dos Projetos</CardTitle>
                <CardDescription>
                  Distribuição atual de todos os projetos por status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resumo de Projetos</CardTitle>
                <CardDescription>
                  Métricas e detalhes dos projetos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Total de Projetos
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-blue">
                        26
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Projetos Concluídos (Anual)
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-green">
                        18
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Taxa de Entrega no Prazo
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-purple">
                        89%
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Satisfação do Cliente
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-blue">
                        4.7/5.0
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="text-md font-semibold mb-2">Projetos em Destaque</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">Edifício Comercial Plaza</span>
                          <Badge className="bg-green-600">Em dia</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Progresso: 65% concluído
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">Condomínio Residencial Bosque</span>
                          <Badge className="bg-green-600">Em dia</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Progresso: 42% concluído
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="font-medium">Shopping Center Norte</span>
                          <Badge variant="destructive">Atrasado</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Progresso: 78% concluído
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Utilização de Recursos</CardTitle>
                <CardDescription>
                  Taxa de utilização dos principais recursos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resourceUtilizationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="utilization" name="Taxa de Utilização (%)" fill="#7c3aed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Detalhes de Recursos</CardTitle>
                <CardDescription>
                  Informações sobre a utilização e eficiência dos recursos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Total de Equipamentos
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-blue">
                        78
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Taxa de Manutenção
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-orange">
                        8.3%
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Eficiência da Equipe
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-green">
                        92%
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Custo Operacional
                      </div>
                      <div className="text-2xl font-bold mt-1 text-brand-blue">
                        R$ 42.500/mês
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="text-md font-semibold mb-2">Recursos com Manutenção Pendente</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">MAQ004 - Escavadeira</span>
                          <div className="text-xs text-muted-foreground">Caterpillar 320</div>
                        </div>
                        <Badge variant="destructive">Urgente</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">MAQ002 - Empilhadeira</span>
                          <div className="text-xs text-muted-foreground">Hyster H60XM</div>
                        </div>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">Programada</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">TOOL003 - Martelo Pneumático</span>
                          <div className="text-xs text-muted-foreground">Industrial HD</div>
                        </div>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">Programada</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Personalizados</CardTitle>
              <CardDescription>
                Crie, configure e visualize relatórios sob medida para suas necessidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2 hover-card" onClick={() => handleDownloadReport("financeiro-anual")}>
                  <BarChart3 className="h-8 w-8 text-brand-blue" />
                  <span>Financeiro Anual</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2 hover-card" onClick={() => handleDownloadReport("produtividade-equipe")}>
                  <LineChart className="h-8 w-8 text-brand-green" />
                  <span>Produtividade da Equipe</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2 hover-card" onClick={() => handleDownloadReport("manutencao-equipamentos")}>
                  <Wrench className="h-8 w-8 text-brand-orange" />
                  <span>Manutenção de Equipamentos</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2 hover-card" onClick={() => handleDownloadReport("consumo-materiais")}>
                  <Package2 className="h-8 w-8 text-brand-purple" />
                  <span>Consumo de Materiais</span>
                </Button>
                <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2 hover-card" onClick={() => handleDownloadReport("utilizacao-epi")}>
                  <HardHat className="h-8 w-8 text-brand-blue" />
                  <span>Utilização de EPIs</span>
                </Button>
                <Button className="h-32 flex flex-col items-center justify-center gap-2">
                  <Plus className="h-8 w-8" />
                  <span>Criar Novo Relatório</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
