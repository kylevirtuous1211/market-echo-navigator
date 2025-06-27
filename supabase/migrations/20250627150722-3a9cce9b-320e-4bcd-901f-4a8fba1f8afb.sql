
-- 修正版本：擴充美妝商品歷史數據表，加入服飾和代購商品類別

-- 服飾類商品數據
INSERT INTO public.beauty_products_history (
  product_name, brand, category, subcategory, description, price, cost, 
  sales_velocity, life_cycle_months, profit_margin, inventory_level, launch_date, 
  seasonal_factor, target_age_group, skin_type, ingredients, certifications, packaging_type
) VALUES 
-- 上衣類
('韓系寬鬆針織上衣', 'StyleCo', '服飾', '上衣', '韓國風格寬鬆版型針織上衣，舒適透氣材質', 890.00, 267.00, 180, 12, 70.00, 125, '2024-03-01', 1.2, '18-30', '所有膚質', '["聚酯纖維", "棉質"]', ARRAY['環保材質'], '塑膠包裝'),
('棉質基本款T恤', 'BasicWear', '服飾', '上衣', '100%純棉基本款T恤，多色可選', 450.00, 135.00, 320, 18, 70.00, 280, '2024-01-15', 1.0, '16-40', '所有膚質', '["純棉"]', ARRAY['有機棉認證'], '紙盒包裝'),
('雪紡飄逸襯衫', 'ElegantStyle', '服飾', '上衣', '輕盈雪紡材質，適合正式場合', 1200.00, 360.00, 145, 15, 70.00, 89, '2024-02-20', 0.8, '25-45', '所有膚質', '["聚酯纖維", "雪紡"]', ARRAY['無動物測試'], '掛袋包裝'),

-- 外套類
('防風機能外套', 'OutdoorPro', '服飾', '外套', '防水防風機能外套，適合戶外活動', 2500.00, 750.00, 95, 24, 70.00, 56, '2023-10-01', 1.5, '20-40', '所有膚質', '["尼龍", "防水塗層"]', ARRAY['防水認證'], '收納袋'),
('羊毛大衣', 'WinterWarm', '服飾', '外套', '經典羊毛大衣，保暖時尚', 3500.00, 1050.00, 65, 36, 70.00, 34, '2023-11-15', 2.0, '25-50', '所有膚質', '["羊毛", "聚酯纖維"]', ARRAY['無動物測試'], '防塵袋'),
('牛仔夾克', 'DenimStyle', '服飾', '外套', '經典牛仔夾克，百搭款式', 1800.00, 540.00, 120, 24, 70.00, 78, '2024-01-10', 1.0, '18-35', '所有膚質', '["純棉", "彈性纖維"]', ARRAY['環保染料'], '紙盒包裝'),

-- 鞋子類
('運動休閒鞋', 'SportFit', '服飾', '鞋子', '透氣運動鞋，適合日常穿著', 2200.00, 660.00, 200, 18, 70.00, 145, '2024-02-01', 1.0, '16-40', '所有膚質', '["合成皮革", "橡膠"]', ARRAY['環保材質'], '鞋盒'),
('高跟鞋', 'ElegantStep', '服飾', '鞋子', '經典高跟鞋，適合正式場合', 2800.00, 840.00, 85, 24, 70.00, 67, '2024-01-20', 0.7, '22-45', '所有膚質', '["真皮", "橡膠底"]', ARRAY['手工製作'], '防塵袋'),
('帆布鞋', 'CasualWalk', '服飾', '鞋子', '經典帆布鞋，舒適百搭', 1200.00, 360.00, 250, 18, 70.00, 189, '2023-12-01', 1.0, '14-30', '所有膚質', '["帆布", "橡膠"]', ARRAY['環保材質'], '鞋盒');

