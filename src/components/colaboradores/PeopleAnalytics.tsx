
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, TrendingUp, Download, Filter } from 'lucide-react';

interface PeopleAnalyticsProps {
  colaboradorId?: string;
}

const PeopleAnalytics: React.FC<PeopleAnalyticsProps> = ({ colaboradorId }) => {
  // Dados simulados para os gráficos
  const absenceHistoryData = [
    { name: 'Jan', Atestados: 0, Faltas: 1, Atrasos: 2 },
    { name: 'Fev', Atestados: 1, Faltas: 0, Atrasos: 1 },
    { name: 'Mar', Atestados: 0, Faltas: 0, Atrasos: 0 },
    { name: 'Abr', Atestados: 0, Faltas: 0, Atrasos: 1 },
    { name: 'Mai', Atestados: 0, Faltas: 0, Atrasos: 0 },
    { name: 'Jun', Atestados: 1, Faltas: 0, Atrasos: 1 },
    { name: 'Jul', Atestados: 0, Faltas: 0, Atrasos: 0 },
    { name: 'Ago', Atestados: 2, Faltas: 0, Atrasos: 0 },
    { name: 'Set', Atestados: 0, Faltas: 0, Atrasos: 1 },
    { name: 'Out', Atestados: 0, Faltas: 1, Atrasos: 0 },
    { name: 'Nov', Atestados: 0, Faltas: 0, Atrasos: 0 },
    { name: 'Dez', Atestados: 0, Faltas: 0, Atrasos: 0 },
  ];
  
  const absenceHistoryKeys = [
    { key: 'Atestados', name: 'Atestados', color: '#2563eb' },
    { key: 'Faltas', name: 'Faltas', color: '#ea580c' },
    { key: 'Atrasos', name: 'Atrasos', color: '#7c3aed' },
  ];

  const productivityData = [
    { name: 'Jan', Produtividade: 90 },
    { name: 'Fev', Produtividade: 88 },
    { name: 'Mar', Produtividade: 95 },
    { name: 'Abr', Produtividade: 92 },
    { name: 'Mai', Produtividade: 96 },
    { name: 'Jun', Produtividade: 94 },
    { name: 'Jul', Produtividade: 95 },
    { name: 'Ago', Produtividade: 91 },
    { name: 'Set', Produtividade: 93 },
    { name: 'Out', Produtividade: 97 },
    { name: 'Nov', Produtividade: 96 },
    { name: 'Dez', Produtividade: 94 },
  ];
  
  const productivityKeys = [
    { key: 'Produtividade', name: 'Produtividade', color: '#16a34a' },
  ];
  
  // Indicadores
  const keyIndicators = [
    { 
      title: 'Taxa de Absenteísmo', 
      value: '1.8%', 
      trend: -0.5, 
      icon: ArrowDown,
      iconColor: 'text-green-500',
      description: 'vs. média departamental: 3.2%' 
    },
    { 
      title: 'Produtividade', 
      value: '94%', 
      trend: 2.5, 
      icon: ArrowUp,
      iconColor: 'text-green-500',
      description: 'vs. média departamental: 87%' 
    },
    { 
      title: 'Realização de Treinamentos', 
      value: '100%', 
      trend: 0, 
      icon: TrendingUp,
      iconColor: 'text-blue-500',
      description: 'Todos treinamentos realizados' 
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">People Analytics</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {keyIndicators.map((indicator, index) => (
            <div key={index} className="bg-white border rounded-lg p-4">
              <p className="text-sm text-gray-500">{indicator.title}</p>
              <div className="flex items-center mt-1">
                <p className="text-2xl font-bold">{indicator.value}</p>
                {indicator.trend !== 0 && (
                  <Badge 
                    className={`ml-2 ${
                      indicator.trend > 0 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <indicator.icon className={`h-3 w-3 mr-1 ${indicator.iconColor}`} />
                    {indicator.trend > 0 ? '+' : ''}{indicator.trend}%
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{indicator.description}</p>
            </div>
          ))}
        </div>
        
        {/* Gráfico de Histórico de Ausências */}
        <div className="mb-8">
          <h3 className="text-md font-medium mb-4">Histórico de Ausências (12 meses)</h3>
          <BarChart 
            data={absenceHistoryData} 
            dataKeys={absenceHistoryKeys} 
            height={300}
          />
        </div>
        
        {/* Gráfico de Produtividade */}
        <div>
          <h3 className="text-md font-medium mb-4">Índice de Produtividade (%)</h3>
          <BarChart 
            data={productivityData} 
            dataKeys={productivityKeys} 
            height={300}
          />
        </div>
        
        <div className="mt-6 bg-gray-50 rounded-md p-4 border">
          <h3 className="font-medium mb-2">Observações sobre People Analytics</h3>
          <p className="text-sm text-gray-600 mb-2">
            Este painel mostra indicadores individuais do colaborador em comparação com as médias departamentais e organizacionais.
            Os dados são atualizados mensalmente e consideram:
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Registros de ponto e ausências</li>
            <li>Conclusão de tarefas e projetos</li>
            <li>Participação em treinamentos</li>
            <li>Avaliações de desempenho</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeopleAnalytics;
