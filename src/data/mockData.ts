
import { SimilarProduct, ChartDataPoint } from '@/types/productEvaluation';

export const mockSimilarProducts: SimilarProduct[] = [
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

export const chartData: ChartDataPoint[] = [
  { month: '1月', 經典牛仔夾克: 120, 休閒丹寧外套: 98, 復古牛仔上衣: 85 },
  { month: '2月', 經典牛仔夾克: 135, 休閒丹寧外套: 110, 復古牛仔上衣: 92 },
  { month: '3月', 經典牛仔夾克: 142, 休閒丹寧外套: 125, 復古牛仔上衣: 98 },
  { month: '4月', 經典牛仔夾克: 128, 休閒丹寧外套: 108, 復古牛仔上衣: 88 },
  { month: '5月', 經典牛仔夾克: 155, 休閒丹寧外套: 138, 復古牛仔上衣: 105 },
  { month: '6月', 經典牛仔夾克: 170, 休閒丹寧外套: 152, 復古牛仔上衣: 118 }
];
