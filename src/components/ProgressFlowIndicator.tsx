
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

interface ProgressFlowIndicatorProps {
  completedSteps: string[];
}

const ProgressFlowIndicator: React.FC<ProgressFlowIndicatorProps> = ({ completedSteps }) => {
  const isStepAccessible = (step: string) => {
    switch (step) {
      case 'evaluation':
        return true;
      case 'demand':
        return completedSteps.includes('evaluation');
      case 'trends':
        return completedSteps.includes('evaluation') && completedSteps.includes('demand');
      default:
        return false;
    }
  };

  const getStepStatus = (step: string) => {
    if (completedSteps.includes(step)) return 'completed';
    if (isStepAccessible(step)) return 'available';
    return 'locked';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="card-glass shadow-warm mb-8">
        <CardHeader>
          <CardTitle className="text-center text-gradient-warm text-2xl">分析流程進度</CardTitle>
          <CardDescription className="text-center text-rose-600/80 text-lg">
            依序完成三個分析階段，每個階段的結果將為下一階段提供基礎數據
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                getStepStatus('evaluation') === 'completed' 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-glow' :
                getStepStatus('evaluation') === 'available' 
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-glow' : 
                  'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}>
                {getStepStatus('evaluation') === 'completed' ? 
                  <CheckCircle className="h-7 w-7 text-white" /> : 
                  <BarChart3 className="h-7 w-7 text-white" />
                }
              </div>
              <span className={`font-semibold text-lg ${
                getStepStatus('evaluation') === 'completed' ? 'text-emerald-600' :
                getStepStatus('evaluation') === 'available' ? 'text-rose-600' : 'text-gray-400'
              }`}>
                新品評估
              </span>
            </div>
            
            <ArrowRight className={`h-6 w-6 transition-colors duration-300 ${
              getStepStatus('demand') !== 'locked' ? 'text-amber-500' : 'text-gray-300'
            }`} />
            
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                getStepStatus('demand') === 'completed' 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-glow' :
                getStepStatus('demand') === 'available' 
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-glow' : 
                  'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}>
                {getStepStatus('demand') === 'completed' ? 
                  <CheckCircle className="h-7 w-7 text-white" /> : 
                  <Users className="h-7 w-7 text-white" />
                }
              </div>
              <span className={`font-semibold text-lg ${
                getStepStatus('demand') === 'completed' ? 'text-emerald-600' :
                getStepStatus('demand') === 'available' ? 'text-amber-600' : 'text-gray-400'
              }`}>
                需求預測
              </span>
            </div>
            
            <ArrowRight className={`h-6 w-6 transition-colors duration-300 ${
              getStepStatus('trends') !== 'locked' ? 'text-amber-500' : 'text-gray-300'
            }`} />
            
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                getStepStatus('trends') === 'completed' 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-glow' :
                getStepStatus('trends') === 'available' 
                  ? 'bg-gradient-to-r from-pink-400 to-rose-500 shadow-glow' : 
                  'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}>
                {getStepStatus('trends') === 'completed' ? 
                  <CheckCircle className="h-7 w-7 text-white" /> : 
                  <TrendingUp className="h-7 w-7 text-white" />
                }
              </div>
              <span className={`font-semibold text-lg ${
                getStepStatus('trends') === 'completed' ? 'text-emerald-600' :
                getStepStatus('trends') === 'available' ? 'text-pink-600' : 'text-gray-400'
              }`}>
                市場趨勢分析
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressFlowIndicator;
