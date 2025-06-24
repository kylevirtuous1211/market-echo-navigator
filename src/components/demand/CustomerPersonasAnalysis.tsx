
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerPersonaCard from './CustomerPersonaCard';

interface CustomerPersonasAnalysisProps {
  results: any[];
}

const CustomerPersonasAnalysis: React.FC<CustomerPersonasAnalysisProps> = ({ results }) => {
  return (
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
            <CustomerPersonaCard key={customer.id} customer={customer} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerPersonasAnalysis;
