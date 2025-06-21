
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductInputForm from './ProductInputForm';
import SimilarProductsAnalysis from './SimilarProductsAnalysis';
import SalesPerformanceChart from './SalesPerformanceChart';
import AnalysisCompleteCard from './AnalysisCompleteCard';
import { ProductEvaluationProps } from '@/types/productEvaluation';
import { mockSimilarProducts, chartData } from '@/data/mockData';

const ProductEvaluation: React.FC<ProductEvaluationProps> = ({ onComplete, onProceed }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // 模擬 API 分析延遲
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults(mockSimilarProducts);
    
    // Calculate baseline metrics for next step
    const avgSalesVelocity = mockSimilarProducts.reduce((sum, p) => sum + p.salesVelocity, 0) / mockSimilarProducts.length;
    const avgLifeCycle = mockSimilarProducts.reduce((sum, p) => sum + p.lifeCycle, 0) / mockSimilarProducts.length;
    const avgProfit = mockSimilarProducts.reduce((sum, p) => sum + p.profit, 0) / mockSimilarProducts.length;
    
    const productData = {
      name: productName,
      description: productDescription,
      similarProducts: mockSimilarProducts,
      baselineMetrics: {
        avgSalesVelocity,
        avgLifeCycle,
        avgProfit
      }
    };
    
    onComplete(productData);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
            <Sparkles className="h-5 w-5 text-rose-500" />
            <span className="text-rose-600 font-medium">AI 語意分析</span>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gradient-warm mb-3">NLP 語意比對分析</h2>
        <p className="text-rose-600/80 text-lg max-w-3xl mx-auto">
          輸入新品資訊，系統將使用自然語言處理技術找出最相似的歷史商品並分析其銷售表現
        </p>
      </div>

      <ProductInputForm
        productName={productName}
        productDescription={productDescription}
        isAnalyzing={isAnalyzing}
        onProductNameChange={setProductName}
        onProductDescriptionChange={setProductDescription}
        onAnalyze={handleAnalyze}
      />

      {results && (
        <div className="space-y-8">
          <SimilarProductsAnalysis results={results} />
          <SalesPerformanceChart data={chartData} />
          <AnalysisCompleteCard onProceed={onProceed} />
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
