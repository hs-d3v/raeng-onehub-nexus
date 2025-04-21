
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Pencil, FileText, Eye, History, Clock, Download } from 'lucide-react';

// Dados fictícios para demonstração
const mockTerms = [
  { id: 1, titulo: 'Termo de Recebimento de EPI', tipo: 'EPI', versao: '1.2', ultimaAtualizacao: '2025-03-15', status: 'Ativo' },
  { id: 2, titulo: 'Termo de Responsabilidade - Ferramentas', tipo: 'Ferramentas', versao: '2.1', ultimaAtualizacao: '2025-02-20', status: 'Ativo' },
  { id: 3, titulo: 'Termo de Uso de Máquinas', tipo: 'Maquinário', versao: '1.0', ultimaAtualizacao: '2025-04-01', status: 'Ativo' },
  { id: 4, titulo: 'Termo de Confidencialidade', tipo: 'RH', versao: '3.2', ultimaAtualizacao: '2025-01-10', status: 'Ativo' },
  { id: 5, titulo: 'Termo de Compromisso', tipo: 'Geral', versao: '1.3', ultimaAtualizacao: '2024-12-05', status: 'Inativo' },
];

const mockHistory = [
  { id: 1, termId: 1, versao: '1.2', dataAlteracao: '2025-03-15', usuarioAlteracao: 'admin@raeng.com.br', alteracoes: 'Inclusão de campo para assinatura digital' },
  { id: 2, termId: 1, versao: '1.1', dataAlteracao: '2025-01-20', usuarioAlteracao: 'admin@raeng.com.br', alteracoes: 'Atualização dos termos de responsabilidade' },
  { id: 3, termId: 1, versao: '1.0', dataAlteracao: '2024-11-05', usuarioAlteracao: 'gestor@raeng.com.br', alteracoes: 'Versão inicial do documento' },
];

