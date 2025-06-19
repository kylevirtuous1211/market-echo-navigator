
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, MessageSquare, Search, Globe, Activity } from 'lucide-react';

const MarketTrendAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // 模擬外部數據源分析結果
  const trendData = [
    { date: '2024-01', 牛仔外套: 2450, 時尚外套: 1890, 春季外套: 1250 },
    { date: '2024-02', 牛仔外套: 2680, 時尚外套: 2100, 春季外套: 1450 },
    { date: '2024-03', 牛仔外套: 3200, 時尚外套: 2850, 春季外套: 2100 },
    { date: '2024-04', 牛仔外套: 2980, 時尚外套: 2650, 春季外套: 2800 },
    { date: '2024-05', 牛仔外套: 2750, 時尚外套: 2400, 春季外套: 2950 },
    { date: '2024-06', 牛仔外套: 2500, 時尚外套: 2200, 春季外套: 2650 }
  ];

  const sentimentData = [
    { platform: 'Dcard', positive: 68, negative: 15, neutral: 17 },
    { platform: 'PTT', positive: 72, negative: 12, neutral: 16 },
    { platform: 'Instagram', positive: 85, negative: 8, neutral: 7 },
    { platform: 'Facebook', positive: 75, negative: 10, neutral: 15 }
  ];

  const keywordAnalysis = [
    { keyword: '牛仔外套', volume: 8500, trend: '+15%', sentiment: 'positive' },
    { keyword: '時尚外套', volume: 6200, trend: '+8%', sentiment: 'positive' },
    { keyword: '春季外套', volume: 4800, trend: '+25%', sentiment: 'positive' },
    { keyword: '丹寧夾克', volume: 3600, trend: '+12%', sentiment: 'neutral' },
    { keyword: '復古外套', volume: 2900, trend: '+18%', sentiment: 'positive' }
  ];

  const platformInsights = [
    {
      platform: 'OpView 社群聲量分析',
      source: 'Dcard, PTT, Instagram',
      insights: [
        '牛仔外套相關討論量較上月增長 15%',
        '用戶更關注環保材質和永續時尚',
        '復古風格討論熱度持續上升',
        '價格區間 NT$1,500-3,000 討論最多'
      ]
    },
    {
      platform: 'Google Trends 搜尋趨勢',
      source: 'Google Trends API',
      insights: [
        '「春季外套」搜尋量激增 25%',
        '「韓式牛仔外套」成為新興關鍵字',
        '行動裝置搜尋佔比達 78%',
        '週末搜尋量較平日高出 40%'
      ]
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // 模擬外部數據源分析延遲
    await new Promise(resolve => setTimeout(resolve, 2500));
    setResults(true);
    setIsAnalyzing(false);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">外部市場趨勢分析</h2>
        <p className="text-gray-600">
          整合 OpView 社群聲量、Google Trends 搜尋數據，提供台灣在地市場的宏觀視角
        </p>
      </div>

      {/* Analysis Control */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            外部數據源整合分析
          </CardTitle>
          <CardDescription>
            連接 OpView、Google Trends 等合法數據源，分析相關關鍵字的市場趨勢與情緒反應
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isAnalyzing ? '正在分析外部市場數據...' : '開始市場趨勢分析'}
          </Button>
          {isAnalyzing && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">正在連接外部數據源</p>
              <div className="flex gap-2">
                <Badge variant="outline">OpView API 連接中...</Badge>
                <Badge variant="outline">Google Trends 分析中...</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Keyword Volume Trends */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">關鍵字搜尋趨勢</CardTitle>
              <CardDescription>
                Google Trends 數據顯示相關關鍵字的搜尋量變化 (近 6 個月)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="牛仔外套" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="時尚外套" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="春季外套" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Keyword Analysis Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                關鍵字聲量分析
              </CardTitle>
              <CardDescription>
                相關關鍵字的搜尋量、趨勢變化與情緒分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keywordAnalysis.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold">{keyword.keyword}</p>
                        <p className="text-sm text-gray-600">月搜尋量: {keyword.volume.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={keyword.trend.includes('+') ? 'text-green-700 border-green-300' : 'text-red-700 border-red-300'}
                      >
                        {keyword.trend}
                      </Badge>
                      <Badge variant="secondary" className={getSentimentColor(keyword.sentiment)}>
                        {keyword.sentiment === 'positive' ? '正面' : keyword.sentiment === 'negative' ? '負面' : '中性'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Sentiment Analysis */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                社群平台情緒分析
              </CardTitle>
              <CardDescription>
                台灣主要社群平台對相關商品的情緒反應分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sentimentData.map((platform, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">{platform.platform}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">正面情緒</span>
                        <span className="font-medium text-green-600">{platform.positive}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">中性情緒</span>
                        <span className="font-medium text-gray-600">{platform.neutral}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">負面情緒</span>
                        <span className="font-medium text-red-600">{platform.negative}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platformInsights.map((insight, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    {insight.platform}
                  </CardTitle>
                  <CardDescription>數據來源: {insight.source}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {insight.insights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Market Summary */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-green-700">市場趨勢總結</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">+18%</p>
                  <p className="text-sm text-gray-600">整體市場成長</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">75%</p>
                  <p className="text-sm text-gray-600">正面情緒比例</p>
                </div>
                <div className="text-center">
                  <Search className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">26K</p>
                  <p className="text-sm text-gray-600">月度關鍵字搜尋量</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>市場機會分析：</strong>外部數據顯示牛仔外套類商品正處於上升趨勢，
                  特別是環保材質和復古風格受到消費者青睞。春季外套搜尋量激增 25%，
                  建議把握季節性需求高峰期進行產品上市。社群平台整體情緒正面，
                  有利於新品推廣。
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
