
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Eye, Globe, MessageSquare, Star, BarChart3, Users, Heart, CheckCircle, Package, Clock, RefreshCw } from 'lucide-react';

interface MarketTrendAnalysisProps {
  productData?: any;
  demandData?: any;
  onComplete: () => void;
}

const MarketTrendAnalysis: React.FC<MarketTrendAnalysisProps> = ({ productData, demandData, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const finalRecommendations = {
    quantity_min: 30,
    quantity_max: 50,
    rating: '熱銷商品',
    rating_level: 'hot',
    customer_segments: ['時尚年輕族群', '潮流追隨者'],
    sentiment_summary: '正面評價占82%，主要關注品質與時尚感',
    similar_products_avg: 42,
    restock_cycle: '短期補貨',
    restock_frequency: '建議每7-10天補貨一次'
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResults(finalRecommendations);
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
        <h2 className="text-3xl font-bold text-pink-600 mb-3">市場趨勢驗證分析</h2>
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
            整合新品評估、需求預測與市場趨勢數據，生成最終商品建議
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

      {/* Final Results */}
      {results && (
        <div className="space-y-6">
          {/* Main Recommendation Card */}
          <Card className="card-glass shadow-warm border border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-blue-50/50">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Badge className={`${getRatingColor(results.rating_level)} px-4 py-2 text-lg font-bold flex items-center gap-2`}>
                  {getRatingIcon(results.rating_level)}
                  {results.rating}
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-emerald-700">給客戶的回饋</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Quantity Recommendation */}
              <div className="text-center p-6 bg-white/70 rounded-xl border border-emerald-200/50">
                <div className="flex justify-center mb-4">
                  <Package className="h-12 w-12 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">建議進貨數量</h3>
                <div className="text-4xl font-bold text-emerald-800 mb-2">
                  {results.quantity_min} - {results.quantity_max} 件
                </div>
                <p className="text-emerald-600/80">基於市場需求預測的最佳進貨區間</p>
              </div>

              {/* Summary Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/70 rounded-xl border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-700">主要客群</h3>
                  </div>
                  <div className="space-y-2">
                    {results.customer_segments.map((segment, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2 text-blue-700 border-blue-300">
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white/70 rounded-xl border border-purple-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-purple-700">輿情分析</h3>
                  </div>
                  <p className="text-purple-700 font-medium">{results.sentiment_summary}</p>
                </div>
              </div>

              {/* Similar Products & Restock Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/70 rounded-xl border border-amber-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="h-6 w-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-amber-700">相似商品平均</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-800 mb-2">
                      {results.similar_products_avg} 件/月
                    </div>
                    <p className="text-amber-600/80">同類商品平均銷售表現</p>
                  </div>
                </div>

                <div className="p-6 bg-white/70 rounded-xl border border-rose-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="h-6 w-6 text-rose-600" />
                    <h3 className="text-xl font-bold text-rose-700">補貨週期</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-rose-600" />
                      <Badge className="bg-rose-500 text-white px-3 py-1">
                        {results.restock_cycle}
                      </Badge>
                    </div>
                    <p className="text-rose-700 font-medium">
                      {results.restock_frequency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Status */}
              <div className="text-center p-6 bg-emerald-50/70 rounded-xl border border-emerald-200/50">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                  <h3 className="text-2xl font-bold text-emerald-700">分析完成</h3>
                </div>
                <p className="text-emerald-700 font-medium text-lg">
                  基於三階段可解釋AI分析，提供完整商品評估建議
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
