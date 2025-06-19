
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductEvaluation from '@/components/ProductEvaluation';
import DemandPrediction from '@/components/DemandPrediction';
import MarketTrendAnalysis from '@/components/MarketTrendAnalysis';
import { TrendingUp, Users, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              智慧商品預測分析平台
            </h1>
            <p className="text-xl opacity-90 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              結合 NLP 語意比對、虛擬顧客代理人與市場趨勢的全方位分析系統
            </p>
          </div>
        </div>
      </div>

      {/* Progress Flow Indicator */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-slate-800/95 to-slate-700/95 text-white backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-center text-blue-300">分析流程進度</CardTitle>
            <CardDescription className="text-center text-gray-300">
              依序完成三個分析階段，每個階段的結果將為下一階段提供基礎數據
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  getStepStatus('evaluation') === 'completed' ? 'bg-emerald-500' :
                  getStepStatus('evaluation') === 'available' ? 'bg-blue-500' : 'bg-gray-500'
                }`}>
                  {getStepStatus('evaluation') === 'completed' ? 
                    <CheckCircle className="h-6 w-6 text-white" /> : 
                    <BarChart3 className="h-6 w-6 text-white" />
                  }
                </div>
                <span className={`font-medium ${
                  getStepStatus('evaluation') === 'completed' ? 'text-emerald-300' :
                  getStepStatus('evaluation') === 'available' ? 'text-blue-300' : 'text-gray-400'
                }`}>
                  新品評估
                </span>
              </div>
              
              <ArrowRight className={`h-6 w-6 ${
                getStepStatus('demand') !== 'locked' ? 'text-blue-400' : 'text-gray-600'
              }`} />
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  getStepStatus('demand') === 'completed' ? 'bg-emerald-500' :
                  getStepStatus('demand') === 'available' ? 'bg-purple-500' : 'bg-gray-500'
                }`}>
                  {getStepStatus('demand') === 'completed' ? 
                    <CheckCircle className="h-6 w-6 text-white" /> : 
                    <Users className="h-6 w-6 text-white" />
                  }
                </div>
                <span className={`font-medium ${
                  getStepStatus('demand') === 'completed' ? 'text-emerald-300' :
                  getStepStatus('demand') === 'available' ? 'text-purple-300' : 'text-gray-400'
                }`}>
                  需求預測
                </span>
              </div>
              
              <ArrowRight className={`h-6 w-6 ${
                getStepStatus('trends') !== 'locked' ? 'text-blue-400' : 'text-gray-600'
              }`} />
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  getStepStatus('trends') === 'completed' ? 'bg-emerald-500' :
                  getStepStatus('trends') === 'available' ? 'bg-emerald-500' : 'bg-gray-500'
                }`}>
                  {getStepStatus('trends') === 'completed' ? 
                    <CheckCircle className="h-6 w-6 text-white" /> : 
                    <TrendingUp className="h-6 w-6 text-white" />
                  }
                </div>
                <span className={`font-medium ${
                  getStepStatus('trends') === 'completed' ? 'text-emerald-300' :
                  getStepStatus('trends') === 'available' ? 'text-emerald-300' : 'text-gray-400'
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
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-blue-300 text-lg">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                NLP 語意比對
              </CardTitle>
              <CardDescription className="text-gray-300 text-base leading-relaxed">
                分析新品與歷史商品的相似度，提供基線預測
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-purple-300 text-lg">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                虛擬顧客代理人
              </CardTitle>
              <CardDescription className="text-gray-300 text-base leading-relaxed">
                ABM 結合 LLM 模擬不同客群的購買行為
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-emerald-300 text-lg">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                市場趨勢分析
              </CardTitle>
              <CardDescription className="text-gray-300 text-base leading-relaxed">
                整合 OpView、Google Trends 等外部數據源
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800/95 to-slate-700/95 text-white backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border-b border-slate-600">
                <TabsTrigger 
                  value="evaluation" 
                  disabled={!isStepAccessible('evaluation')}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50"
                >
                  新品評估分析
                  {completedSteps.includes('evaluation') && <CheckCircle className="h-4 w-4 ml-2 text-emerald-400" />}
                </TabsTrigger>
                <TabsTrigger 
                  value="demand" 
                  disabled={!isStepAccessible('demand')}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50"
                >
                  需求預測模擬
                  {completedSteps.includes('demand') && <CheckCircle className="h-4 w-4 ml-2 text-emerald-400" />}
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  disabled={!isStepAccessible('trends')}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50"
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
