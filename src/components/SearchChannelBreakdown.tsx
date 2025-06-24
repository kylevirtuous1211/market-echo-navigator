
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Globe, Hash, MessageCircle } from 'lucide-react';

interface ChannelData {
  platform: string;
  search_volume: number;
  engagement_rate: number;
  sentiment_score: number;
  trending_hashtags: string[];
  user_demographics: {
    age_group: string;
    gender_split: { male: number; female: number };
    primary_interests: string[];
  };
}

interface SearchChannelBreakdownProps {
  productName: string;
  channelData: ChannelData[];
}

const PLATFORM_COLORS = {
  'TikTok': '#FF0050',
  'Instagram': '#E4405F',
  'YouTube': '#FF0000',
  'Facebook': '#1877F2',
  'Twitter': '#1DA1F2',
  'LinkedIn': '#0A66C2',
  'Reddit': '#FF4500',
  'Pinterest': '#BD081C'
};

const SearchChannelBreakdown: React.FC<SearchChannelBreakdownProps> = ({ productName, channelData }) => {
  const totalVolume = channelData.reduce((sum, channel) => sum + channel.search_volume, 0);
  
  const pieData = channelData.map(channel => ({
    name: channel.platform,
    value: channel.search_volume,
    percentage: ((channel.search_volume / totalVolume) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="card-glass shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-700 text-xl">
            <Globe className="h-6 w-6" />
            搜尋渠道分解分析
          </CardTitle>
          <CardDescription className="text-purple-600/70">
            {productName} 在各大社群媒體平台的搜尋與討論分佈
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bar Chart */}
            <div>
              <h3 className="font-semibold text-purple-700 mb-4">各平台搜尋量比較</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="platform" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="search_volume" 
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div>
              <h3 className="font-semibold text-purple-700 mb-4">市場佔有率分佈</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] || '#8B5CF6'} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Platform Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channelData.map((channel, index) => (
          <Card key={index} className="card-glass shadow-warm border-l-4" 
                style={{ borderLeftColor: PLATFORM_COLORS[channel.platform as keyof typeof PLATFORM_COLORS] || '#8B5CF6' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg" 
                         style={{ color: PLATFORM_COLORS[channel.platform as keyof typeof PLATFORM_COLORS] || '#8B5CF6' }}>
                <MessageCircle className="h-5 w-5" />
                {channel.platform}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50/70 rounded-lg text-center">
                  <div className="text-lg font-bold text-gray-800">
                    {channel.search_volume.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">搜尋量</div>
                </div>
                <div className="p-3 bg-gray-50/70 rounded-lg text-center">
                  <div className="text-lg font-bold text-gray-800">
                    {channel.engagement_rate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-600">互動率</div>
                </div>
              </div>

              {/* Sentiment */}
              <div className="p-3 bg-blue-50/70 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">情感分數</span>
                  <Badge variant={channel.sentiment_score > 70 ? "default" : channel.sentiment_score > 40 ? "secondary" : "destructive"}>
                    {channel.sentiment_score.toFixed(1)}
                  </Badge>
                </div>
              </div>

              {/* Demographics */}
              <div className="p-3 bg-purple-50/70 rounded-lg">
                <div className="text-sm font-medium text-purple-700 mb-2">主要用戶群</div>
                <div className="text-xs text-purple-600">
                  {channel.user_demographics.age_group}
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  男性 {channel.user_demographics.gender_split.male}% | 
                  女性 {channel.user_demographics.gender_split.female}%
                </div>
              </div>

              {/* Trending Hashtags */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">熱門標籤</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {channel.trending_hashtags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchChannelBreakdown;
