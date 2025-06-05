import React from 'react';
import { DetectionResult } from '../types';
import { AlertTriangle, Check, Flame, Clock } from 'lucide-react';
import clsx from 'clsx';

interface ResultsCardProps {
  result: DetectionResult | null;
  isLoading: boolean;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ result, isLoading }) => {
  if (!result && !isLoading) return null;

  // Status-based color mapping
  const getStatusColor = (status: DetectionResult['status']) => {
    switch (status) {
      case 'Fire':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'Smoke':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'No Fire':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  // Status icon
  const StatusIcon = () => {
    if (!result?.status) return null;
    
    switch (result.status) {
      case 'Fire':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'Smoke':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'No Fire':
        return <Check className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-52 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-52">
            <img
              src={result.imageUrl}
              alt="Analyzed image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Detection Results</h3>
          
          {result.status && (
            <div className={clsx(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border",
              getStatusColor(result.status)
            )}>
              <StatusIcon />
              <span className="font-medium">{result.status}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span className="font-medium">Confidence:</span> 
              <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={clsx(
                    "h-2.5 rounded-full",
                    result.status === 'Fire' ? 'bg-red-500' : 
                    result.status === 'Smoke' ? 'bg-amber-500' : 'bg-green-500'
                  )}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <span>{result.confidence}%</span>
            </p>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Analyzed at {result.timestamp}</span>
            </p>
          </div>
          
          <div className="pt-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            {result.status === 'Fire' && (
              <p className="text-red-600 dark:text-red-400">⚠️ High risk detected! Immediate action recommended.</p>
            )}
            {result.status === 'Smoke' && (
              <p className="text-amber-600 dark:text-amber-400">⚠️ Potential risk detected. Further investigation needed.</p>
            )}
            {result.status === 'No Fire' && (
              <p className="text-green-600 dark:text-green-400">✓ No immediate risk detected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};