import React, { useState } from 'react';
import { Bell, BellOff, Calendar, Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  remindersEnabled: boolean;
  onToggleReminders: (enabled: boolean) => void;
  cycleLength: number;
  periodLength: number;
  onUpdateSettings: (cycleLength: number, periodLength: number) => void;
}

const Settings: React.FC<SettingsProps> = ({
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isDark ? 'bg-coral-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Period Reminders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get notified 1 day before your period</p>
            </div>
            <button
              onClick={() => remindersEnabled ? onToggleReminders(false) : requestNotificationPermission()}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                remindersEnabled ? 'bg-coral-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  remindersEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Cycle Settings */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Cycle Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Cycle Length (days)
              </label>
              <input
                type="number"
                min="21"
                max="35"
                value={localCycleLength}
                onChange={(e) => setLocalCycleLength(parseInt(e.target.value) || 28)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Period Length (days)
              </label>
              <input
                type="number"
                min="3"
                max="8"
                value={localPeriodLength}
                onChange={(e) => setLocalPeriodLength(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
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
            className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors duration-200 flex items-center space-x-2"
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