
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import OverviewCards from '@/components/OverviewCards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, TrendingUp, FileText } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    // 清除任何現有的分析數據
    localStorage.clear();
    navigate('/product-evaluation');
  };

  return (
    <div className="min-h-screen gradient-warm">
      <TopBanner />
      <Header />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="animate-fade-in">
          <OverviewCards />
        </div>
        
        {/* Enhanced main content with better spacing */}
        <div className="content-spacing">
          {/* Enhanced welcome section */}
          <div className="text-center mb-16 animate-fade-in delay-300">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-6">
              AI 驅動的市場洞察平台
            </h1>
            <p className="text-rose-600/80 text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed">
              透過四步驟完整分析流程，從商品評估到最終報告，為您的商業決策提供全方位的AI智慧支援
            </p>
          </div>

          {/* Enhanced process overview */}
          <Card className="card-elevated animate-scale-in delay-500">
            <CardHeader className="text-center card-padding">
              <CardTitle className="text-3xl md:text-4xl font-display text-rose-600 mb-4">
                完整分析流程
              </CardTitle>
              <CardDescription className="text-lg md:text-xl text-rose-600/70 max-w-3xl mx-auto">
                四個步驟，深度解析市場機會
              </CardDescription>
            </CardHeader>
            <CardContent className="card-padding">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                {/* Enhanced Step 1 */}
                <div className="text-center p-8 bg-gradient-to-br from-rose-50/70 to-pink-50/70 rounded-2xl border border-rose-200/50 shadow-warm hover:shadow-elevated transition-all duration-300 animate-fade-in delay-700">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                    <BarChart3 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-rose-700 mb-3">步驟一</h3>
                  <h4 className="text-lg font-semibold text-rose-600 mb-4">NLP 語意比對</h4>
                  <p className="text-rose-600/70 text-sm leading-relaxed">
                    使用自然語言處理技術分析商品相似度，識別歷史表現最佳的參考商品
                  </p>
                </div>

                {/* Enhanced Step 2 */}
                <div className="text-center p-8 bg-gradient-to-br from-amber-50/70 to-orange-50/70 rounded-2xl border border-amber-200/50 shadow-warm hover:shadow-elevated transition-all duration-300 animate-fade-in delay-800">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                    <Users className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-amber-700 mb-3">步驟二</h3>
                  <h4 className="text-lg font-semibold text-amber-600 mb-4">虛擬顧客代理人</h4>
                  <p className="text-amber-600/70 text-sm leading-relaxed">
                    運用 ABM + LLM 技術模擬不同客群的購買行為與偏好分析
                  </p>
                </div>

                {/* Enhanced Step 3 */}
                <div className="text-center p-8 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-2xl border border-blue-200/50 shadow-warm hover:shadow-elevated transition-all duration-300 animate-fade-in delay-900">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-blue-700 mb-3">步驟三</h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-4">市場趨勢分析</h4>
                  <p className="text-blue-600/70 text-sm leading-relaxed">
                    整合外部市場數據，驗證分析結果並提供清晰的市場洞察
                  </p>
                </div>

                {/* Enhanced Step 4 */}
                <div className="text-center p-8 bg-gradient-to-br from-purple-50/70 to-violet-50/70 rounded-2xl border border-purple-200/50 shadow-warm hover:shadow-elevated transition-all duration-300 animate-fade-in delay-1000">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm">
                    <FileText className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-purple-700 mb-3">步驟四</h3>
                  <h4 className="text-lg font-semibold text-purple-600 mb-4">生成最終報告</h4>
                  <p className="text-purple-600/70 text-sm leading-relaxed">
                    整合所有分析結果，生成完整的商品評估與策略建議報告
                  </p>
                </div>
              </div>

              {/* Enhanced start analysis button */}
              <div className="text-center animate-fade-in delay-1100">
                <Button 
                  onClick={handleStartAnalysis}
                  className="btn-primary py-6 px-12 text-xl font-semibold shadow-glow hover:shadow-elevated transition-all duration-300 focus-ring"
                  size="lg"
                >
                  開始完整分析流程
                  <ArrowRight className="h-6 w-6 ml-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
