
import { useState } from 'react';
import { beautyDataService, BeautyProduct } from '@/services/beautyDataService';
import { useToast } from '@/hooks/use-toast';

export const useProductAnalysis = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<BeautyProduct[] | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (onComplete: (data: any) => void) => {
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

  return {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    isAnalyzing,
    results,
    handleAnalyze
  };
};