-- 代購商品類別數據
INSERT INTO public.beauty_products_history (
  product_name, brand, category, subcategory, description, price, cost, 
  sales_velocity, life_cycle_months, profit_margin, inventory_level, launch_date, 
  seasonal_factor, target_age_group, skin_type, ingredients, certifications, packaging_type
) VALUES 
-- 零食類
('日本Kit Kat抹茶味', 'Nestle', '代購商品', '零食', '日本限定抹茶口味Kit Kat巧克力', 180.00, 54.00, 350, 6, 70.00, 280, '2024-04-01', 1.0, '12-40', '所有膚質', '["可可", "抹茶粉", "牛奶"]', ARRAY['日本製造'], '包裝盒'),
('韓國海苔酥', 'SeaweedCrunch', '代購商品', '零食', '韓國人氣海苔酥脆餅乾', 250.00, 75.00, 280, 8, 70.00, 220, '2024-03-15', 1.0, '16-35', '所有膚質', '["海苔", "米", "芝麻"]', ARRAY['韓國製造'], '密封包裝'),
('泰國榴槤乾', 'TropicalFruit', '代購商品', '零食', '泰國進口榴槤乾，濃郁香甜', 420.00, 126.00, 150, 12, 70.00, 95, '2024-02-10', 1.0, '20-50', '所有膚質', '["榴槤", "糖"]', ARRAY['泰國製造'], '真空包裝'),

-- 茶包類
('英國伯爵茶包', 'Twinings', '代購商品', '茶包', '經典英國伯爵茶，佛手柑香味', 320.00, 96.00, 220, 24, 70.00, 156, '2024-01-05', 1.0, '25-60', '所有膚質', '["紅茶", "佛手柑精油"]', ARRAY['英國製造'], '茶盒包裝'),
('日本抹茶粉', 'Ito En', '代購商品', '茶包', '日本宇治抹茶粉，茶道等級', 680.00, 204.00, 120, 18, 70.00, 78, '2024-02-20', 1.0, '20-50', '所有膚質', '["抹茶"]', ARRAY['日本宇治產'], '密封罐裝'),
('台灣高山烏龍茶', 'MountainTea', '代購商品', '茶包', '台灣阿里山高山烏龍茶葉', 850.00, 255.00, 95, 24, 70.00, 45, '2024-01-25', 1.0, '30-65', '所有膚質', '["烏龍茶葉"]', ARRAY['台灣製造'], '茶葉罐'),

-- 保健品類
('日本膠原蛋白粉', 'CollagenPlus', '代購商品', '保健品', '日本進口膠原蛋白粉，美容保健', 1500.00, 450.00, 180, 12, 70.00, 89, '2024-03-01', 1.0, '25-55', '所有膚質', '["膠原蛋白", "維生素C"]', ARRAY['日本製造', 'GMP認證'], '密封罐裝'),
('澳洲蜂膠膠囊', 'HoneyHealth', '代購商品', '保健品', '澳洲天然蜂膠膠囊，增強免疫力', 1200.00, 360.00, 125, 18, 70.00, 67, '2024-01-15', 1.0, '30-65', '所有膚質', '["蜂膠", "維生素E"]', ARRAY['澳洲製造', 'TGA認證'], '瓶裝'),
('韓國紅蔘精', 'GinsengPower', '代購商品', '保健品', '韓國6年根紅蔘精華，滋補養生', 2200.00, 660.00, 90, 24, 70.00, 45, '2024-02-05', 1.2, '35-70', '所有膚質', '["紅蔘", "蜂蜜"]', ARRAY['韓國製造', 'KGC認證'], '禮盒包裝'),
('美國維生素D3', 'VitaBoost', '代購商品', '保健品', '美國進口高劑量維生素D3軟膠囊', 680.00, 204.00, 200, 18, 70.00, 134, '2024-01-10', 1.0, '20-60', '所有膚質', '["維生素D3", "橄欖油"]', ARRAY['美國FDA認證'], '瓶裝');

-- 為新類別添加相關的輿情分析數據
INSERT INTO public.beauty_sentiment_analysis (
  keyword, brand, product_category, sentiment_score, sentiment_label, 
  mention_count, source, analysis_date, trending_score, hashtags, influencer_mentions
) VALUES 
-- 服飾相關輿情
('韓系上衣', 'StyleCo', '服飾', 0.82, 'positive', 850, 'Instagram', '2024-03-05', 8.2, ARRAY['#韓系', '#上衣', '#穿搭'], 23),
('運動鞋', 'SportFit', '服飾', 0.78, 'positive', 1200, 'TikTok', '2024-02-15', 9.1, ARRAY['#運動鞋', '#穿搭', '#舒適'], 35),
('牛仔外套', 'DenimStyle', '服飾', 0.75, 'positive', 680, 'YouTube', '2024-01-20', 7.8, ARRAY['#牛仔', '#外套', '#經典'], 18),

