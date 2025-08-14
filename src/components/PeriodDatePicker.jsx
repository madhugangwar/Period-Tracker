import React, { useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { format } from '../utils/dateUtils';

const PeriodDatePicker = ({
  isOpen,
  onClose,
  onSave,
  initialStartDate,
  initialEndDate
}) => {
  const [startDate, setStartDate] = useState(initialStartDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(initialEndDate || '');

  const handleSave = () => {
    if (startDate && endDate && new Date(endDate) >= new Date(startDate)) {
      onSave(startDate, endDate);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md transform animate-in slide-in-from-bottom-4 duration-500 border border-rose-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-coral-100 to-rose-100 dark:from-coral-900/50 dark:to-rose-900/50 p-2 rounded-full">
              <Calendar className="w-5 h-5 text-coral-600 dark:text-coral-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Add Period Dates</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-90 transform"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Period Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-md backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Period End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-md backdrop-blur-sm"
            />
          </div>

          {startDate && endDate && (
            <div className="bg-gradient-to-r from-coral-50 to-rose-50 dark:from-coral-900/20 dark:to-rose-900/20 border border-coral-200 dark:border-coral-800 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300 backdrop-blur-sm">
              <p className="text-coral-700 dark:text-coral-300 text-sm">
                Period duration: {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 transform"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!startDate || !endDate || new Date(endDate) < new Date(startDate)}
            className="px-4 py-2 bg-gradient-to-r from-coral-500 to-rose-500 text-white rounded-lg hover:from-coral-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform shadow-lg hover:shadow-xl disabled:hover:scale-100"
          >
            <Check className="w-4 h-4" />
            <span>Save Period</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodDatePicker;