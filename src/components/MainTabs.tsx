
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from 'lucide-react';
import ProductEvaluation from '@/components/ProductEvaluation';
import DemandPrediction from '@/components/DemandPrediction';
import MarketTrendAnalysis from '@/components/MarketTrendAnalysis';
import { BeautyProduct } from '@/services/beautyDataService';

interface ProductData {
  name: string;
  description: string;
  similarProducts: BeautyProduct[];
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

interface MainTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedSteps: string[];
  productData: ProductData | null;
  demandData: DemandData | null;
  handleStepComplete: (step: string, data?: any) => void;
  proceedToNext: (nextTab: string) => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  activeTab,
  setActiveTab,
  completedSteps,
  productData,
  demandData,
  handleStepComplete,
  proceedToNext
}) => {
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

  return (
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
  );
};

export default MainTabs;
