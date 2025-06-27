
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Heart, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-subtle border-b border-rose-200/30 py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Enhanced left side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
            <Star className="h-5 w-5 text-amber-500 animate-pulse" />
            <span className="text-rose-700 font-medium text-sm">
              AI預測助您搶占市場先機
            </span>
          </div>
        </div>

        {/* Enhanced right side with consistent button styling */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-100/60 font-medium focus-ring transition-all duration-200"
          >
            <Heart className="h-4 w-4 mr-2" />
            免費試用
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/system-design')}
            className="btn-secondary border-amber-300/60 text-amber-700 hover:bg-amber-50/80 font-medium focus-ring"
          >
            <Rocket className="h-4 w-4 mr-2" />
            了解更多
          </Button>
          
          <Button
            size="sm"
            onClick={() => navigate('/product-evaluation')}
            className="btn-primary focus-ring"
          >
            立即開始
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
