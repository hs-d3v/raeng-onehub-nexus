
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Calendar as CalendarIcon, Search, FileDown, FileText, Filter, User, Trash2, Edit, Plus } from 'lucide-react';

// Dados fictícios para demonstração
const mockLogs = [
  { id: 1, data: '2025-04-21 14:32:45', usuario: 'admin@raeng.com.br', modulo: 'Colaboradores', acao: 'INSERIR', detalhes: 'Adicionado novo colaborador: João Silva' },
  { id: 2, data: '2025-04-21 13:15:22', usuario: 'gestor@raeng.com.br', modulo: 'EPIs', acao: 'ATUALIZAR', detalhes: 'Atualizado estoque de capacete de segurança' },
  { id: 3, data: '2025-04-21 11:45:33', usuario: 'tecnico@raeng.com.br', modulo: 'Ferramentas', acao: 'EMPRESTIMO', detalhes: 'Empréstimo de furadeira para Carlos Santos' },
  { id: 4, data: '2025-04-21 10:22:18', usuario: 'admin@raeng.com.br', modulo: 'Usuários', acao: 'EDITAR', detalhes: 'Alteradas permissões de usuário: tecnico@raeng.com.br' },
  { id: 5, data: '2025-04-21 09:14:02', usuario: 'gestor@raeng.com.br', modulo: 'Máquinas', acao: 'MANUTENÇÃO', detalhes: 'Registrada manutenção para retroescavadeira XYZ-2000' },
  { id: 6, data: '2025-04-20 16:55:40', usuario: 'admin@raeng.com.br', modulo: 'Configurações', acao: 'ALTERAR', detalhes: 'Alteradas configurações de notificação' },
  { id: 7, data: '2025-04-20 14:32:11', usuario: 'tecnico@raeng.com.br', modulo: 'Insumos', acao: 'BAIXA', detalhes: 'Baixa de 20 unidades de cimento' },
  { id: 8, data: '2025-04-20 11:23:45', usuario: 'admin@raeng.com.br', modulo: 'Relatórios', acao: 'EXPORTAR', detalhes: 'Exportado relatório mensal de EPIs' },
  { id: 9, data: '2025-04-20 10:05:22', usuario: 'gestor@raeng.com.br', modulo: 'Contratos', acao: 'INSERIR', detalhes: 'Adicionado novo contrato: Obra Residencial XYZ' },
  { id: 10, data: '2025-04-20 09:14:33', usuario: 'admin@raeng.com.br', modulo: 'Termos', acao: 'EDITAR', detalhes: 'Atualizado template de termo de EPI' },
];

const SystemLogs = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [logs, setLogs] = useState(mockLogs);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>
                Registros de atividades e ações no sistema
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isFiltersOpen && (
            <div className="mb-6 p-4 border rounded-md bg-background/50">
              <h3 className="text-sm font-medium mb-3">Filtros</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-from">Data Inicial</Label>
                  <div className="relative">
                    <Input id="date-from" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-to">Data Final</Label>
                  <div className="relative">
                    <Input id="date-to" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user">Usuário</Label>
                  <Select>
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Todos os usuários" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os usuários</SelectItem>
                      <SelectItem value="admin">admin@raeng.com.br</SelectItem>
                      <SelectItem value="gestor">gestor@raeng.com.br</SelectItem>
                      <SelectItem value="tecnico">tecnico@raeng.com.br</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="module">Módulo</Label>
                  <Select>
                    <SelectTrigger id="module">
                      <SelectValue placeholder="Todos os módulos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os módulos</SelectItem>
                      <SelectItem value="colaboradores">Colaboradores</SelectItem>
                      <SelectItem value="epis">EPIs</SelectItem>
                      <SelectItem value="ferramentas">Ferramentas</SelectItem>
                      <SelectItem value="maquinas">Máquinas</SelectItem>
                      <SelectItem value="insumos">Insumos</SelectItem>
                      <SelectItem value="contratos">Contratos</SelectItem>
                      <SelectItem value="configuracoes">Configurações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action">Tipo de Ação</Label>
                  <Select>
                    <SelectTrigger id="action">
                      <SelectValue placeholder="Todas as ações" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as ações</SelectItem>
                      <SelectItem value="inserir">Inserir</SelectItem>
                      <SelectItem value="editar">Editar</SelectItem>
                      <SelectItem value="excluir">Excluir</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="exportar">Exportar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar no Detalhamento</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="search" placeholder="Buscar..." className="pl-8" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Aplicar Filtros</Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-36">Data/Hora</TableHead>
                  <TableHead className="w-40">Usuário</TableHead>
                  <TableHead className="w-32">Módulo</TableHead>
                  <TableHead className="w-32">Ação</TableHead>
                  <TableHead>Detalhamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">{log.data}</TableCell>
                    <TableCell>{log.usuario}</TableCell>
                    <TableCell>{log.modulo}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded text-xs font-medium
                          ${log.acao === 'INSERIR' ? 'bg-green-100 text-green-800' : ''}
                          ${log.acao === 'ATUALIZAR' || log.acao === 'EDITAR' ? 'bg-blue-100 text-blue-800' : ''}
                          ${log.acao === 'EXCLUIR' ? 'bg-red-100 text-red-800' : ''}
                          ${log.acao === 'EXPORTAR' ? 'bg-purple-100 text-purple-800' : ''}
                          ${log.acao === 'EMPRESTIMO' || log.acao === 'BAIXA' || log.acao === 'MANUTENÇÃO' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${log.acao === 'ALTERAR' ? 'bg-indigo-100 text-indigo-800' : ''}
                        `}
                      >
                        {log.acao}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{log.detalhes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
