
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface AnalysisCompleteCardProps {
  onProceed: () => void;
}

const AnalysisCompleteCard: React.FC<AnalysisCompleteCardProps> = ({ onProceed }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-emerald-600 mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              基線分析完成
            </h3>
            <p className="text-emerald-600/70 text-lg">
              已建立歷史商品基線數據，現在可以進行虛擬顧客代理人需求預測模擬
            </p>
          </div>
          <Button 
            onClick={onProceed}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 py-3 px-8 text-lg font-medium flex items-center gap-3 shadow-lg hover:shadow-glow transition-all duration-300"
          >
            進行需求預測
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisCompleteCard;
