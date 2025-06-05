import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Forest Fire Detection</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};