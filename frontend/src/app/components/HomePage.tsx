import { Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface HomePageProps {
  onNavigateToDashboard: () => void;
}

export function HomePage({ onNavigateToDashboard }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* Logo/Title area */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-normal text-gray-900">Car Value AI</h1>
          </div>
          <p className="text-gray-500 text-sm">
            AI-based Fair Market Value & Risk Analysis
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Paste car listing URL or enter vehicle details"
            className="w-full h-14 px-6 text-base border-2 border-gray-200 rounded-full shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            variant="default" 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full"
            onClick={onNavigateToDashboard}
          >
            Analyze Listing URL
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-8 rounded-full"
            onClick={onNavigateToDashboard}
          >
            Manual Vehicle Entry
          </Button>
        </div>

        {/* Subtle feature hints */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">AI-Powered Analysis</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Market Trends</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Risk Assessment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
