import React, { useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { format } from '../utils/dateUtils';

interface PeriodDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (startDate: string, endDate: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

const PeriodDatePicker: React.FC<PeriodDatePickerProps> = ({
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-coral-100 dark:bg-coral-900 p-2 rounded-full">
              <Calendar className="w-5 h-5 text-coral-600 dark:text-coral-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Period Dates</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Period Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Period End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {startDate && endDate && (
            <div className="bg-coral-50 dark:bg-coral-900/20 border border-coral-200 dark:border-coral-800 rounded-lg p-4 animate-in slide-in-from-top-2 duration-200">
              <p className="text-coral-700 dark:text-coral-300 text-sm">
                Period duration: {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!startDate || !endDate || new Date(endDate) < new Date(startDate)}
            className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
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