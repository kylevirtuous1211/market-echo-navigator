
-- 歷史數據模組 (Database History Module) - 模擬 Shopify 美妝商品數據
CREATE TABLE public.beauty_products_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL, -- 例如：面部護理、彩妝、香水、身體護理
  subcategory TEXT, -- 例如：精華液、口紅、眼影、面膜
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  sales_velocity INTEGER NOT NULL, -- 每月銷售量
  life_cycle_months INTEGER NOT NULL, -- 生命週期（月）
  profit_margin DECIMAL(5,2) NOT NULL, -- 利潤率百分比
  inventory_level INTEGER DEFAULT 0,
  launch_date DATE,
  seasonal_factor DECIMAL(3,2) DEFAULT 1.0, -- 季節性因子
  target_age_group TEXT, -- 例如：18-25, 26-35, 36-45
  skin_type TEXT, -- 例如：油性、乾性、混合性、敏感性
  ingredients JSONB, -- 主要成分清單
  certifications TEXT[], -- 例如：有機認證、無動物測試
  packaging_type TEXT, -- 包裝類型
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 輿情分析模組 (Web Search Module) - 靜態輿情情感數據
CREATE TABLE public.beauty_sentiment_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  brand TEXT,
  product_category TEXT,
  sentiment_score DECIMAL(4,2) NOT NULL, -- -1.0 到 1.0 之間
  sentiment_label TEXT NOT NULL, -- positive, negative, neutral
  mention_count INTEGER DEFAULT 1,
  source TEXT NOT NULL, -- Instagram, TikTok, YouTube, Blog, Review Site
  analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
  trending_score DECIMAL(4,2) DEFAULT 0.0, -- 趨勢熱度分數
  demographic_data JSONB, -- 人口統計數據
  regional_data JSONB, -- 地區數據
  hashtags TEXT[], -- 相關標籤
  influencer_mentions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 多智能體模擬模組 (Multi-Agent Sim Module) - 模擬結果數據
CREATE TABLE public.beauty_agent_simulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  simulation_id TEXT NOT NULL, -- 模擬批次 ID
  product_name TEXT NOT NULL,
  agent_name TEXT NOT NULL, -- 代理人名稱
  agent_type TEXT NOT NULL, -- 例如：beauty_enthusiast, budget_conscious, skincare_expert
  agent_demographics JSONB NOT NULL, -- 代理人人口統計資料
  agent_motivations TEXT NOT NULL,
  agent_concerns TEXT NOT NULL,
  purchase_intent DECIMAL(4,2) NOT NULL, -- 購買意願 0.0-1.0
  price_sensitivity DECIMAL(4,2) NOT NULL, -- 價格敏感度
  brand_loyalty DECIMAL(4,2) NOT NULL, -- 品牌忠誠度
  response_text TEXT NOT NULL, -- 代理人回應內容
  feedback_categories JSONB, -- 反饋分類
  recommendations JSONB, -- 建議內容
  risk_factors TEXT[],
  simulation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 綜合分析結果表 (用於存儲最終分析結果)
CREATE TABLE public.beauty_analysis_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  analysis_type TEXT NOT NULL, -- evaluation, demand_prediction, market_trends
  total_demand INTEGER,
  overall_intent DECIMAL(4,2),
  optimal_price_min DECIMAL(10,2),
  optimal_price_max DECIMAL(10,2),
  target_segments TEXT[],
  marketing_channels TEXT[],
  risk_factors TEXT[],
  restock_recommendation_min INTEGER,
  restock_recommendation_max INTEGER,
  success_probability DECIMAL(4,2),
  analysis_data JSONB, -- 完整分析數據
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 建立索引以提升查詢效能
CREATE INDEX idx_beauty_products_brand ON public.beauty_products_history(brand);
CREATE INDEX idx_beauty_sentiment_keyword ON public.beauty_sentiment_analysis(keyword);
CREATE INDEX idx_beauty_sentiment_date ON public.beauty_sentiment_analysis(analysis_date);
CREATE INDEX idx_beauty_simulations_product ON public.beauty_agent_simulations(product_name);
CREATE INDEX idx_beauty_simulations_date ON public.beauty_agent_simulations(simulation_date);

-- 美妝商品歷史數據種子數據 (excel 4色眼影盤相關商品)
INSERT INTO public.beauty_products_history (
  product_name, brand, description, price, cost, 
  sales_velocity, profit_margin, inventory_level
) VALUES 
(
  'excel 4色眼影盤 SR01 玫瑰棕', 'excel',
  '日系經典4色眼影盤，大地色系，顯色度適中，易於暈染打造自然眼妝',
  450.00, 135.00, 320, 70.00, 245
),
(
  'excel 4色眼影盤 SR02 珊瑚橘', 'excel',
  '溫暖珊瑚橘調4色眼影，適合春夏妝容，粉質細膩好暈染',
  450.00, 135.00, 280, 70.00, 198
),
(
  'Heme 6色眼影盤 大地色系', 'Heme',
  '6色眼影組合，提供更豐富色彩選擇，可創造多層次眼妝效果',
  380.00, 114.00, 250, 70.00, 167
),
(
  'Heme 修容盤 00號', 'Heme',
  '多色修容盤，可修飾臉部輪廓，打造立體小臉效果',
  320.00, 96.00, 180, 70.00, 134
),
(
  'excel 眼影刷具組', 'excel',
  '專業眼影刷具組，包含暈染刷、細節刷，完美搭配眼影盤使用',
  280.00, 84.00, 150, 70.00, 89
),
(
  'excel 眼線液筆 深棕色', 'excel',
  '防水眼線液筆，搭配眼影使用，打造完整眼妝',
  350.00, 105.00, 200, 70.00, 156
),
(
  'Canmake 腮紅膏 PW23', 'Canmake',
  '奶油質地腮紅膏，自然紅潤，與眼影搭配打造協調妝容',
  290.00, 87.00, 220, 70.00, 178
),
(
  'excel 眉粉盤 PD01', 'excel',
  '3色眉粉盤，可調配出最適合的眉色，與眼影色調完美搭配',
  420.00, 126.00, 190, 70.00, 123
);

-- 輿情分析靜態種子數據
INSERT INTO public.beauty_sentiment_analysis (
  keyword, brand, product_category, sentiment_score, sentiment_label, 
  mention_count, source, analysis_date, trending_score, hashtags, influencer_mentions
) VALUES 
(
  '玻尿酸精華', 'BeautyLux', '面部護理', 0.85, 'positive', 
  1250, 'Instagram', '2024-01-20', 8.5, 
  ARRAY['#保濕', '#玻尿酸', '#護膚'], 15
),
(
  '維他命C面膜', 'GlowUp', '面部護理', 0.78, 'positive', 
  890, 'TikTok', '2024-01-22', 9.2, 
  ARRAY['#美白', '#維他命C', '#面膜'], 28
),
(
  '霧面唇膏', 'LipLuxe', '彩妝', 0.92, 'positive', 
  2100, 'YouTube', '2024-01-25', 9.8, 
  ARRAY['#唇彩', '#霧面', '#持久'], 42
),
(
  '抗老眼霜', 'AgeDefense', '面部護理', 0.65, 'positive', 
  450, 'Blog', '2024-01-18', 6.8, 
  ARRAY['#抗老', '#眼霜', '#緊緻'], 8
),
(
  '有機洗面乳', 'PureNature', '面部護理', 0.88, 'positive', 
  650, 'Review Site', '2024-01-23', 7.5, 
  ARRAY['#有機', '#天然', '#敏感肌'], 12
);
