
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Sparkles } from 'lucide-react';

interface ProductInputFormProps {
  productName: string;
  productDescription: string;
  isAnalyzing: boolean;
  onProductNameChange: (value: string) => void;
  onProductDescriptionChange: (value: string) => void;
  onAnalyze: () => void;
}

const ProductInputForm: React.FC<ProductInputFormProps> = ({
  productName,
  productDescription,
  isAnalyzing,
  onProductNameChange,
  onProductDescriptionChange,
  onAnalyze
}) => {
  return (
    <Card className="card-glass shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-600 text-2xl">
          <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
            <Search className="h-6 w-6 text-rose-500" />
          </div>
          新品資訊輸入
        </CardTitle>
        <CardDescription className="text-rose-600/70 text-base">
          請詳細描述您要評估的新品，包括名稱、特性、材質等資訊
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="productName" className="text-rose-700 text-base font-medium">商品名稱</Label>
          <Input
            id="productName"
            placeholder="例：excel 4色眼影盤"
            value={productName}
            onChange={(e) => onProductNameChange(e.target.value)}
            className="bg-white/80 border-rose-200 text-rose-800 placeholder:text-rose-400 focus:border-rose-400 focus:ring-rose-400/20 mt-2"
          />
        </div>
        <div>
          <Label htmlFor="productDescription" className="text-rose-700 text-base font-medium">商品描述</Label>
          <Textarea
            id="productDescription"
            placeholder="例：顯色度適中、易於暈染的特點，提供多種大地色系選擇..."
            value={productDescription}
            onChange={(e) => onProductDescriptionChange(e.target.value)}
            rows={4}
            className="bg-white/80 border-rose-200 text-rose-800 placeholder:text-rose-400 focus:border-rose-400 focus:ring-rose-400/20 mt-2"
          />
        </div>
        <Button 
          onClick={onAnalyze} 
          disabled={!productName || !productDescription || isAnalyzing}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 py-3 text-lg font-medium shadow-lg hover:shadow-glow transition-all duration-300 flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              正在分析中...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              開始 NLP 語意分析
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductInputForm;
