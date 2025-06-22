
import { useQuery } from '@tanstack/react-query';
import { beautyDataService } from '@/services/beautyDataService';

export const useBeautyProducts = () => {
  return useQuery({
    queryKey: ['beauty-products'],
    queryFn: beautyDataService.getBeautyProducts,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['beauty-products', 'category', category],
    queryFn: () => beautyDataService.getProductsByCategory(category),
    enabled: !!category,
  });
};

export const useProductsByBrand = (brand: string) => {
  return useQuery({
    queryKey: ['beauty-products', 'brand', brand],
    queryFn: () => beautyDataService.getProductsByBrand(brand),
    enabled: !!brand,
  });
};

export const useSentimentAnalysis = () => {
  return useQuery({
    queryKey: ['sentiment-analysis'],
    queryFn: beautyDataService.getSentimentAnalysis,
  });
};

export const useAgentSimulations = (productName?: string) => {
  return useQuery({
    queryKey: ['agent-simulations', productName],
    queryFn: () => beautyDataService.getAgentSimulations(productName),
  });
};

export const useBaselineMetrics = (category?: string) => {
  return useQuery({
    queryKey: ['baseline-metrics', category],
    queryFn: () => beautyDataService.calculateBaselineMetrics(category),
  });
};
