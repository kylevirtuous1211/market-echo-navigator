
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, BarChart3, Users, TrendingUp, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';

const FinalReportPage = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // 獲取所有步驟的數據
  const productData = JSON.parse(localStorage.getItem('productData') || 'null');
  const demandData = JSON.parse(localStorage.getItem('demandData') || 'null');
  const marketAnalysisCompleted = localStorage.getItem('marketAnalysisCompleted') === 'true';

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // 模擬報告生成過程
    await new Promise(resolve => setTimeout(resolve, 4000));
    setReportGenerated(true);
    setIsGenerating(false);
  };

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

          {/* Analysis Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-glass shadow-warm border border-rose-200/50">
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 text-rose-500 mx-auto mb-3" />
                <CardTitle className="text-rose-600">商品相似度分析</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {productData ? (
                  <>
                    <div className="text-2xl font-bold text-rose-700 mb-2">
                      {productData.similarProducts?.length || 0} 個
                    </div>
                    <p className="text-rose-600/70">相似商品識別</p>
                  </>
                ) : (
                  <p className="text-rose-600/70">數據未完成</p>
                )}
              </CardContent>
            </Card>

            <Card className="card-glass shadow-warm border border-amber-200/50">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-amber-500 mx-auto mb-3" />
                <CardTitle className="text-amber-600">虛擬顧客模擬</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {demandData ? (
                  <>
                    <div className="text-2xl font-bold text-amber-700 mb-2">
                      {demandData.overallIntent}%
                    </div>
                    <p className="text-amber-600/70">整體購買意願</p>
                  </>
                ) : (
                  <p className="text-amber-600/70">數據未完成</p>
                )}
              </CardContent>
            </Card>

            <Card className="card-glass shadow-warm border border-emerald-200/50">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                <CardTitle className="text-emerald-600">市場趨勢驗證</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {marketAnalysisCompleted ? (
                  <>
                    <div className="text-2xl font-bold text-emerald-700 mb-2">
                      <CheckCircle className="h-8 w-8 mx-auto" />
                    </div>
                    <p className="text-emerald-600/70">分析已完成</p>
                  </>
                ) : (
                  <p className="text-emerald-600/70">分析未完成</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Report Generation Section */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-600 text-2xl">
                <FileText className="h-8 w-8" />
                最終報告生成
              </CardTitle>
              <CardDescription className="text-purple-600/70 text-lg">
                將整合所有分析步驟的結果，生成包含商品建議、需求預測和市場策略的完整報告
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!reportGenerated ? (
                <div className="space-y-6">
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={isGenerating || !marketAnalysisCompleted}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white border-0 py-4 text-xl font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-6 w-6 mr-3 animate-spin" />
                        正在生成綜合報告...
                      </>
                    ) : (
                      <>
                        <FileText className="h-6 w-6 mr-3" />
                        生成最終綜合報告
                      </>
                    )}
                  </Button>

                  {!marketAnalysisCompleted && (
                    <div className="p-4 bg-amber-50/70 rounded-lg border border-amber-200/50">
                      <p className="text-amber-700 text-center">
                        請先完成市場趨勢分析步驟才能生成最終報告
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/market-trend-analysis')}
                        className="w-full mt-3 border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        返回市場趨勢分析
                      </Button>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="space-y-3">
                      <p className="text-sm text-purple-600/70">報告生成進度</p>
                      <Progress value={75} className="w-full h-3" />
                      <p className="text-xs text-purple-600/60">正在整合分析結果並生成建議...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-emerald-700 mb-2">報告生成完成！</h3>
                    <p className="text-emerald-600/90 text-lg">
                      您的綜合分析報告已成功生成，包含完整的商品評估建議
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      className="bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-emerald-700 hover:to-blue-600 text-white border-0 py-3 text-lg font-medium"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      下載 PDF 報告
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleStartOver}
                      className="border-purple-300 text-purple-700 hover:bg-purple-50 py-3 text-lg font-medium"
                    >
                      <RefreshCw className="h-5 w-5 mr-2" />
                      開始新的分析
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinalReportPage;
