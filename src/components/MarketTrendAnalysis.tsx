
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Globe, MessageSquare, Star, BarChart3, Users, Heart, CheckCircle } from 'lucide-react';

interface MarketTrendAnalysisProps {
  productData?: any;
  demandData?: any;
  onComplete: () => void;
}

const MarketTrendAnalysis: React.FC<MarketTrendAnalysisProps> = ({ productData, demandData, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // Mock external data sources
  const googleTrendsData = [
    { month: '1月', 牛仔外套: 65, 時尚外套: 78, 春季外套: 45 },
    { month: '2月', 牛仔外套: 72, 時尚外套: 85, 春季外套: 52 },
    { month: '3月', 牛仔外套: 88, 時尚外套: 92, 春季外套: 78 },
    { month: '4月', 牛仔外套: 95, 時尚外套: 88, 春季外套: 85 },
    { month: '5月', 牛仔外套: 82, 時尚外套: 75, 春季外套: 92 },
    { month: '6月', 牛仔外套: 68, 時尚外套: 65, 春季外套: 88 }
  ];

  const socialMediaData = [
    { platform: 'Instagram', 提及次數: 1250, 正面情緒: 78 },
    { platform: 'Facebook', 提及次數: 890, 正面情緒: 65 },
    { platform: 'TikTok', 提及次數: 2100, 正面情緒: 82 },
    { platform: 'Twitter', 提及次數: 650, 正面情緒: 71 }
  ];

  const competitorAnalysis = [
    { brand: 'Uniqlo', 市場份額: 25, 價格區間: 'NT$1,200-2,500', 趨勢: 'up' },
    { brand: 'H&M', 市場份額: 18, 價格區間: 'NT$800-1,800', 趨勢: 'stable' },
    { brand: 'Zara', 市場份額: 22, 價格區間: 'NT$1,500-3,000', 趨勢: 'up' },
    { brand: 'GAP', 市場份額: 15, 價格區間: 'NT$1,800-3,500', 趨勢: 'down' }
  ];

  const finalRecommendations = {
    optimal_price: 'NT$1,800-2,200',
    launch_timing: '3-4月 (春季高峰)',
    target_segments: ['時尚年輕族群', '潮流追隨者'],
    marketing_channels: ['Instagram', 'TikTok'],
    risk_factors: ['季節性波動', '競爭激烈'],
    success_probability: 78
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResults(finalRecommendations);
    onComplete();
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-3">市場趨勢驗證分析</h2>
        <p className="text-gray-300 text-lg">
          整合 Google Trends、社群媒體輿情與競爭對手分析，驗證並優化需求預測結果
        </p>
      </div>

      {/* Context Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Baseline Data */}
        {productData && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-800/40 to-purple-800/40 text-white border border-blue-500/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-blue-300 text-lg">
                <BarChart3 className="h-5 w-5" />
                基線數據參考
              </CardTitle>
              <CardDescription className="text-gray-200 text-sm">
                基於新品評估階段的歷史商品分析結果，以下為相似商品的平均表現指標
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {Math.round(productData.baselineMetrics.avgSalesVelocity)}
                </p>
                <p className="text-sm text-gray-200">平均銷售速度 (件/月)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {Math.round(productData.baselineMetrics.avgLifeCycle)}
                </p>
                <p className="text-sm text-gray-200">平均生命週期 (月)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {productData.baselineMetrics.avgProfit.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-200">平均利潤率</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Evaluation Results */}
        {productData && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-800/40 to-pink-800/40 text-white border border-purple-500/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-purple-300 text-lg">
                <Eye className="h-5 w-5" />
                新品評估結果
              </CardTitle>
              <CardDescription className="text-gray-200 text-sm">
                商品名稱：{productData.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {Math.round(productData.baselineMetrics.avgSalesVelocity)}
                </p>
                <p className="text-sm text-gray-200">平均銷速</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {Math.round(productData.baselineMetrics.avgLifeCycle)}
                </p>
                <p className="text-sm text-gray-200">生命週期</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {productData.baselineMetrics.avgProfit.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-200">利潤率</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demand Prediction Results */}
        {demandData && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-800/40 to-teal-800/40 text-white border border-emerald-500/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-emerald-300 text-lg">
                <Users className="h-5 w-5" />
                需求預測結果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {demandData.totalDemand.toLocaleString()}
                </p>
                <p className="text-sm text-gray-200">預期總需求</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {demandData.overallIntent}%
                </p>
                <p className="text-sm text-gray-200">整體購買意願</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {demandData.segments.length}
                </p>
                <p className="text-sm text-gray-200">客群分類</p>
              </div>
            </CardContent>
          </Card>
        )}
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
            整合 Google Trends、OpView 社群輿情、競爭對手分析等外部數據源，驗證虛擬顧客預測結果
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white border-0 py-3 text-lg font-medium"
          >
            {isAnalyzing ? '正在整合外部數據分析...' : '開始市場趨勢驗證'}
          </Button>
          {isAnalyzing && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-300">分析進度</p>
              <Progress value={75} className="w-full h-2" />
              <p className="text-xs text-gray-400">正在分析 Google Trends 與社群媒體數據...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Google Trends Analysis */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">Google Trends 搜尋趨勢分析</CardTitle>
              <CardDescription className="text-gray-300">過去6個月相關關鍵字搜尋趨勢</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={googleTrendsData}>
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
                  <Line type="monotone" dataKey="牛仔外套" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="時尚外套" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="春季外套" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Social Media Sentiment */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">社群媒體輿情分析</CardTitle>
              <CardDescription className="text-gray-300">各平台提及次數與情緒分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {socialMediaData.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-white">{platform.platform}</h3>
                        <p className="text-sm text-gray-400">提及次數: {platform.提及次數}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">正面情緒</p>
                        <p className="font-semibold text-white">{platform.正面情緒}%</p>
                      </div>
                      <Progress value={platform.正面情緒} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitor Analysis */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">競爭對手分析</CardTitle>
              <CardDescription className="text-gray-300">主要競爭品牌市場表現</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {competitorAnalysis.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{competitor.brand[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{competitor.brand}</h3>
                        <p className="text-sm text-gray-400">{competitor.價格區間}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">市場份額</p>
                        <p className="font-semibold text-white">{competitor.市場份額}%</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {competitor.趨勢 === 'up' && <TrendingUp className="h-5 w-5 text-emerald-400" />}
                        {competitor.趨勢 === 'down' && <TrendingDown className="h-5 w-5 text-red-400" />}
                        {competitor.趨勢 === 'stable' && <div className="w-5 h-0.5 bg-gray-400"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Final Recommendations */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-800/50 to-blue-800/50 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">最終建議與預測優化</CardTitle>
              <CardDescription className="text-gray-300">
                基於三階段分析的綜合建議
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">建議售價</p>
                      <p className="font-semibold text-white">{results.optimal_price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-400">最佳上市時機</p>
                      <p className="font-semibold text-white">{results.launch_timing}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">主力目標族群</p>
                      <p className="font-semibold text-white">{results.target_segments.join('、')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                    <Heart className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="text-sm text-gray-400">推薦行銷通路</p>
                      <p className="font-semibold text-white">{results.marketing_channels.join('、')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-emerald-900/30 rounded-xl border border-emerald-500/30">
                <h3 className="text-2xl font-bold text-emerald-300 mb-2">成功機率預測</h3>
                <div className="flex items-center justify-center gap-4">
                  <Progress value={results.success_probability} className="flex-1 max-w-md h-4" />
                  <span className="text-3xl font-bold text-white">{results.success_probability}%</span>
                </div>
                <p className="text-sm text-gray-300 mt-3">
                  基於 NLP 語意比對、ABM+LLM 虛擬顧客模擬與市場趨勢驗證的綜合評估
                </p>
              </div>
              
              {/* Analysis Complete */}
              <div className="flex items-center justify-center gap-3 mt-8 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span className="text-emerald-300 font-semibold text-lg">
                  三階段智慧預測分析已完成！
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketTrendAnalysis;
