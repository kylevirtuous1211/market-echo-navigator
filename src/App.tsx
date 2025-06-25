
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductEvaluationPage from "./pages/ProductEvaluationPage";
import DemandPredictionPage from "./pages/DemandPredictionPage";
import MarketTrendAnalysisPage from "./pages/MarketTrendAnalysisPage";
import FinalReportPage from "./pages/FinalReportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product-evaluation" element={<ProductEvaluationPage />} />
          <Route path="/demand-prediction" element={<DemandPredictionPage />} />
          <Route path="/market-trend-analysis" element={<MarketTrendAnalysisPage />} />
          <Route path="/final-report" element={<FinalReportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
