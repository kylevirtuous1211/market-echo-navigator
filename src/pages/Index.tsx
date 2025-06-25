
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
      
      <div className="container mx-auto px-4 pb-12">
        <OverviewCards />
        
        {/* Main Content */}
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient-warm mb-4">
              AI 驅動的市場洞察平台
            </h1>
            <p className="text-rose-600/80 text-xl max-w-4xl mx-auto">
              透過四步驟完整分析流程，從商品評估到最終報告，為您的商業決策提供全方位的AI智慧支援
            </p>
          </div>

          {/* Process Overview */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="text-center text-3xl text-rose-600">
                完整分析流程
              </CardTitle>
              <CardDescription className="text-center text-lg text-rose-600/70">
                四個步驟，深度解析市場機會
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                
                {/* Step 1 */}
                <div className="text-center p-6 bg-gradient-to-br from-rose-50/50 to-pink-50/50 rounded-xl border border-rose-200/50">
                  <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-rose-700 mb-2">步驟一</h3>
                  <h4 className="text-lg font-semibold text-rose-600 mb-3">NLP 語意比對</h4>
                  <p className="text-rose-600/70 text-sm">
                    使用自然語言處理技術分析商品相似度，識別歷史表現最佳的參考商品
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-200/50">
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-700 mb-2">步驟二</h3>
                  <h4 className="text-lg font-semibold text-amber-600 mb-3">虛擬顧客代理人</h4>
                  <p className="text-amber-600/70 text-sm">
                    運用 ABM + LLM 技術模擬不同客群的購買行為與偏好分析
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-200/50">
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">步驟三</h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">市場趨勢分析</h4>
                  <p className="text-blue-600/70 text-sm">
                    整合外部市場數據，驗證分析結果並提供清晰的市場洞察
                  </p>
                </div>

                {/* Step 4 */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50/50 to-violet-50/50 rounded-xl border border-purple-200/50">
                  <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">步驟四</h3>
                  <h4 className="text-lg font-semibold text-purple-600 mb-3">生成最終報告</h4>
                  <p className="text-purple-600/70 text-sm">
                    整合所有分析結果，生成完整的商品評估與策略建議報告
                  </p>
                </div>
              </div>

              {/* Start Analysis Button */}
              <div className="text-center">
                <Button 
                  onClick={handleStartAnalysis}
                  className="bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white border-0 py-4 px-8 text-xl font-medium"
                  size="lg"
                >
                  開始完整分析流程
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
                <p className="text-rose-600/70 mt-4 text-lg">
                  預計完成時間：15-20 分鐘
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
