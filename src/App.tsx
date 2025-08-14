import React, { useState, useEffect } from 'react';
import { Calendar, BarChart3, Heart, Lightbulb } from 'lucide-react';
import CalendarView from './components/CalendarView';
import StatsView from './components/StatsView';
import SymptomTracker from './components/SymptomTracker';
import TipsView from './components/TipsView';
import Settings from './components/Settings';
import Header from './components/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { useNotifications } from './hooks/useNotifications';
import BackgroundAnimation from './components/BackgroundAnimation';
import AIChatBot from './components/AIChatBot';
import { PeriodData, CycleData, SymptomData } from './types';
import { calculatePredictions, getCycleStats } from './utils/calculations';
import { addDays } from './utils/dateUtils';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'calendar' | 'stats' | 'symptoms' | 'tips'>('calendar');
  const [periodData, setPeriodData] = useState<PeriodData[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(() => {
    const saved = localStorage.getItem('remindersEnabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [cycleLength, setCycleLength] = useState(() => {
    const saved = localStorage.getItem('cycleLength');
    return saved ? parseInt(saved) : 28;
  });
  const [periodLength, setPeriodLength] = useState(() => {
    const saved = localStorage.getItem('periodLength');
    return saved ? parseInt(saved) : 5;
  });

  const predictions = calculatePredictions(periodData);
  const stats = getCycleStats(periodData);

  // Use notifications hook
  useNotifications(predictions, remindersEnabled);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPeriods = localStorage.getItem('periodData');
    const savedSymptoms = localStorage.getItem('symptomData');
    
    if (savedPeriods) {
      setPeriodData(JSON.parse(savedPeriods));
    }
    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('periodData', JSON.stringify(periodData));
  }, [periodData]);

  useEffect(() => {
    localStorage.setItem('symptomData', JSON.stringify(symptoms));
  }, [symptoms]);

  useEffect(() => {
    localStorage.setItem('remindersEnabled', JSON.stringify(remindersEnabled));
  }, [remindersEnabled]);

  useEffect(() => {
    localStorage.setItem('cycleLength', cycleLength.toString());
  }, [cycleLength]);

  useEffect(() => {
    localStorage.setItem('periodLength', periodLength.toString());
  }, [periodLength]);

  const updateSettings = (newCycleLength: number, newPeriodLength: number) => {
    setCycleLength(newCycleLength);
    setPeriodLength(newPeriodLength);
  };

  const togglePeriodDay = (date: string) => {
    setPeriodData(prev => {
      const exists = prev.find(p => p.date === date);
      if (exists) {
        return prev.filter(p => p.date !== date);
      } else {
        return [...prev, { date, flow: 'medium' }].sort((a, b) => a.date.localeCompare(b.date));
      }
    });
  };

  const updateFlowIntensity = (date: string, flow: 'light' | 'medium' | 'heavy') => {
    setPeriodData(prev => 
      prev.map(p => p.date === date ? { ...p, flow } : p)
    );
  };

  const addPeriodRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const newPeriods: PeriodData[] = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (!periodData.find(p => p.date === dateStr)) {
        newPeriods.push({ date: dateStr, flow: 'medium' });
      }
    }
    
    setPeriodData(prev => [...prev, ...newPeriods].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const addSymptom = (date: string, symptom: string) => {
    setSymptoms(prev => {
      const existingIndex = prev.findIndex(s => s.date === date);
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        const updatedSymptoms = existing.symptoms.includes(symptom)
          ? existing.symptoms.filter(s => s !== symptom)
          : [...existing.symptoms, symptom];
        
        if (updatedSymptoms.length === 0) {
          return prev.filter(s => s.date !== date);
        }
        
        const updated = [...prev];
        updated[existingIndex] = { ...existing, symptoms: updatedSymptoms };
        return updated;
      } else {
        return [...prev, { date, symptoms: [symptom] }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 relative">
      <BackgroundAnimation />
      <Header onOpenSettings={() => setShowSettings(true)} />
      
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-rose-100 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'symptoms', label: 'Symptoms', icon: Heart },
              { id: 'stats', label: 'Statistics', icon: BarChart3 },
              { id: 'tips', label: 'Tips', icon: Lightbulb }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 ${
                  currentView === id
                    ? 'border-coral-500 text-coral-600 dark:text-coral-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-coral-500 dark:hover:text-coral-400 hover:border-coral-300 hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'calendar' && (
          <CalendarView
            periodData={periodData}
            predictions={predictions}
            symptoms={symptoms}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onTogglePeriodDay={togglePeriodDay}
            onUpdateFlow={updateFlowIntensity}
            onAddPeriodRange={addPeriodRange}
          />
        )}
        
        {currentView === 'symptoms' && (
          <SymptomTracker
            symptoms={symptoms}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onAddSymptom={addSymptom}
          />
        )}
        
        {currentView === 'stats' && (
          <StatsView
            stats={stats}
            periodData={periodData}
            predictions={predictions}
          />
        )}
        
        {currentView === 'tips' && (
          <TipsView />
        )}
      </main>
      
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        remindersEnabled={remindersEnabled}
        onToggleReminders={setRemindersEnabled}
        cycleLength={cycleLength}
        periodLength={periodLength}
        onUpdateSettings={updateSettings}
      />
      
      <AIChatBot />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;