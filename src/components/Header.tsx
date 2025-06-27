
import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="gradient-primary relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-amber-400/20 to-pink-500/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-amber-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto section-padding relative z-10">
        <div className="text-center animate-fade-in">
          {/* Badge with enhanced styling */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 px-8 py-4 bg-white/25 rounded-full backdrop-blur-sm border border-white/30 shadow-warm">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
              <span className="text-white font-medium text-lg">AI 驅動智慧分析</span>
              <Heart className="h-5 w-5 text-rose-200 animate-pulse delay-300" />
            </div>
          </div>
          
          {/* Enhanced main heading */}
          <h1 className="text-6xl md:text-7xl font-display font-bold mb-8 text-white drop-shadow-lg animate-scale-in">
            智慧選品-選品輔助系統
          </h1>
          
          {/* Enhanced description with better typography */}
          <p className="text-xl md:text-2xl text-white/95 max-w-5xl mx-auto leading-relaxed drop-shadow-sm mb-12 animate-fade-in delay-300">
            結合 NLP 語意比對、虛擬顧客代理人訪查、市場趨勢的全方位分析系統
          </p>
          
          {/* Enhanced feature highlights */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in delay-500">
            <div className="flex items-center gap-3 text-white/90 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Star className="h-5 w-5 text-amber-200" />
              <span className="font-medium">創新技術</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Heart className="h-5 w-5 text-rose-200" />
              <span className="font-medium">友善體驗</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-pink-200" />
              <span className="font-medium">精準預測</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
