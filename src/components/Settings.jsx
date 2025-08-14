import React, { useState } from 'react';
import { Bell, BellOff, Calendar, Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = ({
  isOpen,
  onClose,
  remindersEnabled,
  onToggleReminders,
  cycleLength,
  periodLength,
  onUpdateSettings
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [localCycleLength, setLocalCycleLength] = useState(cycleLength);
  const [localPeriodLength, setLocalPeriodLength] = useState(periodLength);

  const handleSave = () => {
    onUpdateSettings(localCycleLength, localPeriodLength);
    onClose();
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        onToggleReminders(true);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md transform animate-in slide-in-from-bottom-4 duration-500 border border-rose-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-90 transform"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between group">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Switch between light and dark themes</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 transform hover:scale-110 shadow-lg ${
                isDark ? 'bg-gradient-to-r from-coral-500 to-rose-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-500 shadow-md ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between group">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Period Reminders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Get notified 1 day before your period</p>
            </div>
            <button
              onClick={() => remindersEnabled ? onToggleReminders(false) : requestNotificationPermission()}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 transform hover:scale-110 shadow-lg ${
                remindersEnabled ? 'bg-gradient-to-r from-coral-500 to-rose-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-500 shadow-md ${
                  remindersEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Cycle Settings */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Cycle Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Average Cycle Length (days)
              </label>
              <input
                type="number"
                min="21"
                max="35"
                value={localCycleLength}
                onChange={(e) => setLocalCycleLength(parseInt(e.target.value) || 28)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-md backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Average Period Length (days)
              </label>
              <input
                type="number"
                min="3"
                max="8"
                value={localPeriodLength}
                onChange={(e) => setLocalPeriodLength(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-md backdrop-blur-sm"
              />
            </div>
          </div>
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
            className="px-4 py-2 bg-gradient-to-r from-coral-500 to-rose-500 text-white rounded-lg hover:from-coral-600 hover:to-rose-600 transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform shadow-lg hover:shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;