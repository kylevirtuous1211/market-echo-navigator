
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Users, Palette, Shirt, Heart } from 'lucide-react';

interface CustomerPersona {
  id: number;
  persona: string;
  age: string;
  purchaseIntention: number;
  priceSensitivity: number;
  colorPreference: string;
  materialPreference: string;
  response: string;
}

interface CustomerPersonaCardProps {
  customer: CustomerPersona;
}

const CustomerPersonaCard: React.FC<CustomerPersonaCardProps> = ({ customer }) => {
  return (
    <div className="p-6 border border-rose-200/50 rounded-xl bg-gradient-to-r from-rose-50/30 to-amber-50/30">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-xl flex items-center gap-3 text-rose-700 mb-2">
            <Users className="h-6 w-6 text-blue-500" />
            {customer.persona}
          </h3>
          <p className="text-sm text-rose-600/70">{customer.age}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-rose-600/70 mb-2">購買意願</p>
          <div className="flex items-center gap-3">
            <Progress value={customer.purchaseIntention} className="flex-1 h-3" />
            <span className="text-sm font-semibold text-rose-700 min-w-[3rem]">{customer.purchaseIntention}%</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-rose-600/70 mb-2">價格敏感度</p>
          <div className="flex items-center gap-3">
            <Progress value={customer.priceSensitivity} className="flex-1 h-3" />
            <span className="text-sm font-semibold text-rose-700 min-w-[3rem]">{customer.priceSensitivity}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="flex items-center gap-3">
          <Palette className="h-5 w-5 text-purple-500" />
          <div>
            <p className="text-sm text-rose-600/70">顏色偏好</p>
            <p className="font-medium text-rose-700">{customer.colorPreference}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Shirt className="h-5 w-5 text-emerald-500" />
          <div>
            <p className="text-sm text-rose-600/70">材質偏好</p>
            <p className="font-medium text-rose-700">{customer.materialPreference}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-4 bg-rose-100/50 rounded-lg">
        <Heart className="h-5 w-5 text-red-500 mt-1" />
        <div>
          <p className="text-sm text-rose-600/70">模擬直覺反應</p>
          <p className="font-medium text-rose-700">"{customer.response}"</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPersonaCard;
