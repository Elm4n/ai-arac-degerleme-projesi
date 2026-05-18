import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PriceGauge } from '@/app/components/PriceGauge';
import { VehicleInfoCard } from '@/app/components/VehicleInfoCard';
import { AISummaryCard } from '@/app/components/AISummaryCard';
import { RiskScoreCard } from '@/app/components/RiskScoreCard';
import { DecisionTable } from '@/app/components/DecisionTable';

interface DashboardProps {
  onNavigateToHome: () => void;
}

export function Dashboard({ onNavigateToHome }: DashboardProps) {
  // Mock data
  const vehicleInfo = {
    brand: 'BMW',
    model: '320i',
    year: 2018,
    mileage: 85000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    marketTrend: 'stable' as const,
  };

  const warnings = [
    'Painted parts detected',
    'Previous accident record found',
    'Engine repair history',
  ];

  const positives = [
    'Regular maintenance records available',
    'Active warranty coverage',
  ];

  const aiSummary =
    'Although priced within market range, the detected painted parts increase negotiation potential. The vehicle shows consistent maintenance history which is a positive indicator, but the previous accident record should be carefully evaluated.';

  const decisionData = [
    {
      feature: 'Mileage',
      analysis: 'Above Average',
      priceImpact: '-5%',
      dataSource: 'Listing Data',
    },
    {
      feature: 'Accident Record',
      analysis: '15,000 TL repair',
      priceImpact: '-3%',
      dataSource: 'Web Scraping',
    },
    {
      feature: 'Painted Parts',
      analysis: 'Hood',
      priceImpact: '-10%',
      dataSource: 'NLP Analysis',
    },
    {
      feature: 'Market Demand',
      analysis: 'High demand for model',
      priceImpact: '+2%',
      dataSource: 'Market Data',
    },
    {
      feature: 'Warranty',
      analysis: 'Active until 2026',
      priceImpact: '+4%',
      dataSource: 'Listing Data',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onNavigateToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-normal text-gray-900">
              Vehicle Analysis Report
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Price Gauge - Full width */}
        <div className="mb-6">
          <PriceGauge minValue={1800000} maxValue={2300000} currentPrice={2050000} />
        </div>

        {/* Three column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left panel - Vehicle Info */}
          <div>
            <VehicleInfoCard vehicleInfo={vehicleInfo} />
          </div>

          {/* Center panel - AI Summary */}
          <div>
            <AISummaryCard
              warnings={warnings}
              positives={positives}
              summary={aiSummary}
            />
          </div>

          {/* Right panel - Risk Score */}
          <div>
            <RiskScoreCard score={62} />
          </div>
        </div>

        {/* Decision table - Full width */}
        <div>
          <DecisionTable data={decisionData} />
        </div>
      </main>
    </div>
  );
}
