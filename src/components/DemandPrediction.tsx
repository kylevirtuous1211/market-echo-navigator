
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Brain, Heart, DollarSign, Palette, Shirt } from 'lucide-react';

const DemandPrediction = () => {
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
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">虛擬顧客代理人需求預測</h2>
        <p className="text-gray-600">
          結合 Agent-Based Modeling (ABM) 與大型語言模型 (LLM)，模擬不同客群的購買行為與偏好
        </p>
      </div>

      {/* Simulation Control */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            ABM + LLM 智慧模擬系統
          </CardTitle>
          <CardDescription>
            系統將生成 3,620 個虛擬顧客代理人，模擬其對新品的反應與購買決策
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSimulate} 
            disabled={isSimulating}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isSimulating ? '正在模擬虛擬顧客反應...' : '開始 ABM + LLM 模擬'}
          </Button>
          {isSimulating && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">模擬進度</p>
              <Progress value={66} className="w-full" />
              <p className="text-xs text-gray-500">正在分析虛擬顧客代理人的購買意向...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Customer Personas Analysis */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">虛擬顧客代理人分析結果</CardTitle>
              <CardDescription>
                基於匿名化顧客數據生成的 Persona-Aligned Agents 反應分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {results.map((customer) => (
                  <div key={customer.id} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          {customer.persona}
                        </h3>
                        <p className="text-sm text-gray-600">{customer.age} | 樣本數: {customer.count} 人</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">購買意願</p>
                        <div className="flex items-center gap-2">
                          <Progress value={customer.purchaseIntention} className="flex-1" />
                          <span className="text-sm font-semibold">{customer.purchaseIntention}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-1">價格敏感度</p>
                        <div className="flex items-center gap-2">
                          <Progress value={customer.priceSensitivity} className="flex-1" />
                          <span className="text-sm font-semibold">{customer.priceSensitivity}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">顏色偏好</p>
                          <p className="font-medium">{customer.colorPreference}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Shirt className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">材質偏好</p>
                          <p className="font-medium">{customer.materialPreference}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-red-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">模擬直覺反應</p>
                        <p className="font-medium text-gray-800">"{customer.response}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demand Forecast Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>市場份額預測</CardTitle>
                <CardDescription>各客群對新品的預期接受度</CardDescription>
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
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>分客群需求預測</CardTitle>
                <CardDescription>首月預期銷售量 (件)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demandForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="預期銷量" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-purple-700">動態需求預測總結</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">2,475</p>
                  <p className="text-sm text-gray-600">預期首月總銷量 (件)</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">67.5%</p>
                  <p className="text-sm text-gray-600">整體購買意願</p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">35%</p>
                  <p className="text-sm text-gray-600">主力客群佔比</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>關鍵洞察：</strong>時尚年輕族群展現最高購買意願，建議針對此族群優先進行行銷推廣。
                  品質導向消費者雖然價格敏感度較低，但更重視產品品質說明。
                  建議制定差異化定價策略以涵蓋不同客群需求。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DemandPrediction;
