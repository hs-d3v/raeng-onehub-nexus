import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle, CheckCircle, LucideCalendarClock, PlusCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DataTable, { Column } from '@/components/ui/DataTable';
import { safeFormatDate } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { format, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ControleJornadaFeriasProps {
  colaboradorId?: string;
}

const ControleJornadaFerias: React.FC<ControleJornadaFeriasProps> = ({ colaboradorId }) => {
  const { toast } = useToast();
  const [pontos, setPontos] = useState<any[]>([]);
  const [ferias, setFerias] = useState<any[]>([]);
  const [ausencias, setAusencias] = useState<any[]>([]);
  const [bancoHoras, setBancoHoras] = useState<any>({
    saldo: 12.5,
    historico: []
  });

  useEffect(() => {
    if (colaboradorId) {
      const hoje = new Date();
      
      const pontosData = Array(30).fill(null).map((_, index) => {
        const data = new Date();
        data.setDate(data.getDate() - index);
        
        const horaEntrada = `0${Math.floor(Math.random() * 2) + 7}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
        const horaSaidaAlmoco = `12:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}`;
        const horaRetornoAlmoco = `13:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}`;
        const horaSaida = `1${Math.floor(Math.random() * 2) + 7}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
        
        const diaSemana = data.getDay();
        if (diaSemana === 0 || diaSemana === 6) {
          return {
            id: `p${index}`,
            data: data.toISOString().split('T')[0],
            entrada: null,
            saida_almoco: null,
            retorno_almoco: null,
            saida: null,
            total_horas: 0,
            status: 'folga',
            justificativa: 'Fim de semana'
          };
        }
        
        const random = Math.random();
        if (random > 0.9) {
          return {
            id: `p${index}`,
            data: data.toISOString().split('T')[0],
            entrada: null,
            saida_almoco: null,
            retorno_almoco: null,
            saida: null,
            total_horas: 0,
            status: 'ausente',
            justificativa: 'Falta'
          };
        } else if (random > 0.85) {
          return {
            id: `p${index}`,
            data: data.toISOString().split('T')[0],
            entrada: `0${Math.floor(Math.random() * 2) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            saida_almoco: horaSaidaAlmoco,
            retorno_almoco: horaRetornoAlmoco,
            saida: horaSaida,
            total_horas: 8.0 - (Math.random() * 1),
            status: 'atraso',
            justificativa: 'Atraso na entrada'
          };
        } else if (random > 0.80) {
          return {
            id: `p${index}`,
            data: data.toISOString().split('T')[0],
            entrada: horaEntrada,
            saida_almoco: horaSaidaAlmoco,
            retorno_almoco: horaRetornoAlmoco,
            saida: `1${Math.floor(Math.random() * 2) + 6}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            total_horas: 8.0 - (Math.random() * 1),
            status: 'saida_antecipada',
            justificativa: 'Saída antecipada'
          };
        } else {
          const total = 8.0 + (Math.random() > 0.7 ? Math.random() * 2 : 0);
          return {
            id: `p${index}`,
            data: data.toISOString().split('T')[0],
            entrada: horaEntrada,
            saida_almoco: horaSaidaAlmoco,
            retorno_almoco: horaRetornoAlmoco,
            saida: horaSaida,
            total_horas: total,
            status: total > 8.0 ? 'hora_extra' : 'regular',
            justificativa: total > 8.0 ? 'Hora extra' : ''
          };
        }
      });
      
      const feriasData = [
        {
          id: 'f1',
          tipo: 'programada',
          data_inicio: '2023-12-20',
          data_fim: '2024-01-08',
          total_dias: 20,
          status: 'aprovada',
          observacao: 'Férias de fim de ano'
        },
        {
          id: 'f2',
          tipo: 'solicitada',
          data_inicio: '2024-07-15',
          data_fim: '2024-07-29',
          total_dias: 15,
          status: 'pendente',
          observacao: 'Aguardando aprovação'
        },
        {
          id: 'f3',
          tipo: 'concluida',
          data_inicio: '2023-01-10',
          data_fim: '2023-01-24',
          total_dias: 15,
          status: 'concluida',
          observacao: 'Férias gozadas'
        }
      ];
      
      const ausenciasData = [
        {
          id: 'a1',
          tipo: 'atestado',
          data_inicio: '2023-08-05',
          data_fim: '2023-08-06',
          total_dias: 2,
          status: 'justificada',
          motivo: 'Atestado médico',
          documento_url: '#'
        },
        {
          id: 'a2',
          tipo: 'falta',
          data_inicio: '2023-09-15',
          data_fim: '2023-09-15',
          total_dias: 1,
          status: 'injustificada',
          motivo: 'Sem justificativa',
          documento_url: null
        },
        {
          id: 'a3',
          tipo: 'licença',
          data_inicio: '2023-05-02',
          data_fim: '2023-05-05',
          total_dias: 4,
          status: 'justificada',
          motivo: 'Licença casamento',
          documento_url: '#'
        }
      ];
      
      const bancoHorasData = {
        saldo: 12.5,
        historico: Array(20).fill(null).map((_, index) => {
          const data = new Date();
          data.setDate(data.getDate() - index * 3);
          
          const tipo = Math.random() > 0.5 ? 'crédito' : 'débito';
          const horas = (Math.random() * 4 + 1).toFixed(1);
          
          return {
            id: `bh${index}`,
            data: data.toISOString().split('T')[0],
            tipo: tipo,
            horas: tipo === 'crédito' ? horas : `-${horas}`,
            motivo: tipo === 'crédito' ? 'Hora extra' : 'Saída antecipada',
            autorizado_por: 'Supervisor',
            saldo_resultante: '00.0'
          };
        })
      };
      
      let saldoAcumulado = bancoHorasData.saldo;
      bancoHorasData.historico = bancoHorasData.historico.map(item => {
        saldoAcumulado -= parseFloat(item.horas);
        return {
          ...item,
          saldo_resultante: saldoAcumulado.toFixed(1)
        };
      }).reverse();
      
      setPontos(pontosData);
      setFerias(feriasData);
      setAusencias(ausenciasData);
      setBancoHoras(bancoHorasData);
    }
  }, [colaboradorId]);

  const pontosColumns: Column[] = [
    { 
      header: 'Data', 
      accessorKey: 'data',
      cell: ({ row }) => safeFormatDate(row.original.data)
    },
    { header: 'Dia da Semana', accessorKey: 'diaSemana' },
    { 
      header: 'Entrada', 
      accessorKey: 'entrada',
      cell: ({ row }) => row.original.entrada || '—'
    },
    { 
      header: 'Saída Almoço', 
      accessorKey: 'saidaAlmoco',
      cell: ({ row }) => row.original.saidaAlmoco || '—'
    },
    { 
      header: 'Retorno Almoço', 
      accessorKey: 'retornoAlmoco',
      cell: ({ row }) => row.original.retornoAlmoco || '—'
    },
    { 
      header: 'Saída', 
      accessorKey: 'saida',
      cell: ({ row }) => row.original.saida || '—'
    },
    { 
      header: 'Total', 
      accessorKey: 'horasTrabalhadas',
      cell: ({ row }) => row.original.horasTrabalhadas || '—'
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        switch(value) {
          case 'normal':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'falta':
            badgeClass = "bg-red-100 text-red-800";
            break;
          case 'atraso':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          case 'ferias':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'folga':
            badgeClass = "bg-purple-100 text-purple-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }
        
        return <Badge className={badgeClass}>{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>;
      }
    }
  ];

  const horasExtrasColumns: Column[] = [
    { 
      header: 'Data', 
      accessorKey: 'data',
      cell: ({ row }) => safeFormatDate(row.original.data)
    },
    { header: 'Tipo', accessorKey: 'tipo' },
    { 
      header: 'Horas', 
      accessorKey: 'horas',
      cell: ({ row }) => row.original.horas
    },
    { 
      header: 'Motivo', 
      accessorKey: 'motivo'
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
          case 'recusado':
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
          Detalhes
        </Button>
      )
    }
  ];

  const feriasColumns: Column[] = [
    { 
      header: 'Período Aquisitivo', 
      accessorKey: 'periodoAquisitivo',
      cell: ({ row }) => row.original.periodoAquisitivo
    },
    { 
      header: 'Início', 
      accessorKey: 'inicio',
      cell: ({ row }) => safeFormatDate(row.original.inicio)
    },
    { 
      header: 'Fim', 
      accessorKey: 'fim',
      cell: ({ row }) => safeFormatDate(row.original.fim)
    },
    { 
      header: 'Dias', 
      accessorKey: 'dias',
      cell: ({ row }) => row.original.dias.toString()
    },
    { 
      header: 'Abono', 
      accessorKey: 'abono',
      cell: ({ row }) => row.original.abono ? 'Sim' : 'Não'
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        switch(value) {
          case 'programada':
            badgeClass = "bg-blue-100 text-blue-800";
            break;
          case 'aprovada':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'gozada':
            badgeClass = "bg-purple-100 text-purple-800";
            break;
          case 'pendente':
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          case 'negada':
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
          Detalhes
        </Button>
      )
    }
  ];

  const bancoHorasColumns: Column[] = [
    { 
      header: 'Data', 
      accessorKey: 'data',
      cell: ({ row }) => safeFormatDate(row.original.data)
    },
    { 
      header: 'Descrição', 
      accessorKey: 'descricao'
    },
    { 
      header: 'Crédito', 
      accessorKey: 'credito',
      cell: ({ row }) => row.original.credito ? row.original.credito : '—'
    },
    { 
      header: 'Débito', 
      accessorKey: 'debito',
      cell: ({ row }) => row.original.debito ? row.original.debito : '—'
    },
    { 
      header: 'Saldo', 
      accessorKey: 'saldo',
      cell: ({ row }) => {
        const value = row.original.saldo;
        const isPositive = value >= 0;
        
        return (
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {isPositive ? '+' : ''}{value}h
          </span>
        );
      }
    }
  ];

  const ausenciasColumns: Column[] = [
    { 
      header: 'Tipo', 
      accessorKey: 'tipo',
      cell: ({ row }) => row.original.tipo
    },
    { 
      header: 'Data início', 
      accessorKey: 'data_inicio',
      cell: ({ row }) => safeFormatDate(row.original.data_inicio)
    },
    { 
      header: 'Data fim', 
      accessorKey: 'data_fim',
      cell: ({ row }) => safeFormatDate(row.original.data_fim)
    },
    { 
      header: 'Total dias', 
      accessorKey: 'total_dias',
      cell: ({ row }) => row.original.total_dias
    },
    { 
      header: 'Motivo', 
      accessorKey: 'motivo'
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const value = row.original.status;
        if (!value) return null;
        
        let badgeClass = "";
        switch(value) {
          case 'justificada':
            badgeClass = "bg-green-100 text-green-800";
            break;
          case 'injustificada':
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
      cell: ({ row }) => (
        <Button variant="outline" size="sm" className="text-xs h-8">
          {row.original.documento_url ? (
            <a href={row.original.documento_url} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4 mr-2" /> Documento
            </a>
          ) : (
            "Sem documento"
          )}
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Controle de Jornada e Férias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-700 mb-2">Banco de Horas</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">{bancoHoras.saldo}h</p>
                <p className="text-xs text-gray-500">Saldo atual</p>
              </div>
              <div>
                <Button variant="outline" size="sm" className="text-xs">Extrato Completo</Button>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-700 mb-2">Férias</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700">30</p>
                <p className="text-xs text-gray-500">Dias disponíveis</p>
              </div>
              <div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Agendada: 20/12/2023
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-700 mb-2">Indicadores</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Taxa de Presença</span>
                  <span className="font-medium">96%</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Pontualidade</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="ponto" className="w-full">
          <TabsList>
            <TabsTrigger value="ponto">Registros de Ponto</TabsTrigger>
            <TabsTrigger value="ferias">Férias</TabsTrigger>
            <TabsTrigger value="ausencias">Ausências</TabsTrigger>
            <TabsTrigger value="banco_horas">Banco de Horas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ponto" className="pt-4">
            <DataTable
              columns={pontosColumns}
              data={pontos}
              itemsPerPage={10}
            />
          </TabsContent>
          
          <TabsContent value="ferias" className="pt-4">
            <DataTable
              columns={feriasColumns}
              data={ferias}
              itemsPerPage={10}
            />
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" /> Solicitar Férias
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="ausencias" className="pt-4">
            <DataTable
              columns={ausenciasColumns}
              data={ausencias}
              itemsPerPage={10}
            />
            
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" /> Enviar Atestado
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" /> Justificar Ausência
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="banco_horas" className="pt-4">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Saldo de Banco de Horas</h3>
                <p className="text-3xl font-bold text-blue-700 mt-1">{bancoHoras.saldo}h</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Última atualização</p>
                <p className="text-sm font-medium">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
            <DataTable
              columns={bancoHorasColumns}
              data={bancoHoras.historico}
              itemsPerPage={10}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ControleJornadaFerias;
