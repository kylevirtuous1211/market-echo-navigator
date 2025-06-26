
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, TrendingUp, CheckCircle, ArrowLeft, RefreshCw, Package, MessageSquare, Heart, Target, Calendar, Globe } from 'lucide-react';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import SearchVolumeChart from '@/components/SearchVolumeChart';
import TrendScoreChart from '@/components/TrendScoreChart';

const FinalReportPage = () => {
  const navigate = useNavigate();

  // 獲取所有步驟的數據
  const productData = JSON.parse(localStorage.getItem('productData') || 'null');
  const demandData = JSON.parse(localStorage.getItem('demandData') || 'null');
  const marketAnalysisData = JSON.parse(localStorage.getItem('marketAnalysisData') || 'null');
  const marketAnalysisCompleted = localStorage.getItem('marketAnalysisCompleted') === 'true';

  const handleStartOver = () => {
    // 清除所有數據
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen gradient-warm">
      <TopBanner />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <span className="text-emerald-600 font-semibold">NLP 語意比對</span>
            </div>
            <div className="w-16 h-0.5 bg-emerald-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <span className="text-emerald-600 font-semibold">虛擬顧客代理人</span>
            </div>
            <div className="w-16 h-0.5 bg-emerald-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <span className="text-emerald-600 font-semibold">市場趨勢分析</span>
            </div>
            <div className="w-16 h-0.5 bg-emerald-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <span className="text-purple-600 font-semibold">生成最終報告</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">綜合分析報告</h1>
            <p className="text-purple-600/80 text-lg max-w-3xl mx-auto">
              整合所有分析步驟的洞察，生成完整的商品評估與市場建議報告
            </p>
          </div>

          {!marketAnalysisCompleted ? (
            <Card className="card-glass shadow-warm">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-amber-50/70 rounded-lg border border-amber-200/50">
                  <p className="text-amber-700 text-center mb-4">
                    請先完成市場趨勢分析步驟才能查看最終報告
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/market-trend-analysis')}
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回市場趨勢分析
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Analysis Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="card-glass shadow-warm border border-rose-200/50">
                  <CardHeader className="text-center">
                    <BarChart3 className="h-12 w-12 text-rose-500 mx-auto mb-3" />
                    <CardTitle className="text-rose-600">商品相似度分析</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-rose-700 mb-2">
                      {productData?.similarProducts?.length || 5} 個
                    </div>
                    <p className="text-rose-600/70">相似商品識別</p>
                  </CardContent>
                </Card>

                <Card className="card-glass shadow-warm border border-amber-200/50">
                  <CardHeader className="text-center">
                    <Users className="h-12 w-12 text-amber-500 mx-auto mb-3" />
                    <CardTitle className="text-amber-600">虛擬顧客模擬</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-amber-700 mb-2">
                      {demandData?.avgPurchaseIntent || 67}%
                    </div>
                    <p className="text-amber-600/70">平均購買意願</p>
                  </CardContent>
                </Card>

                <Card className="card-glass shadow-warm border border-emerald-200/50">
                  <CardHeader className="text-center">
                    <TrendingUp className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                    <CardTitle className="text-emerald-600">市場趨勢驗證</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-emerald-700 mb-2">
                      <CheckCircle className="h-8 w-8 mx-auto" />
                    </div>
                    <p className="text-emerald-600/70">分析已完成</p>
                  </CardContent>
                </Card>
              </div>

              {/* Two Charts Only */}
              {marketAnalysisData?.search_trends && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SearchVolumeChart 
                    productName={productData?.name || "時尚牛仔夾克"}
                    data={marketAnalysisData.search_trends}
                  />
                  
                  <TrendScoreChart 
                    productName={productData?.name || "時尚牛仔夾克"}
                    data={marketAnalysisData.search_trends}
                  />
                </div>
              )}

              {/* Final Recommendations */}
              {marketAnalysisData && (
                <>
                  {/* Header Card with Rating */}
                  <Card className="card-glass shadow-warm border border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-blue-50/50">
                    <CardHeader className="text-center pb-6">
                      <div className="flex justify-center mb-4">
                        <Badge className="bg-red-500 text-white px-6 py-3 text-xl font-bold flex items-center gap-3">
                          <TrendingUp className="h-4 w-4" />
                          {marketAnalysisData.rating || '熱銷商品'}
                        </Badge>
                      </div>
                      <CardTitle className="text-4xl font-bold text-emerald-700 mb-2">最終建議報告</CardTitle>
                      <p className="text-emerald-600/80 text-lg">基於完整分析流程的綜合建議</p>
                    </CardHeader>
                  </Card>

                  {/* Quantity Recommendation */}
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
                          {marketAnalysisData.quantity_min} - {marketAnalysisData.quantity_max}
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
                      
                      {/* Customer Segments with matching second stage data */}
                      <div className="p-6 bg-blue-50/70 rounded-xl border border-blue-200/50">
                        <div className="flex items-center gap-3 mb-4">
                          <Users className="h-6 w-6 text-blue-600" />
                          <h3 className="text-xl font-bold text-blue-700">客群模擬分析</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-4 bg-white/70 rounded-lg">
                            <div className="text-2xl font-bold text-blue-800">
                              {marketAnalysisData.customer_simulation?.purchase_intent || demandData?.avgPurchaseIntent || 67}%
                            </div>
                            <div className="text-blue-600 font-medium">購買意願</div>
                          </div>
                          <div className="text-center p-4 bg-white/70 rounded-lg">
                            <div className="text-2xl font-bold text-blue-800">
                              {marketAnalysisData.customer_simulation?.price_sensitivity || demandData?.avgPriceSensitivity || 49}%
                            </div>
                            <div className="text-blue-600 font-medium">價格敏感度</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(marketAnalysisData.customer_segments || ['時尚年輕族群', '潮流追隨者', '品質重視者']).map((segment, index) => (
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
                          {marketAnalysisData.sentiment_summary || '正面評價占82%，主要關注品質與時尚感。消費者特別讚賞產品的耐用性和設計美感。'}
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
                            {marketAnalysisData.similar_products_avg || 42}
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
                              推薦：{marketAnalysisData.recommended_cycle || '短期補貨'}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-rose-50/70 rounded-lg border border-rose-200/50">
                              <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-rose-600" />
                                <span className="font-medium text-rose-700">短期補貨</span>
                              </div>
                              <Badge variant="outline" className="text-rose-700 border-rose-300">
                                每 {marketAnalysisData.short_term_days || '7-10天'}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-lg border border-gray-200/50">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-gray-600" />
                                <span className="font-medium text-gray-700">長期補貨</span>
                              </div>
                              <Badge variant="outline" className="text-gray-700 border-gray-300">
                                每 {marketAnalysisData.long_term_days || '15-20天'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Final Actions */}
                  <Card className="card-glass shadow-warm bg-gradient-to-br from-emerald-50/80 to-blue-50/80 border border-emerald-200/50">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <CheckCircle className="h-12 w-12 text-emerald-500" />
                          <h3 className="text-3xl font-bold text-emerald-700">綜合報告完成</h3>
                        </div>
                        <p className="text-emerald-700 font-medium text-xl mb-6">
                          基於四階段完整分析流程，提供最終商品建議與市場洞察
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                          <div className="p-4 bg-white/70 rounded-lg">
                            <div className="text-lg font-bold text-emerald-800">綜合報告</div>
                            <div className="text-emerald-600">✓ 已完成</div>
                          </div>
                        </div>

                        <Button 
                          variant="outline"
                          onClick={handleStartOver}
                          className="border-purple-300 text-purple-700 hover:bg-purple-50 py-3 text-lg font-medium px-8"
                        >
                          <RefreshCw className="h-5 w-5 mr-2" />
                          開始新的分析
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalReportPage;
