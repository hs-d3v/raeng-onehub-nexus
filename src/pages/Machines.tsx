
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, Search, Plus, CheckCircle, AlertTriangle, Calendar, Users, FileText, Eye, Edit, Trash2, Clock, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface Machine {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  year: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: "operational" | "maintenance" | "inactive" | "breakdown";
  hoursOfOperation: number;
  fuelLevel: number;
  driver?: string;
  location?: string;
}

const Machines = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: "MAQ001",
      name: "Retroescavadeira",
      model: "JCB 3CX",
      manufacturer: "JCB",
      year: "2019",
      lastMaintenance: "2023-02-15",
      nextMaintenance: "2023-08-15",
      status: "operational",
      hoursOfOperation: 2450,
      fuelLevel: 75,
      driver: "Carlos Silva",
      location: "Canteiro 1"
    },
    {
      id: "MAQ002",
      name: "Empilhadeira",
      model: "Hyster H60XM",
      manufacturer: "Hyster",
      year: "2020",
      lastMaintenance: "2023-01-10",
      nextMaintenance: "2023-07-10",
      status: "maintenance",
      hoursOfOperation: 1850,
      fuelLevel: 30,
      location: "Oficina"
    },
    {
      id: "MAQ003",
      name: "Caminhão Betoneira",
      model: "Volvo FM 370",
      manufacturer: "Volvo",
      year: "2018",
      lastMaintenance: "2023-03-05",
      nextMaintenance: "2023-09-05",
      status: "operational",
      hoursOfOperation: 5200,
      fuelLevel: 85,
      driver: "Roberto Mendes",
      location: "Canteiro 2"
    },
    {
      id: "MAQ004",
      name: "Escavadeira",
      model: "Caterpillar 320",
      manufacturer: "Caterpillar",
      year: "2017",
      lastMaintenance: "2023-02-28",
      nextMaintenance: "2023-08-28",
      status: "breakdown",
      hoursOfOperation: 4120,
      fuelLevel: 15,
      location: "Oficina"
    },
    {
      id: "MAQ005",
      name: "Carregadeira",
      model: "Komatsu WA320",
      manufacturer: "Komatsu",
      year: "2021",
      lastMaintenance: "2023-04-01",
      nextMaintenance: "2023-10-01",
      status: "inactive",
      hoursOfOperation: 780,
      fuelLevel: 45,
      location: "Depósito"
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: Machine["status"]) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-600">Operacional</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Em Manutenção</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inativa</Badge>;
      case "breakdown":
        return <Badge variant="destructive">Avariada</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getFuelLevelColor = (level: number) => {
    if (level > 70) return "bg-green-600";
    if (level > 30) return "bg-orange-500";
    return "bg-red-600";
  };

  const handleDeleteMachine = (id: string) => {
    setMachines(machines.filter(machine => machine.id !== id));
    toast({
      title: "Máquina removida",
      description: `A máquina ${id} foi removida com sucesso.`,
    });
  };

  const scheduleMaintenance = (id: string) => {
    toast({
      title: "Manutenção agendada",
      description: `Uma manutenção para a máquina ${id} foi agendada.`,
    });
  };

  const assignDriver = (id: string) => {
    toast({
      title: "Motorista atribuído",
      description: `Um motorista foi designado para a máquina ${id}.`,
    });
  };

  const viewLogs = (id: string) => {
    toast({
      title: "Relatórios",
      description: `Visualizando relatórios da máquina ${id}.`,
    });
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = 
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      machine.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "operational") return matchesSearch && machine.status === "operational";
    if (activeTab === "maintenance") return matchesSearch && machine.status === "maintenance";
    if (activeTab === "inactive") return matchesSearch && machine.status === "inactive";
    if (activeTab === "breakdown") return matchesSearch && machine.status === "breakdown";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Máquinas e Equipamentos Pesados</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Máquina
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Máquina</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova máquina abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nome
                </label>
                <Input
                  id="name"
                  placeholder="Nome da máquina"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="model" className="text-right">
                  Modelo
                </label>
                <Input
                  id="model"
                  placeholder="Modelo"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="manufacturer" className="text-right">
                  Fabricante
                </label>
                <Input
                  id="manufacturer"
                  placeholder="Fabricante"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="year" className="text-right">
                  Ano
                </label>
                <Input
                  id="year"
                  placeholder="Ano"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="lastMaintenance" className="text-right">
                  Última Manutenção
                </label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="hoursOperation" className="text-right">
                  Horas de Operação
                </label>
                <Input
                  id="hoursOperation"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                toast({
                  title: "Máquina adicionada",
                  description: "A nova máquina foi adicionada com sucesso.",
                });
              }}>Salvar Máquina</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frota de Máquinas</CardTitle>
          <CardDescription>
            Gerencie todas as máquinas e equipamentos pesados da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar máquinas..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <Truck size={16} /> Todas <Badge variant="outline">{machines.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="operational" className="flex gap-2">
                    <CheckCircle size={16} /> Operacionais <Badge variant="outline">{machines.filter(m => m.status === "operational").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="flex gap-2">
                    <Truck size={16} /> Em Manutenção <Badge variant="outline">{machines.filter(m => m.status === "maintenance").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="inactive" className="flex gap-2">
                    <Clock size={16} /> Inativas <Badge variant="outline">{machines.filter(m => m.status === "inactive").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="breakdown" className="flex gap-2">
                    <AlertTriangle size={16} /> Avariadas <Badge variant="outline">{machines.filter(m => m.status === "breakdown").length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Máquina</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Manutenção</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Horas de Operação</TableHead>
                    <TableHead>Combustível</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMachines.length > 0 ? (
                    filteredMachines.map((machine) => (
                      <TableRow key={machine.id}>
                        <TableCell className="font-medium">{machine.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{machine.name}</div>
                            <div className="text-xs text-muted-foreground">{machine.location || "Sem localização"}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{machine.model}</div>
                            <div className="text-xs text-muted-foreground">{machine.manufacturer}, {machine.year}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>Última: {formatDate(machine.lastMaintenance)}</div>
                            <div className="text-xs text-muted-foreground">Próxima: {formatDate(machine.nextMaintenance)}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(machine.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-muted-foreground" />
                            <span>{machine.hoursOfOperation.toLocaleString()} h</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-full">
                            <div className="flex items-center gap-2 mb-1">
                              <Gauge size={16} className="text-muted-foreground" />
                              <span>{machine.fuelLevel}%</span>
                            </div>
                            <Progress 
                              value={machine.fuelLevel} 
                              className="h-2" 
                              indicatorClassName={getFuelLevelColor(machine.fuelLevel)} 
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                                  <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => assignDriver(machine.id)}>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Atribuir Operador</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => scheduleMaintenance(machine.id)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Agendar Manutenção</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => viewLogs(machine.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Ver Relatórios</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Detalhes</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteMachine(machine.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        Nenhuma máquina encontrada.
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

export default Machines;
