import { useState } from 'react';
import { HomePage } from '@/app/components/HomePage';
import { Dashboard } from '@/app/components/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  return (
    <div className="font-sans">
      {currentView === 'home' ? (
        <HomePage onNavigateToDashboard={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard onNavigateToHome={() => setCurrentView('home')} />
      )}
    </div>
  );
}
