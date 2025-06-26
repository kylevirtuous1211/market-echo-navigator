
import { BeautyProduct } from '@/services/beautyDataService';
import { SimilarProduct, ChartDataPoint } from '@/types/productEvaluation';

// 計算動態相似度的函數
export const calculateDynamicSimilarity = (searchTerm: string, product: BeautyProduct): number => {
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

// 將 BeautyProduct 轉換為 SimilarProduct 格式，使用動態計算
export const convertToSimilarProducts = (products: BeautyProduct[], searchTerms: string): SimilarProduct[] => {
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
export const generateChartData = (products: BeautyProduct[]): ChartDataPoint[] => {
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
