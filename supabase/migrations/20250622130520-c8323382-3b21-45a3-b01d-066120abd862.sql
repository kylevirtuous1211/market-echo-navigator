
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
CREATE INDEX idx_beauty_products_category ON public.beauty_products_history(category);
CREATE INDEX idx_beauty_products_brand ON public.beauty_products_history(brand);
CREATE INDEX idx_beauty_sentiment_keyword ON public.beauty_sentiment_analysis(keyword);
CREATE INDEX idx_beauty_sentiment_date ON public.beauty_sentiment_analysis(analysis_date);
CREATE INDEX idx_beauty_simulations_product ON public.beauty_agent_simulations(product_name);
CREATE INDEX idx_beauty_simulations_date ON public.beauty_agent_simulations(simulation_date);

-- 美妝商品歷史數據種子數據
INSERT INTO public.beauty_products_history (
  product_name, brand, category, subcategory, description, price, cost, 
  sales_velocity, life_cycle_months, profit_margin, inventory_level, 
  launch_date, target_age_group, skin_type, ingredients, certifications, packaging_type
) VALUES 
(
  '玻尿酸保濕精華液', 'BeautyLux', '面部護理', '精華液',
  '高濃度玻尿酸保濕精華，深層補水鎖水，適合所有膚質',
  1280.00, 384.00, 150, 18, 70.00, 89,
  '2024-01-15', '25-40', '所有膚質',
  '["玻尿酸", "維生素B5", "甘油"]'::jsonb,
  ARRAY['無動物測試', '天然成分'],
  '玻璃瓶裝'
),
(
  '維他命C亮白面膜', 'GlowUp', '面部護理', '面膜',
  '含15%維他命C，快速亮白提亮膚色，一週見效',
  890.00, 267.00, 220, 12, 70.00, 156,
  '2024-02-01', '20-35', '暗沉膚質',
  '["維他命C", "熊果素", "煙醯胺"]'::jsonb,
  ARRAY['有機認證', '無動物測試'],
  '鋁箔包裝'
),
(
  '絲滑霧面唇膏', 'LipLuxe', '彩妝', '唇彩',
  '絲滑質地霧面唇膏，持久不脫色，多種時尚色號',
  650.00, 195.00, 300, 24, 70.00, 234,
  '2023-11-20', '18-30', '所有膚質',
  '["維生素E", "荷荷巴油", "蠟質"]'::jsonb,
  ARRAY['無動物測試'],
  '金屬管裝'
),
(
  '抗老緊緻眼霜', 'AgeDefense', '面部護理', '眼部護理',
  '胜肽抗老配方，緊緻眼周肌膚，淡化細紋',
  1680.00, 504.00, 95, 20, 70.00, 67,
  '2024-03-10', '30-50', '成熟膚質',
  '["胜肽", "視黃醇", "咖啡因"]'::jsonb,
  ARRAY['皮膚科測試', '無動物測試'],
  '氣密泵頭'
),
(
  '天然有機洗面乳', 'PureNature', '面部護理', '潔面',
  '100%天然有機成分，溫和潔淨不緊繃',
  480.00, 144.00, 180, 15, 70.00, 123,
  '2024-01-05', '18-45', '敏感膚質',
  '["蘆薈", "洋甘菊", "椰子油"]'::jsonb,
  ARRAY['有機認證', '無動物測試', '素食友善'],
  '環保軟管'
),
(
  '24小時持妝粉底液', 'StayPerfect', '彩妝', '底妝',
  '24小時持妝不脫妝，自然遮瑕，多色號選擇',
  980.00, 294.00, 240, 18, 70.00, 178,
  '2023-12-15', '20-40', '所有膚質',
  '["透明質酸", "SPF30", "維生素E"]'::jsonb,
  ARRAY['無動物測試'],
  '玻璃瓶裝泵頭'
),
(
  '深層清潔黑頭面膜', 'PorePure', '面部護理', '面膜',
  '竹炭深層清潔，有效去除黑頭粉刺',
  320.00, 96.00, 280, 10, 70.00, 201,
  '2024-02-20', '16-30', '油性膚質',
  '["竹炭", "茶樹精油", "水楊酸"]'::jsonb,
  ARRAY['無動物測試'],
  '單片裝'
),
(
  '奢華香水', 'Elegance', '香水', '女性香水',
  '法式奢華香水，花香調，優雅持久',
  2800.00, 840.00, 65, 36, 70.00, 45,
  '2023-10-01', '25-45', '所有膚質',
  '["茉莉花", "玫瑰", "麝香"]'::jsonb,
  ARRAY['法國製造'],
  '水晶瓶裝'
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
