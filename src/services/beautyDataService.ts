
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

export const beautyDataService = {
  // 獲取美妝商品歷史數據
  // ✅ Fixed: Only select existing columns
  async getBeautyProducts(): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('id, product_name, brand, description, price, cost, sales_velocity, profit_margin, inventory_level')
      .order('sales_velocity', { ascending: false });

    if (error) {
      console.error('Error fetching beauty products:', error);
      throw error;
    }

    return data || [];
  },

  // 根據品牌獲取商品
  async getProductsByBrand(brand: string): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('*')
      .eq('brand', brand)
      .order('sales_velocity', { ascending: false });

    if (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }

    return data || [];
  },

  // 根據類別獲取商品
  async getProductsByCategory(category: string): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('*')
      .eq('category', category)
      .order('profit_margin', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }

    return data || [];
  },

  // 搜尋相似商品 (基於產品名稱和描述)
  async searchSimilarProducts(searchTerm: string): Promise<BeautyProduct[]> {
    const { data, error } = await supabase
      .from('beauty_products_history')
      .select('*')
      .or(`product_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('sales_velocity', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error searching similar products:', error);
      throw error;
    }

    return data || [];
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
      .select('sales_velocity, life_cycle_months, profit_margin');

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
        avgLifeCycle: 0,
        avgProfit: 0
      };
    }

    const avgSalesVelocity = data.reduce((sum, p) => sum + p.sales_velocity, 0) / data.length;
    const avgLifeCycle = data.reduce((sum, p) => sum + p.life_cycle_months, 0) / data.length;
    const avgProfit = data.reduce((sum, p) => sum + p.profit_margin, 0) / data.length;

    return {
      avgSalesVelocity: Math.round(avgSalesVelocity),
      avgLifeCycle: Math.round(avgLifeCycle),
      avgProfit: Math.round(avgProfit * 100) / 100
    };
  }
};
