
import React, { useState } from 'react';
import BaselineDataCard from './demand/BaselineDataCard';
import SimulationControl from './demand/SimulationControl';
import CustomerPersonasAnalysis from './demand/CustomerPersonasAnalysis';
import DemandSummary from './demand/DemandSummary';

interface DemandPredictionProps {
  productData?: any;
  onComplete: (data: any) => void;
  onProceed: () => void;
}

const DemandPrediction: React.FC<DemandPredictionProps> = ({ productData, onComplete, onProceed }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState(null);

  // 模擬虛擬顧客代理人數據
  const virtualCustomers = [
    {
      id: 1,
      persona: '時尚年輕族群',
      age: '20-30歲',
      purchaseIntention: 78,
      priceSensitivity: 45,
      response: '非常感興趣，願意嘗試新品牌',
    },
    {
      id: 2,
      persona: '品質導向消費者',
      age: '30-45歲',
      purchaseIntention: 65,
      priceSensitivity: 30,
      response: '重視品質與耐用性',
    },
    {
      id: 3,
      persona: '價格敏感族群',
      age: '25-40歲',
      purchaseIntention: 45,
      priceSensitivity: 85,
      response: '需要促銷活動才會考慮',
    },
    {
      id: 4,
      persona: '潮流追隨者',
      age: '18-28歲',
      purchaseIntention: 82,
      priceSensitivity: 35,
      response: '積極關注新品，願意早期採用',
    }
  ];

  const handleSimulate = async () => {
    setIsSimulating(true);
    // 模擬 ABM + LLM 分析延遲
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResults(virtualCustomers);
    
    // Calculate averages for demand data
    const avgPurchaseIntent = Math.round(virtualCustomers.reduce((sum, customer) => sum + customer.purchaseIntention, 0) / virtualCustomers.length);
    const avgPriceSensitivity = Math.round(virtualCustomers.reduce((sum, customer) => sum + customer.priceSensitivity, 0) / virtualCustomers.length);
    
    // Prepare demand data for next step
    const demandData = {
      avgPurchaseIntent,
      avgPriceSensitivity,
      segments: virtualCustomers,
      marketShare: [
        { name: '時尚年輕族群', value: 35, color: '#3B82F6' },
        { name: '品質導向消費者', value: 23, color: '#8B5CF6' },
        { name: '潮流追隨者', value: 19, color: '#10B981' },
        { name: '價格敏感族群', value: 12, color: '#F59E0B' },
        { name: '其他族群', value: 11, color: '#6B7280' }
      ]
    };
    
    onComplete(demandData);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-rose-600 mb-3">虛擬顧客代理人需求預測</h2>
        <p className="text-rose-600/80 text-lg">
          結合 Agent-Based Modeling (ABM) 與大型語言模型 (LLM)，模擬不同客群的購買行為與偏好
        </p>
      </div>

      <BaselineDataCard productData={productData} />
      <SimulationControl isSimulating={isSimulating} onSimulate={handleSimulate} />

      {results && (
        <div className="space-y-8">
          <CustomerPersonasAnalysis results={results} />
          <DemandSummary onProceed={onProceed} customerResults={results} />
        </div>
      )}
    </div>
  );
};

export default DemandPrediction;
