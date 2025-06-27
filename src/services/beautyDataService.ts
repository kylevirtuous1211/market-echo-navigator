
import { supabase } from "@/integrations/supabase/client";

export interface BeautyProduct {
  id: string;
  product_name: string;
  brand: string;
  description?: string;
  price: number;
  cost: number;
  sales_velocity: number;
  profit_margin: number;
  inventory_level?: number;
  category?: string;
  subcategory?: string;
  target_age_group?: string;
  skin_type?: string;
  ingredients?: string[];
}

export interface SentimentAnalysis {
  id: string;
  keyword: string;
  brand?: string;
  product_category?: string;
  sentiment_score: number;
  sentiment_label: string;
  mention_count?: number;
  source: string;
  analysis_date: string;
  trending_score?: number;
  hashtags?: string[];
  influencer_mentions?: number;
}

export interface AgentSimulation {
  id: string;
  simulation_id: string;
  product_name: string;
  agent_name: string;
  agent_type: string;
  agent_demographics: any;
  agent_motivations: string;
  agent_concerns: string;
  purchase_intent: number;
  price_sensitivity: number;
  brand_loyalty: number;
  response_text: string;
  feedback_categories?: any;
  recommendations?: any;
  risk_factors?: string[];
  simulation_date: string;
}

// Helper function to transform database results to BeautyProduct interface
const transformToBeautyProduct = (dbProduct: any): BeautyProduct => {
  return {
    id: dbProduct.id,
    product_name: dbProduct.product_name,
    brand: dbProduct.brand,
    description: dbProduct.description,
    price: dbProduct.price,
    cost: dbProduct.cost,
    sales_velocity: dbProduct.sales_velocity,
    profit_margin: dbProduct.profit_margin,
    inventory_level: dbProduct.inventory_level,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory,
    target_age_group: dbProduct.target_age_group,
    skin_type: dbProduct.skin_type,
    ingredients: Array.isArray(dbProduct.ingredients) ? dbProduct.ingredients : 
                 dbProduct.ingredients ? [dbProduct.ingredients] : undefined
  };
};

// 計算文字相似度的函數
const calculateTextSimilarity = (text1: string, text2: string): number => {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => 
    words2.some(w2 => w2.includes(word) || word.includes(w2))
  );
  
  const similarity = commonWords.length / Math.max(words1.length, words2.length);
  return Math.min(similarity * 2, 1); // 放大相似度並限制在1以內
};

// 根據關鍵字匹配分數
const calculateKeywordScore = (searchTerm: string, product: BeautyProduct): number => {
  const searchWords = searchTerm.toLowerCase().split(/\s+/);
  let score = 0;
  
  // 檢查產品名稱
  const nameScore = calculateTextSimilarity(searchTerm, product.product_name);
  score += nameScore * 0.4;
  
  // 檢查描述
  if (product.description) {
    const descScore = calculateTextSimilarity(searchTerm, product.description);
    score += descScore * 0.3;
  }
  
  // 檢查類別
  if (product.category) {
    const categoryScore = calculateTextSimilarity(searchTerm, product.category);
    score += categoryScore * 0.2;
  }
  
  // 檢查品牌
  const brandScore = calculateTextSimilarity(searchTerm, product.brand);
  score += brandScore * 0.1;
  
  return Math.min(score, 1);
};

