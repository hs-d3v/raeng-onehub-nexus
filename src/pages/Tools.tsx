
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wrench, Search, Plus, CheckCircle, AlertTriangle, Calendar, Users, Hammer, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Tool {
  id: string;
  name: string;
  category: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: "available" | "inuse" | "maintenance" | "broken";
  location: string;
  assignedTo?: string;
}

const Tools = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const [tools, setTools] = useState<Tool[]>([
    {
      id: "TOOL001",
      name: "Furadeira Profissional",
      category: "Elétrica",
      lastMaintenance: "2023-01-15",
      nextMaintenance: "2023-07-15",
      status: "available",
      location: "Depósito A"
    },
    {
      id: "TOOL002",
      name: "Serra Circular",
      category: "Elétrica",
      lastMaintenance: "2023-02-10",
      nextMaintenance: "2023-08-10",
      status: "inuse",
      location: "Canteiro 1",
      assignedTo: "Carlos Silva"
    },
    {
      id: "TOOL003",
      name: "Martelo Pneumático",
      category: "Pneumática",
      lastMaintenance: "2023-03-20",
      nextMaintenance: "2023-09-20",
      status: "maintenance",
      location: "Manutenção"
    },
    {
      id: "TOOL004",
      name: "Parafusadeira",
      category: "Elétrica",
      lastMaintenance: "2023-02-05",
      nextMaintenance: "2023-08-05",
      status: "available",
      location: "Depósito B"
    },
    {
      id: "TOOL005",
      name: "Lixadeira Orbital",
      category: "Elétrica",
      lastMaintenance: "2023-01-25",
      nextMaintenance: "2023-07-25",
      status: "broken",
      location: "Manutenção"
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: Tool["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-600">Disponível</Badge>;
      case "inuse":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-500">Em Uso</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Manutenção</Badge>;
      case "broken":
        return <Badge variant="destructive">Avariada</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleDeleteTool = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id));
    toast({
      title: "Ferramenta removida",
      description: `A ferramenta ${id} foi removida com sucesso.`,
    });
  };

  const scheduleMaintenance = (id: string) => {
    toast({
      title: "Manutenção agendada",
      description: `Uma manutenção para a ferramenta ${id} foi agendada.`,
    });
  };

  const assignTool = (id: string) => {
    toast({
      title: "Ferramenta atribuída",
      description: `A ferramenta ${id} foi atribuída com sucesso.`,
    });
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "available") return matchesSearch && tool.status === "available";
    if (activeTab === "inuse") return matchesSearch && tool.status === "inuse";
    if (activeTab === "maintenance") return matchesSearch && tool.status === "maintenance";
    if (activeTab === "broken") return matchesSearch && tool.status === "broken";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ferramentas</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Ferramenta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Ferramenta</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova ferramenta abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nome
                </label>
                <Input
                  id="name"
                  placeholder="Nome da ferramenta"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">
                  Categoria
                </label>
                <Input
                  id="category"
                  placeholder="Categoria"
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
                <label htmlFor="nextMaintenance" className="text-right">
                  Próxima Manutenção
                </label>
                <Input
                  id="nextMaintenance"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">
                  Localização
                </label>
                <Input
                  id="location"
                  placeholder="Local"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                toast({
                  title: "Ferramenta adicionada",
                  description: "A nova ferramenta foi adicionada com sucesso.",
                });
              }}>Salvar Ferramenta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventário de Ferramentas</CardTitle>
          <CardDescription>
            Gerencie todas as ferramentas e equipamentos da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ferramentas..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <Wrench size={16} /> Todas <Badge variant="outline">{tools.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="available" className="flex gap-2">
                    <CheckCircle size={16} /> Disponíveis <Badge variant="outline">{tools.filter(t => t.status === "available").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="inuse" className="flex gap-2">
                    <Hammer size={16} /> Em Uso <Badge variant="outline">{tools.filter(t => t.status === "inuse").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="flex gap-2">
                    <Wrench size={16} /> Manutenção <Badge variant="outline">{tools.filter(t => t.status === "maintenance").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="broken" className="flex gap-2">
                    <AlertTriangle size={16} /> Avariadas <Badge variant="outline">{tools.filter(t => t.status === "broken").length}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Última Manutenção</TableHead>
                    <TableHead>Próxima Manutenção</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTools.length > 0 ? (
                    filteredTools.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell className="font-medium">{tool.id}</TableCell>
                        <TableCell>{tool.name}</TableCell>
                        <TableCell>{tool.category}</TableCell>
                        <TableCell>{formatDate(tool.lastMaintenance)}</TableCell>
                        <TableCell>{formatDate(tool.nextMaintenance)}</TableCell>
                        <TableCell>{getStatusBadge(tool.status)}</TableCell>
                        <TableCell>
                          {tool.location}
                          {tool.assignedTo && <div className="text-xs text-muted-foreground">Resp: {tool.assignedTo}</div>}
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
                              <DropdownMenuItem onClick={() => assignTool(tool.id)}>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Atribuir</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => scheduleMaintenance(tool.id)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Agendar Manutenção</span>
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
                              <DropdownMenuItem onClick={() => handleDeleteTool(tool.id)} className="text-red-600">
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
                        Nenhuma ferramenta encontrada.
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

export default Tools;
