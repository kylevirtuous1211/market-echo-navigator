
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';

interface SearchTrendData {
  month: string;
  search_volume: number;
}

interface SearchVolumeChartProps {
  productName: string;
  data: SearchTrendData[];
}

const SearchVolumeChart: React.FC<SearchVolumeChartProps> = ({ productName, data }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-700 text-xl">
          <Search className="h-6 w-6" />
          搜尋量趨勢
        </CardTitle>
        <CardDescription className="text-blue-600/70">
          {productName} 關鍵字在過去12個月的搜尋量變化
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
                dataKey="search_volume" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="搜尋量"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-blue-50/70 rounded-lg mt-4 text-center">
          <div className="text-2xl font-bold text-blue-800">
            {Math.max(...data.map(d => d.search_volume)).toLocaleString()}
          </div>
          <div className="text-blue-600 font-medium">最高搜尋量</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchVolumeChart;
