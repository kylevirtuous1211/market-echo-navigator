
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp, Clock, DollarSign, ArrowRight, Sparkles, Heart } from 'lucide-react';

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
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
            <Sparkles className="h-5 w-5 text-rose-500" />
            <span className="text-rose-600 font-medium">AI 語意分析</span>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gradient-warm mb-3">NLP 語意比對分析</h2>
        <p className="text-rose-600/80 text-lg max-w-3xl mx-auto">
          輸入新品資訊，系統將使用自然語言處理技術找出最相似的歷史商品並分析其銷售表現
        </p>
      </div>

      {/* Input Section */}
      <Card className="card-glass shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-600 text-2xl">
            <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
              <Search className="h-6 w-6 text-rose-500" />
            </div>
            新品資訊輸入
          </CardTitle>
          <CardDescription className="text-rose-600/70 text-base">
            請詳細描述您要評估的新品，包括名稱、特性、材質等資訊
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="productName" className="text-rose-700 text-base font-medium">商品名稱</Label>
            <Input
              id="productName"
              placeholder="例：時尚牛仔外套"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-white/80 border-rose-200 text-rose-800 placeholder:text-rose-400 focus:border-rose-400 focus:ring-rose-400/20 mt-2"
            />
          </div>
          <div>
            <Label htmlFor="productDescription" className="text-rose-700 text-base font-medium">商品描述</Label>
            <Textarea
              id="productDescription"
              placeholder="例：採用高品質丹寧布料，具有復古風格設計，適合春秋季節穿著..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              className="bg-white/80 border-rose-200 text-rose-800 placeholder:text-rose-400 focus:border-rose-400 focus:ring-rose-400/20 mt-2"
            />
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={!productName || !productDescription || isAnalyzing}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 py-3 text-lg font-medium shadow-lg hover:shadow-glow transition-all duration-300 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                正在分析中...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                開始 NLP 語意分析
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-8">
          {/* Similar Products Analysis */}
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

          {/* Sales Performance Chart */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="text-emerald-600 text-2xl">歷史銷售表現趨勢</CardTitle>
              <CardDescription className="text-emerald-600/70 text-base">
                相似商品的月度銷售數據，可作為新品預測的基線參考
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fda4af" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#9f1239" />
                  <YAxis stroke="#9f1239" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #fda4af', 
                      borderRadius: '12px',
                      color: '#9f1239',
                      boxShadow: '0 10px 25px rgba(236, 72, 153, 0.15)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="經典牛仔夾克" fill="url(#gradient1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="休閒丹寧外套" fill="url(#gradient2)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="復古牛仔上衣" fill="url(#gradient3)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Next Step Button */}
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
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
