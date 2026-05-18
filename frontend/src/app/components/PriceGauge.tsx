import { Card } from '@/app/components/ui/card';

interface PriceGaugeProps {
  minValue: number;
  maxValue: number;
  currentPrice: number;
}

export function PriceGauge({ minValue, maxValue, currentPrice }: PriceGaugeProps) {
  // Calculate the position of the needle (0-100%)
  const range = maxValue - minValue;
  const position = ((currentPrice - minValue) / range) * 100;
  
  return (
    <Card className="p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Estimated Fair Market Value</p>
        <h3 className="text-2xl font-normal text-gray-900">
          {minValue.toLocaleString('tr-TR')} TL – {maxValue.toLocaleString('tr-TR')} TL
        </h3>
      </div>

      {/* Gauge container */}
      <div className="relative">
        {/* Color scale bar */}
        <div className="h-12 rounded-lg overflow-hidden flex">
          <div className="flex-1 bg-gradient-to-r from-green-400 to-green-500"></div>
          <div className="flex-1 bg-gradient-to-r from-green-500 to-yellow-400"></div>
          <div className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
          <div className="flex-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
        </div>

        {/* Needle indicator */}
        <div 
          className="absolute top-0 transform -translate-x-1/2 transition-all duration-500"
          style={{ left: `${Math.min(Math.max(position, 0), 100)}%` }}
        >
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gray-900"></div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-900"></div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-3 text-xs">
          <span className="text-green-600 font-medium">Good Deal</span>
          <span className="text-yellow-600 font-medium">Market Price</span>
          <span className="text-red-600 font-medium">Overpriced</span>
        </div>
      </div>

      {/* Current listing price */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">Current Listing Price</p>
        <p className="text-xl font-normal text-gray-900 mt-1">
          {currentPrice.toLocaleString('tr-TR')} TL
        </p>
      </div>
    </Card>
  );
}
