
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Upload, Check, Calendar, Phone, User, MapPin, Briefcase, ClipboardCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  matricula: z.string().min(1, { message: 'A matrícula é obrigatória' }),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  data_nascimento: z.string().optional(),
  genero: z.string().optional(),
  estado_civil: z.string().optional(),
  telefone: z.string().optional(),
  celular: z.string().optional(),
  email_pessoal: z.string().email({ message: 'E-mail inválido' }).optional().or(z.literal('')),
  email: z.string().email({ message: 'E-mail inválido' }).optional().or(z.literal('')),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  data_admissao: z.string().optional(),
  cargo: z.string().optional(),
  departamento: z.string().optional(),
  salario: z.string().optional(),
  contato_emergencia: z.string().optional(),
  telefone_emergencia: z.string().optional(),
  observacoes: z.string().optional(),
});

type ColaboradorFormValues = z.infer<typeof formSchema>;

interface FichaTecnicaProps {
  colaboradorId?: string;
  onSave?: () => void;
  isEditMode?: boolean;
}

const FichaTecnica: React.FC<FichaTecnicaProps> = ({ 
  colaboradorId,
  onSave,
  isEditMode = false 
}) => {
  const { toast } = useToast();
  const form = useForm<ColaboradorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      matricula: '',
      cpf: '',
      rg: '',
      data_nascimento: '',
      genero: '',
      estado_civil: '',
      telefone: '',
      celular: '',
      email_pessoal: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      data_admissao: '',
      cargo: '',
      departamento: '',
      salario: '',
      contato_emergencia: '',
      telefone_emergencia: '',
      observacoes: '',
    }
  });

  React.useEffect(() => {
    const fetchColaborador = async () => {
      if (colaboradorId) {
        const { data, error } = await supabase
          .from('colaboradores')
          .select('*')
          .eq('id', colaboradorId)
          .single();

        if (error) {
          console.error('Erro ao buscar colaborador:', error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os dados do colaborador",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          // Mapear dados do banco para o formulário
          form.reset({
            nome: data.nome || '',
            matricula: data.matricula || '',
            cpf: data.meta_data?.cpf || '',
            rg: data.meta_data?.rg || '',
            data_nascimento: data.meta_data?.data_nascimento || '',
            genero: data.meta_data?.genero || '',
            estado_civil: data.meta_data?.estado_civil || '',
            telefone: data.telefone || '',
            celular: data.meta_data?.celular || '',
            email_pessoal: data.meta_data?.email_pessoal || '',
            email: data.email || '',
            endereco: data.meta_data?.endereco || '',
            cidade: data.meta_data?.cidade || '',
            estado: data.meta_data?.estado || '',
            cep: data.meta_data?.cep || '',
            data_admissao: data.data_admissao ? new Date(data.data_admissao).toISOString().split('T')[0] : '',
            cargo: data.cargo || '',
            departamento: data.departamento || '',
            salario: data.meta_data?.salario || '',
            contato_emergencia: data.meta_data?.contato_emergencia || '',
            telefone_emergencia: data.meta_data?.telefone_emergencia || '',
            observacoes: data.meta_data?.observacoes || '',
          });
        }
      }
    };

    fetchColaborador();
  }, [colaboradorId, form, toast]);

  const onSubmit = async (values: ColaboradorFormValues) => {
    const meta_data = {
      cpf: values.cpf,
      rg: values.rg,
      data_nascimento: values.data_nascimento,
      genero: values.genero,
      estado_civil: values.estado_civil,
      celular: values.celular,
      email_pessoal: values.email_pessoal,
      endereco: values.endereco,
      cidade: values.cidade,
      estado: values.estado,
      cep: values.cep,
      salario: values.salario,
      contato_emergencia: values.contato_emergencia,
      telefone_emergencia: values.telefone_emergencia,
      observacoes: values.observacoes,
    };

    if (colaboradorId) {
      // Atualização
      const { error } = await supabase
        .from('colaboradores')
        .update({
          nome: values.nome,
          matricula: values.matricula,
          telefone: values.telefone,
          email: values.email,
          data_admissao: values.data_admissao,
          cargo: values.cargo,
          departamento: values.departamento,
          meta_data
        })
        .eq('id', colaboradorId);

      if (error) {
        console.error('Erro ao atualizar colaborador:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar os dados do colaborador",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Dados do colaborador atualizados com sucesso",
      });
    } else {
      // Inserção
      const { error } = await supabase
        .from('colaboradores')
        .insert({
          nome: values.nome,
          matricula: values.matricula,
          telefone: values.telefone,
          email: values.email,
          data_admissao: values.data_admissao,
          cargo: values.cargo,
          departamento: values.departamento,
          meta_data
        });

      if (error) {
        console.error('Erro ao inserir colaborador:', error);
        toast({
          title: "Erro",
          description: "Não foi possível cadastrar o colaborador",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Colaborador cadastrado com sucesso",
      });
      
      form.reset();
    }

    if (onSave) onSave();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Ficha Técnica do Colaborador</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dados_pessoais">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="dados_pessoais">
              <User className="h-4 w-4 mr-2" /> 
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="profissional">
              <Briefcase className="h-4 w-4 mr-2" /> 
              Dados Profissionais
            </TabsTrigger>
            <TabsTrigger value="documentos">
              <FileText className="h-4 w-4 mr-2" /> 
              Documentos
            </TabsTrigger>
            <TabsTrigger value="contatos">
              <Phone className="h-4 w-4 mr-2" /> 
              Contatos
            </TabsTrigger>
            <TabsTrigger value="endereco">
              <MapPin className="h-4 w-4 mr-2" /> 
              Endereço
            </TabsTrigger>
            <TabsTrigger value="observacoes">
              <ClipboardCheck className="h-4 w-4 mr-2" /> 
              Observações
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="dados_pessoais">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="flex flex-col items-center md:grid md:grid-cols-[120px_1fr] gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-lg">{form.watch('nome')?.substring(0, 2).toUpperCase() || 'CO'}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Upload className="h-4 w-4 mr-2" /> 
                      Alterar Foto
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo do colaborador" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="data_nascimento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="genero"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gênero</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="masculino">Masculino</SelectItem>
                                <SelectItem value="feminino">Feminino</SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                                <SelectItem value="nao_informado">Prefiro não informar</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="estado_civil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado Civil</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                              <SelectItem value="casado">Casado(a)</SelectItem>
                              <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                              <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                              <SelectItem value="uniao_estavel">União Estável</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="profissional">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <FormField
                    control={form.control}
                    name="matricula"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matrícula *</FormLabel>
                        <FormControl>
                          <Input placeholder="Matrícula do colaborador" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="data_admissao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Admissão</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="cargo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                          <Input placeholder="Cargo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Operacional">Operacional</SelectItem>
                            <SelectItem value="Administrativo">Administrativo</SelectItem>
                            <SelectItem value="Técnico">Técnico</SelectItem>
                            <SelectItem value="Gestão">Gestão</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salário</FormLabel>
                        <FormControl>
                          <Input placeholder="R$ 0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="documentos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000-0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border rounded-md p-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Documentos Anexados</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['RG', 'CPF', 'Comprovante de Residência', 'CNH'].map((doc) => (
                      <Badge key={doc} variant="outline" className="px-2 py-1">
                        {doc} <Check className="h-3 w-3 ml-1 text-green-500" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" /> 
                      Anexar Documento
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Visualizar Documentos
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contatos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 0000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="celular"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail Corporativo</FormLabel>
                        <FormControl>
                          <Input placeholder="email@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email_pessoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail Pessoal</FormLabel>
                        <FormControl>
                          <Input placeholder="email@pessoal.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contato_emergencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contato de Emergência</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do contato" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone_emergencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone de Emergência</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="endereco">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua, número, complemento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map(
                              (estado) => (
                                <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="observacoes">
                <div className="grid grid-cols-1 gap-4 my-4">
                  <FormField
                    control={form.control}
                    name="observacoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Informações complementares sobre o colaborador..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  {colaboradorId ? "Atualizar Colaborador" : "Cadastrar Colaborador"}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FichaTecnica;
