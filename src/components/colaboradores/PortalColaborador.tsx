import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Phone, Mail, Calendar, Clock, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface PortalColaboradorProps {
  colaborador?: any;
}

const PortalColaborador: React.FC<PortalColaboradorProps> = ({ colaborador = {} }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('documentos');

  const onDownload = () => {
    toast({
      title: "Download iniciado",
      description: "O documento será baixado em instantes.",
    });
  };

  // Documentos simulados
  const documentos = [
    { id: 1, nome: 'Holerite Outubro 2023', data: '30/10/2023', tipo: 'holerite' },
    { id: 2, nome: 'Holerite Setembro 2023', data: '30/09/2023', tipo: 'holerite' },
    { id: 3, nome: 'Holerite Agosto 2023', data: '30/08/2023', tipo: 'holerite' },
    { id: 4, nome: 'Informe de Rendimentos 2023', data: '28/02/2023', tipo: 'informe' },
    { id: 5, nome: 'Férias 2022', data: '10/12/2022', tipo: 'ferias' },
    { id: 6, nome: 'Comprovante de Entrega de EPI', data: '15/07/2023', tipo: 'epi' },
  ];
  
  // Solicitações simuladas
  const solicitacoes = [
    { id: 1, tipo: 'Férias', dataAbertura: '10/10/2023', status: 'pendente', detalhes: 'Período: 01/01/2024 a 15/01/2024' },
    { id: 2, tipo: 'Atualização de Dados', dataAbertura: '05/09/2023', status: 'aprovada', detalhes: 'Atualização de endereço' },
    { id: 3, tipo: 'EPI', dataAbertura: '20/08/2023', status: 'concluida', detalhes: 'Solicitação de novo capacete' },
    { id: 4, tipo: 'Treinamento', dataAbertura: '15/07/2023', status: 'aprovada', detalhes: 'Curso de NR-35' },
  ];
  
  // Notificações simuladas
  const notificacoes = [
    { id: 1, texto: 'Seu próximo treinamento está agendado para 25/11/2023', data: '15/10/2023', lida: false, tipo: 'info' },
    { id: 2, texto: 'Sua solicitação de férias foi aprovada', data: '12/10/2023', lida: true, tipo: 'success' },
    { id: 3, texto: 'Seu EPI "Capacete de Segurança" vence em 30 dias', data: '10/10/2023', lida: false, tipo: 'warning' },
    { id: 4, texto: 'Novo holerite disponível para download', data: '30/09/2023', lida: true, tipo: 'info' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portal do Colaborador</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium text-lg mb-2">Acesso Rápido</h3>
                    <p className="text-sm text-gray-500 mb-4">Selecione uma opção</p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" className="justify-start" onClick={() => setActiveTab('documentos')}>
                        <FileText className="h-4 w-4 mr-2" /> Documentos
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => setActiveTab('solicitacoes')}>
                        <Clipboard className="h-4 w-4 mr-2" /> Solicitações
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => setActiveTab('notificacoes')}>
                        <BellRing className="h-4 w-4 mr-2" /> Notificações
                        <Badge className="ml-auto bg-red-500">2</Badge>
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => setActiveTab('dados')}>
                        <UserCog className="h-4 w-4 mr-2" /> Meus Dados
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium mb-2 text-sm">Precisa de ajuda?</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>(11) 1234-5678</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>rh@raeng.com.br</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-center text-gray-500">
                    <p>Portal do Colaborador v1.0</p>
                    <p>Última atualização: 15/10/2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
                <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                <TabsTrigger value="dados">Meus Dados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documentos">
                <Card>
                  <CardHeader className="pb-3 pt-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">Meus Documentos</CardTitle>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" /> Buscar Documento
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documentos.map(doc => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.nome}</TableCell>
                            <TableCell>{doc.data}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs capitalize">
                                {doc.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={onDownload}>
                                <Download className="h-4 w-4 mr-1" /> Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="solicitacoes">
                <Card>
                  <CardHeader className="pb-3 pt-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">Minhas Solicitações</CardTitle>
                      <Button variant="outline" size="sm">
                        <Clipboard className="h-4 w-4 mr-2" /> Nova Solicitação
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data de Abertura</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Detalhes</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {solicitacoes.map(solicitacao => (
                          <TableRow key={solicitacao.id}>
                            <TableCell className="font-medium">{solicitacao.tipo}</TableCell>
                            <TableCell>{solicitacao.dataAbertura}</TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  solicitacao.status === 'aprovada' ? "bg-green-100 text-green-800" :
                                  solicitacao.status === 'pendente' ? "bg-yellow-100 text-yellow-800" :
                                  solicitacao.status === 'concluida' ? "bg-blue-100 text-blue-800" :
                                  "bg-gray-100 text-gray-800"
                                }
                              >
                                <div className="capitalize">{solicitacao.status}</div>
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{solicitacao.detalhes}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" /> Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notificacoes">
                <Card>
                  <CardHeader className="pb-3 pt-3">
                    <CardTitle className="text-md">Minhas Notificações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notificacoes.map(notificacao => (
                        <div 
                          key={notificacao.id}
                          className={`p-3 rounded-md border ${
                            notificacao.lida ? 'bg-white' : 'bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <div className={`rounded-full p-2 mr-3 ${
                                notificacao.tipo === 'info' ? 'bg-blue-100' :
                                notificacao.tipo === 'success' ? 'bg-green-100' :
                                notificacao.tipo === 'warning' ? 'bg-yellow-100' :
                                'bg-gray-100'
                              }`}>
                                <BellRing className={`h-4 w-4 ${
                                  notificacao.tipo === 'info' ? 'text-blue-500' :
                                  notificacao.tipo === 'success' ? 'text-green-500' :
                                  notificacao.tipo === 'warning' ? 'text-yellow-500' :
                                  'text-gray-500'
                                }`} />
                              </div>
                              <div>
                                <p className={`text-sm ${notificacao.lida ? 'font-normal' : 'font-medium'}`}>
                                  {notificacao.texto}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notificacao.data}</p>
                              </div>
                            </div>
                            {!notificacao.lida && (
                              <Badge className="bg-blue-500">Nova</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="dados">
                <Card>
                  <CardHeader className="pb-3 pt-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">Meus Dados</CardTitle>
                      <Button variant="outline" size="sm">
                        <UserCog className="h-4 w-4 mr-2" /> Atualizar Dados
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Dados Pessoais</h4>
                          <div className="mt-1 p-3 bg-gray-50 rounded-md">
                            <p><span className="font-medium">Nome:</span> {colaborador.nome || 'João da Silva'}</p>
                            <p><span className="font-medium">CPF:</span> {colaborador.cpf || '123.456.789-00'}</p>
                            <p><span className="font-medium">RG:</span> {colaborador.rg || '12.345.678-9'}</p>
                            <p><span className="font-medium">Data de Nascimento:</span> {colaborador.dataNascimento || '01/01/1985'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Dados de Contato</h4>
                          <div className="mt-1 p-3 bg-gray-50 rounded-md">
                            <p><span className="font-medium">Telefone:</span> {colaborador.telefone || '(11) 98765-4321'}</p>
                            <p><span className="font-medium">Email:</span> {colaborador.email || 'joao.silva@email.com'}</p>
                            <p><span className="font-medium">Endereço:</span> {colaborador.endereco || 'Rua das Flores, 123 - São Paulo/SP'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Dados Profissionais</h4>
                          <div className="mt-1 p-3 bg-gray-50 rounded-md">
                            <p><span className="font-medium">Matrícula:</span> {colaborador.matricula || '0001'}</p>
                            <p><span className="font-medium">Cargo:</span> {colaborador.cargo || 'Técnico de Segurança'}</p>
                            <p><span className="font-medium">Departamento:</span> {colaborador.departamento || 'Técnico'}</p>
                            <p><span className="font-medium">Data de Admissão:</span> {colaborador.dataAdmissao || '15/03/2021'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Contato de Emergência</h4>
                          <div className="mt-1 p-3 bg-gray-50 rounded-md">
                            <p><span className="font-medium">Nome:</span> {colaborador.contatoEmergenciaNome || 'Maria da Silva'}</p>
                            <p><span className="font-medium">Relação:</span> {colaborador.contatoEmergenciaRelacao || 'Esposa'}</p>
                            <p><span className="font-medium">Telefone:</span> {colaborador.contatoEmergenciaTelefone || '(11) 98765-0987'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortalColaborador;
