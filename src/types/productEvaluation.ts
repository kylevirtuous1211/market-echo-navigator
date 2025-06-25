
export interface SimilarProduct {
  name: string;
  similarity: number;
  salesVelocity: number;
  lifeCycle: number;
  profit: number;
  category: string;
}

export interface ProductData {
  name: string;
  description: string;
  similarProducts: SimilarProduct[];
  baselineMetrics: {
    avgSalesVelocity: number;
    avgProfit: number;
  };
}

export interface ChartDataPoint {
  month: string;
  經典牛仔夾克: number;
  休閒丹寧外套: number;
  復古牛仔上衣: number;
}

export interface ProductEvaluationProps {
  onComplete: (data: any) => void;
  onProceed: () => void;
}
