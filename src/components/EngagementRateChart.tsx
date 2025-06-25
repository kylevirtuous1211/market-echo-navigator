
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart } from 'lucide-react';

interface SearchTrendData {
  month: string;
  engagement_rate: number;
}

interface EngagementRateChartProps {
  productName: string;
  data: SearchTrendData[];
}

const EngagementRateChart: React.FC<EngagementRateChartProps> = ({ productName, data }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-amber-700 text-xl">
          <Heart className="h-6 w-6" />
          互動率趨勢
        </CardTitle>
        <CardDescription className="text-amber-600/70">
          {productName} 在過去12個月的用戶互動率變化
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement_rate" 
                stroke="#F59E0B" 
                strokeWidth={3}
                name="互動率"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-amber-50/70 rounded-lg mt-4 text-center">
          <div className="text-2xl font-bold text-amber-800">
            {(data.reduce((sum, d) => sum + d.engagement_rate, 0) / data.length).toFixed(1)}%
          </div>
          <div className="text-amber-600 font-medium">平均互動率</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementRateChart;
