
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface SearchTrendData {
  month: string;
  trend_score: number;
}

interface TrendScoreChartProps {
  productName: string;
  data: SearchTrendData[];
}

const TrendScoreChart: React.FC<TrendScoreChartProps> = ({ productName, data }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-emerald-700 text-xl">
          <TrendingUp className="h-6 w-6" />
          趨勢分數變化
        </CardTitle>
        <CardDescription className="text-emerald-600/70">
          {productName} 在過去12個月的市場趨勢分數變化
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
                dataKey="trend_score" 
                stroke="#10B981" 
                strokeWidth={3}
                name="趨勢分數"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-emerald-50/70 rounded-lg mt-4 text-center">
          <div className="text-2xl font-bold text-emerald-800">
            {Math.max(...data.map(d => d.trend_score)).toFixed(1)}
          </div>
          <div className="text-emerald-600 font-medium">最高趨勢分數</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendScoreChart;
