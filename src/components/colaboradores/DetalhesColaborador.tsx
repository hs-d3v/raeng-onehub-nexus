
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MainLayout from '@/components/layout/MainLayout';

import FichaTecnica from './FichaTecnica';
import GestaoEPIs from './GestaoEPIs';
import SaudeOcupacional from './SaudeOcupacional';
import TreinamentosCertificacoes from './TreinamentosCertificacoes';
import CrachaInteligente from './CrachaInteligente';
import ControleJornadaFerias from './ControleJornadaFerias';
import PeopleAnalytics from './PeopleAnalytics';
import PortalColaborador from './PortalColaborador';

const DetalhesColaborador = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colaborador, setColaborador] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColaborador = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('colaboradores')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setColaborador(data);
      } catch (error) {
        console.error('Erro ao buscar dados do colaborador:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do colaborador",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchColaborador();
  }, [id, toast]);

  const handleBack = () => {
    navigate('/colaboradores');
  };

  const handleDelete = async () => {
    if (!colaborador?.id) return;

    const confirmed = window.confirm('Tem certeza que deseja excluir este colaborador? Esta ação não pode ser desfeita.');
    
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('colaboradores')
        .delete()
        .eq('id', colaborador.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso",
        description: "Colaborador excluído com sucesso",
      });
      
      navigate('/colaboradores');
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o colaborador",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse">Carregando...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Editar
            </Button>
            <Button variant="outline" className="text-red-500 hover:text-red-700" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={colaborador?.foto_url || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl">{colaborador?.nome?.substring(0, 2).toUpperCase() || 'CO'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{colaborador?.nome || 'Nome do Colaborador'}</h1>
                    {colaborador?.ativo ? (
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        <UserCheck className="h-3 w-3 mr-1" /> Ativo
                      </Badge>
                    ) : (
                      <Badge className="ml-2 bg-red-100 text-red-800 border-red-200">Inativo</Badge>
                    )}
                  </div>
                  <p className="text-gray-500">{colaborador?.cargo || 'Cargo'}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2">Matrícula: {colaborador?.matricula || '0000'}</Badge>
                    <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue">
                      {colaborador?.departamento || 'Departamento'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 md:items-end">
                <div className="text-sm">
                  <p><span className="font-medium">Data de Admissão:</span> {colaborador?.data_admissao ? new Date(colaborador.data_admissao).toLocaleDateString('pt-BR') : 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {colaborador?.email || 'N/A'}</p>
                  <p><span className="font-medium">Telefone:</span> {colaborador?.telefone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ficha" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="ficha">Ficha Técnica</TabsTrigger>
                <TabsTrigger value="epis">EPIs</TabsTrigger>
                <TabsTrigger value="saude">Saúde Ocupacional</TabsTrigger>
                <TabsTrigger value="treinamentos">Treinamentos</TabsTrigger>
                <TabsTrigger value="cracha">Crachá</TabsTrigger>
                <TabsTrigger value="jornada">Jornada/Férias</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="portal">Portal</TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="ficha">
                  <FichaTecnica colaboradorId={id} />
                </TabsContent>
                
                <TabsContent value="epis">
                  <GestaoEPIs colaboradorId={id} />
                </TabsContent>
                
                <TabsContent value="saude">
                  <SaudeOcupacional colaboradorId={id} />
                </TabsContent>
                
                <TabsContent value="treinamentos">
                  <TreinamentosCertificacoes colaboradorId={id} />
                </TabsContent>
                
                <TabsContent value="cracha">
                  <CrachaInteligente colaborador={colaborador} />
                </TabsContent>
                
                <TabsContent value="jornada">
                  <ControleJornadaFerias colaboradorId={id} />
                </TabsContent>
                
                <TabsContent value="analytics">
                  <PeopleAnalytics colaboradorId={id} />
                </TabsContent>
                
                <TabsContent value="portal">
                  <PortalColaborador colaborador={colaborador} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DetalhesColaborador;