export const beautyDataService = {
  // 獲取美妝商品歷史數據
  async getBeautyProducts(): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('id, product_name, brand, description, price, cost, sales_velocity, profit_margin, inventory_level, category, subcategory, target_age_group, skin_type, ingredients')
      .order('sales_velocity', { ascending: false });

    if (error) {
      console.error('Error fetching beauty products:', error);
      throw error;
    }

    return (data || []).map(transformToBeautyProduct);
  },

  // 根據品牌獲取商品
  async getProductsByBrand(brand: string): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('id, product_name, brand, description, price, cost, sales_velocity, profit_margin, inventory_level, category, subcategory, target_age_group, skin_type, ingredients')
      .eq('brand', brand)
      .order('sales_velocity', { ascending: false });

    if (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }

    return (data || []).map(transformToBeautyProduct);
  },

  // 根據類別獲取商品
  async getProductsByCategory(category: string): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('id, product_name, brand, description, price, cost, sales_velocity, profit_margin, inventory_level, category, subcategory, target_age_group, skin_type, ingredients')
      .eq('category', category)
      .order('profit_margin', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }

    return (data || []).map(transformToBeautyProduct);
  },

  // 搜尋相似商品 - 增強版本
  async searchSimilarProducts(searchTerm: string): Promise<BeautyProduct[]> {
    console.log('開始搜尋相似商品，搜尋詞：', searchTerm);
    
    // 首先嘗試基本的 ilike 搜尋
    const { data: basicResults, error } = await supabase
      .from('beauty_products_history')
      .select('id, product_name, brand, description, price, cost, sales_velocity, profit_margin, inventory_level, category, subcategory, target_age_group, skin_type, ingredients')
      .or(`product_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`)
      .order('sales_velocity', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error in basic search:', error);
    }

    let results = (basicResults || []).map(transformToBeautyProduct);
    console.log('基本搜尋結果數量：', results.length);

    // 如果基本搜尋結果少於5個，執行更廣泛的搜尋
    if (results.length < 5) {
      console.log('執行更廣泛的搜尋...');
      const { data: allProducts, error: allError } = await supabase
        .from('beauty_products_history')
        .select('id, product_name, brand, description, price, cost, sales_velocity, profit_margin, inventory_level, category, subcategory, target_age_group, skin_type, ingredients');

      if (allError) {
        console.error('Error fetching all products:', allError);
      } else if (allProducts) {
        // 轉換數據並使用語意相似度計算
        const transformedProducts = allProducts.map(transformToBeautyProduct);
        const scoredProducts = transformedProducts
          .map(product => ({
            ...product,
            similarity: calculateKeywordScore(searchTerm, product)
          }))
          .filter(product => product.similarity > 0.1) // 只保留有一定相似度的產品
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 10);

        console.log('語意搜尋結果數量：', scoredProducts.length);
        
        // 合併結果並去重
        const existingIds = new Set(results.map(p => p.id));
        const additionalResults = scoredProducts.filter(p => !existingIds.has(p.id));
        results = [...results, ...additionalResults].slice(0, 8);
      }
    }

    console.log('最終搜尋結果數量：', results.length);
    return results;
  },

  // 獲取輿情分析數據
  async getSentimentAnalysis(): Promise<SentimentAnalysis[]> {
    const { data, error } = await supabase
      .from('beauty_sentiment_analysis')
      .select('*')
      .order('trending_score', { ascending: false });

    if (error) {
      console.error('Error fetching sentiment analysis:', error);
      throw error;
    }

    return data || [];
  },

  // 根據關鍵字獲取輿情數據
  async getSentimentByKeyword(keyword: string): Promise<SentimentAnalysis[]> {
    const { data, error } = await supabase
      .from('beauty_sentiment_analysis')
      .select('*')
      .ilike('keyword', `%${keyword}%`)
      .order('sentiment_score', { ascending: false });

    if (error) {
      console.error('Error fetching sentiment by keyword:', error);
      throw error;
    }

    return data || [];
  },

  // 獲取代理人模擬數據
  async getAgentSimulations(productName?: string): Promise<AgentSimulation[]> {
    let query = supabase
      .from('beauty_agent_simulations')
      .select('*');

    if (productName) {
      query = query.eq('product_name', productName);
    }

    const { data, error } = await query
      .order('simulation_date', { ascending: false });

    if (error) {
      console.error('Error fetching agent simulations:', error);
      throw error;
    }

    return data || [];
  },

  // 計算基準指標
  async calculateBaselineMetrics(category?: string) {
    let query = supabase
      .from('beauty_products_history')
      .select('sales_velocity, profit_margin, life_cycle_months');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error calculating baseline metrics:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return {
        avgSalesVelocity: 0,
        avgProfit: 0,
        avgLifeCycle: 18 // 預設值
      };
    }

    const avgSalesVelocity = data.reduce((sum, p) => sum + p.sales_velocity, 0) / data.length;
    const avgProfit = data.reduce((sum, p) => sum + p.profit_margin, 0) / data.length;
    
    // 計算平均生命週期，過濾掉無效值
    const validLifeCycles = data
      .map(p => p.life_cycle_months)
      .filter(lc => lc && !isNaN(lc) && lc > 0);
    
    const avgLifeCycle = validLifeCycles.length > 0 
      ? validLifeCycles.reduce((sum, lc) => sum + lc, 0) / validLifeCycles.length
      : 18; // 如果沒有有效數據，使用預設值 18 個月

    return {
      avgSalesVelocity: Math.round(avgSalesVelocity),
      avgProfit: Math.round(avgProfit * 100) / 100,
      avgLifeCycle: Math.round(avgLifeCycle)
    };
  }
};
