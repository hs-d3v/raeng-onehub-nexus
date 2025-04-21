import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, CheckCircle, Clipboard, ArrowUpDown, Plus, Upload, Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GestaoEPIsProps {
  colaboradorId?: string;
}

const formSchema = z.object({
  epi_id: z.string({
    required_error: "Selecione um EPI",
  }),
  quantidade: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().min(1, { message: "Quantidade deve ser maior que zero" })
  ),
  data_entrega: z.string({
    required_error: "Data de entrega obrigatória",
  }),
  observacao: z.string().optional(),
});

const devFormSchema = z.object({
  epi_id: z.string({
    required_error: "Selecione um EPI",
  }),
  motivo: z.string({
    required_error: "Motivo da devolução é obrigatório",
  }),
  data_devolucao: z.string({
    required_error: "Data de devolução obrigatória",
  }),
  estado_conservacao: z.string({
    required_error: "Estado de conservação é obrigatório",
  }),
  observacao: z.string().optional(),
});

type EntregaEPIFormValues = z.infer<typeof formSchema>;
type DevolucaoEPIFormValues = z.infer<typeof devFormSchema>;

const GestaoEPIs: React.FC<GestaoEPIsProps> = ({ colaboradorId }) => {
  const { toast } = useToast();
  const [epiList, setEPIList] = useState<any[]>([]);
  const [epiAtivos, setEPIAtivos] = useState<any[]>([]);
  const [epiVencidos, setEPIVencidos] = useState<any[]>([]);
  const [epiHistorico, setEPIHistorico] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDevDialogOpen, setIsDevDialogOpen] = useState(false);
  const [tiposEPI, setTiposEPI] = useState<any[]>([]);
  const [selectedEpiId, setSelectedEpiId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ativos");

  const form = useForm<EntregaEPIFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantidade: 1,
      data_entrega: new Date().toISOString().substring(0, 10),
      observacao: "",
    },
  });

  const devolucaoForm = useForm<DevolucaoEPIFormValues>({
    resolver: zodResolver(devFormSchema),
    defaultValues: {
      data_devolucao: new Date().toISOString().substring(0, 10),
      estado_conservacao: "bom",
      observacao: "",
    },
  });

  useEffect(() => {
    if (colaboradorId) {
      fetchEPIs();
    }
  }, [colaboradorId]);

  const fetchEPIs = async () => {
    try {
      const epiAtivosData = [
        { 
          id: 'epi1',
          nome: 'Capacete de Segurança',
          ca: '12345',
          data_entrega: '2023-06-10',
          data_vencimento: '2024-06-10',
          quantidade: 1,
          status: 'ativo',
          termo_url: '#',
        },
        { 
          id: 'epi2',
          nome: 'Luvas de Proteção',
          ca: '23456',
          data_entrega: '2023-07-15',
          data_vencimento: '2023-10-15',
          quantidade: 2,
          status: 'proximo_vencimento',
          termo_url: '#',
        },
        { 
          id: 'epi3',
          nome: 'Óculos de Proteção',
          ca: '34567',
          data_entrega: '2023-05-20',
          data_vencimento: '2023-09-01',
          quantidade: 1,
          status: 'vencido',
          termo_url: '#',
        },
      ];
      
      setEPIAtivos(epiAtivosData.filter(epi => epi.status === 'ativo' || epi.status === 'proximo_vencimento'));
      setEPIVencidos(epiAtivosData.filter(epi => epi.status === 'vencido'));

      const epiHistoricoData = [
        { 
          id: 'epi101',
          nome: 'Botina de Segurança',
          ca: '45678',
          data_entrega: '2022-01-10',
          data_vencimento: '2022-12-10',
          quantidade: 1,
          status: 'devolvido',
          data_devolucao: '2022-11-05',
          termo_url: '#',
          motivo_devolucao: 'Fim do contrato',
          estado_conservacao: 'bom',
        },
        { 
          id: 'epi102',
          nome: 'Protetor Auricular',
          ca: '56789',
          data_entrega: '2022-02-15',
          data_vencimento: '2023-02-15',
          quantidade: 2,
          status: 'substituido',
          data_devolucao: '2022-08-20',
          termo_url: '#',
          motivo_devolucao: 'Desgaste',
          estado_conservacao: 'ruim',
        },
      ];
      
      setEPIHistorico(epiHistoricoData);

      const tiposEPIData = [
        { id: 'tipo1', nome: 'Capacete de Segurança', ca: '12345', estoque: 15 },
        { id: 'tipo2', nome: 'Luvas de Proteção', ca: '23456', estoque: 30 },
        { id: 'tipo3', nome: 'Óculos de Proteção', ca: '34567', estoque: 25 },
        { id: 'tipo4', nome: 'Botina de Segurança', ca: '45678', estoque: 8 },
        { id: 'tipo5', nome: 'Protetor Auricular', ca: '56789', estoque: 40 },
        { id: 'tipo6', nome: 'Cinto de Segurança', ca: '67890', estoque: 6 },
      ];

      setTiposEPI(tiposEPIData);
    } catch (error) {
      console.error("Erro ao buscar EPIs:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os EPIs",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (values: EntregaEPIFormValues) => {
    console.log("Formulário enviado:", values);
    
    const epiSelecionado = tiposEPI.find(epi => epi.id === values.epi_id);
    
    if (!epiSelecionado) {
      toast({
        title: "Erro",
        description: "EPI não encontrado",
        variant: "destructive",
      });
      return;
    }

    const novoEPI = {
      id: `epi${Date.now()}`,
      nome: epiSelecionado.nome,
      ca: epiSelecionado.ca,
      data_entrega: values.data_entrega,
      data_vencimento: new Date(new Date(values.data_entrega).setMonth(new Date(values.data_entrega).getMonth() + 6)).toISOString().split('T')[0],
      quantidade: values.quantidade,
      status: 'ativo',
      termo_url: '#',
    };

    setEPIAtivos([novoEPI, ...epiAtivos]);

    toast({
      title: "EPI entregue",
      description: `${novoEPI.nome} entregue com sucesso.`,
    });

    form.reset();
    setIsDialogOpen(false);
  };

  const onDevolucaoSubmit = (values: DevolucaoEPIFormValues) => {
    if (!selectedEpiId) return;

    const epiSelecionado = [...epiAtivos, ...epiVencidos].find(epi => epi.id === selectedEpiId);
    
    if (!epiSelecionado) {
      toast({
        title: "Erro",
        description: "EPI não encontrado",
        variant: "destructive",
      });
      return;
    }

    const newAtivos = epiAtivos.filter(epi => epi.id !== selectedEpiId);
    setEPIAtivos(newAtivos);
    
    const newVencidos = epiVencidos.filter(epi => epi.id !== selectedEpiId);
    setEPIVencidos(newVencidos);

    const devolvido = {
      ...epiSelecionado,
      status: 'devolvido',
      data_devolucao: values.data_devolucao,
      motivo_devolucao: values.motivo,
      estado_conservacao: values.estado_conservacao,
    };
    
    setEPIHistorico([devolvido, ...epiHistorico]);

    toast({
      title: "EPI devolvido",
      description: `${epiSelecionado.nome} devolvido com sucesso.`,
    });

    devolucaoForm.reset();
    setIsDevDialogOpen(false);
    setSelectedEpiId(null);
  };

  const handleMovimentar = (epi: any) => {
    setSelectedEpiId(epi.id);
    devolucaoForm.setValue('epi_id', epi.id);
    setIsDevDialogOpen(true);
  };

  const epiAtivosColumns = [
    { 
      header: 'EPI', 
      accessorKey: 'nome',
    },
    { 
      header: 'CA', 
      accessorKey: 'ca',
    },
    { 
      header: 'Data Entrega', 
      accessorKey: 'data_entrega',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.data_entrega;
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Vencimento', 
      accessorKey: 'data_vencimento',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.data_vencimento;
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Qtd.', 
      accessorKey: 'quantidade',
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.status;
        
        let badgeClass = "";
        let icon = null;
        
        switch(value) {
          case 'ativo':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'proximo_vencimento':
            badgeClass = "bg-yellow-100 text-yellow-800";
            icon = <Clock className="h-3 w-3 mr-1" />;
            break;
          case 'vencido':
            badgeClass = "bg-red-100 text-red-800";
            icon = <AlertTriangle className="h-3 w-3 mr-1" />;
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            <div className="flex items-center">
              {icon}
              {value === 'ativo' ? 'Ativo' : 
               value === 'proximo_vencimento' ? 'Próximo ao vencimento' : 
               value === 'vencido' ? 'Vencido' : value}
            </div>
          </Badge>
        );
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: ({ row }) => {
        if (!row || !row.original) {
          return null;
        }
        
        const epi = row.original;
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8">
              <Clipboard className="h-3 w-3 mr-1" /> Termo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => handleMovimentar(epi)}
            >
              <ArrowUpDown className="h-3 w-3 mr-1" /> Movimentar
            </Button>
          </div>
        );
      }
    },
  ];

  const epiHistoricoColumns = [
    { 
      header: 'EPI', 
      accessorKey: 'nome',
    },
    { 
      header: 'CA', 
      accessorKey: 'ca',
    },
    { 
      header: 'Data Entrega', 
      accessorKey: 'data_entrega',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.data_entrega;
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Data Devolução', 
      accessorKey: 'data_devolucao',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.data_devolucao;
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Motivo', 
      accessorKey: 'motivo_devolucao',
    },
    { 
      header: 'Estado', 
      accessorKey: 'estado_conservacao',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.estado_conservacao;
        
        let badgeClass = "";
        
        switch(value) {
          case 'otimo':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'bom':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'regular':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          case 'ruim':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        if (!row || !row.original) return null;
        const value = row.original.status;
        
        let badgeClass = "";
        
        switch(value) {
          case 'devolvido':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'substituido':
            badgeClass = "bg-purple-100 text-purple-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        );
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Clipboard className="h-3 w-3 mr-1" /> Termo
          </Button>
        </div>
      )
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Gestão de EPIs</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Exportar Relatório
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-blue hover:bg-brand-blue/90">
                <Plus className="h-4 w-4 mr-2" /> Entregar EPI
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Entregar novo EPI</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="epi_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EPI</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o EPI" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tiposEPI.map(epi => (
                              <SelectItem key={epi.id} value={epi.id}>
                                {epi.nome} (CA: {epi.ca}) - Estoque: {epi.estoque}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quantidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="data_entrega"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Entrega</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="observacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observação</FormLabel>
                        <FormControl>
                          <Input placeholder="Observações sobre a entrega..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90">
                      Confirmar Entrega
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isDevDialogOpen} onOpenChange={setIsDevDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Devolução de EPI</DialogTitle>
              </DialogHeader>
              <Form {...devolucaoForm}>
                <form onSubmit={devolucaoForm.handleSubmit(onDevolucaoSubmit)} className="space-y-4 pt-4">
                  <FormField
                    control={devolucaoForm.control}
                    name="motivo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo da Devolução</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o motivo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="desgaste">Desgaste</SelectItem>
                            <SelectItem value="dano">Danificado</SelectItem>
                            <SelectItem value="extravio">Extravio</SelectItem>
                            <SelectItem value="troca">Troca por outro modelo</SelectItem>
                            <SelectItem value="fim_contrato">Fim de contrato</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={devolucaoForm.control}
                    name="estado_conservacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado de Conservação</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="otimo">Ótimo</SelectItem>
                            <SelectItem value="bom">Bom</SelectItem>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="ruim">Ruim</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={devolucaoForm.control}
                    name="data_devolucao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Devolução</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={devolucaoForm.control}
                    name="observacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observação</FormLabel>
                        <FormControl>
                          <Input placeholder="Observações sobre a devolução..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDevDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90">
                      Confirmar Devolução
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">EPIs Ativos</p>
              <p className="font-medium">{epiAtivos.length} itens</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">EPIs Vencidos</p>
              <p className="font-medium">{epiVencidos.length} itens</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de EPIs</p>
              <p className="font-medium">{epiAtivos.length + epiVencidos.length + epiHistorico.length} registros</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clipboard className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="ativos" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="ativos">EPIs Ativos</TabsTrigger>
            <TabsTrigger value="historico">Histórico de EPIs</TabsTrigger>
            <TabsTrigger value="alertas">Alertas e Vencimentos</TabsTrigger>
            <TabsTrigger value="documentos">Documentos e Termos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ativos" className="pt-4">
            <div className="space-y-4">
              <DataTable
                columns={epiAtivosColumns}
                data={[...epiAtivos, ...epiVencidos]}
                itemsPerPage={5}
              />
              
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
                <h4 className="font-medium flex items-center text-yellow-800">
                  <AlertTriangle className="h-4 w-4 mr-2" /> Alertas de Conformidade
                </h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start">
                    <Clock className="h-3 w-3 mr-2 mt-1 text-yellow-600" /> 
                    <span>2 EPIs com vencimento próximo (30 dias)</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-3 w-3 mr-2 mt-1 text-red-600" /> 
                    <span>1 EPI com CA vencido</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="historico" className="pt-4">
            <DataTable
              columns={epiHistoricoColumns}
              data={epiHistorico}
              itemsPerPage={5}
            />
          </TabsContent>
          
          <TabsContent value="alertas" className="pt-4">
            <div className="space-y-6">
              <div className="bg-white border rounded-md p-4">
                <h3 className="font-medium mb-3">Vencimentos Próximos</h3>
                <div className="space-y-2">
                  {epiAtivos
                    .filter(epi => epi.status === 'proximo_vencimento')
                    .map(epi => (
                      <div key={epi.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-100">
                        <div>
                          <p className="font-medium">{epi.nome}</p>
                          <p className="text-sm text-gray-600">CA: {epi.ca} | Entregue: {new Date(epi.data_entrega).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" /> Vence em {Math.ceil((new Date(epi.data_vencimento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="bg-white border rounded-md p-4">
                <h3 className="font-medium mb-3">EPIs Vencidos</h3>
                <div className="space-y-2">
                  {epiVencidos.map(epi => (
                    <div key={epi.id} className="flex justify-between items-center p-3 bg-red-50 rounded-md border border-red-100">
                      <div>
                        <p className="font-medium">{epi.nome}</p>
                        <p className="text-sm text-gray-600">CA: {epi.ca} | Entregue: {new Date(epi.data_entrega).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" /> Vencido há {Math.abs(Math.floor((new Date(epi.data_vencimento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} dias
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border rounded-md p-4">
                <h3 className="font-medium mb-3">Alertas de Conformidade</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md border border-blue-100">
                    <div>
                      <p className="font-medium">Treinamento NR-6 Necessário</p>
                      <p className="text-sm text-gray-600">Obrigatório para uso de EPIs específicos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Agendar Treinamento
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documentos" className="pt-4">
            <div className="space-y-6">
              <div className="bg-white border rounded-md p-5">
                <h3 className="font-medium mb-3">Termos de Responsabilidade</h3>
                <div className="space-y-2">
                  {[...epiAtivos, ...epiVencidos].map(epi => (
                    <div key={epi.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                      <div>
                        <p className="font-medium">Termo de Responsabilidade - {epi.nome}</p>
                        <p className="text-sm text-gray-600">Entregue: {new Date(epi.data_entrega).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" /> Visualizar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border rounded-md p-5">
                <h3 className="font-medium mb-3">Documentos de CA</h3>
                <div className="space-y-2">
                  {tiposEPI.slice(0, 3).map(epi => (
                    <div key={epi.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                      <div>
                        <p className="font-medium">Certificado de Aprovação - {epi.nome}</p>
                        <p className="text-sm text-gray-600">CA: {epi.ca}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" /> Visualizar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border rounded-md p-5">
                <h3 className="font-medium mb-3">Upload de Comprovantes</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Arraste e solte arquivos aqui ou clique para fazer upload de comprovantes
                  </p>
                  <Button variant="outline">Selecionar Arquivos</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GestaoEPIs;
