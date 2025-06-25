
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import ProductEvaluation from '@/components/ProductEvaluation';

const ProductEvaluationPage = () => {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    // 將數據存儲到 localStorage 或狀態管理中
    localStorage.setItem('productData', JSON.stringify(data));
  };

  const handleProceed = () => {
    navigate('/demand-prediction');
  };

  return (
    <div className="min-h-screen gradient-warm">
      <TopBanner />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <span className="text-rose-600 font-semibold">NLP 語意比對</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">2</div>
              <span className="text-gray-500">虛擬顧客代理人</span>
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

        <ProductEvaluation 
          onComplete={handleComplete}
          onProceed={handleProceed}
        />
      </div>
    </div>
  );
};

export default ProductEvaluationPage;
