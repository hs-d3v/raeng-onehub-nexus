
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { PlusCircle, Trash2, Pencil, Tag, MapPin, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Dados fictícios para demonstração
const mockMotivos = [
  { id: 1, nome: "Distribuição Inicial", descricao: "Primeira entrega do item ao colaborador" },
  { id: 2, nome: "Reposição", descricao: "Substituição por desgaste natural" },
  { id: 3, nome: "Troca Técnica", descricao: "Substituição por questões técnicas" },
  { id: 4, nome: "Perda", descricao: "Substituição por perda do item" },
  { id: 5, nome: "Promoção", descricao: "Distribuição por promoção de cargo" },
];

const mockEstados = [
  { id: 1, nome: "Novo", descricao: "Item sem uso" },
  { id: 2, nome: "Desgaste Normal", descricao: "Item com desgaste dentro do esperado" },
  { id: 3, nome: "Desgaste Avançado", descricao: "Item com desgaste além do esperado" },
  { id: 4, nome: "Contaminado", descricao: "Item exposto a produtos químicos ou biológicos" },
  { id: 5, nome: "Vencido", descricao: "Item fora da validade" },
  { id: 6, nome: "Danificado", descricao: "Item quebrado ou rasgado" },
];

const mockLocais = [
  { id: 1, nome: "Canteiro A", descricao: "Obra Residencial Alfa" },
  { id: 2, nome: "Canteiro B", descricao: "Obra Comercial Beta" },
  { id: 3, nome: "Almoxarifado Central", descricao: "Depósito principal" },
  { id: 4, nome: "Almoxarifado B", descricao: "Depósito secundário" },
  { id: 5, nome: "Oficina", descricao: "Área de manutenção" },
];

interface Item {
  id: number;
  nome: string;
  descricao: string;
}

interface ItemFormProps {
  onSave: (item: Omit<Item, "id">) => void;
  initialData?: Item;
  title: string;
}

const ItemForm = ({ onSave, initialData, title }: ItemFormProps) => {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ nome, descricao });
    setNome("");
    setDescricao("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="item-name">Nome</Label>
        <Input 
          id="item-name" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Nome do item" 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="item-description">Descrição</Label>
        <Textarea 
          id="item-description" 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
          placeholder="Descrição detalhada" 
          className="resize-none" 
          rows={3} 
        />
      </div>
      <Button type="submit" className="w-full">
        {initialData ? "Atualizar" : "Adicionar"} {title}
      </Button>
    </form>
  );
};

