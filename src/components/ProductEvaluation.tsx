import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';

interface ProductEvaluationProps {
  onComplete: (data: any) => void;
  onProceed: () => void;
}

const ProductEvaluation: React.FC<ProductEvaluationProps> = ({ onComplete, onProceed }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // 模擬歷史商品數據
  const mockSimilarProducts = [
    {
      name: '經典牛仔夾克',
      similarity: 0.89,
      salesVelocity: 850,
      lifeCycle: 24,
      profit: 35.2,
      category: '外套'
    },
    {
      name: '休閒丹寧外套',
      similarity: 0.82,
      salesVelocity: 720,
      lifeCycle: 18,
      profit: 28.5,
      category: '外套'
    },
    {
      name: '復古牛仔上衣',
      similarity: 0.78,
      salesVelocity: 630,
      lifeCycle: 15,
      profit: 31.8,
      category: '外套'
    }
  ];

  const chartData = [
    { month: '1月', 經典牛仔夾克: 120, 休閒丹寧外套: 98, 復古牛仔上衣: 85 },
    { month: '2月', 經典牛仔夾克: 135, 休閒丹寧外套: 110, 復古牛仔上衣: 92 },
    { month: '3月', 經典牛仔夾克: 142, 休閒丹寧外套: 125, 復古牛仔上衣: 98 },
    { month: '4月', 經典牛仔夾克: 128, 休閒丹寧外套: 108, 復古牛仔上衣: 88 },
    { month: '5月', 經典牛仔夾克: 155, 休閒丹寧外套: 138, 復古牛仔上衣: 105 },
    { month: '6月', 經典牛仔夾克: 170, 休閒丹寧外套: 152, 復古牛仔上衣: 118 }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // 模擬 API 分析延遲
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults(mockSimilarProducts);
    
    // Calculate baseline metrics for next step
    const avgSalesVelocity = mockSimilarProducts.reduce((sum, p) => sum + p.salesVelocity, 0) / mockSimilarProducts.length;
    const avgLifeCycle = mockSimilarProducts.reduce((sum, p) => sum + p.lifeCycle, 0) / mockSimilarProducts.length;
    const avgProfit = mockSimilarProducts.reduce((sum, p) => sum + p.profit, 0) / mockSimilarProducts.length;
    
    const productData = {
      name: productName,
      description: productDescription,
      similarProducts: mockSimilarProducts,
      baselineMetrics: {
        avgSalesVelocity,
        avgLifeCycle,
        avgProfit
      }
    };
    
    onComplete(productData);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-3">NLP 語意比對分析</h2>
        <p className="text-gray-300 text-lg">
          輸入新品資訊，系統將使用自然語言處理技術找出最相似的歷史商品並分析其銷售表現
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-300">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Search className="h-6 w-6" />
            </div>
            新品資訊輸入
          </CardTitle>
          <CardDescription className="text-gray-300 text-base">
            請詳細描述您要評估的新品，包括名稱、特性、材質等資訊
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="productName" className="text-gray-200 text-base">商品名稱</Label>
            <Input
              id="productName"
              placeholder="例：時尚牛仔外套"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-slate-800 border-slate-500 text-white placeholder:text-gray-400 focus:border-blue-400 mt-2"
            />
          </div>
          <div>
            <Label htmlFor="productDescription" className="text-gray-200 text-base">商品描述</Label>
            <Textarea
              id="productDescription"
              placeholder="例：採用高品質丹寧布料，具有復古風格設計，適合春秋季節穿著..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              className="bg-slate-800 border-slate-500 text-white placeholder:text-gray-400 focus:border-blue-400 mt-2"
            />
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={!productName || !productDescription || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 py-3 text-lg font-medium"
          >
            {isAnalyzing ? '正在分析中...' : '開始 NLP 語意分析'}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-8">
          {/* Similar Products Analysis */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">相似商品分析結果</CardTitle>
              <CardDescription className="text-gray-300 text-base">
                基於 NLP 語意比對，以下是與您的新品最相似的歷史商品
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {results.map((product, index) => (
                  <div key={index} className="p-6 border border-slate-500 rounded-xl bg-gradient-to-r from-slate-600/50 to-slate-700/50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-xl text-white mb-2">{product.name}</h3>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {product.category}
                        </Badge>
                      </div>
                      <Badge 
                        variant={product.similarity > 0.85 ? "default" : "secondary"}
                        className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-base px-3 py-1"
                      >
                        相似度: {(product.similarity * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                        <div>
                          <p className="text-sm text-gray-400">銷售速度</p>
                          <p className="font-semibold text-white text-lg">{product.salesVelocity} 件/月</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">產品生命週期</p>
                          <p className="font-semibold text-white text-lg">{product.lifeCycle} 個月</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-sm text-gray-400">利潤率</p>
                          <p className="font-semibold text-white text-lg">{product.profit}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Performance Chart */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-emerald-300">歷史銷售表現趨勢</CardTitle>
              <CardDescription className="text-gray-300 text-base">
                相似商品的月度銷售數據，可作為新品預測的基線參考
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#334155', 
                      border: '1px solid #64748B', 
                      borderRadius: '8px',
                      color: '#F1F5F9'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="經典牛仔夾克" fill="#3B82F6" />
                  <Bar dataKey="休閒丹寧外套" fill="#8B5CF6" />
                  <Bar dataKey="復古牛仔上衣" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Next Step Button */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-800/50 to-purple-800/50 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-300 mb-2">基線分析完成</h3>
                  <p className="text-gray-300">
                    已建立歷史商品基線數據，現在可以進行虛擬顧客代理人需求預測模擬
                  </p>
                </div>
                <Button 
                  onClick={onProceed}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white border-0 py-3 px-6 text-lg font-medium flex items-center gap-2"
                >
                  進行需求預測
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
