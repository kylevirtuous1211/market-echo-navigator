
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
    restock_min: 25,
    restock_max: 30
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
        <h2 className="text-3xl font-bold text-pink-600 mb-3">市場趨勢驗證分析</h2>
        <p className="text-pink-600/80 text-lg">
          整合 Google Trends、社群媒體輿情與競爭對手分析，驗證並優化需求預測結果
        </p>
      </div>

      {/* Context Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Baseline Data */}
        {productData && (
          <Card className="card-glass shadow-warm border border-blue-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-blue-600 text-lg">
                <BarChart3 className="h-5 w-5" />
                基線數據參考
              </CardTitle>
              <CardDescription className="text-blue-600/70 text-sm">
                基於新品評估階段的歷史商品分析結果，以下為相似商品的平均表現指標
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {Math.round(productData.baselineMetrics.avgSalesVelocity)}
                </p>
                <p className="text-sm text-blue-600/70">平均銷售速度 (件/月)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {Math.round(productData.baselineMetrics.avgLifeCycle)}
                </p>
                <p className="text-sm text-blue-600/70">平均生命週期 (月)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {productData.baselineMetrics.avgProfit.toFixed(1)}%
                </p>
                <p className="text-sm text-blue-600/70">平均利潤率</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Evaluation Results */}
        {productData && (
          <Card className="card-glass shadow-warm border border-purple-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-purple-600 text-lg">
                <Eye className="h-5 w-5" />
                新品評估結果
              </CardTitle>
              <CardDescription className="text-purple-600/70 text-sm">
                商品名稱：{productData.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {Math.round(productData.baselineMetrics.avgSalesVelocity)}
                </p>
                <p className="text-sm text-purple-600/70">平均銷速</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {Math.round(productData.baselineMetrics.avgLifeCycle)}
                </p>
                <p className="text-sm text-purple-600/70">生命週期</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">
                  {productData.baselineMetrics.avgProfit.toFixed(1)}%
                </p>
                <p className="text-sm text-purple-600/70">利潤率</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demand Prediction Results */}
        {demandData && (
          <Card className="card-glass shadow-warm border border-emerald-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-emerald-600 text-lg">
                <Users className="h-5 w-5" />
                需求預測結果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-700">
                  {demandData.totalDemand.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-600/70">預期總需求</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-700">
                  {demandData.overallIntent}%
                </p>
                <p className="text-sm text-emerald-600/70">整體購買意願</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-700">
                  {demandData.segments.length}
                </p>
                <p className="text-sm text-emerald-600/70">客群分類</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Analysis Control */}
      <Card className="card-glass shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-emerald-600">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Globe className="h-6 w-6" />
            </div>
            外部市場數據整合分析
          </CardTitle>
          <CardDescription className="text-pink-600/70 text-base">
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
              <p className="text-sm text-pink-600/70">分析進度</p>
              <Progress value={75} className="w-full h-2" />
              <p className="text-xs text-pink-600/60">正在分析 Google Trends 與社群媒體數據...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Google Trends Analysis */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="text-emerald-600">Google Trends 搜尋趨勢分析</CardTitle>
              <CardDescription className="text-pink-600/70">過去6個月相關關鍵字搜尋趨勢</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={googleTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                  <XAxis dataKey="month" stroke="#be185d" />
                  <YAxis stroke="#be185d" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f3e8ff', 
                      borderRadius: '8px',
                      color: '#be185d'
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
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="text-emerald-600">社群媒體輿情分析</CardTitle>
              <CardDescription className="text-pink-600/70">各平台提及次數與情緒分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {socialMediaData.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
                    <div className="flex items-center gap-4">
                      <MessageSquare className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-pink-700">{platform.platform}</h3>
                        <p className="text-sm text-pink-600/70">提及次數: {platform.提及次數}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-pink-600/70">正面情緒</p>
                        <p className="font-semibold text-pink-700">{platform.正面情緒}%</p>
                      </div>
                      <Progress value={platform.正面情緒} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitor Analysis */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="text-emerald-600">競爭對手分析</CardTitle>
              <CardDescription className="text-pink-600/70">主要競爭品牌市場表現</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {competitorAnalysis.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center border border-pink-200">
                        <span className="text-pink-700 font-bold">{competitor.brand[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-pink-700">{competitor.brand}</h3>
                        <p className="text-sm text-pink-600/70">{competitor.價格區間}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-pink-600/70">市場份額</p>
                        <p className="font-semibold text-pink-700">{competitor.市場份額}%</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {competitor.趨勢 === 'up' && <TrendingUp className="h-5 w-5 text-emerald-500" />}
                        {competitor.趨勢 === 'down' && <TrendingDown className="h-5 w-5 text-red-500" />}
                        {competitor.趨勢 === 'stable' && <div className="w-5 h-0.5 bg-gray-500"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Final Recommendations */}
          <Card className="card-glass shadow-warm border border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-600">最終建議與預測優化</CardTitle>
              <CardDescription className="text-pink-600/70">
                基於三階段分析的綜合建議
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-pink-600/80">建議售價</p>
                      <p className="font-semibold text-pink-700">{results.optimal_price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm text-pink-600/80">最佳上市時機</p>
                      <p className="font-semibold text-pink-700">{results.launch_timing}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-pink-600/80">主力目標族群</p>
                      <p className="font-semibold text-pink-700">{results.target_segments.join('、')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm text-pink-600/80">推薦行銷通路</p>
                      <p className="font-semibold text-pink-700">{results.marketing_channels.join('、')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-emerald-50/70 rounded-xl border border-emerald-200/50">
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">市場反應預測</h3>
                <div className="flex items-center justify-center gap-4">
                  <Progress value={results.success_probability} className="flex-1 max-w-md h-4" />
                  <span className="text-3xl font-bold text-emerald-700">{results.success_probability}%</span>
                </div>
              </div>

              <div className="text-center p-6 bg-emerald-50/70 rounded-xl border border-emerald-200/50">
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">進貨數量預測</h3>
                <div className="flex flex-col items-center justify-center gap-2">
                  {/* <div className="relative w-full max-w-md h-4">
                    <div className="absolute top-0 left-0 h-4 w-full bg-yellow-100 rounded" />
                    <div
                      className="absolute top-0 h-4 bg-green-500 rounded"
                      style={{
                        left: `${finalRecommendations.restock_min}%`,
                        width: `${finalRecommendations.restock_max - finalRecommendations.restock_min}%`
                      }}
                    />
                  </div> */}
                  <span className="text-lg font-bold text-emerald-700">
                    建議進貨區間：{finalRecommendations.restock_min} ~ {finalRecommendations.restock_max} 單位
                  </span>
                </div>
                <p className="text-sm text-emerald-600/90 mt-3 font-medium">
                  透過三階段可解釋AI，歷史資訊、代理人的模擬、市場資訊，預測商品在市場上的表現，提供建議進貨區間。
                </p>
              </div>
              
              {/* Analysis Complete */}
              <div className="flex items-center justify-center gap-3 mt-8 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/50">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                <span className="text-emerald-700 font-semibold text-lg">
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