const TermEditor = () => {
  const [terms, setTerms] = useState(mockTerms);
  const [history, setHistory] = useState(mockHistory);
  const [selectedTerm, setSelectedTerm] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  
  const getTermById = (id: number) => {
    return terms.find(term => term.id === id);
  };
  
  const getHistoryForTerm = (id: number) => {
    return history.filter(item => item.termId === id);
  };
  
  const handleOpenTerm = (term: any) => {
    setSelectedTerm(term);
    setEditMode(false);
    setEditorContent(`# ${term.titulo}

Este termo estabelece as condições para o uso e responsabilidade sobre os itens fornecidos.

## Responsabilidades do Colaborador

O colaborador **{{NOME_COLABORADOR}}**, portador do CPF **{{CPF_COLABORADOR}}**, matrícula **{{MATRICULA}}**, declara ter recebido os itens listados abaixo, comprometendo-se a:

1. Utilizar os itens apenas para atividades profissionais;
2. Manter os itens em bom estado de conservação;
3. Comunicar qualquer dano ou perda imediatamente;
4. Devolver os itens ao término do vínculo empregatício.

## Itens Fornecidos
- Item 1: Capacete de Segurança
- Item 2: Luvas de Proteção
- Item 3: Óculos de Segurança

## Termo de Ciência

Estou ciente que o não cumprimento das responsabilidades acima pode resultar em medidas administrativas conforme política interna da empresa.

Data: **{{DATA_ATUAL}}**

_____________________________
{{NOME_COLABORADOR}}
{{CARGO}}`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Termos Digitais</CardTitle>
          <CardDescription>
            Crie e gerencie termos e documentos com campos variáveis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-12 gap-6">
            {/* Lista de termos */}
            <div className="md:col-span-4 border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Termos Disponíveis</h3>
                <Dialog open={openDialog === 'newTerm'} onOpenChange={(open) => setOpenDialog(open ? 'newTerm' : null)}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Novo Termo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Novo Termo</DialogTitle>
                      <DialogDescription>
                        Preencha os dados para criar um novo termo digital.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="term-title">Título</Label>
                        <Input id="term-title" placeholder="Digite o título do termo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="term-type">Tipo</Label>
                        <Select>
                          <SelectTrigger id="term-type">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="epi">EPI</SelectItem>
                            <SelectItem value="ferramentas">Ferramentas</SelectItem>
                            <SelectItem value="maquinario">Maquinário</SelectItem>
                            <SelectItem value="rh">RH</SelectItem>
                            <SelectItem value="geral">Geral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="term-version">Versão Inicial</Label>
                        <Input id="term-version" defaultValue="1.0" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancelar</Button>
                      <Button>Criar Termo</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-2">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${selectedTerm?.id === term.id ? 'bg-accent' : ''}`}
                    onClick={() => handleOpenTerm(term)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">{term.titulo}</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">v{term.versao}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{term.tipo}</span>
                      <span className="text-xs text-muted-foreground">{term.ultimaAtualizacao}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Editor e visualizador */}
            <div className="md:col-span-8">
              {selectedTerm ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{selectedTerm.titulo}</h3>
                    <div className="flex gap-2">
                      <Button 
                        variant={editMode ? "outline" : "default"}
                        size="sm" 
                        onClick={() => setEditMode(!editMode)}
                      >
                        {editMode ? 'Cancelar' : 'Editar'}
                      </Button>
                      {editMode && (
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setEditMode(false);
                            // Aqui salvaria as alterações
                          }}
                        >
                          Salvar
                        </Button>
                      )}
                      <Dialog open={openDialog === 'viewHistory'} onOpenChange={(open) => setOpenDialog(open ? 'viewHistory' : null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <History className="h-4 w-4 mr-2" />
                            Histórico
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Histórico de Versões</DialogTitle>
                            <DialogDescription>
                              Histórico de alterações do termo {selectedTerm.titulo}
                            </DialogDescription>
                          </DialogHeader>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Versão</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Alterações</TableHead>
                                <TableHead className="w-24 text-right">Ações</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getHistoryForTerm(selectedTerm.id).map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.versao}</TableCell>
                                  <TableCell>{item.dataAlteracao}</TableCell>
                                  <TableCell>{item.usuarioAlteracao}</TableCell>
                                  <TableCell>{item.alteracoes}</TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Versão:</span>
                      <span className="font-medium">{selectedTerm.versao}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Última atualização:</span>
                      <span className="font-medium">{selectedTerm.ultimaAtualizacao}</span>
                    </div>
                  </div>
                  
                  {/* Editor/Visualizador */}
                  <div className="border rounded-md">
                    <div className="border-b bg-muted/50 px-4 py-2 flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {editMode ? 'Editor' : 'Visualização'}
                      </span>
                      {editMode && (
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Inserir Campo</Button>
                          <Button variant="ghost" size="sm">Formatar</Button>
                        </div>
                      )}
                    </div>
                    <div className="p-4 min-h-[500px] bg-background">
                      {editMode ? (
                        <Textarea 
                          value={editorContent} 
                          onChange={(e) => setEditorContent(e.target.value)} 
                          className="font-mono min-h-[480px] resize-none border-none focus-visible:ring-0"
                        />
                      ) : (
                        <div className="prose max-w-none">
                          {/* Aqui seria renderizado o conteúdo markdown do termo */}
                          <pre className="text-sm whitespace-pre-wrap font-mono">
                            {editorContent}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-3">Campos Variáveis Disponíveis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { key: '{{NOME_COLABORADOR}}', desc: 'Nome completo do colaborador' },
                        { key: '{{CPF_COLABORADOR}}', desc: 'CPF do colaborador' },
                        { key: '{{MATRICULA}}', desc: 'Número de matrícula' },
                        { key: '{{DATA_ATUAL}}', desc: 'Data atual (DD/MM/AAAA)' },
                        { key: '{{CARGO}}', desc: 'Cargo do colaborador' },
                        { key: '{{DEPARTAMENTO}}', desc: 'Departamento' },
                        { key: '{{EMPRESA}}', desc: 'Nome da empresa' },
                        { key: '{{GESTOR}}', desc: 'Nome do gestor responsável' },
                      ].map((campo) => (
                        <div 
                          key={campo.key} 
                          className="border rounded px-3 py-2 bg-secondary/20 cursor-pointer hover:bg-secondary/30"
                          onClick={() => editMode && setEditorContent(editorContent + ' ' + campo.key)}
                        >
                          <div className="text-xs font-mono">{campo.key}</div>
                          <div className="text-xs text-muted-foreground truncate">{campo.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] border rounded-md bg-muted/20">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-medium text-muted-foreground/70">Selecione um Termo</h3>
                  <p className="text-muted-foreground/50">Escolha um termo à esquerda para visualizar ou editar</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermEditor;
