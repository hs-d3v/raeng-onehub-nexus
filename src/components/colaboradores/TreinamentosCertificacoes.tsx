import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Book, Calendar, Certificate, CheckCircle, Clock, Download, FileText, 
  GraduationCap, MoreVertical, PlusCircle, Upload, User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DataTable, { Column } from '@/components/ui/DataTable';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { safeFormatDate } from '@/utils/dateUtils';

interface TreinamentosCertificacoesProps {
  colaboradorId?: string;
}

const TreinamentosCertificacoes: React.FC<TreinamentosCertificacoesProps> = ({ colaboradorId }) => {
  const { toast } = useToast();
  const [treinamentos, setTreinamentos] = useState<any[]>([]);
  const [certificacoes, setCertificacoes] = useState<any[]>([]);
  const [necessidades, setNecessidades] = useState<any[]>([]);

  useEffect(() => {
    if (colaboradorId) {
      // Simular dados para exibição (em uma aplicação real, buscaríamos do banco)
      const treinamentosData = [
        { 
          id: 't1', 
          nome: 'NR-35 Trabalho em Altura', 
          dataInicio: '2023-08-15', 
          cargaHoraria: 8, 
          instrutor: 'João Silva', 
          progresso: 75, 
          status: 'em_andamento',
          certificado_url: '#'
        },
        { 
          id: 't2', 
          nome: 'NR-10 Segurança em Eletricidade', 
          dataInicio: '2023-09-01', 
          cargaHoraria: 40, 
          instrutor: 'Maria Oliveira', 
          progresso: 100, 
          status: 'concluido',
          certificado_url: '#'
        },
        { 
          id: 't3', 
          nome: 'NR-33 Espaços Confinados', 
          dataInicio: '2023-10-01', 
          cargaHoraria: 16, 
          instrutor: 'Carlos Pereira', 
          progresso: 20, 
          status: 'pendente',
          certificado_url: '#'
        },
      ];
      
      const certificacoesData = [
        { 
          id: 'c1', 
          nome: 'Técnico em Segurança do Trabalho', 
          instituicao: 'SENAC', 
          dataObtencao: '2022-12-31', 
          dataValidade: '2026-12-31', 
          status: 'valido',
          documento_url: '#'
        },
        { 
          id: 'c2', 
          nome: 'Auditor Interno ISO 45001', 
          instituicao: 'Bureau Veritas', 
          dataObtencao: '2023-05-20', 
          dataValidade: '2024-05-20', 
          status: 'proximo_vencimento',
          documento_url: '#'
        },
        { 
          id: 'c3', 
          nome: 'Primeiros Socorros', 
          instituicao: 'Corpo de Bombeiros', 
          dataObtencao: '2021-11-10', 
          dataValidade: '2023-11-10', 
          status: 'vencido',
          documento_url: '#'
        },
      ];
      
      const necessidadesData = [
        { 
          id: 'n1', 
          nome: 'NR-35 Trabalho em Altura - Reciclagem', 
          motivo: 'Reciclagem bienal', 
          dataSolicitacao: '2023-11-01', 
          solicitadoPor: 'Gestor', 
          prioridade: 'alta', 
          status: 'pendente' 
        },
        { 
          id: 'n2', 
          nome: 'NR-10 Complementar (SEP)', 
          motivo: 'Promoção para eletricista', 
          dataSolicitacao: '2023-10-15', 
          solicitadoPor: 'RH', 
          prioridade: 'media', 
          status: 'aprovado' 
        },
        { 
          id: 'n3', 
          nome: 'Operador de Empilhadeira', 
          motivo: 'Nova função', 
          dataSolicitacao: '2023-10-01', 
          solicitadoPor: 'Supervisor', 
          prioridade: 'baixa', 
          status: 'agendado' 
        },
      ];

      setTreinamentos(treinamentosData);
      setCertificacoes(certificacoesData);
      setNecessidades(necessidadesData);
    }
  }, [colaboradorId]);

  const treinamentosColumns: Column[] = [
    { header: 'Treinamento', accessorKey: 'nome' },
    { 
      header: 'Data Início', 
      accessorKey: 'dataInicio',
      cell: ({ row }) => safeFormatDate(row.original.dataInicio)
    },
    { 
      header: 'Carga Horária', 
      accessorKey: 'cargaHoraria',
      cell: ({ row }) => `${row.original.cargaHoraria}h`
    },
    { header: 'Instrutor', accessorKey: 'instrutor' },
    { 
      header: 'Progresso', 
      accessorKey: 'progresso',
      cell: ({ row }) => {
        const value = row.original.progresso;
        return (
          <div className="w-full">
            <div className="flex justify-between mb-1 text-xs">
              <span>{value}%</span>
            </div>
            <Progress value={value} className="h-2" />
          </div>
        );
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        let icon = null;
        
        switch(value) {
          case 'concluido':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'em_andamento':
            badgeClass = "bg-blue-100 text-blue-800";
            icon = <Clock className="h-3 w-3 mr-1" />;
            break;
          case 'pendente':
            badgeClass = "bg-yellow-100 text-yellow-800";
            icon = <Calendar className="h-3 w-3 mr-1" />;
            break;
          case 'cancelado':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            <div className="flex items-center">
              {icon}
              {value === 'concluido' ? 'Concluído' : 
               value === 'em_andamento' ? 'Em Andamento' : 
               value === 'pendente' ? 'Pendente' : 
               value.charAt(0).toUpperCase() + value.slice(1)}
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
            <FileText className="h-3 w-3 mr-1" /> Detalhes
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Certificate className="h-3 w-3 mr-1" /> Certificado
          </Button>
        </div>
      )
    },
  ];

  const certificacoesColumns: Column[] = [
    { header: 'Certificação', accessorKey: 'nome' },
    { header: 'Instituição', accessorKey: 'instituicao' },
    { 
      header: 'Data Obtenção', 
      accessorKey: 'dataObtencao',
      cell: ({ row }) => safeFormatDate(row.original.dataObtencao)
    },
    { 
      header: 'Validade', 
      accessorKey: 'dataValidade',
      cell: ({ row }) => safeFormatDate(row.original.dataValidade)
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        let icon = null;
        
        switch(value) {
          case 'valido':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'proximo_vencimento':
            badgeClass = "bg-yellow-100 text-yellow-800";
            icon = <Clock className="h-3 w-3 mr-1" />;
            break;
          case 'vencido':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            <div className="flex items-center">
              {icon}
              {value === 'valido' ? 'Válido' : 
               value === 'proximo_vencimento' ? 'Próx. Vencimento' : 
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
            <FileText className="h-3 w-3 mr-1" /> Visualizar
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Download className="h-3 w-3 mr-1" /> Download
          </Button>
        </div>
      )
    }
  ];

  const necessidadesColumns: Column[] = [
    { header: 'Treinamento', accessorKey: 'nome' },
    { header: 'Motivo', accessorKey: 'motivo' },
    { 
      header: 'Data Solicitação', 
      accessorKey: 'dataSolicitacao',
      cell: ({ row }) => safeFormatDate(row.original.dataSolicitacao)
    },
    { header: 'Solicitado Por', accessorKey: 'solicitadoPor' },
    { header: 'Prioridade', accessorKey: 'prioridade',
      cell: ({ row }) => {
        const value = row.original.prioridade;
        if (!value) return null;
        
        let badgeClass = "";
        
        switch(value) {
          case 'alta':
            badgeClass = "bg-red-100 text-red-800";
            break;
          case 'media':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          case 'baixa':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return <Badge className={badgeClass}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        
        switch(value) {
          case 'aprovado':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'pendente':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          case 'agendado':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'concluido':
            badgeClass = "bg-purple-100 text-purple-800";
            break;
          case 'negado':
            badgeClass = "bg-red-100 text-red-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return <Badge className={badgeClass}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: () => (
        <Button variant="outline" size="sm" className="text-xs h-8">
          <MoreVertical className="h-3 w-3" />
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg">Treinamentos e Certificações</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Exportar
          </Button>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <PlusCircle className="h-4 w-4 mr-2" /> Solicitar Treinamento
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Treinamentos Concluídos</p>
              <p className="font-medium">{treinamentos.filter(t => t.status === 'concluido').length} itens</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-green-500" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Certificações Válidas</p>
              <p className="font-medium">{certificacoes.filter(c => c.status === 'valido').length} itens</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Certificate className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Necessidades Pendentes</p>
              <p className="font-medium">{necessidades.filter(n => n.status === 'pendente').length} solicitações</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Book className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="treinamentos" className="w-full">
          <TabsList>
            <TabsTrigger value="treinamentos">Treinamentos</TabsTrigger>
            <TabsTrigger value="certificacoes">Certificações</TabsTrigger>
            <TabsTrigger value="necessidades">Necessidades</TabsTrigger>
            <TabsTrigger value="upload">Upload de Documentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="treinamentos" className="pt-4">
            <DataTable
              columns={treinamentosColumns}
              data={treinamentos}
              itemsPerPage={5}
            />
          </TabsContent>
          
          <TabsContent value="certificacoes" className="pt-4">
            <DataTable
              columns={certificacoesColumns}
              data={certificacoes}
              itemsPerPage={5}
            />
          </TabsContent>
          
          <TabsContent value="necessidades" className="pt-4">
            <DataTable
              columns={necessidadesColumns}
              data={necessidades}
              itemsPerPage={5}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="pt-4">
            <div className="space-y-6">
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
              
              <div className="bg-white border rounded-md p-5">
                <h3 className="font-medium mb-3">Termos de Responsabilidade</h3>
                <div className="space-y-2">
                  {treinamentos.map(treinamento => (
                    <div key={treinamento.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                      <div>
                        <p className="font-medium">Termo de Responsabilidade - {treinamento.nome}</p>
                        <p className="text-sm text-gray-600">Data: {treinamento.dataInicio}</p>
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
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TreinamentosCertificacoes;
