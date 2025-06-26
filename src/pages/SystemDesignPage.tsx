
import React from 'react';
import { ArrowLeft, Target, Cog, Users, TrendingUp, Brain, Database, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const SystemDesignPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <div className="gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-amber-400/20 to-pink-500/20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回首頁
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              📦 平台預測進貨數模型設計
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
              深度解析我們如何透過混合式 LSTM 架構與 AI Agent 模擬，實現精準的需求預測與進貨量計算
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Model Objective */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-rose-600">
              <Target className="h-8 w-8" />
              🎯 模型目標
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-rose-600/80 leading-relaxed">
              根據 <strong>歷史銷售資料</strong>、<strong>市場趨勢變化</strong> 與 <strong>Agent 資訊（包含行為意圖與外部因素）</strong>，
              來預測產品在未來一段時間的銷售量，進而推算進貨量 <code className="bg-rose-100 px-2 py-1 rounded text-rose-700">ReorderQty</code>，
              確保不缺貨也不過量。
            </p>
          </CardContent>
        </Card>

        {/* Architecture Overview */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-amber-600">
              <Cog className="h-8 w-8" />
              🔧 模型架構總覽
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 p-6 rounded-xl border border-amber-200/50 mb-6">
              <h3 className="text-xl font-bold text-amber-700 mb-4">混合式 LSTM 模型架構（Hybrid LSTM）</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-blue-700">時序資料</h4>
                    <p className="text-sm text-blue-600/80">銷售歷史、搜尋趨勢</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <Database className="h-6 w-6 text-purple-500" />
                  <div>
                    <h4 className="font-semibold text-purple-700">靜態資料</h4>
                    <p className="text-sm text-purple-600/80">Agent 模擬資訊</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-amber-600/80">
              根據不同資料豐富程度的店家，選擇不同的訓練策略，確保模型在各種情境下都能發揮最佳效能。
            </p>
          </CardContent>
        </Card>

        {/* AI Agent Simulation */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-blue-600">
              <Users className="h-8 w-8" />
              1️⃣ AI Agent 模擬層：個體化需求預測
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-6 rounded-xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-blue-700 mb-4">👥 Persona 設計</h3>
                <p className="text-blue-600/80 mb-4">
                  設計 3–5 種典型顧客 persona，輸入外部變因（如節慶、競品折扣）模擬「潛在購買意圖（PI）」與「感知價值（PS）」。
                </p>
                
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">✅ 設計優勢</h4>
                  <ul className="space-y-2 text-blue-600/80">
                    <li>• <strong>行為科學基礎</strong>：PS 解釋購買意圖變異的 33.1%</li>
                    <li>• <strong>運算效率高</strong>：僅需 3–5 persona</li>
                    <li>• <strong>可輔助時間特徵理解</strong>：與滯後特徵互補，提供行為面向的上下文</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Series Feature Engineering */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-green-600">
              <TrendingUp className="h-8 w-8" />
              2️⃣ 📈 時序特徵工程：從銷售歷史中擷取動態模式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Historical Sales Features */}
              <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-6 rounded-xl border border-green-200/50">
                <h3 className="text-xl font-bold text-green-700 mb-4">A. 歷史銷售資料 → 時間特徵</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">滯後變數 (Lag Variables)</h4>
                    <div className="text-sm text-green-600/80 font-mono bg-gray-100 p-2 rounded">
                      Lag_k(t) = y_{`{t-k}`}
                    </div>
                    <p className="text-sm text-green-600/80 mt-2">其中 k = 5-6 個時間點</p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">移動平均 (Moving Averages)</h4>
                    <div className="text-sm text-green-600/80 font-mono bg-gray-100 p-2 rounded">
                      MA_w(t) = (1/w)Σy_{`{t-i}`}
                    </div>
                    <p className="text-sm text-green-600/80 mt-2">視窗大小 w = 3~12 個月</p>
                  </div>
                </div>
              </div>

              {/* Market Trends Features */}
              <div className="bg-gradient-to-r from-teal-50/50 to-cyan-50/50 p-6 rounded-xl border border-teal-200/50">
                <h3 className="text-xl font-bold text-teal-700 mb-4">B. 市場趨勢 → 動態特徵</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-700 mb-2">搜尋熱度動能</h4>
                    <p className="text-sm text-teal-600/80">正規化後範圍為 0–8，反映搜尋趨勢變化</p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-700 mb-2">互動率變化斜率</h4>
                    <p className="text-sm text-teal-600/80">使用線性回歸估算互動率變化趨勢</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LSTM Model */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-purple-600">
              <Brain className="h-8 w-8" />
              🧠 LSTM 預測模型：雙分支架構 (Hybrid LSTM)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-purple-200 rounded-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-100 to-violet-100">
                    <th className="border border-purple-200 px-4 py-3 text-left text-purple-700 font-semibold">分支類型</th>
                    <th className="border border-purple-200 px-4 py-3 text-left text-purple-700 font-semibold">處理資料型態</th>
                    <th className="border border-purple-200 px-4 py-3 text-left text-purple-700 font-semibold">輸入範例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-purple-200 px-4 py-3 font-semibold text-purple-600">Temporal Branch</td>
                    <td className="border border-purple-200 px-4 py-3 text-purple-600/80">時序資料</td>
                    <td className="border border-purple-200 px-4 py-3 text-purple-600/80">銷售歷史、搜尋趨勢、點擊率等</td>
                  </tr>
                  <tr className="bg-purple-50/30">
                    <td className="border border-purple-200 px-4 py-3 font-semibold text-purple-600">Static Branch</td>
                    <td className="border border-purple-200 px-4 py-3 text-purple-600/80">靜態資料</td>
                    <td className="border border-purple-200 px-4 py-3 text-purple-600/80">Agent 的購買意圖、感知價值 (PI/PS)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-purple-600/80 mt-4">
              每筆資料對應：<strong>產品 × 週期 × Agent 特徵 × 時間特徵</strong>
            </p>
          </CardContent>
        </Card>

        {/* Training Strategies */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-orange-600">
              <Zap className="h-8 w-8" />
              🏪 根據店型選擇訓練策略
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-orange-200 rounded-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-100 to-amber-100">
                    <th className="border border-orange-200 px-4 py-3 text-left text-orange-700 font-semibold">店型</th>
                    <th className="border border-orange-200 px-4 py-3 text-left text-orange-700 font-semibold">策略</th>
                    <th className="border border-orange-200 px-4 py-3 text-left text-orange-700 font-semibold">理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-orange-200 px-4 py-3 font-semibold text-orange-600">高資料量店家</td>
                    <td className="border border-orange-200 px-4 py-3 text-orange-600/80">專屬 LSTM 模型</td>
                    <td className="border border-orange-200 px-4 py-3 text-orange-600/80">捕捉獨特促銷週期與消費行為</td>
                  </tr>
                  <tr className="bg-orange-50/30">
                    <td className="border border-orange-200 px-4 py-3 font-semibold text-orange-600">低資料量店家</td>
                    <td className="border border-orange-200 px-4 py-3 text-orange-600/80">Transfer Learning + Meta-Learning</td>
                    <td className="border border-orange-200 px-4 py-3 text-orange-600/80">從類似店家遷移知識（如城市中的服飾類）</td>
                  </tr>
                  <tr>
                    <td className="border border-orange-200 px-4 py-3 font-semibold text-orange-600">連鎖加盟體系</td>
                    <td className="border border-orange-200 px-4 py-3 text-orange-600/80">共用基礎模型 + 分店微調</td>
                    <td className="border border-orange-200 px-4 py-3 text-orange-600/80">平衡大規模推廣與在地化精調</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Reorder Quantity Formula */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl text-red-600">
              🚚 預測進貨量計算公式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-red-50/50 to-pink-50/50 p-6 rounded-xl border border-red-200/50">
              <div className="text-center mb-6">
                <div className="text-2xl font-mono font-bold text-red-700 bg-white/70 p-4 rounded-lg inline-block">
                  ReorderQty = max(0, (1.2 × X) - CurrentStock)
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-700 mb-2">X</div>
                  <p className="text-sm text-red-600/80">模型預測的未來需求量</p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-700 mb-2">1.2</div>
                  <p className="text-sm text-red-600/80">安全係數，預防成長期缺貨</p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg text-center">
                  <div className="font-semibold text-red-700 mb-2">CurrentStock</div>
                  <p className="text-sm text-red-600/80">目前庫存量</p>
                </div>
              </div>
              
              <p className="text-red-600/80 text-center mt-4">
                確保補貨量不為負數，避免不必要的庫存積壓
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Model Advantages */}
        <Card className="card-glass shadow-warm mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-rose-600 text-center">
              ✅ 模型優勢總結
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50/50 to-pink-50/50 rounded-lg border border-rose-200/50">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-rose-700">個性化預測</h3>
                  <p className="text-sm text-rose-600/80">Agent 引入行為心理與情境模擬</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg border border-blue-200/50">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-blue-700">多資料融合</h3>
                  <p className="text-sm text-blue-600/80">整合歷史銷售與外部趨勢</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-lg border border-green-200/50">
                <div className="text-2xl">📈</div>
                <div>
                  <h3 className="font-semibold text-green-700">雙分支架構</h3>
                  <p className="text-sm text-green-600/80">提升模型對時間與靜態資料的理解能力</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50/50 to-violet-50/50 rounded-lg border border-purple-200/50">
                <div className="text-2xl">🧩</div>
                <div>
                  <h3 className="font-semibold text-purple-700">彈性應用</h3>
                  <p className="text-sm text-purple-600/80">可根據資料規模調整適合的模型訓練策略</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white border-0 py-4 px-8 text-xl font-medium"
            size="lg"
          >
            開始體驗系統
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignPage;
