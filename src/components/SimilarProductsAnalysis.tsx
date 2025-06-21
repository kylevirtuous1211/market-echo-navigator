
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, DollarSign, Heart } from 'lucide-react';
import { SimilarProduct } from '@/types/productEvaluation';

interface SimilarProductsAnalysisProps {
  results: SimilarProduct[];
}

const SimilarProductsAnalysis: React.FC<SimilarProductsAnalysisProps> = ({ results }) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="text-emerald-600 text-2xl flex items-center gap-2">
          <Heart className="h-6 w-6 text-emerald-500" />
          相似商品分析結果
        </CardTitle>
        <CardDescription className="text-emerald-600/70 text-base">
          基於 NLP 語意比對，以下是與您的新品最相似的歷史商品
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {results.map((product, index) => (
            <div key={index} className="p-6 bg-gradient-to-r from-white/60 to-rose-50/60 rounded-2xl border border-rose-200/50 backdrop-blur-sm hover:shadow-warm transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-xl text-rose-800 mb-2">{product.name}</h3>
                  <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200/50 hover:from-amber-200 hover:to-orange-200">
                    {product.category}
                  </Badge>
                </div>
                <Badge 
                  className={`text-base px-4 py-2 ${
                    product.similarity > 0.85 
                      ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200/50" 
                      : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200/50"
                  }`}
                >
                  相似度: {(product.similarity * 100).toFixed(0)}%
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-rose-600/60">銷售速度</p>
                    <p className="font-semibold text-rose-800 text-lg">{product.salesVelocity} 件/月</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-rose-600/60">產品生命週期</p>
                    <p className="font-semibold text-rose-800 text-lg">{product.lifeCycle} 個月</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-rose-600/60">利潤率</p>
                    <p className="font-semibold text-rose-800 text-lg">{product.profit}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarProductsAnalysis;
