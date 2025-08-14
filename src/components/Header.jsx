import React from 'react';
import { Droplet, Moon, Sun, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ onOpenSettings }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border-b border-rose-100 dark:border-gray-700 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 p-3 rounded-full animate-pulse shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 transform">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-coral-600 via-rose-600 to-pink-600 dark:from-coral-400 dark:via-rose-400 dark:to-pink-400 bg-clip-text text-transparent transition-all duration-500">
                FlowTracker
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Your personal period companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-500 hover:scale-110 hover:rotate-180 transform shadow-md hover:shadow-xl"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500 drop-shadow-lg" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <button
              onClick={onOpenSettings}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-500 hover:scale-110 hover:rotate-90 transform shadow-md hover:shadow-xl"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="bg-gradient-to-r from-sage-100 to-sage-200 dark:from-sage-900/50 dark:to-sage-800/50 px-4 py-2 rounded-full animate-in slide-in-from-right duration-500 shadow-lg backdrop-blur-sm border border-sage-200 dark:border-sage-700">
              <div className="flex items-center space-x-2 text-sage-700 dark:text-sage-300">
                <Moon className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Cycle Day 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;