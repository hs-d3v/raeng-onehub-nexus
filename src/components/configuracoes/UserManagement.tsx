
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Pencil, Trash2, KeyRound, Shield } from 'lucide-react';

// Dados fictícios para demonstração
const mockUsers = [
  { id: 1, nome: 'João Silva', email: 'joao@raeng.com.br', tipo: 'Administrador', ativo: true },
  { id: 2, nome: 'Maria Oliveira', email: 'maria@raeng.com.br', tipo: 'Gestor', ativo: true },
  { id: 3, nome: 'Carlos Santos', email: 'carlos@raeng.com.br', tipo: 'Usuário', ativo: true },
  { id: 4, nome: 'Ana Pereira', email: 'ana@raeng.com.br', tipo: 'Técnico', ativo: false },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleResetPassword = (userId: number) => {
    console.log('Reset de senha para o usuário ID:', userId);
    // Implementar lógica de reset de senha
    setOpenDialog(null);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    setOpenDialog(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestão de Usuários</CardTitle>
            <CardDescription>Cadastre, edite e gerencie usuários do sistema</CardDescription>
          </div>
          <Dialog open={openDialog === 'newUser'} onOpenChange={(open) => setOpenDialog(open ? 'newUser' : null)}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" /> Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os dados para adicionar um novo usuário ao sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nome</Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">Tipo</Label>
                  <Input id="tipo" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancelar</Button>
                <Button>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-28 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tipo}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenDialog('editUser');
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenDialog('permissions');
                        }}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenDialog('resetPassword');
                        }}
                      >
                        <KeyRound className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenDialog('deleteUser');
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Permissões */}
      <Dialog 
        open={openDialog === 'permissions'} 
        onOpenChange={(open) => setOpenDialog(open ? 'permissions' : null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Permissões do Usuário - {selectedUser?.nome}</DialogTitle>
            <DialogDescription>
              Configure as permissões detalhadas para este usuário.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Módulos do Sistema</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Dashboard', 'Colaboradores', 'Contratos', 'EPIs', 'Ferramentas', 'Máquinas', 'Insumos', 'Relatórios', 'Configurações'].map((module) => (
                  <div key={module} className="flex items-start space-x-2">
                    <Checkbox id={`module-${module}`} />
                    <div className="grid gap-1.5">
                      <Label htmlFor={`module-${module}`}>{module}</Label>
                      <p className="text-sm text-muted-foreground">
                        Acesso ao módulo {module.toLowerCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Permissões Granulares</h3>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Módulo</TableHead>
                      <TableHead>Visualizar</TableHead>
                      <TableHead>Adicionar</TableHead>
                      <TableHead>Editar</TableHead>
                      <TableHead>Excluir</TableHead>
                      <TableHead>Aprovar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {['Colaboradores', 'EPIs', 'Contratos', 'Ferramentas', 'Máquinas'].map((module) => (
                      <TableRow key={module}>
                        <TableCell>{module}</TableCell>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell><Checkbox /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancelar</Button>
            <Button>Salvar Permissões</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Redefinição de Senha */}
      <Dialog 
        open={openDialog === 'resetPassword'} 
        onOpenChange={(open) => setOpenDialog(open ? 'resetPassword' : null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir Senha</DialogTitle>
            <DialogDescription>
              Você está prestes a enviar uma solicitação de redefinição de senha para {selectedUser?.nome}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Um e-mail será enviado para <strong>{selectedUser?.email}</strong> com as instruções para redefinir a senha.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancelar</Button>
            <Button onClick={() => handleResetPassword(selectedUser?.id)}>Confirmar Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Excluir Usuário */}
      <Dialog 
        open={openDialog === 'deleteUser'} 
        onOpenChange={(open) => setOpenDialog(open ? 'deleteUser' : null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o usuário {selectedUser?.nome}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-red-500">Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser?.id)}>Confirmar Exclusão</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Editar Usuário */}
      <Dialog 
        open={openDialog === 'editUser'} 
        onOpenChange={(open) => setOpenDialog(open ? 'editUser' : null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualizar informações do usuário.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Nome</Label>
              <Input id="edit-name" defaultValue={selectedUser?.nome} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input id="edit-email" type="email" defaultValue={selectedUser?.email} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-tipo" className="text-right">Tipo</Label>
              <Input id="edit-tipo" defaultValue={selectedUser?.tipo} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">Status</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox id="edit-status" defaultChecked={selectedUser?.ativo} />
                <Label htmlFor="edit-status">Usuário Ativo</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancelar</Button>
            <Button>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
