
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, CheckCircle, Clipboard, ArrowUpDown, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  quantidade: z.string().transform(val => parseInt(val, 10)), // Transform string to number
  data_entrega: z.string({
    required_error: "Data de entrega obrigatória",
  }),
  observacao: z.string().optional(),
});

type EntregaEPIFormValues = z.infer<typeof formSchema>;

const GestaoEPIs: React.FC<GestaoEPIsProps> = ({ colaboradorId }) => {
  const { toast } = useToast();
  const [epiList, setEPIList] = useState<any[]>([]);
  const [epiAtivos, setEPIAtivos] = useState<any[]>([]);
  const [epiVencidos, setEPIVencidos] = useState<any[]>([]);
  const [epiHistorico, setEPIHistorico] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tiposEPI, setTiposEPI] = useState<any[]>([]);

  const form = useForm<EntregaEPIFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantidade: "1", // Keep as string for input, will be transformed
      data_entrega: new Date().toISOString().substring(0, 10),
      observacao: "",
    },
  });

  useEffect(() => {
    if (colaboradorId) {
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
    }
  }, [colaboradorId]);

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
      cell: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Vencimento', 
      accessorKey: 'data_vencimento',
      cell: (value: string) => {
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
      cell: (value: string) => {
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
      cell: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Clipboard className="h-3 w-3 mr-1" /> Termo
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <ArrowUpDown className="h-3 w-3 mr-1" /> Movimentar
          </Button>
        </div>
      )
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
      cell: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Data Devolução', 
      accessorKey: 'data_devolucao',
      cell: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value: string) => {
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
                          <Input type="number" min="1" {...field} />
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
        
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium mb-3">EPIs Ativos</h3>
            <DataTable
              columns={epiAtivosColumns}
              data={[...epiAtivos, ...epiVencidos]}
              itemsPerPage={5}
            />
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-3">Histórico de EPIs</h3>
            <DataTable
              columns={epiHistoricoColumns}
              data={epiHistorico}
              itemsPerPage={5}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GestaoEPIs;
