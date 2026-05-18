import { Card } from '@/app/components/ui/card';
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

interface AISummaryCardProps {
  warnings: string[];
  positives: string[];
  summary: string;
}

export function AISummaryCard({ warnings, positives, summary }: AISummaryCardProps) {
  return (
    <Card className="p-6 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-normal text-gray-900">AI Analysis Summary</h3>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-4">
          <div className="space-y-2">
            {warnings.map((warning, index) => (
              <div 
                key={index} 
                className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg"
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positives */}
      {positives.length > 0 && (
        <div className="mb-4">
          <div className="space-y-2">
            {positives.map((positive, index) => (
              <div 
                key={index} 
                className="flex items-start gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{positive}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Summary Text */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
          {summary}
        </p>
      </div>
    </Card>
  );
}
