
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package2, Search, Plus, CheckCircle, AlertTriangle, FileText, Eye, Edit, Trash2 } from "lucide-react";
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

interface Supply {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  lastOrder: string;
  supplier: string;
  location: string;
  status: "instock" | "lowstock" | "outofstock" | "ordered";
}

const Supplies = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const [supplies, setSupplies] = useState<Supply[]>([
    {
      id: "SUP001",
      name: "Cimento Portland",
      category: "Material de Construção",
      quantity: 175,
      unit: "sacos",
      minQuantity: 50,
      lastOrder: "2023-03-10",
      supplier: "Construcenter Ltda",
      location: "Depósito A1",
      status: "instock"
    },
    {
      id: "SUP002",
      name: "Areia Lavada",
      category: "Material de Construção",
      quantity: 3000,
      unit: "kg",
      minQuantity: 1000,
      lastOrder: "2023-02-15",
      supplier: "Areial Central",
      location: "Externo B2",
      status: "instock"
    },
    {
      id: "SUP003",
      name: "Tinta Acrílica Branca",
      category: "Acabamento",
      quantity: 12,
      unit: "galões",
      minQuantity: 20,
      lastOrder: "2023-01-20",
      supplier: "Tintas Premium",
      location: "Depósito C3",
      status: "lowstock"
    },
    {
      id: "SUP004",
      name: "Tijolos Cerâmicos",
      category: "Material de Construção",
      quantity: 0,
      unit: "unidades",
      minQuantity: 1000,
      lastOrder: "2023-03-05",
      supplier: "Cerâmica Fábrica",
      location: "Esperando Entrega",
      status: "ordered"
    },
    {
      id: "SUP005",
      name: "Vergalhão CA-50",
      category: "Material Estrutural",
      quantity: 0,
      unit: "barras",
      minQuantity: 50,
      lastOrder: "2023-02-28",
      supplier: "Ferro & Aço Distribuidora",
      location: "Esgotado",
      status: "outofstock"
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: Supply["status"]) => {
    switch (status) {
      case "instock":
        return <Badge className="bg-green-600">Em Estoque</Badge>;
      case "lowstock":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Estoque Baixo</Badge>;
      case "outofstock":
        return <Badge variant="destructive">Esgotado</Badge>;
      case "ordered":
        return <Badge variant="secondary">Pedido Realizado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStockLevelPercentage = (quantity: number, minQuantity: number) => {
    if (quantity === 0) return 0;
    const target = Math.max(minQuantity * 2, 1); // At least twice the minimum is "full"
    const percentage = Math.min(Math.round((quantity / target) * 100), 100);
    return percentage;
  };

  const getStockLevelColor = (status: Supply["status"]) => {
    switch (status) {
      case "instock":
        return "bg-green-600";
      case "lowstock":
        return "bg-orange-500";
      case "ordered":
        return "bg-blue-500";
      case "outofstock":
        return "bg-red-600";
      default:
        return "bg-gray-400";
    }
  };

  const handleDeleteSupply = (id: string) => {
    setSupplies(supplies.filter(supply => supply.id !== id));
    toast({
      title: "Insumo removido",
      description: `O insumo ${id} foi removido com sucesso.`,
    });
  };

  const placeOrder = (id: string) => {
    const supply = supplies.find(s => s.id === id);
    if (supply) {
      toast({
        title: "Pedido realizado",
        description: `Um pedido de ${supply.name} foi realizado.`,
      });
    }
  };

  const viewOrderHistory = (id: string) => {
    toast({
      title: "Histórico de pedidos",
      description: `Visualizando histórico de pedidos do insumo ${id}.`,
    });
  };

  const filteredSupplies = supplies.filter(supply => {
    const matchesSearch = 
      supply.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      supply.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supply.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supply.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "instock") return matchesSearch && supply.status === "instock";
    if (activeTab === "lowstock") return matchesSearch && supply.status === "lowstock";
    if (activeTab === "outofstock") return matchesSearch && (supply.status === "outofstock" || supply.status === "ordered");
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Insumos e Materiais</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Insumo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Insumo</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo material ou insumo abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Nome
                </label>
                <Input
                  id="name"
                  placeholder="Nome do insumo"
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
                <label htmlFor="unit" className="text-right">
                  Unidade
                </label>
                <Input
                  id="unit"
                  placeholder="unidades, kg, litros..."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="minQuantity" className="text-right">
                  Qtd. Mínima
                </label>
                <Input
                  id="minQuantity"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="supplier" className="text-right">
                  Fornecedor
                </label>
                <Input
                  id="supplier"
                  placeholder="Nome do fornecedor"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">
                  Localização
                </label>
                <Input
                  id="location"
                  placeholder="Local de armazenamento"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                toast({
                  title: "Insumo adicionado",
                  description: "O novo insumo foi adicionado com sucesso.",
                });
              }}>Salvar Insumo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Controle de Estoque</CardTitle>
          <CardDescription>
            Gerencie todos os insumos e materiais da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar insumos..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all" className="flex gap-2">
                    <Package2 size={16} /> Todos <Badge variant="outline">{supplies.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="instock" className="flex gap-2">
                    <CheckCircle size={16} /> Em Estoque <Badge variant="outline">{supplies.filter(s => s.status === "instock").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="lowstock" className="flex gap-2">
                    <AlertTriangle size={16} /> Estoque Baixo <Badge variant="outline">{supplies.filter(s => s.status === "lowstock").length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="outofstock" className="flex gap-2">
                    <AlertTriangle size={16} /> Esgotado/Pedidos <Badge variant="outline">{supplies.filter(s => s.status === "outofstock" || s.status === "ordered").length}</Badge>
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
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Nível de Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSupplies.length > 0 ? (
                    filteredSupplies.map((supply) => (
                      <TableRow key={supply.id}>
                        <TableCell className="font-medium">{supply.id}</TableCell>
                        <TableCell>{supply.name}</TableCell>
                        <TableCell>{supply.category}</TableCell>
                        <TableCell>{supply.quantity} {supply.unit}</TableCell>
                        <TableCell>
                          <div className="w-full">
                            <div className="text-xs text-muted-foreground mb-1">
                              Min: {supply.minQuantity} {supply.unit}
                            </div>
                            <Progress 
                              value={getStockLevelPercentage(supply.quantity, supply.minQuantity)} 
                              className="h-2" 
                              indicatorClassName={getStockLevelColor(supply.status)} 
                            />
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(supply.status)}</TableCell>
                        <TableCell>{supply.supplier}</TableCell>
                        <TableCell>{supply.location}</TableCell>
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
                              <DropdownMenuItem onClick={() => placeOrder(supply.id)}>
                                <Package2 className="mr-2 h-4 w-4" />
                                <span>Fazer Pedido</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => viewOrderHistory(supply.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Histórico de Pedidos</span>
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
                              <DropdownMenuItem onClick={() => handleDeleteSupply(supply.id)} className="text-red-600">
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
                      <TableCell colSpan={9} className="text-center py-4">
                        Nenhum insumo encontrado.
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

export default Supplies;
