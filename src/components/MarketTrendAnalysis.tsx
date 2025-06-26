
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Eye, Globe, MessageSquare, Star, BarChart3, Users, Heart, CheckCircle, Package, Clock, RefreshCw, Target, Calendar } from 'lucide-react';
import SearchVolumeChart from './SearchVolumeChart';
import TrendScoreChart from './TrendScoreChart';

interface MarketTrendAnalysisProps {
  productData?: any;
  demandData?: any;
  onComplete: () => void;
}

const MarketTrendAnalysis: React.FC<MarketTrendAnalysisProps> = ({ productData, demandData, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // Mock data for search trends
  const mockSearchTrendsData = [
    { month: '2024-01', search_volume: 12500, trend_score: 65.2, engagement_rate: 3.8 },
    { month: '2024-02', search_volume: 15800, trend_score: 72.1, engagement_rate: 4.2 },
    { month: '2024-03', search_volume: 18200, trend_score: 78.5, engagement_rate: 4.7 },
    { month: '2024-04', search_volume: 22100, trend_score: 85.3, engagement_rate: 5.1 },
    { month: '2024-05', search_volume: 19800, trend_score: 80.2, engagement_rate: 4.9 },
    { month: '2024-06', search_volume: 25600, trend_score: 92.1, engagement_rate: 5.8 },
    { month: '2024-07', search_volume: 28400, trend_score: 95.7, engagement_rate: 6.2 },
    { month: '2024-08', search_volume: 26800, trend_score: 89.4, engagement_rate: 5.9 },
    { month: '2024-09', search_volume: 31200, trend_score: 98.2, engagement_rate: 6.5 },
    { month: '2024-10', search_volume: 29600, trend_score: 94.8, engagement_rate: 6.1 },
    { month: '2024-11', search_volume: 33800, trend_score: 101.5, engagement_rate: 7.2 },
    { month: '2024-12', search_volume: 36500, trend_score: 105.3, engagement_rate: 7.8 }
  ];

  const finalRecommendations = {
    quantity_min: 30,
    quantity_max: 50,
    rating: '熱銷商品',
    rating_level: 'hot',
    customer_segments: ['時尚年輕族群', '潮流追隨者', '品質重視者'],
    sentiment_summary: '正面評價占82%，主要關注品質與時尚感。消費者特別讚賞產品的耐用性和設計美感。',
    similar_products_avg: 42,
    restock_cycle_type: 'short_term',
    short_term_days: '7-10天',
    long_term_days: '15-20天',
    recommended_cycle: '短期補貨',
    customer_simulation: {
      purchase_intent: demandData?.avgPurchaseIntent || 85,
      price_sensitivity: demandData?.avgPriceSensitivity || 72
    },
    search_trends: mockSearchTrendsData
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResults(finalRecommendations);
    
    // Store the complete analysis results
    const analysisData = {
      ...finalRecommendations,
      productData,
      demandData,
      analysisTimestamp: new Date().toISOString()
    };
    localStorage.setItem('marketAnalysisData', JSON.stringify(analysisData));
    
    onComplete();
    setIsAnalyzing(false);
  };

  const getRatingColor = (level: string) => {
    switch (level) {
      case 'hot': return 'bg-red-500 text-white';
      case 'warm': return 'bg-orange-500 text-white';
      case 'normal': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRatingIcon = (level: string) => {
    switch (level) {
      case 'hot': return <TrendingUp className="h-4 w-4" />;
      case 'warm': return <Star className="h-4 w-4" />;
      case 'normal': return <BarChart3 className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-3">市場趋勢驗證分析</h2>
        <p className="text-pink-600/80 text-lg">
          整合多維度分析，提供最終商品建議
        </p>
      </div>

      {/* Analysis Control */}
      <Card className="card-glass shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-emerald-600">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Globe className="h-6 w-6" />
            </div>
            綜合市場分析
          </CardTitle>
          <CardDescription className="text-pink-600/70 text-base">
            整合新品評估、需求預測與市場趋勢數據，生成最終商品建議
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white border-0 py-3 text-lg font-medium"
          >
            {isAnalyzing ? '正在生成最終分析報告...' : '生成客戶分析報告'}
          </Button>
          {isAnalyzing && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-pink-600/70">分析進度</p>
              <Progress value={85} className="w-full h-2" />
              <p className="text-xs text-pink-600/60">正在整合分析結果...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Trends Charts - Only Two Charts Now */}
      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SearchVolumeChart 
              productName={productData?.name || "時尚牛仔夾克"}
              data={results.search_trends}
            />
            
            <TrendScoreChart 
              productName={productData?.name || "時尚牛仔夾克"}
              data={results.search_trends}
            />
          </div>

          {/* Header Card with Rating */}
          <Card className="card-glass shadow-warm border border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-blue-50/50">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <Badge className={`${getRatingColor(results.rating_level)} px-6 py-3 text-xl font-bold flex items-center gap-3`}>
                  {getRatingIcon(results.rating_level)}
                  {results.rating}
                </Badge>
              </div>
              <CardTitle className="text-4xl font-bold text-emerald-700 mb-2">客戶反饋報告</CardTitle>
              <p className="text-emerald-600/80 text-lg">基於AI多維度分析的完整建議方案</p>
            </CardHeader>
          </Card>

          {/* Quantity Recommendation - Prominent */}
          <Card className="card-glass shadow-warm border border-emerald-300/50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-emerald-500/20 rounded-full">
                    <Package className="h-16 w-16 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-emerald-700 mb-4">建議進貨數量</h3>
                <div className="text-6xl font-bold text-emerald-800 mb-4">
                  {results.quantity_min} - {results.quantity_max}
                  <span className="text-2xl ml-2">件</span>
                </div>
                <p className="text-emerald-600/80 text-lg font-medium">
                  基於市場需求預測與風險評估的最佳進貨區間
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Analysis */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-700 text-2xl">
                <MessageSquare className="h-7 w-7" />
                綜合分析摘要
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Customer Segments */}
              <div className="p-6 bg-blue-50/70 rounded-xl border border-blue-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-700">主要客群模擬</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-white/70 rounded-lg">
                    <div className="text-2xl font-bold text-blue-800">{results.customer_simulation.purchase_intent}%</div>
                    <div className="text-blue-600 font-medium">購買意向</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 rounded-lg">
                    <div className="text-2xl font-bold text-blue-800">{results.customer_simulation.repeat_purchase}%</div>
                    <div className="text-blue-600 font-medium">回購率</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 rounded-lg">
                    <div className="text-2xl font-bold text-blue-800">{results.customer_simulation.word_of_mouth}%</div>
                    <div className="text-blue-600 font-medium">口碑推薦</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.customer_segments.map((segment, index) => (
                    <Badge key={index} variant="outline" className="text-blue-700 border-blue-300 px-3 py-1">
                      {segment}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="p-6 bg-purple-50/70 rounded-xl border border-purple-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-700">輿情分析結果</h3>
                </div>
                <p className="text-purple-700 font-medium text-lg leading-relaxed">
                  {results.sentiment_summary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Market Data & Restock Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Similar Products Average */}
            <Card className="card-glass shadow-warm border border-amber-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-amber-700">
                  <BarChart3 className="h-6 w-6" />
                  相似商品表現
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-800 mb-2">
                    {results.similar_products_avg}
                  </div>
                  <div className="text-lg text-amber-600 font-medium mb-3">件/月 平均銷量</div>
                  <div className="p-3 bg-amber-50/70 rounded-lg">
                    <p className="text-amber-700 text-sm">
                      同類商品市場平均表現，為您的定價和庫存策略提供參考基準
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Restock Recommendations */}
            <Card className="card-glass shadow-warm border border-rose-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-rose-700">
                  <RefreshCw className="h-6 w-6" />
                  補貨週期建議
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  
                  {/* Recommended Cycle */}
                  <div className="text-center mb-4">
                    <Badge className="bg-rose-500 text-white px-4 py-2 text-lg font-bold">
                      推薦：{results.recommended_cycle}
                    </Badge>
                  </div>

                  {/* Cycle Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-rose-50/70 rounded-lg border border-rose-200/50">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-rose-600" />
                        <span className="font-medium text-rose-700">短期補貨</span>
                      </div>
                      <Badge variant="outline" className="text-rose-700 border-rose-300">
                        每 {results.short_term_days}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-lg border border-gray-200/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-700">長期補貨</span>
                      </div>
                      <Badge variant="outline" className="text-gray-700 border-gray-300">
                        每 {results.long_term_days}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-rose-50/50 rounded-lg mt-4">
                    <p className="text-rose-700 text-sm text-center">
                      建議採用短期補貨策略，確保庫存充足並降低滯銷風險
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final Status */}
          <Card className="card-glass shadow-warm bg-gradient-to-br from-emerald-50/80 to-blue-50/80 border border-emerald-200/50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <CheckCircle className="h-12 w-12 text-emerald-500" />
                  <h3 className="text-3xl font-bold text-emerald-700">分析報告完成</h3>
                </div>
                <p className="text-emerald-700 font-medium text-xl mb-4">
                  基於三階段可解釋AI分析，提供完整商品評估建議
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-white/70 rounded-lg">
                    <div className="text-lg font-bold text-emerald-800">新品評估</div>
                    <div className="text-emerald-600">✓ 已完成</div>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <div className="text-lg font-bold text-emerald-800">需求預測</div>
                    <div className="text-emerald-600">✓ 已完成</div>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <div className="text-lg font-bold text-emerald-800">市場驗證</div>
                    <div className="text-emerald-600">✓ 已完成</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketTrendAnalysis;
