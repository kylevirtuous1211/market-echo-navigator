
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '@/types/productEvaluation';

interface SalesPerformanceChartProps {
  data: ChartDataPoint[];
}

const SalesPerformanceChart: React.FC<SalesPerformanceChartProps> = ({ data }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="text-emerald-600 text-2xl">歷史銷售表現趨勢</CardTitle>
        <CardDescription className="text-emerald-600/70 text-base">
          相似商品的月度銷售數據，可作為新品預測的基線參考
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fda4af" opacity={0.3} />
            <XAxis dataKey="month" stroke="#9f1239" />
            <YAxis stroke="#9f1239" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #fda4af', 
                borderRadius: '12px',
                color: '#9f1239',
                boxShadow: '0 10px 25px rgba(236, 72, 153, 0.15)'
              }} 
            />
            <Legend />
            <Bar dataKey="經典牛仔夾克" fill="url(#gradient1)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="休閒丹寧外套" fill="url(#gradient2)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="復古牛仔上衣" fill="url(#gradient3)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceChart;
