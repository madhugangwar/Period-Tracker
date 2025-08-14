import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-coral-200 to-rose-200 dark:from-coral-800 dark:to-rose-800 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-coral-100 to-rose-100 dark:from-coral-900/20 dark:to-rose-900/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-sage-100 to-coral-100 dark:from-sage-900/20 dark:to-coral-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-rose-100 to-sage-100 dark:from-rose-900/20 dark:to-sage-900/20 rounded-full blur-3xl opacity-25 animate-pulse-slow" style={{ animationDelay: '6s' }} />

      {/* Flowing waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-10 dark:opacity-5">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            className="animate-wave"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#ff8e8e" />
              <stop offset="100%" stopColor="#a8e6cf" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default BackgroundAnimation;