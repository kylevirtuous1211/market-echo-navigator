
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductInputForm from './ProductInputForm';
import SimilarProductsAnalysis from './SimilarProductsAnalysis';
import SalesPerformanceChart from './SalesPerformanceChart';
import AnalysisCompleteCard from './AnalysisCompleteCard';
import { ProductEvaluationProps, SimilarProduct, ChartDataPoint } from '@/types/productEvaluation';
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

  // 將 BeautyProduct 轉換為 SimilarProduct 格式
  const convertToSimilarProducts = (products: BeautyProduct[]): SimilarProduct[] => {
    return products.map((product) => ({
      name: product.product_name,
      similarity: 0.85, // 預設相似度，實際應用中可以基於搜尋演算法計算
      salesVelocity: product.sales_velocity,
      lifeCycle: product.life_cycle_months,
      profit: product.profit_margin,
      category: product.category
    }));
  };

  // 將 BeautyProduct 數據轉換為圖表格式
  const generateChartData = (products: BeautyProduct[]): ChartDataPoint[] => {
    // 創建月份數據，每個產品作為一個系列
    const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
    
    return months.map((month, index) => {
      const chartPoint: ChartDataPoint = {
        month,
        經典牛仔夾克: 0,
        休閒丹寧外套: 0,
        復古牛仔上衣: 0
      };

      // 根據產品數據生成模擬的月度銷售數據
      if (products.length > 0) {
        chartPoint.經典牛仔夾克 = Math.floor(products[0]?.sales_velocity * (0.8 + Math.random() * 0.4)) || 100;
      }
      if (products.length > 1) {
        chartPoint.休閒丹寧外套 = Math.floor(products[1]?.sales_velocity * (0.8 + Math.random() * 0.4)) || 80;
      }
      if (products.length > 2) {
        chartPoint.復古牛仔上衣 = Math.floor(products[2]?.sales_velocity * (0.8 + Math.random() * 0.4)) || 60;
      }

      return chartPoint;
    });
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
          <SimilarProductsAnalysis results={convertToSimilarProducts(results)} />
          <SalesPerformanceChart data={generateChartData(results)} />
          <AnalysisCompleteCard onProceed={onProceed} />
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
