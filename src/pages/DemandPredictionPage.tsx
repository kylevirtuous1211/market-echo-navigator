
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import DemandPrediction from '@/components/DemandPrediction';

const DemandPredictionPage = () => {
  const navigate = useNavigate();

  // 從 localStorage 獲取上一步的數據
  const productData = JSON.parse(localStorage.getItem('productData') || 'null');

  const handleComplete = (data: any) => {
    // 將需求預測數據存儲到 localStorage
    localStorage.setItem('demandData', JSON.stringify(data));
  };

  const handleProceed = () => {
    navigate('/market-trend-analysis');
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
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <span className="text-amber-600 font-semibold">虛擬顧客代理人</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">3</div>
              <span className="text-gray-500">市場趨勢分析</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">4</div>
              <span className="text-gray-500">生成最終報告</span>
            </div>
          </div>
        </div>

        <DemandPrediction 
          productData={productData}
          onComplete={handleComplete}
          onProceed={handleProceed}
        />
      </div>
    </div>
  );
};

export default DemandPredictionPage;
