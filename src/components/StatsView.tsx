import React from 'react';
import { Calendar, TrendingUp, Clock, Target } from 'lucide-react';
import { CycleStats, PeriodData, PredictionData } from '../types';
import { format } from '../utils/dateUtils';

interface StatsViewProps {
  stats: CycleStats;
  periodData: PeriodData[];
  predictions: PredictionData | null;
}

const StatsView: React.FC<StatsViewProps> = ({ stats, periodData, predictions }) => {
  const recentPeriods = periodData
    .reduce((acc, period) => {
      const existing = acc.find(p => p.date === period.date);
      if (!existing) {
        acc.push(period);
      }
      return acc;
    }, [] as PeriodData[])
    .slice(-5)
    .reverse();

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light': return 'bg-coral-200';
      case 'medium': return 'bg-coral-400 ';
      case 'heavy': return 'bg-coral-600 ';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cycle Statistics</h2>
        <p className="text-gray-600 dark:text-white mt-1">Track your patterns and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-rose-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="bg-coral-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-coral-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageCycleLength ? `${stats.averageCycleLength} days` : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">Average Cycle</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-rose-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="bg-rose-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averagePeriodLength ? `${stats.averagePeriodLength} days` : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">Average Period</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-rose-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="bg-sage-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCycles}</p>
              <p className="text-sm text-gray-600">Total Cycles</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-rose-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {predictions ? format(new Date(predictions.nextPeriodStart), 'MMM d') : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">Next Period</p>
            </div>
          </div>
        </div>
      </div>

      {predictions && (
        <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-coral-50 rounded-lg p-4">
                <h4 className="font-medium text-coral-700 mb-2">Next Period</h4>
                <p className="text-lg font-bold text-gray-900">
                  {format(new Date(predictions.nextPeriodStart), 'MMM d')} - {format(new Date(predictions.nextPeriodEnd), 'MMM d')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-sage-50 rounded-lg p-4">
                <h4 className="font-medium text-sage-700 mb-2">Ovulation</h4>
                <p className="text-lg font-bold text-gray-900">
                  {format(new Date(predictions.ovulationDate), 'MMM d')}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Fertility Window</h4>
                <p className="text-lg font-bold text-gray-900">
                  {format(new Date(predictions.fertilityWindow.start), 'MMM d')} - {format(new Date(predictions.fertilityWindow.end), 'MMM d')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Periods</h3>
        {recentPeriods.length > 0 ? (
          <div className="space-y-3">
            {recentPeriods.map((period, index) => (
              <div key={period.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getFlowColor(period.flow)}`}></div>
                  <span className="font-medium text-gray-900">
                    {format(new Date(period.date), 'MMMM d, yyyy')}
                  </span>
                </div>
                <span className="text-sm text-gray-600 capitalize">{period.flow} flow</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No period data recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default StatsView;