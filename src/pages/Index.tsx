
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductEvaluation from '@/components/ProductEvaluation';
import DemandPrediction from '@/components/DemandPrediction';
import MarketTrendAnalysis from '@/components/MarketTrendAnalysis';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">智慧商品預測分析平台</h1>
          <p className="text-xl opacity-90">結合 NLP 語意比對、虛擬顧客代理人與市場趨勢的全方位分析系統</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                NLP 語意比對
              </CardTitle>
              <CardDescription>
                分析新品與歷史商品的相似度，提供基線預測
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Users className="h-5 w-5" />
                虛擬顧客代理人
              </CardTitle>
              <CardDescription>
                ABM 結合 LLM 模擬不同客群的購買行為
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingUp className="h-5 w-5" />
                市場趨勢分析
              </CardTitle>
              <CardDescription>
                整合 OpView、Google Trends 等外部數據源
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="evaluation" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50/50">
                <TabsTrigger value="evaluation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  新品評估分析
                </TabsTrigger>
                <TabsTrigger value="demand" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  需求預測模擬
                </TabsTrigger>
                <TabsTrigger value="trends" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  市場趨勢分析
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="evaluation" className="p-6">
                <ProductEvaluation />
              </TabsContent>
              
              <TabsContent value="demand" className="p-6">
                <DemandPrediction />
              </TabsContent>
              
              <TabsContent value="trends" className="p-6">
                <MarketTrendAnalysis />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
