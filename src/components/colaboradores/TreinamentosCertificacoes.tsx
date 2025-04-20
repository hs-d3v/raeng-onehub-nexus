
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Clock, AlertTriangle, FileText, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TreinamentosCertificacoesProps {
  colaboradorId?: string;
}

const TreinamentosCertificacoes: React.FC<TreinamentosCertificacoesProps> = ({ colaboradorId }) => {
  const { toast } = useToast();
  const [treinamentosFuturos, setTreinamentosFuturos] = useState<any[]>([]);
  const [treinamentosRealizados, setTreinamentosRealizados] = useState<any[]>([]);
  const [certificacoes, setCertificacoes] = useState<any[]>([]);

  useEffect(() => {
    if (colaboradorId) {
      // Simular dados para exibição (em uma aplicação real, buscaríamos do banco)
      const treinamentosFuturosData = [
        { 
          id: 'tr1', 
          titulo: 'NR-35: Trabalho em Altura', 
          data_programada: '2023-11-10', 
          carga_horaria: 8,
          status: 'agendado',
          local: 'Centro de Treinamento',
          instrutor: 'Eng. Paulo Martins'
        },
        { 
          id: 'tr2', 
          titulo: 'NR-10: Segurança em Instalações e Serviços em Eletricidade', 
          data_programada: '2023-12-05', 
          carga_horaria: 40,
          status: 'agendado',
          local: 'Sala de Treinamento 2',
          instrutor: 'Eng. Márcio Pereira'
        },
        { 
          id: 'tr3', 
          titulo: 'Brigada de Incêndio', 
          data_programada: '2023-12-15', 
          carga_horaria: 16,
          status: 'pendente',
          local: 'A definir',
          instrutor: 'A definir'
        },
      ];
      
      const treinamentosRealizadosData = [
        { 
          id: 'tr101', 
          titulo: 'Integração de Segurança', 
          data_realizacao: '2022-06-01', 
          carga_horaria: 4,
          resultado: 'aprovado',
          validade: '2023-06-01',
          status: 'vencido',
          certificado_url: '#'
        },
        { 
          id: 'tr102', 
          titulo: 'NR-06: Uso de EPIs', 
          data_realizacao: '2022-06-05', 
          carga_horaria: 4,
          resultado: 'aprovado',
          validade: '2024-06-05',
          status: 'valido',
          certificado_url: '#'
        },
        { 
          id: 'tr103', 
          titulo: 'NR-18: Condições e Meio Ambiente de Trabalho na Indústria da Construção', 
          data_realizacao: '2022-07-10', 
          carga_horaria: 8,
          resultado: 'aprovado',
          validade: '2024-07-10',
          status: 'valido',
          certificado_url: '#'
        },
      ];
      
      const certificacoesData = [
        { 
          id: 'cert1', 
          titulo: 'Técnico em Segurança do Trabalho', 
          instituicao: 'SENAI',
          data_emissao: '2021-12-10',
          data_validade: '2026-12-10',
          status: 'valido',
          registro: 'TST-12345',
          documento_url: '#'
        },
        { 
          id: 'cert2', 
          titulo: 'Operador de Empilhadeira', 
          instituicao: 'Centro de Formação Profissional',
          data_emissao: '2022-03-15',
          data_validade: '2024-03-15',
          status: 'valido',
          registro: 'OE-54321',
          documento_url: '#'
        }
      ];

      setTreinamentosFuturos(treinamentosFuturosData);
      setTreinamentosRealizados(treinamentosRealizadosData);
      setCertificacoes(certificacoesData);
    }
  }, [colaboradorId]);

  const treinamentosFuturosColumns = [
    { 
      header: 'Título', 
      accessorKey: 'titulo',
    },
    { 
      header: 'Data Programada', 
      accessorKey: 'data_programada',
      cell: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'C.H.', 
      accessorKey: 'carga_horaria',
      cell: (value: number) => `${value}h`
    },
    { 
      header: 'Local', 
      accessorKey: 'local',
    },
    { 
      header: 'Instrutor', 
      accessorKey: 'instrutor',
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value: string) => {
        let badgeClass = "";
        let icon = null;
        
        switch(value) {
          case 'agendado':
            badgeClass = "bg-blue-100 text-blue-800";
            icon = <Calendar className="h-3 w-3 mr-1" />;
            break;
          case 'pendente':
            badgeClass = "bg-orange-100 text-orange-800";
            icon = <Clock className="h-3 w-3 mr-1" />;
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            <div className="flex items-center">
              {icon}
              {value.charAt(0).toUpperCase() + value.slice(1)}
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
            Detalhes
          </Button>
        </div>
      )
    },
  ];

  const treinamentosRealizadosColumns = [
    { 
      header: 'Título', 
      accessorKey: 'titulo',
    },
    { 
      header: 'Data Realização', 
      accessorKey: 'data_realizacao',
      cell: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'C.H.', 
      accessorKey: 'carga_horaria',
      cell: (value: number) => `${value}h`
    },
    { 
      header: 'Validade', 
      accessorKey: 'validade',
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
        let icon = null;
        
        switch(value) {
          case 'valido':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'vencido':
            badgeClass = "bg-red-100 text-red-800";
            icon = <AlertTriangle className="h-3 w-3 mr-1" />;
            break;
          case 'proximo_vencimento':
            badgeClass = "bg-yellow-100 text-yellow-800";
            icon = <Clock className="h-3 w-3 mr-1" />;
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            <div className="flex items-center">
              {icon}
              {value === 'valido' ? 'Válido' : value === 'vencido' ? 'Vencido' : 'Próximo ao vencimento'}
            </div>
          </Badge>
        );
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: (row: any) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <FileText className="h-3 w-3 mr-1" /> Certificado
          </Button>
        </div>
      )
    },
  ];

  const certificacoesColumns = [
    { 
      header: 'Título', 
      accessorKey: 'titulo',
    },
    { 
      header: 'Instituição', 
      accessorKey: 'instituicao',
    },
    { 
      header: 'Registro/ID', 
      accessorKey: 'registro',
    },
    { 
      header: 'Data Emissão', 
      accessorKey: 'data_emissao',
      cell: (value: string) => {
        const data = new Date(value);
        return data.toLocaleDateString('pt-BR');
      }
    },
    { 
      header: 'Validade', 
      accessorKey: 'data_validade',
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
        let icon = null;
        
        switch(value) {
          case 'valido':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'vencido':
            badgeClass = "bg-red-100 text-red-800";
            icon = <AlertTriangle className="h-3 w-3 mr-1" />;
            break;
          case 'proximo_vencimento':
            badgeClass = "bg-yellow-100 text-yellow-800";
            icon = <Clock className="h-3 w-3 mr-1" />;
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <Badge className={badgeClass}>
            <div className="flex items-center">
              {icon}
              {value === 'valido' ? 'Válido' : value === 'vencido' ? 'Vencido' : 'Próximo ao vencimento'}
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
            <FileText className="h-3 w-3 mr-1" /> Documento
          </Button>
        </div>
      )
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Treinamentos e Certificações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="font-medium text-sm text-blue-700 mb-2">Conformidade NRs</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>NR-10</span>
                <span className="font-medium">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>NR-35</span>
                <span className="font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>NR-18</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <h3 className="font-medium text-sm text-green-700 mb-2">Resumo de Treinamentos</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Concluídos</p>
                <p className="font-medium">8 cursos</p>
                <p className="text-xs text-gray-500 mt-1">64 horas totais</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Pendentes</p>
                <p className="font-medium">3 cursos</p>
                <p className="text-xs text-gray-500 mt-1">40 horas totais</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <h3 className="font-medium text-sm text-amber-700 mb-2">Próximo Treinamento</h3>
            <p className="font-medium">NR-35: Trabalho em Altura</p>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-xs">10/11/2023 (em 5 dias)</span>
            </div>
            <Button variant="outline" className="w-full mt-2 h-7 text-xs">Ver Detalhes</Button>
          </div>
        </div>
        
        <Tabs defaultValue="futuros" className="w-full">
          <TabsList>
            <TabsTrigger value="futuros">Treinamentos Futuros</TabsTrigger>
            <TabsTrigger value="realizados">Treinamentos Realizados</TabsTrigger>
            <TabsTrigger value="certificacoes">Certificações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="futuros" className="pt-4">
            <DataTable
              columns={treinamentosFuturosColumns}
              data={treinamentosFuturos}
              itemsPerPage={5}
            />
          </TabsContent>
          
          <TabsContent value="realizados" className="pt-4">
            <DataTable
              columns={treinamentosRealizadosColumns}
              data={treinamentosRealizados}
              itemsPerPage={5}
            />
          </TabsContent>
          
          <TabsContent value="certificacoes" className="pt-4">
            <DataTable
              columns={certificacoesColumns}
              data={certificacoes}
              itemsPerPage={5}
            />
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" /> Adicionar Certificação
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TreinamentosCertificacoes;
