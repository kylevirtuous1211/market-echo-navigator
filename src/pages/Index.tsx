
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductEvaluation from '@/components/ProductEvaluation';
import DemandPrediction from '@/components/DemandPrediction';
import MarketTrendAnalysis from '@/components/MarketTrendAnalysis';
import { TrendingUp, Users, BarChart3, ArrowRight, CheckCircle, Sparkles, Heart, Star } from 'lucide-react';

interface ProductData {
  name: string;
  description: string;
  similarProducts: any[];
  baselineMetrics: {
    avgSalesVelocity: number;
    avgLifeCycle: number;
    avgProfit: number;
  };
}

interface DemandData {
  totalDemand: number;
  segments: any[];
  overallIntent: number;
  marketShare: any[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("evaluation");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [demandData, setDemandData] = useState<DemandData | null>(null);

  const handleStepComplete = (step: string, data?: any) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    
    if (step === 'evaluation' && data) {
      setProductData(data);
    } else if (step === 'demand' && data) {
      setDemandData(data);
    }
  };

  const proceedToNext = (nextTab: string) => {
    setActiveTab(nextTab);
  };

  const isStepAccessible = (step: string) => {
    switch (step) {
      case 'evaluation':
        return true;
      case 'demand':
        return completedSteps.includes('evaluation');
      case 'trends':
        return completedSteps.includes('evaluation') && completedSteps.includes('demand');
      default:
        return false;
    }
  };

