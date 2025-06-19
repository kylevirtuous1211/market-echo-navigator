
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp, Clock, DollarSign } from 'lucide-react';

const ProductEvaluation = () => {
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
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">NLP 語意比對分析</h2>
        <p className="text-gray-600">
          輸入新品資訊，系統將使用自然語言處理技術找出最相似的歷史商品並分析其銷售表現
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            新品資訊輸入
          </CardTitle>
          <CardDescription>
            請詳細描述您要評估的新品，包括名稱、特性、材質等資訊
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productName">商品名稱</Label>
            <Input
              id="productName"
              placeholder="例：時尚牛仔外套"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="productDescription">商品描述</Label>
            <Textarea
              id="productDescription"
              placeholder="例：採用高品質丹寧布料，具有復古風格設計，適合春秋季節穿著..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
            />
          </div>
          <Button 
            onClick={handleAnalyze} 
            disabled={!productName || !productDescription || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? '正在分析中...' : '開始 NLP 語意分析'}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">相似商品分析結果</CardTitle>
              <CardDescription>
                基於 NLP 語意比對，以下是與您的新品最相似的歷史商品
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {results.map((product, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge variant="secondary" className="mt-1">{product.category}</Badge>
                      </div>
                      <Badge 
                        variant={product.similarity > 0.85 ? "default" : "secondary"}
                        className="bg-blue-100 text-blue-800"
                      >
                        相似度: {(product.similarity * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">銷售速度</p>
                          <p className="font-semibold">{product.salesVelocity} 件/月</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">產品生命週期</p>
                          <p className="font-semibold">{product.lifeCycle} 個月</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">利潤率</p>
                          <p className="font-semibold">{product.profit}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Performance Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>歷史銷售表現趨勢</CardTitle>
              <CardDescription>
                相似商品的月度銷售數據，可作為新品預測的基線參考
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="經典牛仔夾克" fill="#3B82F6" />
                  <Bar dataKey="休閒丹寧外套" fill="#8B5CF6" />
                  <Bar dataKey="復古牛仔上衣" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductEvaluation;
