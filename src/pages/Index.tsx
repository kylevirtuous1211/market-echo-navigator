
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductEvaluation from '@/components/ProductEvaluation';
import DemandPrediction from '@/components/DemandPrediction';
import MarketTrendAnalysis from '@/components/MarketTrendAnalysis';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              智慧商品預測分析平台
            </h1>
            <p className="text-xl opacity-90 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              結合 NLP 語意比對、虛擬顧客代理人與市場趨勢的全方位分析系統
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-blue-300 text-lg">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                NLP 語意比對
              </CardTitle>
              <CardDescription className="text-gray-300 text-base leading-relaxed">
                分析新品與歷史商品的相似度，提供基線預測
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-purple-300 text-lg">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                虛擬顧客代理人
              </CardTitle>
              <CardDescription className="text-gray-300 text-base leading-relaxed">
                ABM 結合 LLM 模擬不同客群的購買行為
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-emerald-300 text-lg">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                市場趨勢分析
              </CardTitle>
              <CardDescription className="text-gray-300 text-base leading-relaxed">
                整合 OpView、Google Trends 等外部數據源
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800/95 to-slate-700/95 text-white backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="evaluation" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border-b border-slate-600">
                <TabsTrigger 
                  value="evaluation" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-200"
                >
                  新品評估分析
                </TabsTrigger>
                <TabsTrigger 
                  value="demand" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-200"
                >
                  需求預測模擬
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-200"
                >
                  市場趨勢分析
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="evaluation" className="p-8">
                <ProductEvaluation />
              </TabsContent>
              
              <TabsContent value="demand" className="p-8">
                <DemandPrediction />
              </TabsContent>
              
              <TabsContent value="trends" className="p-8">
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
