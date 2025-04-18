
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, UserCheck, Users, UserX, Download, Eye, Edit, Trash2, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  hireDate: string;
  status: "active" | "onleave" | "terminated";
  phone: string;
  email: string;
}

const Employees = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "EMP001",
      name: "Carlos Silva",
      role: "Engenheiro Civil",
      department: "Engenharia",
      hireDate: "2022-03-15",
      status: "active",
      phone: "(11) 99876-5432",
      email: "carlos.silva@raeng.com",
    },
    {
      id: "EMP002",
      name: "Ana Costa",
      role: "Arquiteta",
      department: "Projetos",
      hireDate: "2022-05-10",
      status: "active",
      phone: "(11) 99123-4567",
      email: "ana.costa@raeng.com",
    },
    {
      id: "EMP003",
      name: "Roberto Mendes",
      role: "Técnico de Segurança",
      department: "Segurança",
      hireDate: "2022-01-20",
      status: "active",
      phone: "(11) 99456-7890",
      email: "roberto.mendes@raeng.com",
    },
    {
      id: "EMP004",
      name: "Juliana Ferreira",
      role: "Gerente de Projetos",
      department: "Administração",
      hireDate: "2021-11-05",
      status: "onleave",
      phone: "(11) 99789-0123",
      email: "juliana.ferreira@raeng.com",
    },
    {
      id: "EMP005",
      name: "Marcos Paulo",
      role: "Operador de Máquinas",
      department: "Operações",
      hireDate: "2022-02-28",
      status: "terminated",
      phone: "(11) 99321-6547",
      email: "marcos.paulo@raeng.com",
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Ativo</Badge>;
      case "onleave":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Afastado</Badge>;
      case "terminated":
        return <Badge variant="destructive">Desligado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    toast({
      title: "Colaborador removido",
      description: `O colaborador ${id} foi removido com sucesso.`,
    });
  };

  const handleDownloadData = (id: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando dados do colaborador ${id}.`,
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && employee.status === "active";
    if (activeTab === "onleave") return matchesSearch && employee.status === "onleave";
    if (activeTab === "terminated") return matchesSearch && employee.status === "terminated";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Colaboradores</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Novo Colaborador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Colaborador</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo colaborador abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nome
                </label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">
                  Função
                </label>
                <Input
                  id="role"
                  placeholder="Cargo ou função"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="department" className="text-right">
                  Departamento
                </label>
                <Input
                  id="department"
                  placeholder="Nome do departamento"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="hireDate" className="text-right">
                  Data de Contratação
                </label>
                <Input
                  id="hireDate"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right">
                  Telefone
                </label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                toast({
                  title: "Colaborador adicionado",
                  description: "O novo colaborador foi adicionado com sucesso.",
                });
              }}>Salvar Colaborador</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestão de Colaboradores</CardTitle>
          <CardDescription>
            Gerencie sua equipe e monitore o status de cada colaborador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar colaboradores..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <Users size={16} /> Todos <Badge variant="outline">{employees.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="active" className="flex gap-2">
                    <UserCheck size={16} /> Ativos <Badge variant="outline">{employees.filter(e => e.status === "active").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="onleave" className="flex gap-2">
                    <Filter size={16} /> Afastados <Badge variant="outline">{employees.filter(e => e.status === "onleave").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="terminated" className="flex gap-2">
                    <UserX size={16} /> Desligados <Badge variant="outline">{employees.filter(e => e.status === "terminated").length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Contratação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <div className="bg-primary h-8 w-8 flex items-center justify-center rounded-full text-white">
                                {employee.name.charAt(0)}
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{formatDate(employee.hireDate)}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleDownloadData(employee.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEmployee(employee.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Nenhum colaborador encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
