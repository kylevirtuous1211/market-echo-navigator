
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain } from 'lucide-react';

interface SimulationControlProps {
  isSimulating: boolean;
  onSimulate: () => void;
}

const SimulationControl: React.FC<SimulationControlProps> = ({ isSimulating, onSimulate }) => {
  return (
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
          onClick={onSimulate} 
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
  );
};

export default SimulationControl;
