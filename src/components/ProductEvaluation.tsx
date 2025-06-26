
import React from 'react';
import { Sparkles } from 'lucide-react';
import ProductInputForm from './ProductInputForm';
import SimilarProductsAnalysis from './SimilarProductsAnalysis';
import AnalysisCompleteCard from './AnalysisCompleteCard';
import { ProductEvaluationProps } from '@/types/productEvaluation';
import { useProductAnalysis } from '@/hooks/useProductAnalysis';
import { convertToSimilarProducts } from '@/utils/productAnalysisUtils';

const ProductEvaluation: React.FC<ProductEvaluationProps> = ({ onComplete, onProceed }) => {
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    isAnalyzing,
    results,
    handleAnalyze
  } = useProductAnalysis();

  const onAnalyzeClick = () => {
    handleAnalyze(onComplete);
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
        onAnalyze={onAnalyzeClick}
      />

      {results && results.length > 0 && (
        <div className="space-y-8">
          <SimilarProductsAnalysis 
            results={convertToSimilarProducts(
              results, 
              [productName, productDescription].filter(Boolean).join(' ')
            )} 
          />
          <AnalysisCompleteCard onProceed={onProceed} />
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
