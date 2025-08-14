import React from 'react';
import { Droplet, Moon, Sun, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-rose-100 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-coral-500 to-rose-500 p-3 rounded-full animate-pulse">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FlowTracker</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your personal period companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-12"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-12"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="bg-sage-100 dark:bg-sage-900 px-4 py-2 rounded-full animate-in slide-in-from-right duration-300">
              <div className="flex items-center space-x-2 text-sage-700 dark:text-sage-300">
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Cycle Day 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;