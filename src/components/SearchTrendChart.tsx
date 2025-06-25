
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface SearchTrendData {
  month: string;
  search_volume: number;
  trend_score: number;
  engagement_rate: number;
}

interface SearchTrendChartProps {
  productName: string;
  data: SearchTrendData[];
}

const SearchTrendChart: React.FC<SearchTrendChartProps> = ({ productName, data }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-700 text-xl">
          <TrendingUp className="h-6 w-6" />
          搜尋熱度趨勢分析
        </CardTitle>
        <CardDescription className="text-blue-600/70">
          {productName} 關鍵字在過去12個月的搜尋熱度變化
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
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
              <Legend />
              <Line 
                type="monotone" 
                dataKey="search_volume" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="搜尋量"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="trend_score" 
                stroke="#10B981" 
                strokeWidth={3}
                name="趨勢分數"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50/70 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-800">
              {Math.max(...data.map(d => d.search_volume)).toLocaleString()}
            </div>
            <div className="text-blue-600 font-medium">最高搜尋量</div>
          </div>
          <div className="p-4 bg-emerald-50/70 rounded-lg text-center">
            <div className="text-2xl font-bold text-emerald-800">
              {Math.max(...data.map(d => d.trend_score)).toFixed(1)}
            </div>
            <div className="text-emerald-600 font-medium">最高趨勢分數</div>
          </div>
          <div className="p-4 bg-amber-50/70 rounded-lg text-center">
            <div className="text-2xl font-bold text-amber-800">
              {(data.reduce((sum, d) => sum + d.engagement_rate, 0) / data.length).toFixed(1)}%
            </div>
            <div className="text-amber-600 font-medium">平均互動率</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchTrendChart;
