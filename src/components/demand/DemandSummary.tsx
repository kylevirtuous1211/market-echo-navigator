
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Heart, ArrowRight } from 'lucide-react';

interface DemandSummaryProps {
  onProceed: () => void;
}

const DemandSummary: React.FC<DemandSummaryProps> = ({ onProceed }) => {
  return (
    <Card className="card-glass shadow-warm border border-emerald-200/50">
      <CardHeader>
        <CardTitle className="text-emerald-600">動態需求預測總結</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <DollarSign className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-700">2,475</p>
            <p className="text-sm text-emerald-600/80">預期首月總銷量 (件)</p>
          </div>
          <div className="text-center">
            <Users className="h-10 w-10 text-blue-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-700">67.5%</p>
            <p className="text-sm text-emerald-600/80">整體購買意願</p>
          </div>
          <div className="text-center">
            <Heart className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-700">35%</p>
            <p className="text-sm text-emerald-600/80">主力客群佔比</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 bg-emerald-50/70 rounded-xl border border-emerald-200/50">
          <div>
            <h3 className="text-xl font-bold text-emerald-700 mb-2">需求預測完成</h3>
            <p className="text-emerald-600/90 font-medium">
              虛擬顧客反應分析已完成，現在可以進行市場趨勢驗證以優化預測結果
            </p>
          </div>
          <Button 
            onClick={onProceed}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white border-0 py-3 px-6 text-lg font-medium flex items-center gap-2"
          >
            市場趨勢驗證
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandSummary;
