
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  title?: string;
  data: DataPoint[];
  dataKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, dataKeys, height = 300 }) => {
  return (
    <Card className="card-hover">
      {title && (
        <CardHeader className="pb-3">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div style={{ height: height }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: 10 }} 
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              {dataKeys.map((dataKey) => (
                <Bar 
                  key={dataKey.key}
                  dataKey={dataKey.key} 
                  name={dataKey.name}
                  fill={dataKey.color} 
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
