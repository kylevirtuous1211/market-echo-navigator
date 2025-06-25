
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, ArrowRight } from 'lucide-react';

interface DemandSummaryProps {
  onProceed: () => void;
  customerResults?: any[];
}

const DemandSummary: React.FC<DemandSummaryProps> = ({ onProceed, customerResults }) => {
  // Calculate averages from customer results
  const avgPurchaseIntent = customerResults && customerResults.length > 0 
    ? Math.round(customerResults.reduce((sum, customer) => sum + customer.purchaseIntention, 0) / customerResults.length)
    : 67.5;
    
  const avgPriceSensitivity = customerResults && customerResults.length > 0
    ? Math.round(customerResults.reduce((sum, customer) => sum + customer.priceSensitivity, 0) / customerResults.length)
    : 51.3;

  return (
    <Card className="card-glass shadow-warm border border-emerald-200/50">
      <CardHeader>
        <CardTitle className="text-emerald-600">動態需求預測總結</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <Users className="h-10 w-10 text-blue-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-700">{avgPurchaseIntent}%</p>
            <p className="text-sm text-emerald-600/80">平均購買意願</p>
          </div>
          <div className="text-center">
            <Heart className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-700">{avgPriceSensitivity}%</p>
            <p className="text-sm text-emerald-600/80">平均價格敏感度</p>
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
