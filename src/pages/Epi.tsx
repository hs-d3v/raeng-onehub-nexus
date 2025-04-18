
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HardHat, Search, Plus, AlertTriangle, CheckCircle, Eye, Edit, Trash2, MoreVertical, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface EPI {
  id: string;
  name: string;
  type: string;
  quantity: number;
  expirationDate: string;
  status: "available" | "low" | "expired";
  lastInspection: string;
  employee?: string;
}

const Epi = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const [epis, setEpis] = useState<EPI[]>([
    {
      id: "EPI001",
      name: "Capacete de Segurança",
      type: "Proteção para Cabeça",
      quantity: 25,
      expirationDate: "2025-06-10",
      status: "available",
      lastInspection: "2023-01-15",
      employee: "Carlos Silva"
    },
    {
      id: "EPI002",
      name: "Luvas de Proteção",
      type: "Proteção para Mãos",
      quantity: 8,
      expirationDate: "2024-03-22",
      status: "low",
      lastInspection: "2023-02-20"
    },
    {
      id: "EPI003",
      name: "Óculos de Segurança",
      type: "Proteção para Olhos",
      quantity: 15,
      expirationDate: "2025-11-05",
      status: "available",
      lastInspection: "2023-01-30",
      employee: "Ana Costa"
    },
    {
      id: "EPI004",
      name: "Máscara Respiratória",
      type: "Proteção Respiratória",
      quantity: 5,
      expirationDate: "2023-12-10",
      status: "low",
      lastInspection: "2023-01-15"
    },
    {
      id: "EPI005",
      name: "Protetor Auricular",
      type: "Proteção Auditiva",
      quantity: 0,
      expirationDate: "2023-08-15",
      status: "expired",
      lastInspection: "2023-01-05"
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: EPI["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-600">Disponível</Badge>;
      case "low":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Estoque Baixo</Badge>;
      case "expired":
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleDeleteEpi = (id: string) => {
    setEpis(epis.filter(epi => epi.id !== id));
    toast({
      title: "EPI removido",
      description: `O EPI ${id} foi removido com sucesso.`,
    });
  };

  const requestInspection = (id: string) => {
    toast({
      title: "Inspeção agendada",
      description: `Uma inspeção para o EPI ${id} foi agendada.`,
    });
  };

  const handleAssignToEmployee = (id: string) => {
    toast({
      title: "Associar EPI",
      description: "Selecione um colaborador para associar este EPI.",
    });
  };

  const filteredEpis = epis.filter(epi => {
    const matchesSearch = 
      epi.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      epi.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      epi.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "available") return matchesSearch && epi.status === "available";
    if (activeTab === "low") return matchesSearch && epi.status === "low";
    if (activeTab === "expired") return matchesSearch && epi.status === "expired";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Equipamentos de Proteção Individual</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo EPI
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo EPI</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo equipamento de proteção
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nome
                </label>
                <Input
                  id="name"
                  placeholder="Nome do EPI"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">
                  Tipo
                </label>
                <Input
                  id="type"
                  placeholder="Tipo de proteção"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right">
                  Quantidade
                </label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="expirationDate" className="text-right">
                  Data de Validade
                </label>
                <Input
                  id="expirationDate"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="lastInspection" className="text-right">
                  Última Inspeção
                </label>
                <Input
                  id="lastInspection"
                  type="date"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                toast({
                  title: "EPI adicionado",
                  description: "O novo EPI foi adicionado com sucesso.",
                });
              }}>Salvar EPI</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventário de EPIs</CardTitle>
          <CardDescription>
            Gerencie todos os equipamentos de proteção individual da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar EPIs..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <HardHat size={16} /> Todos <Badge variant="outline">{epis.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="available" className="flex gap-2">
                    <CheckCircle size={16} /> Disponíveis <Badge variant="outline">{epis.filter(e => e.status === "available").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="low" className="flex gap-2">
                    <AlertTriangle size={16} /> Estoque Baixo <Badge variant="outline">{epis.filter(e => e.status === "low").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="expired" className="flex gap-2">
                    <AlertTriangle size={16} /> Vencidos <Badge variant="outline">{epis.filter(e => e.status === "expired").length}</Badge>
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
                    <TableHead>Tipo</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEpis.length > 0 ? (
                    filteredEpis.map((epi) => (
                      <TableRow key={epi.id}>
                        <TableCell className="font-medium">{epi.id}</TableCell>
                        <TableCell>{epi.name}</TableCell>
                        <TableCell>{epi.type}</TableCell>
                        <TableCell>{epi.quantity}</TableCell>
                        <TableCell>{formatDate(epi.expirationDate)}</TableCell>
                        <TableCell>{getStatusBadge(epi.status)}</TableCell>
                        <TableCell>{epi.employee || "—"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAssignToEmployee(epi.id)}>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Associar Colaborador</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => requestInspection(epi.id)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Agendar Inspeção</span>
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
                              <DropdownMenuItem onClick={() => handleDeleteEpi(epi.id)} className="text-red-600">
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
                        Nenhum EPI encontrado.
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

export default Epi;
