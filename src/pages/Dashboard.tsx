
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Users,
  ChevronUp,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";

const Dashboard = () => {
  // Sample data for charts
  const barChartData = [
    { name: "Jan", total: 4500 },
    { name: "Feb", total: 6000 },
    { name: "Mar", total: 5300 },
    { name: "Apr", total: 7800 },
    { name: "May", total: 4200 },
    { name: "Jun", total: 9000 },
  ];

  const lineChartData = [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 1398 },
    { name: "Mar", value: 9800 },
    { name: "Apr", value: 3908 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 3800 },
  ];

  const tasks = [
    { id: 1, title: "Novo contrato Empresa X", status: "completed", date: "24/04/2025" },
    { id: 2, title: "Reunião com equipe de segurança", status: "pending", date: "26/04/2025" },
    { id: 3, title: "Vistoria em campo - Obra Y", status: "pending", date: "29/04/2025" },
    { id: 4, title: "Relatório mensal de EPI", status: "pending", date: "30/04/2025" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <h1 className="text-2xl font-bold mb-2 text-brand-gray-700">Dashboard</h1>
          <p className="text-brand-gray-500 mb-6">
            Visão geral do seu sistema de gestão de segurança
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="argon-card">
              <CardContent className="p-0 pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-brand-gray-600">Usuários</p>
                    <h3 className="text-2xl font-semibold mt-2">2,356</h3>
                  </div>
                  <div className="bg-gradient-primary rounded-full p-3 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={70} />
                  <div className="flex justify-between text-xs text-brand-gray-600 mt-2">
                    <span className="inline-flex items-center">
                      <ChevronUp className="h-4 w-4 text-brand-green mr-1" /> 3.48%
                    </span>
                    <span>Desde o último mês</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="argon-card">
              <CardContent className="p-0 pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-brand-gray-600">Contratos</p>
                    <h3 className="text-2xl font-semibold mt-2">152</h3>
                  </div>
                  <div className="bg-gradient-info rounded-full p-3 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={80} indicatorClassName="bg-gradient-info" />
                  <div className="flex justify-between text-xs text-brand-gray-600 mt-2">
                    <span className="inline-flex items-center">
                      <ChevronUp className="h-4 w-4 text-brand-green mr-1" /> 12.4%
                    </span>
                    <span>Desde o último mês</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="argon-card">
              <CardContent className="p-0 pt-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-brand-gray-600">Equipamentos</p>
                    <h3 className="text-2xl font-semibold mt-2">458</h3>
                  </div>
                  <div className="bg-gradient-warning rounded-full p-3 text-white">
                    <Package className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={55} indicatorClassName="bg-gradient-warning" />
                  <div className="flex justify-between text-xs text-brand-gray-600 mt-2">
                    <span className="inline-flex items-center">
                      <ChevronDown className="h-4 w-4 text-brand-red mr-1" /> 2.7%
                    </span>
                    <span>Desde o último mês</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="argon-card mb-6">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl text-brand-gray-700">Visão Geral da Performance</CardTitle>
              <CardDescription className="text-brand-gray-500">
                Atividade nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <LineChart
                  data={lineChartData}
                  categories={["value"]}
                  index="name"
                  colors={["#5e72e4"]}
                  valueFormatter={(value) => `${value} ações`}
                  className="h-full mt-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/4">
          <div className="sticky top-4">
            <Card className="argon-card mb-6">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg text-brand-gray-700">Tarefas Pendentes</CardTitle>
                <CardDescription className="text-brand-gray-500">
                  Suas próximas atividades
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3">
                      {task.status === "completed" ? (
                        <div className="mt-0.5 bg-green-100 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="mt-0.5 bg-blue-100 rounded-full p-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-brand-gray-400" : "text-brand-gray-700"}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-brand-gray-500 mt-1">
                          {task.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 text-center text-sm text-brand-blue font-medium">
                  Ver todas as tarefas
                </button>
              </CardContent>
            </Card>

            <Card className="argon-card">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg text-brand-gray-700">Equipe</CardTitle>
                <CardDescription className="text-brand-gray-500">
                  Membros da equipe
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 bg-gradient-primary">
                      <span className="text-white">JD</span>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-brand-gray-700">João Dantas</p>
                      <p className="text-xs text-brand-gray-500">Administrador</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="argon-badge argon-badge-success">Online</Badge>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 bg-gradient-info">
                      <span className="text-white">MS</span>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-brand-gray-700">Maria Silva</p>
                      <p className="text-xs text-brand-gray-500">Segurança</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="argon-badge argon-badge-warning">Ausente</Badge>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 bg-gradient-warning">
                      <span className="text-white">PL</span>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-brand-gray-700">Pedro Lima</p>
                      <p className="text-xs text-brand-gray-500">Técnico</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="argon-badge argon-badge-danger">Offline</Badge>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 text-center text-sm text-brand-blue font-medium">
                  Ver toda a equipe
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="argon-card">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-brand-gray-700">Distribuição por Categorias</CardTitle>
            <CardDescription className="text-brand-gray-500">
              Equipamentos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <BarChart
                data={barChartData}
                categories={["total"]}
                index="name"
                colors={["#5e72e4"]}
                valueFormatter={(value) => `${value} unidades`}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="argon-card">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-brand-gray-700">Alertas Recentes</CardTitle>
            <CardDescription className="text-brand-gray-500">
              Últimas notificações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-red-50 border border-red-100 flex items-center">
                <div className="bg-red-100 rounded-full p-1.5 mr-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">EPI próximo ao vencimento</p>
                  <p className="text-xs text-red-500 mt-0.5">3 itens expiram em 7 dias</p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-yellow-50 border border-yellow-100 flex items-center">
                <div className="bg-yellow-100 rounded-full p-1.5 mr-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-700">Manutenção preventiva</p>
                  <p className="text-xs text-yellow-500 mt-0.5">Máquina #123 precisa de verificação</p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-green-50 border border-green-100 flex items-center">
                <div className="bg-green-100 rounded-full p-1.5 mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Contrato renovado</p>
                  <p className="text-xs text-green-500 mt-0.5">Contrato #A45B renovado com sucesso</p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-blue-50 border border-blue-100 flex items-center">
                <div className="bg-blue-100 rounded-full p-1.5 mr-3">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Novo pedido de insumos</p>
                  <p className="text-xs text-blue-500 mt-0.5">Pedido #567 aguardando aprovação</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 text-center text-sm text-brand-blue font-medium">
              Ver todos os alertas
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
