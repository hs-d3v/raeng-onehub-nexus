
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertCircle, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SaudeOcupacionalProps {
  colaboradorId?: string;
}

const SaudeOcupacional: React.FC<SaudeOcupacionalProps> = ({ colaboradorId }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [proximosExames, setProximosExames] = useState<any[]>([]);
  const [historicoExames, setHistoricoExames] = useState<any[]>([]);

  // Helper function to safely format dates
  const safeFormatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'N/A';
    try {
      const date = parseISO(dateStr);
      if (!isValid(date)) return 'Data inválida';
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data inválida';
    }
  };

  useEffect(() => {
    if (colaboradorId) {
      // Simular dados para exibição (em uma aplicação real, buscaríamos do banco)
      const proximosExamesData = [
        { 
          id: '1', 
          tipo: 'ASO Periódico', 
          data_programada: '2023-11-15', 
          status: 'agendado',
          medico: 'Dr. Roberto Almeida',
          clinica: 'Clínica Saúde Ocupacional'
        },
        { 
          id: '2', 
          tipo: 'Audiometria', 
          data_programada: '2023-11-20', 
          status: 'pendente',
          medico: 'Dr. Carlos Mendes',
          clinica: 'Centro Médico Auditivo'
        },
        { 
          id: '3', 
          tipo: 'Exame Oftalmológico', 
          data_programada: '2023-12-05', 
          status: 'agendado',
          medico: 'Dra. Marta Silva',
          clinica: 'Visão Plena'
        },
      ];
      
      const historicoExamesData = [
        { 
          id: '101', 
          tipo: 'ASO Admissional', 
          data_realizacao: '2022-06-10', 
          resultado: 'apto',
          medico: 'Dr. João Paulo',
          clinica: 'Clínica Saúde Ocupacional',
          observacoes: 'Sem restrições'
        },
        { 
          id: '102', 
          tipo: 'Hemograma', 
          data_realizacao: '2022-06-08', 
          resultado: 'normal',
          medico: 'Dra. Ana Luiza',
          clinica: 'Laboratório Central',
          observacoes: 'Resultados dentro da normalidade'
        },
        { 
          id: '103', 
          tipo: 'Raio-X Tórax', 
          data_realizacao: '2022-06-08', 
          resultado: 'normal',
          medico: 'Dr. Ricardo Mello',
          clinica: 'Centro de Diagnóstico por Imagem',
          observacoes: 'Sem alterações significativas'
        },
        { 
          id: '104', 
          tipo: 'ASO Periódico', 
          data_realizacao: '2023-06-15', 
          resultado: 'apto',
          medico: 'Dr. Roberto Almeida',
          clinica: 'Clínica Saúde Ocupacional',
          observacoes: 'Sem restrições'
        },
      ];

      setProximosExames(proximosExamesData);
      setHistoricoExames(historicoExamesData);
    }
  }, [colaboradorId]);

  const proximosExamesColumns = [
    { 
      header: 'Tipo de Exame', 
      accessorKey: 'tipo',
    },
    { 
      header: 'Data Programada', 
      accessorKey: 'data_programada',
      cell: ({ row }: { row: { original: any } }) => {
        return safeFormatDate(row.original.data_programada);
      }
    },
    { 
      header: 'Médico', 
      accessorKey: 'medico',
    },
    { 
      header: 'Clínica', 
      accessorKey: 'clinica',
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }: { row: { original: any } }) => {
        const value = row.original.status;
        if (!value) return null;
        
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
          case 'atrasado':
            badgeClass = "bg-red-100 text-red-800";
            icon = <AlertCircle className="h-3 w-3 mr-1" />;
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <div className="flex items-center">
            <Badge className={badgeClass}>
              <div className="flex items-center">
                {icon}
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </div>
            </Badge>
          </div>
        );
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <CalendarIcon className="h-3 w-3 mr-1" /> Agendar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-3">
                <h3 className="font-medium mb-2">Agendar Exame</h3>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className="rounded-md border"
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Exame agendado",
                        description: `Exame agendado para ${date ? format(date, 'dd/MM/yyyy') : 'data selecionada'}.`,
                      });
                    }}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="sm" className="text-xs h-8">
            Detalhes
          </Button>
        </div>
      )
    },
  ];

  const historicoExamesColumns = [
    { 
      header: 'Tipo de Exame', 
      accessorKey: 'tipo',
    },
    { 
      header: 'Data Realização', 
      accessorKey: 'data_realizacao',
      cell: ({ row }: { row: { original: any } }) => {
        return safeFormatDate(row.original.data_realizacao);
      }
    },
    { 
      header: 'Médico', 
      accessorKey: 'medico',
    },
    { 
      header: 'Clínica', 
      accessorKey: 'clinica',
    },
    { 
      header: 'Resultado', 
      accessorKey: 'resultado',
      cell: ({ row }: { row: { original: any } }) => {
        const value = row.original.resultado;
        if (!value) return null;
        
        let badgeClass = "";
        let icon = null;
        
        switch(value) {
          case 'apto':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          case 'apto com restrições':
            badgeClass = "bg-yellow-100 text-yellow-800";
            icon = <AlertCircle className="h-3 w-3 mr-1" />;
            break;
          case 'inapto':
            badgeClass = "bg-red-100 text-red-800";
            icon = <AlertCircle className="h-3 w-3 mr-1" />;
            break;
          case 'normal':
            badgeClass = "bg-green-100 text-green-800";
            icon = <CheckCircle className="h-3 w-3 mr-1" />;
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return (
          <div className="flex items-center">
            <Badge className={badgeClass}>
              <div className="flex items-center">
                {icon}
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </div>
            </Badge>
          </div>
        );
      }
    },
    { 
      header: 'Ações', 
      accessorKey: 'acoes',
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            Ver Resultado
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Saúde Ocupacional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Último ASO</p>
                <p className="font-medium">15/06/2023</p>
                <Badge variant="outline" className="mt-1 bg-green-100 border-green-200 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" /> Apto
                </Badge>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Próximo ASO</p>
                <p className="font-medium">15/11/2023</p>
                <p className="text-xs text-gray-500 mt-1">Em 30 dias</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Restrições</p>
                <p className="font-medium">Nenhuma</p>
                <p className="text-xs text-gray-500 mt-1">Sem restrições médicas</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Próximos Exames</h3>
              <DataTable
                columns={proximosExamesColumns}
                data={proximosExames}
                itemsPerPage={5}
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Histórico de Exames</h3>
              <DataTable
                columns={historicoExamesColumns}
                data={historicoExames}
                itemsPerPage={5}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" /> Agendar Novo Exame
            </Button>
            <Button variant="outline">
              Imprimir Histórico
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaudeOcupacional;
