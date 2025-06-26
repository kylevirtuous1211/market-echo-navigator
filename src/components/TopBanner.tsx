
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Heart, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-accent border-b border-rose-200/30 py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Value proposition */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <span className="text-rose-700 font-medium text-sm">
              AI預測助您搶占市場先機
            </span>
          </div>
        </div>

        {/* Right side - CTA buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-100/50 font-medium"
          >
            <Heart className="h-4 w-4 mr-1" />
            免費試用
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/system-design')}
            className="border-amber-300 text-amber-700 hover:bg-amber-50 font-medium"
          >
            <Rocket className="h-4 w-4 mr-1" />
            了解更多
          </Button>
          
          <Button
            size="sm"
            onClick={() => navigate('/product-evaluation')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium shadow-sm"
          >
            立即開始
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
