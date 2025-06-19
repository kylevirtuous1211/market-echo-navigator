
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MessageCircle, ThumbsUp, ThumbsDown, Search, Globe, Eye } from 'lucide-react';

const MarketTrendAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // 模擬市場趨勢數據
  const mockTrendData = {
    keywords: [
      { keyword: '牛仔外套', volume: 12500, trend: '+15%', sentiment: 0.72 },
      { keyword: '丹寧夾克', volume: 8900, trend: '+8%', sentiment: 0.68 },
      { keyword: '復古外套', volume: 6700, trend: '+22%', sentiment: 0.75 },
      { keyword: '春季外套', volume: 15200, trend: '+35%', sentiment: 0.81 }
    ],
    platforms: [
      { platform: 'Dcard', mentions: 1247, sentiment: 0.73, engagement: 892 },
      { platform: 'PTT', mentions: 856, sentiment: 0.69, engagement: 654 },
      { platform: 'Instagram', mentions: 2134, sentiment: 0.78, engagement: 1823 },
      { platform: 'Facebook', mentions: 1689, sentiment: 0.71, engagement: 1245 }
    ]
  };

  const volumeTrendData = [
    { month: '2023-10', 牛仔外套: 8500, 丹寧夾克: 6200, 復古外套: 4100 },
    { month: '2023-11', 牛仔外套: 9200, 丹寧夾克: 6800, 復古外套: 4600 },
    { month: '2023-12', 牛仔外套: 10100, 丹寧夾克: 7500, 復古外套: 5200 },
    { month: '2024-01', 牛仔外套: 11300, 丹寧夾克: 8100, 復古外套: 5800 },
    { month: '2024-02', 牛仔外套: 12500, 丹寧夾克: 8900, 復古外套: 6700 },
    { month: '2024-03', 牛仔外套: 13800, 丹寧夾克: 9600, 復古外套: 7400 }
  ];

  const sentimentData = [
    { name: '正面', value: 73, color: '#10B981' },
    { name: '中性', value: 19, color: '#6B7280' },
    { name: '負面', value: 8, color: '#EF4444' }
  ];

  const platformEngagement = [
    { platform: 'Instagram', 互動率: 8.5, 觸及率: 12.3 },
    { platform: 'Dcard', 互動率: 6.8, 觸及率: 9.2 },
    { platform: 'Facebook', 互動率: 5.2, 觸及率: 11.8 },
    { platform: 'PTT', 互動率: 4.1, 觸及率: 6.5 }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // 模擬 API 分析延遲
    await new Promise(resolve => setTimeout(resolve, 2500));
    setResults(mockTrendData);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-3">市場趨勢分析</h2>
        <p className="text-gray-300 text-lg">
          整合台灣在地社群數據與 Google Trends，驗證並修正需求預測
        </p>
      </div>

      {/* Analysis Control */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-emerald-300">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Globe className="h-6 w-6" />
            </div>
            外部市場數據整合分析
          </CardTitle>
          <CardDescription className="text-gray-300 text-base">
            分析 OpView、Google Trends、Dcard、PTT、Instagram 等平台的相關討論與聲量趨勢
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white border-0 py-3 text-lg font-medium"
          >
            {isAnalyzing ? '正在分析外部市場趨勢...' : '開始市場趨勢分析'}
          </Button>
          {isAnalyzing && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-300">分析進度</p>
              <Progress value={75} className="w-full h-2" />
              <p className="text-xs text-gray-400">正在整合 Google Trends 與社群平台數據...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Keywords Analysis */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">關鍵字聲量分析</CardTitle>
              <CardDescription className="text-gray-300">
                基於 Google Trends 與社群平台的關鍵字搜尋趨勢
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {results.keywords.map((keyword, index) => (
                  <div key={index} className="p-5 border border-slate-500 rounded-xl bg-gradient-to-r from-slate-600/50 to-slate-700/50">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <Search className="h-5 w-5 text-emerald-400" />
                        <h3 className="font-semibold text-lg text-white">{keyword.keyword}</h3>
                        <Badge 
                          variant="secondary" 
                          className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        >
                          {keyword.trend}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">搜尋量</p>
                          <p className="font-bold text-white">{keyword.volume.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                        <div>
                          <p className="text-sm text-gray-400">趨勢變化</p>
                          <p className="font-bold text-emerald-300">{keyword.trend}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <ThumbsUp className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-sm text-gray-400">情緒指數</p>
                          <div className="flex items-center gap-2">
                            <Progress value={keyword.sentiment * 100} className="flex-1 h-2" />
                            <span className="font-bold text-white">{(keyword.sentiment * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Analysis */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">社群平台分析</CardTitle>
              <CardDescription className="text-gray-300">
                台灣主要社群平台的討論熱度與情緒分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {results.platforms.map((platform, index) => (
                  <div key={index} className="p-5 border border-slate-500 rounded-xl bg-gradient-to-r from-slate-600/50 to-slate-700/50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-blue-400" />
                        <h3 className="font-semibold text-lg text-white">{platform.platform}</h3>
                      </div>
                      <Badge 
                        variant={platform.sentiment > 0.75 ? "default" : "secondary"}
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        情緒: {(platform.sentiment * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">提及次數</p>
                        <p className="font-bold text-white text-xl">{platform.mentions}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">情緒指數</p>
                        <div className="flex items-center gap-2">
                          <Progress value={platform.sentiment * 100} className="flex-1 h-3" />
                          <span className="font-bold text-white">{(platform.sentiment * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">互動數</p>
                        <p className="font-bold text-white text-xl">{platform.engagement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
              <CardHeader>
                <CardTitle className="text-emerald-300">搜尋量趨勢</CardTitle>
                <CardDescription className="text-gray-300">過去6個月關鍵字搜尋量變化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={volumeTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#334155', 
                        border: '1px solid #64748B', 
                        borderRadius: '8px',
                        color: '#F1F5F9'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="牛仔外套" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="丹寧夾克" stroke="#8B5CF6" strokeWidth={3} />
                    <Line type="monotone" dataKey="復古外套" stroke="#F59E0B" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
              <CardHeader>
                <CardTitle className="text-emerald-300">情緒分布</CardTitle>
                <CardDescription className="text-gray-300">整體市場情緒分析結果</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#334155', 
                        border: '1px solid #64748B', 
                        borderRadius: '8px',
                        color: '#F1F5F9'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Platform Engagement Chart */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">平台互動分析</CardTitle>
              <CardDescription className="text-gray-300">各社群平台的互動率與觸及率比較</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={platformEngagement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="platform" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#334155', 
                      border: '1px solid #64748B', 
                      borderRadius: '8px',
                      color: '#F1F5F9'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="互動率" fill="#10B981" />
                  <Bar dataKey="觸及率" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-800/50 to-blue-800/50 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">市場趨勢總結</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <TrendingUp className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">+23%</p>
                  <p className="text-sm text-gray-300">整體趨勢成長</p>
                </div>
                <div className="text-center">
                  <ThumbsUp className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">73%</p>
                  <p className="text-sm text-gray-300">正面情緒比例</p>
                </div>
                <div className="text-center">
                  <MessageCircle className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">5,926</p>
                  <p className="text-sm text-gray-300">總討論聲量</p>
                </div>
              </div>
              <div className="mt-6 p-6 bg-slate-800/50 rounded-xl">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-emerald-300">市場洞察：</strong>
                  相關產品類別在台灣市場呈現強勁成長趨勢（+23%），特別是在 Instagram 和 Dcard 平台上獲得高度關注。
                  整體市場情緒偏向正面（73%），「復古外套」關鍵字成長最為顯著（+22%），
                  建議針對年輕族群加強社群行銷策略，並把握春季穿搭話題熱度進行推廣。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketTrendAnalysis;
