
import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-amber-400/20 to-pink-500/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-amber-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-pink-300/30 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-white font-medium">AI 驅動智慧分析</span>
              <Heart className="h-5 w-5 text-rose-200" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">
            智慧選品-選品輔助系統
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
            結合 NLP 語意比對、虛擬顧客代理人訪查、市場趨勢的全方位分析系統
          </p>
          <div className="flex justify gap-4 mt-8">
            <div className="flex items-center gap-2 text-white/80">
              <Star className="h-5 w-5 text-amber-200" />
              <span>創新技術</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Heart className="h-5 w-5 text-rose-200" />
              <span>友善體驗</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Sparkles className="h-5 w-5 text-pink-200" />
              <span>精準預測</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
