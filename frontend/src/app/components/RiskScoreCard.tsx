import { Card } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';

interface RiskScoreCardProps {
  score: number;
}

export function RiskScoreCard({ score }: RiskScoreCardProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { label: 'Low', color: 'text-green-600' };
    if (score <= 50) return { label: 'Medium-Low', color: 'text-yellow-600' };
    if (score <= 70) return { label: 'Medium-High', color: 'text-orange-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const riskLevel = getRiskLevel(score);

  return (
    <Card className="p-6 shadow-sm h-full">
      <h3 className="text-lg font-normal text-gray-900 mb-6">Risk Score</h3>

      {/* Circular progress indicator */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={score <= 30 ? '#22c55e' : score <= 50 ? '#eab308' : score <= 70 ? '#f97316' : '#ef4444'}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* Score text in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-normal text-gray-900">{score}</span>
            <span className="text-sm text-gray-500">/ 100</span>
          </div>
        </div>

        <p className={`mt-4 text-lg font-normal ${riskLevel.color}`}>
          {riskLevel.label} Risk
        </p>
      </div>

      {/* Risk breakdown */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Technical Issues</span>
            <span className="text-gray-900">25%</span>
          </div>
          <Progress value={25} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Price Risk</span>
            <span className="text-gray-900">15%</span>
          </div>
          <Progress value={15} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Market Risk</span>
            <span className="text-gray-900">22%</span>
          </div>
          <Progress value={22} className="h-2" />
        </div>
      </div>
    </Card>
  );
}
