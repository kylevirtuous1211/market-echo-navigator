
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Brain, Heart, DollarSign, Palette, Shirt, ArrowRight, Info } from 'lucide-react';

interface DemandPredictionProps {
  productData?: any;
  onComplete: (data: any) => void;
  onProceed: () => void;
}

const DemandPrediction: React.FC<DemandPredictionProps> = ({ productData, onComplete, onProceed }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState(null);

  // 模擬虛擬顧客代理人數據
  const virtualCustomers = [
    {
      id: 1,
      persona: '時尚年輕族群',
      age: '20-30歲',
      purchaseIntention: 78,
      priceSensitivity: 45,
      colorPreference: '黑色、白色',
      materialPreference: '棉質、混紡',
      response: '非常感興趣，願意嘗試新品牌',
      count: 1250
    },
    {
      id: 2,
      persona: '品質導向消費者',
      age: '30-45歲',
      purchaseIntention: 65,
      priceSensitivity: 30,
      colorPreference: '深藍、灰色',
      materialPreference: '純棉、優質丹寧',
      response: '重視品質與耐用性',
      count: 980
    },
    {
      id: 3,
      persona: '價格敏感族群',
      age: '25-40歲',
      purchaseIntention: 45,
      priceSensitivity: 85,
      colorPreference: '基本色系',
      materialPreference: '性價比材質',
      response: '需要促銷活動才會考慮',
      count: 750
    },
    {
      id: 4,
      persona: '潮流追隨者',
      age: '18-28歲',
      purchaseIntention: 82,
      priceSensitivity: 35,
      colorPreference: '流行色、撞色',
      materialPreference: '特殊材質、創新布料',
      response: '積極關注新品，願意早期採用',
      count: 640
    }
  ];

  const demandForecast = [
    { segment: '時尚年輕族群', 預期銷量: 975, 市場份額: 35 },
    { segment: '品質導向消費者', 預期銷量: 637, 市場份額: 23 },
    { segment: '價格敏感族群', 預期銷量: 338, 市場份額: 12 },
    { segment: '潮流追隨者', 預期銷量: 525, 市場份額: 19 }
  ];

  const pieData = [
    { name: '時尚年輕族群', value: 35, color: '#3B82F6' },
    { name: '品質導向消費者', value: 23, color: '#8B5CF6' },
    { name: '潮流追隨者', value: 19, color: '#10B981' },
    { name: '價格敏感族群', value: 12, color: '#F59E0B' },
    { name: '其他族群', value: 11, color: '#6B7280' }
  ];

  const handleSimulate = async () => {
    setIsSimulating(true);
    // 模擬 ABM + LLM 分析延遲
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResults(virtualCustomers);
    
    // Prepare demand data for next step
    const demandData = {
      totalDemand: 2475,
      segments: virtualCustomers,
      overallIntent: 67.5,
      marketShare: pieData
    };
    
    onComplete(demandData);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-rose-600 mb-3">虛擬顧客代理人需求預測</h2>
        <p className="text-rose-600/80 text-lg">
          結合 Agent-Based Modeling (ABM) 與大型語言模型 (LLM)，模擬不同客群的購買行為與偏好
        </p>
      </div>

      {/* Baseline Context */}
      {productData && (
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
      )}

      {/* Simulation Control */}
      <Card className="card-glass shadow-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-amber-600">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Brain className="h-6 w-6" />
            </div>
            ABM + LLM 智慧模擬系統
          </CardTitle>
          <CardDescription className="text-rose-600/70 text-base">
            系統將生成 3,620 個虛擬顧客代理人，基於歷史基線數據模擬其對新品的反應與購買決策
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSimulate} 
            disabled={isSimulating}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white border-0 py-3 text-lg font-medium"
          >
            {isSimulating ? '正在模擬虛擬顧客反應...' : '開始 ABM + LLM 模擬'}
          </Button>
          {isSimulating && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-rose-600/70">模擬進度</p>
              <Progress value={66} className="w-full h-2" />
              <p className="text-xs text-rose-600/60">正在分析虛擬顧客代理人的購買意向...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Customer Personas Analysis */}
          <Card className="card-glass shadow-warm">
            <CardHeader>
              <CardTitle className="text-emerald-600">虛擬顧客代理人分析結果</CardTitle>
              <CardDescription className="text-rose-600/70 text-base">
                基於歷史基線數據生成的 Persona-Aligned Agents 反應分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {results.map((customer) => (
                  <div key={customer.id} className="p-6 border border-rose-200/50 rounded-xl bg-gradient-to-r from-rose-50/30 to-amber-50/30">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-semibold text-xl flex items-center gap-3 text-rose-700 mb-2">
                          <Users className="h-6 w-6 text-blue-500" />
                          {customer.persona}
                        </h3>
                        <p className="text-sm text-rose-600/70">{customer.age} | 樣本數: {customer.count} 人</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-rose-600/70 mb-2">購買意願</p>
                        <div className="flex items-center gap-3">
                          <Progress value={customer.purchaseIntention} className="flex-1 h-3" />
                          <span className="text-sm font-semibold text-rose-700 min-w-[3rem]">{customer.purchaseIntention}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-rose-600/70 mb-2">價格敏感度</p>
                        <div className="flex items-center gap-3">
                          <Progress value={customer.priceSensitivity} className="flex-1 h-3" />
                          <span className="text-sm font-semibold text-rose-700 min-w-[3rem]">{customer.priceSensitivity}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-rose-600/70">顏色偏好</p>
                          <p className="font-medium text-rose-700">{customer.colorPreference}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Shirt className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="text-sm text-rose-600/70">材質偏好</p>
                          <p className="font-medium text-rose-700">{customer.materialPreference}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-rose-100/50 rounded-lg">
                      <Heart className="h-5 w-5 text-red-500 mt-1" />
                      <div>
                        <p className="text-sm text-rose-600/70">模擬直覺反應</p>
                        <p className="font-medium text-rose-700">"{customer.response}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demand Forecast Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-glass shadow-warm">
              <CardHeader>
                <CardTitle className="text-emerald-600">市場份額預測</CardTitle>
                <CardDescription className="text-rose-600/70">各客群對新品的預期接受度</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f3e8ff', 
                        borderRadius: '8px',
                        color: '#be185d'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-glass shadow-warm">
              <CardHeader>
                <CardTitle className="text-emerald-600">分客群需求預測</CardTitle>
                <CardDescription className="text-rose-600/70">首月預期銷售量 (件)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demandForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                    <XAxis dataKey="segment" angle={-45} textAnchor="end" height={100} stroke="#be185d" />
                    <YAxis stroke="#be185d" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f3e8ff', 
                        borderRadius: '8px',
                        color: '#be185d'
                      }} 
                    />
                    <Bar dataKey="預期銷量" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
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
              
              {/* Next Step Button */}
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
        </div>
      )}
    </div>
  );
};

export default DemandPrediction;