  const getStepStatus = (step: string) => {
    if (completedSteps.includes(step)) return 'completed';
    if (isStepAccessible(step)) return 'available';
    return 'locked';
  };

  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <div className="gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-amber-400/20 to-pink-500/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-rose-300/30 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-amber-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-pink-300/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                <Sparkles className="h-6 w-6 text-white" />
                <span className="text-white font-medium">AI 驅動智慧分析</span>
                <Heart className="h-5 w-5 text-rose-200" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">
              智慧商品預測分析平台
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
              結合 NLP 語意比對、虛擬顧客代理人與市場趨勢的全方位分析系統
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-white/80">
                <Star className="h-5 w-5 text-amber-200" />
                <span>創新技術</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Heart className="h-5 w-5 text-rose-200" />
                <span>友善體驗</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Sparkles className="h-5 w-5 text-pink-200" />
                <span>精準預測</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Flow Indicator */}
      <div className="container mx-auto px-4 py-8">
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="text-center text-gradient-warm text-2xl">分析流程進度</CardTitle>
            <CardDescription className="text-center text-rose-600/80 text-lg">
              依序完成三個分析階段，每個階段的結果將為下一階段提供基礎數據
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  getStepStatus('evaluation') === 'completed' 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-glow' :
                  getStepStatus('evaluation') === 'available' 
                    ? 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-glow' : 
                    'bg-gradient-to-r from-gray-300 to-gray-400'
                }`}>
                  {getStepStatus('evaluation') === 'completed' ? 
                    <CheckCircle className="h-7 w-7 text-white" /> : 
                    <BarChart3 className="h-7 w-7 text-white" />
                  }
                </div>
                <span className={`font-semibold text-lg ${
                  getStepStatus('evaluation') === 'completed' ? 'text-emerald-600' :
                  getStepStatus('evaluation') === 'available' ? 'text-rose-600' : 'text-gray-400'
                }`}>
                  新品評估
                </span>
              </div>
              
              <ArrowRight className={`h-6 w-6 transition-colors duration-300 ${
                getStepStatus('demand') !== 'locked' ? 'text-amber-500' : 'text-gray-300'
              }`} />
              
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  getStepStatus('demand') === 'completed' 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-glow' :
                  getStepStatus('demand') === 'available' 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-glow' : 
                    'bg-gradient-to-r from-gray-300 to-gray-400'
                }`}>
                  {getStepStatus('demand') === 'completed' ? 
                    <CheckCircle className="h-7 w-7 text-white" /> : 
                    <Users className="h-7 w-7 text-white" />
                  }
                </div>
                <span className={`font-semibold text-lg ${
                  getStepStatus('demand') === 'completed' ? 'text-emerald-600' :
                  getStepStatus('demand') === 'available' ? 'text-amber-600' : 'text-gray-400'
                }`}>
                  需求預測
                </span>
              </div>
              
              <ArrowRight className={`h-6 w-6 transition-colors duration-300 ${
                getStepStatus('trends') !== 'locked' ? 'text-amber-500' : 'text-gray-300'
              }`} />
              
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  getStepStatus('trends') === 'completed' 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-glow' :
                  getStepStatus('trends') === 'available' 
                    ? 'bg-gradient-to-r from-pink-400 to-rose-500 shadow-glow' : 
                    'bg-gradient-to-r from-gray-300 to-gray-400'
                }`}>
                  {getStepStatus('trends') === 'completed' ? 
                    <CheckCircle className="h-7 w-7 text-white" /> : 
                    <TrendingUp className="h-7 w-7 text-white" />
                  }
                </div>
                <span className={`font-semibold text-lg ${
                  getStepStatus('trends') === 'completed' ? 'text-emerald-600' :
                  getStepStatus('trends') === 'available' ? 'text-pink-600' : 'text-gray-400'
                }`}>
                  市場趨勢分析
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="card-glass shadow-warm hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-rose-600 text-xl">
                <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
                  <BarChart3 className="h-7 w-7 text-rose-500" />
                </div>
                NLP 語意比對
              </CardTitle>
              <CardDescription className="text-rose-600/70 text-base leading-relaxed">
                分析新品與歷史商品的相似度，提供基線預測
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="card-glass shadow-warm hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-amber-600 text-xl">
                <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
                  <Users className="h-7 w-7 text-amber-500" />
                </div>
                虛擬顧客代理人
              </CardTitle>
              <CardDescription className="text-amber-600/70 text-base leading-relaxed">
                ABM 結合 LLM 模擬不同客群的購買行為
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="card-glass shadow-warm hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-pink-600 text-xl">
                <div className="p-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl">
                  <TrendingUp className="h-7 w-7 text-pink-500" />
                </div>
                市場趨勢分析
              </CardTitle>
              <CardDescription className="text-pink-600/70 text-base leading-relaxed">
                整合 OpView、Google Trends 等外部數據源
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Card className="card-glass shadow-warm">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-rose-50/80 to-amber-50/80 border-b border-rose-200/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="evaluation" 
                  disabled={!isStepAccessible('evaluation')}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-rose-600 hover:text-rose-700 transition-all duration-200 disabled:opacity-50 font-medium"
                >
                  新品評估分析
                  {completedSteps.includes('evaluation') && <CheckCircle className="h-4 w-4 ml-2 text-emerald-400" />}
                </TabsTrigger>
                <TabsTrigger 
                  value="demand" 
                  disabled={!isStepAccessible('demand')}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white text-amber-600 hover:text-amber-700 transition-all duration-200 disabled:opacity-50 font-medium"
                >
                  需求預測模擬
                  {completedSteps.includes('demand') && <CheckCircle className="h-4 w-4 ml-2 text-emerald-400" />}
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  disabled={!isStepAccessible('trends')}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white text-pink-600 hover:text-pink-700 transition-all duration-200 disabled:opacity-50 font-medium"
                >
                  市場趨勢分析
                  {completedSteps.includes('trends') && <CheckCircle className="h-4 w-4 ml-2 text-emerald-400" />}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="evaluation" className="p-8">
                <ProductEvaluation 
                  onComplete={(data) => handleStepComplete('evaluation', data)} 
                  onProceed={() => proceedToNext('demand')}
                />
              </TabsContent>
              
              <TabsContent value="demand" className="p-8">
                <DemandPrediction 
                  productData={productData}
                  onComplete={(data) => handleStepComplete('demand', data)}
                  onProceed={() => proceedToNext('trends')}
                />
              </TabsContent>
              
              <TabsContent value="trends" className="p-8">
                <MarketTrendAnalysis 
                  productData={productData}
                  demandData={demandData}
                  onComplete={() => handleStepComplete('trends')}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
