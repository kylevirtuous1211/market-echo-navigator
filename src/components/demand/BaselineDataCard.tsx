
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

interface BaselineDataCardProps {
  productData: any;
}

const BaselineDataCard: React.FC<BaselineDataCardProps> = ({ productData }) => {
  if (!productData) return null;

  return (
    <Card className="card-glass shadow-warm border border-rose-200/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-600">
          <Info className="h-6 w-6" />
          基線數據參考
        </CardTitle>
        <CardDescription className="text-rose-600/70 text-base">
          基於新品評估階段的歷史商品分析結果，以下為相似商品的平均表現指標
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-rose-600">
              {Math.round(productData.baselineMetrics.avgSalesVelocity)}
            </p>
            <p className="text-sm text-rose-600/70">平均銷售速度 (件/月)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">
              {Math.round(productData.baselineMetrics.avgLifeCycle)}
            </p>
            <p className="text-sm text-rose-600/70">平均生命週期 (月)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {productData.baselineMetrics.avgProfit.toFixed(1)}%
            </p>
            <p className="text-sm text-rose-600/70">平均利潤率</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaselineDataCard;
