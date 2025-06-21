
import React, { useState } from 'react';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import ProgressFlowIndicator from '@/components/ProgressFlowIndicator';
import OverviewCards from '@/components/OverviewCards';
import MainTabs from '@/components/MainTabs';

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

  return (
    <div className="min-h-screen gradient-warm">
      <TopBanner />
      <Header />
      <ProgressFlowIndicator completedSteps={completedSteps} />
      
      <div className="container mx-auto px-4 pb-12">
        <OverviewCards />
        <MainTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          completedSteps={completedSteps}
          productData={productData}
          demandData={demandData}
          handleStepComplete={handleStepComplete}
          proceedToNext={proceedToNext}
        />
      </div>
    </div>
  );
};

export default Index;
