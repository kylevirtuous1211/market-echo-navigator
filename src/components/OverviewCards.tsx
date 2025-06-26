
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3 } from 'lucide-react';

const OverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <Card className="card-glass shadow-warm hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-rose-600 text-xl">
            <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
              <BarChart3 className="h-7 w-7 text-rose-500" />
            </div>
            NLP 語意比對
          </CardTitle>
          <CardDescription className="text-rose-600/70 text-base leading-relaxed">
            分析新品與歷史商品的相似度，提供基線預測
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="card-glass shadow-warm hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-amber-600 text-xl">
            <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
              <Users className="h-7 w-7 text-amber-500" />
            </div>
            虛擬顧客代理人
          </CardTitle>
          <CardDescription className="text-amber-600/70 text-base leading-relaxed">
            ABM 結合 LLM 模擬不同客群的購買行為
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="card-glass shadow-warm hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-pink-600 text-xl">
            <div className="p-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl">
              <TrendingUp className="h-7 w-7 text-pink-500" />
            </div>
            市場趨勢分析
          </CardTitle>
          <CardDescription className="text-pink-600/70 text-base leading-relaxed">
            使用 Glimpse API 整合 Google Trend數據源
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default OverviewCards;
