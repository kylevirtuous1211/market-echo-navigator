
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductInputForm from './ProductInputForm';
import SimilarProductsAnalysis from './SimilarProductsAnalysis';
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

  // 計算動態相似度的函數
  const calculateDynamicSimilarity = (searchTerm: string, product: BeautyProduct): number => {
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    let score = 0;
    
    // 產品名稱匹配
    const nameWords = product.product_name.toLowerCase().split(/\s+/);
    const nameMatches = searchWords.filter(word => 
      nameWords.some(nameWord => nameWord.includes(word) || word.includes(nameWord))
    ).length;
    score += (nameMatches / searchWords.length) * 0.4;
    
    // 描述匹配
    if (product.description) {
      const descWords = product.description.toLowerCase().split(/\s+/);
      const descMatches = searchWords.filter(word => 
        descWords.some(descWord => descWord.includes(word) || word.includes(descWord))
      ).length;
      score += (descMatches / searchWords.length) * 0.3;
    }
    
    // 類別匹配
    if (product.category) {
      const categoryWords = product.category.toLowerCase().split(/\s+/);
      const categoryMatches = searchWords.filter(word => 
        categoryWords.some(catWord => catWord.includes(word) || word.includes(catWord))
      ).length;
      score += (categoryMatches / searchWords.length) * 0.2;
    }
    
    // 品牌匹配
    const brandWords = product.brand.toLowerCase().split(/\s+/);
    const brandMatches = searchWords.filter(word => 
      brandWords.some(brandWord => brandWord.includes(word) || word.includes(brandWord))
    ).length;
    score += (brandMatches / searchWords.length) * 0.1;
    
    return Math.max(0.6, Math.min(score + 0.5, 0.98)); // 確保相似度在合理範圍內
  };

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
      console.log('產品描述:', productDescription);
      
      // 使用產品名稱和描述搜尋相似商品
      const searchTerms = [productName, productDescription].filter(Boolean).join(' ');
      const similarProducts = await beautyDataService.searchSimilarProducts(searchTerms);
      
      console.log('找到相似商品:', similarProducts.length);
      
      if (similarProducts.length === 0) {
        // 如果沒有找到任何相似商品，取得一些範例商品
        console.log('沒有找到相似商品，使用範例數據');
        const allProducts = await beautyDataService.getBeautyProducts();
        const fallbackProducts = allProducts.slice(0, 6);
        setResults(fallbackProducts);
        
        toast({
          title: "分析完成",
          description: `使用系統數據庫中的範例商品進行分析，共 ${fallbackProducts.length} 個商品`,
        });
      } else {
        setResults(similarProducts);
        toast({
          title: "分析完成", 
          description: `找到 ${similarProducts.length} 個相似商品進行分析`,
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

  // 將 BeautyProduct 轉換為 SimilarProduct 格式，使用動態計算
  const convertToSimilarProducts = (products: BeautyProduct[]): SimilarProduct[] => {
    const searchTerms = [productName, productDescription].filter(Boolean).join(' ');
    
    return products.map((product) => ({
      name: product.product_name,
      similarity: calculateDynamicSimilarity(searchTerms, product),
      salesVelocity: product.sales_velocity,
      lifeCycle: Math.floor(12 + Math.random() * 12), // 12-24個月的隨機生命週期
      profit: product.profit_margin,
      category: product.category || product.brand
    }));
  };

  // 將 BeautyProduct 數據轉換為圖表格式，使用動態數據
  const generateChartData = (products: BeautyProduct[]): ChartDataPoint[] => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
    
    return months.map((month, index) => {
      const chartPoint: ChartDataPoint = {
        month,
        經典牛仔夾克: 0,
        休閒丹寧外套: 0,
        復古牛仔上衣: 0
      };

      // 根據實際產品數據生成動態的月度銷售數據
      if (products.length > 0) {
        const seasonalFactor = 0.8 + (Math.sin((index / 6) * Math.PI) * 0.4);
        chartPoint.經典牛仔夾克 = Math.floor(products[0]?.sales_velocity * seasonalFactor * (0.9 + Math.random() * 0.2));
      }
      if (products.length > 1) {
        const seasonalFactor = 0.7 + (Math.cos((index / 6) * Math.PI) * 0.3);
        chartPoint.休閒丹寧外套 = Math.floor(products[1]?.sales_velocity * seasonalFactor * (0.8 + Math.random() * 0.3));
      }
      if (products.length > 2) {
        const seasonalFactor = 0.6 + (Math.sin((index / 6) * Math.PI * 1.5) * 0.4);
        chartPoint.復古牛仔上衣 = Math.floor(products[2]?.sales_velocity * seasonalFactor * (0.7 + Math.random() * 0.4));
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
          <AnalysisCompleteCard onProceed={onProceed} />
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
