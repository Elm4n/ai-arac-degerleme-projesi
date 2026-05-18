import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface VehicleInfo {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  marketTrend: 'up' | 'stable' | 'down';
}

interface VehicleInfoCardProps {
  vehicleInfo: VehicleInfo;
}

export function VehicleInfoCard({ vehicleInfo }: VehicleInfoCardProps) {
  const getTrendIcon = () => {
    switch (vehicleInfo.marketTrend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (vehicleInfo.marketTrend) {
      case 'up':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'down':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getTrendLabel = () => {
    switch (vehicleInfo.marketTrend) {
      case 'up':
        return 'Rising';
      case 'down':
        return 'Declining';
      default:
        return 'Stable';
    }
  };

  return (
    <Card className="p-6 shadow-sm h-full">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-normal text-gray-900">Vehicle Information</h3>
        <Badge className={`${getTrendColor()} flex items-center gap-1`}>
          {getTrendIcon()}
          {getTrendLabel()}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Brand & Model</p>
          <p className="text-base text-gray-900 mt-1">
            {vehicleInfo.brand} {vehicleInfo.model}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Year</p>
            <p className="text-base text-gray-900 mt-1">{vehicleInfo.year}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mileage</p>
            <p className="text-base text-gray-900 mt-1">
              {vehicleInfo.mileage.toLocaleString('tr-TR')} km
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Fuel Type</p>
            <p className="text-base text-gray-900 mt-1">{vehicleInfo.fuelType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Transmission</p>
            <p className="text-base text-gray-900 mt-1">{vehicleInfo.transmission}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