const PredefinedRegisters = () => {
  const [motivos, setMotivos] = useState(mockMotivos);
  const [estados, setEstados] = useState(mockEstados);
  const [locais, setLocais] = useState(mockLocais);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("motivos");

  const handleAddMotivo = (item: Omit<Item, "id">) => {
    const newItem = { ...item, id: motivos.length + 1 };
    setMotivos([...motivos, newItem]);
    setOpenDialog(null);
  };

  const handleAddEstado = (item: Omit<Item, "id">) => {
    const newItem = { ...item, id: estados.length + 1 };
    setEstados([...estados, newItem]);
    setOpenDialog(null);
  };

  const handleAddLocal = (item: Omit<Item, "id">) => {
    const newItem = { ...item, id: locais.length + 1 };
    setLocais([...locais, newItem]);
    setOpenDialog(null);
  };

  const handleUpdateMotivo = (item: Omit<Item, "id">) => {
    if (editItem) {
      const updated = motivos.map(m => m.id === editItem.id ? { ...m, ...item } : m);
      setMotivos(updated);
      setEditItem(null);
      setOpenDialog(null);
    }
  };

  const handleUpdateEstado = (item: Omit<Item, "id">) => {
    if (editItem) {
      const updated = estados.map(e => e.id === editItem.id ? { ...e, ...item } : e);
      setEstados(updated);
      setEditItem(null);
      setOpenDialog(null);
    }
  };

  const handleUpdateLocal = (item: Omit<Item, "id">) => {
    if (editItem) {
      const updated = locais.map(l => l.id === editItem.id ? { ...l, ...item } : l);
      setLocais(updated);
      setEditItem(null);
      setOpenDialog(null);
    }
  };

  const handleDeleteMotivo = (id: number) => {
    setMotivos(motivos.filter(m => m.id !== id));
  };

  const handleDeleteEstado = (id: number) => {
    setEstados(estados.filter(e => e.id !== id));
  };

  const handleDeleteLocal = (id: number) => {
    setLocais(locais.filter(l => l.id !== id));
  };

  const editDialog = (item: Item, type: string) => {
    setEditItem(item);
    setOpenDialog(`edit-${type}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cadastros Pré-definidos</CardTitle>
          <CardDescription>
            Configure valores pré-definidos para o fluxo do Leitor QR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="motivos">
                <Tag className="h-4 w-4 mr-2" />
                Motivos
              </TabsTrigger>
              <TabsTrigger value="estados">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Estados do Item
              </TabsTrigger>
              <TabsTrigger value="locais">
                <MapPin className="h-4 w-4 mr-2" />
                Locais de Uso
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="motivos">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Motivos</h3>
                  <Dialog open={openDialog === 'add-motivo'} onOpenChange={(open) => setOpenDialog(open ? 'add-motivo' : null)}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Novo Motivo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Motivo</DialogTitle>
                        <DialogDescription>
                          Preencha os dados para adicionar um novo motivo de movimentação.
                        </DialogDescription>
                      </DialogHeader>
                      <ItemForm onSave={handleAddMotivo} title="Motivo" />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {motivos.map((motivo) => (
                      <TableRow key={motivo.id}>
                        <TableCell className="font-medium">{motivo.nome}</TableCell>
                        <TableCell>{motivo.descricao}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => editDialog(motivo, "motivo")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteMotivo(motivo.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Dialog de edição de motivo */}
                <Dialog open={openDialog === 'edit-motivo'} onOpenChange={(open) => !open && setEditItem(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Motivo</DialogTitle>
                      <DialogDescription>
                        Atualize as informações do motivo.
                      </DialogDescription>
                    </DialogHeader>
                    {editItem && (
                      <ItemForm onSave={handleUpdateMotivo} initialData={editItem} title="Motivo" />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="estados">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Estados do Item</h3>
                  <Dialog open={openDialog === 'add-estado'} onOpenChange={(open) => setOpenDialog(open ? 'add-estado' : null)}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Novo Estado
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Estado</DialogTitle>
                        <DialogDescription>
                          Preencha os dados para adicionar um novo estado de item.
                        </DialogDescription>
                      </DialogHeader>
                      <ItemForm onSave={handleAddEstado} title="Estado" />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estados.map((estado) => (
                      <TableRow key={estado.id}>
                        <TableCell className="font-medium">{estado.nome}</TableCell>
                        <TableCell>{estado.descricao}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => editDialog(estado, "estado")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteEstado(estado.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Dialog de edição de estado */}
                <Dialog open={openDialog === 'edit-estado'} onOpenChange={(open) => !open && setEditItem(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Estado</DialogTitle>
                      <DialogDescription>
                        Atualize as informações do estado.
                      </DialogDescription>
                    </DialogHeader>
                    {editItem && (
                      <ItemForm onSave={handleUpdateEstado} initialData={editItem} title="Estado" />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="locais">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Locais de Uso</h3>
                  <Dialog open={openDialog === 'add-local'} onOpenChange={(open) => setOpenDialog(open ? 'add-local' : null)}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Novo Local
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Local</DialogTitle>
                        <DialogDescription>
                          Preencha os dados para adicionar um novo local de uso/aplicação.
                        </DialogDescription>
                      </DialogHeader>
                      <ItemForm onSave={handleAddLocal} title="Local" />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-28 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locais.map((local) => (
                      <TableRow key={local.id}>
                        <TableCell className="font-medium">{local.nome}</TableCell>
                        <TableCell>{local.descricao}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => editDialog(local, "local")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteLocal(local.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Dialog de edição de local */}
                <Dialog open={openDialog === 'edit-local'} onOpenChange={(open) => !open && setEditItem(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Local</DialogTitle>
                      <DialogDescription>
                        Atualize as informações do local de uso.
                      </DialogDescription>
                    </DialogHeader>
                    {editItem && (
                      <ItemForm onSave={handleUpdateLocal} initialData={editItem} title="Local" />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredefinedRegisters;