-- 代購商品相關輿情
('Kit Kat抹茶', 'Nestle', '代購商品', 0.88, 'positive', 1500, 'Instagram', '2024-04-05', 9.5, ARRAY['#KitKat', '#抹茶', '#日本零食'], 42),
('膠原蛋白', 'CollagenPlus', '代購商品', 0.85, 'positive', 950, 'Blog', '2024-03-10', 8.8, ARRAY['#膠原蛋白', '#美容', '#保健'], 28),
('伯爵茶', 'Twinings', '代購商品', 0.80, 'positive', 420, 'Review Site', '2024-01-15', 7.2, ARRAY['#伯爵茶', '#英國茶', '#下午茶'], 15);

-- 為新類別添加代理人模擬數據
INSERT INTO public.beauty_agent_simulations (
  simulation_id, product_name, agent_name, agent_type, agent_demographics, 
  agent_motivations, agent_concerns, purchase_intent, price_sensitivity, 
  brand_loyalty, response_text, feedback_categories, recommendations, risk_factors
) VALUES 
-- 服飾類代理人模擬
('SIM-FASHION-001', '韓系寬鬆針織上衣', '時尚小雅', 'fashion_enthusiast', 
'{"age": 25, "gender": "female", "income": "middle", "location": "台北"}',
'追求時尚潮流，喜歡韓系風格', '擔心材質品質和尺寸問題',
0.85, 0.65, 0.70, '這件上衣的韓系設計很吸引我，寬鬆版型很舒適，但希望能有更多顏色選擇。',
'{"design": "excellent", "comfort": "very_good", "price": "reasonable"}',
'{"marketing": ["Instagram廣告", "KOL合作"], "improvements": ["增加顏色選項", "提供尺寸指南"]}',
ARRAY['尺寸不合', '材質過敏']),

('SIM-FASHION-002', '運動休閒鞋', '健身達人小明', 'sports_enthusiast',
'{"age": 30, "gender": "male", "income": "high", "location": "台中"}',
'注重運動功能性和舒適度', '關心鞋子的耐用性和支撐性',
0.78, 0.55, 0.60, '作為經常運動的人，我很重視鞋子的功能性。這雙鞋的透氣性不錯，但希望有更好的足弓支撐。',
'{"functionality": "good", "durability": "good", "comfort": "very_good"}',
'{"marketing": ["運動部落格", "健身房合作"], "improvements": ["加強足弓支撐", "提供專業運動測試報告"]}',
ARRAY['功能不足', '耐用性問題']),

-- 代購商品類代理人模擬
('SIM-DAIGOU-001', '日本Kit Kat抹茶味', '零食愛好者小美', 'snack_lover',
'{"age": 22, "gender": "female", "income": "low", "location": "高雄"}',
'喜歡嘗試各國特色零食', '擔心價格過高和保存期限',
0.92, 0.80, 0.45, '日本限定的抹茶口味真的很特別！雖然價格比台灣的Kit Kat貴一些，但偶爾買來嘗鮮很值得。',
'{"taste": "excellent", "uniqueness": "excellent", "price": "expensive"}',
'{"marketing": ["社群媒體分享", "限時優惠"], "improvements": ["組合包優惠", "保存期限標示"]}',
ARRAY['價格敏感', '保存期限短']),

('SIM-DAIGOU-002', '日本膠原蛋白粉', '保健意識媽媽', 'health_conscious',
'{"age": 40, "gender": "female", "income": "middle", "location": "新北"}',
'重視家人健康和美容保養', '關心產品安全性和效果',
0.88, 0.60, 0.75, '對於膠原蛋白的美容效果很期待，日本製造讓我比較放心。希望能有更詳細的成分說明和使用指導。',
'{"safety": "very_good", "effectiveness": "good", "trust": "excellent"}',
'{"marketing": ["健康講座", "醫師推薦"], "improvements": ["詳細成分標示", "使用指南", "效果見證"]}',
ARRAY['效果不明顯', '成分過敏']);
