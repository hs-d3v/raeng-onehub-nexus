
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, FilePlus, Download, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contract {
  id: string;
  title: string;
  client: string;
  startDate: string;
  endDate: string;
  value: number;
  status: "active" | "pending" | "completed" | "cancelled";
}

const Contracts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "CONT-2023-001",
      title: "Construção do Edifício Comercial Plaza",
      client: "Incorporadora Real Ltda",
      startDate: "2023-01-15",
      endDate: "2024-06-30",
      value: 1250000,
      status: "active",
    },
    {
      id: "CONT-2023-002",
      title: "Reforma do Shopping Center Norte",
      client: "Shopping Administração S.A.",
      startDate: "2023-02-01",
      endDate: "2023-08-15",
      value: 750000,
      status: "completed",
    },
    {
      id: "CONT-2023-003",
      title: "Construção de Condomínio Residencial Bosque",
      client: "Construtora Viver Bem",
      startDate: "2023-05-10",
      endDate: "2024-11-20",
      value: 3500000,
      status: "active",
    },
    {
      id: "CONT-2023-004",
      title: "Manutenção Predial Edifícios Alpha",
      client: "Condomínio Edifícios Alpha",
      startDate: "2023-03-01",
      endDate: "2024-02-28",
      value: 240000,
      status: "active",
    },
    {
      id: "CONT-2023-005",
      title: "Reforma Restaurante Sabor & Arte",
      client: "Gastronomia S.A.",
      startDate: "2023-07-05",
      endDate: "2023-10-15",
      value: 180000,
      status: "pending",
    }
  ]);

  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Ativo</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Pendente</Badge>;
      case "completed":
        return <Badge variant="secondary">Concluído</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleDeleteContract = (id: string) => {
    setContracts(contracts.filter(contract => contract.id !== id));
    toast({
      title: "Contrato excluído",
      description: `O contrato ${id} foi removido com sucesso.`,
    });
  };

  const handleDownloadContract = (id: string) => {
    toast({
      title: "Download iniciado",
      description: `O download do contrato ${id} foi iniciado.`,
    });
  };

  const filteredContracts = contracts.filter(contract => 
    contract.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    contract.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestão de Contratos</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" /> Novo Contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Contrato</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo contrato abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">
                  Título
                </label>
                <Input
                  id="title"
                  placeholder="Nome do contrato"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="client" className="text-right">
                  Cliente
                </label>
                <Input
                  id="client"
                  placeholder="Nome do cliente"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startDate" className="text-right">
                  Data Inicial
                </label>
                <Input
                  id="startDate"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="endDate" className="text-right">
                  Data Final
                </label>
                <Input
                  id="endDate"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="value" className="text-right">
                  Valor
                </label>
                <Input
                  id="value"
                  type="number"
                  placeholder="0.00"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                toast({
                  title: "Contrato adicionado",
                  description: "O novo contrato foi adicionado com sucesso.",
                });
              }}>Salvar Contrato</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Contratos</CardTitle>
          <CardDescription>
            Gerencie todos os seus contratos em um só lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar contratos..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.title}</TableCell>
                      <TableCell>{contract.client}</TableCell>
                      <TableCell>
                        {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                      </TableCell>
                      <TableCell>{formatCurrency(contract.value)}</TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDownloadContract(contract.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteContract(contract.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Nenhum contrato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contracts;
