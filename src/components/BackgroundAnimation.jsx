import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-coral-200 via-rose-200 to-pink-200 dark:from-coral-800/60 dark:via-rose-800/60 dark:to-pink-800/60 rounded-full opacity-40 animate-float shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Enhanced gradient orbs with better dark mode */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-coral-100/60 via-rose-100/60 to-pink-100/60 dark:from-coral-900/20 dark:via-rose-900/20 dark:to-pink-900/20 rounded-full blur-3xl opacity-50 animate-pulse-slow shadow-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-sage-100/60 via-coral-100/60 to-rose-100/60 dark:from-sage-900/20 dark:via-coral-900/20 dark:to-rose-900/20 rounded-full blur-3xl opacity-40 animate-pulse-slow shadow-2xl" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-rose-100/60 via-pink-100/60 to-purple-100/60 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-45 animate-pulse-slow shadow-2xl" style={{ animationDelay: '8s' }} />

      {/* Enhanced flowing waves */}
      <div className="absolute bottom-0 left-0 w-full h-40 opacity-20 dark:opacity-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            className="animate-wave"
          />
          <path
            d="M0,80 C300,140 600,20 900,80 C1050,110 1150,50 1200,80 L1200,120 L0,120 Z"
            fill="url(#wave-gradient-2)"
            className="animate-wave"
            style={{ animationDelay: '2s', animationDuration: '12s' }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.6" />
              <stop offset="33%" stopColor="#ff8e8e" stopOpacity="0.4" />
              <stop offset="66%" stopColor="#ffa8a8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a8e6cf" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a8e6cf" stopOpacity="0.3" />
              <stop offset="33%" stopColor="#ffa8a8" stopOpacity="0.4" />
              <stop offset="66%" stopColor="#ff8e8e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Additional ambient effects */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`ambient-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-white to-coral-200 dark:from-gray-600 dark:to-coral-800 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;