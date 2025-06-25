
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import MarketTrendAnalysis from '@/components/MarketTrendAnalysis';

const MarketTrendAnalysisPage = () => {
  const navigate = useNavigate();

  // 從 localStorage 獲取前兩步的數據
  const productData = JSON.parse(localStorage.getItem('productData') || 'null');
  const demandData = JSON.parse(localStorage.getItem('demandData') || 'null');

  const handleComplete = () => {
    // 標記市場趨勢分析已完成
    localStorage.setItem('marketAnalysisCompleted', 'true');
    // 自動導向最終報告頁面
    navigate('/final-report');
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
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <span className="text-blue-600 font-semibold">市場趨勢分析</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">4</div>
              <span className="text-gray-500">生成最終報告</span>
            </div>
          </div>
        </div>

        <MarketTrendAnalysis 
          productData={productData}
          demandData={demandData}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default MarketTrendAnalysisPage;
