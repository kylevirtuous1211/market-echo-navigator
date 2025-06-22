
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductInputForm from './ProductInputForm';
import SimilarProductsAnalysis from './SimilarProductsAnalysis';
import SalesPerformanceChart from './SalesPerformanceChart';
import AnalysisCompleteCard from './AnalysisCompleteCard';
import { ProductEvaluationProps } from '@/types/productEvaluation';
import { beautyDataService, BeautyProduct } from '@/services/beautyDataService';
import { useToast } from '@/hooks/use-toast';

const ProductEvaluation: React.FC<ProductEvaluationProps> = ({ onComplete, onProceed }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<BeautyProduct[] | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!productName.trim()) {
      toast({
        title: "請輸入產品名稱",
        description: "產品名稱是必填欄位",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      console.log('開始分析產品:', productName);
      
      // 使用產品名稱和描述搜尋相似商品
      const searchTerms = [productName, productDescription].filter(Boolean).join(' ');
      const similarProducts = await beautyDataService.searchSimilarProducts(searchTerms);
      
      console.log('找到相似商品:', similarProducts.length);
      
      // 如果沒有找到相似商品，嘗試按類別搜尋
      if (similarProducts.length === 0) {
        console.log('沒有找到相似商品，使用預設數據');
        const allProducts = await beautyDataService.getBeautyProducts();
        const fallbackProducts = allProducts.slice(0, 5); // 取前5個作為範例
        setResults(fallbackProducts);
        
        toast({
          title: "分析完成",
          description: `使用系統數據庫中的範例商品進行分析`,
        });
      } else {
        setResults(similarProducts);
        toast({
          title: "分析完成", 
          description: `找到 ${similarProducts.length} 個相似商品`,
        });
      }
      
      // 計算基準指標
      const baselineMetrics = await beautyDataService.calculateBaselineMetrics();
      console.log('基準指標:', baselineMetrics);
      
      const productData = {
        name: productName,
        description: productDescription,
        similarProducts: similarProducts.length > 0 ? similarProducts : await beautyDataService.getBeautyProducts(),
        baselineMetrics
      };
      
      onComplete(productData);
      
    } catch (error) {
      console.error('分析失敗:', error);
      toast({
        title: "分析失敗",
        description: "系統發生錯誤，請稍後重試",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 將 Supabase 數據轉換為圖表格式
  const generateChartData = (products: BeautyProduct[]) => {
    return products.map((product, index) => ({
      name: product.product_name.length > 15 
        ? product.product_name.substring(0, 15) + '...' 
        : product.product_name,
      銷售量: product.sales_velocity,
      利潤率: product.profit_margin,
      生命週期: product.life_cycle_months,
      價格: product.price
    }));
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

      {results && results.length > 0 && (
        <div className="space-y-8">
          <SimilarProductsAnalysis results={results} />
          <SalesPerformanceChart data={generateChartData(results)} />
          <AnalysisCompleteCard onProceed={onProceed} />
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
