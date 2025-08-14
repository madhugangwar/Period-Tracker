import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Droplet, Heart, Circle, Plus } from 'lucide-react';
import { PeriodData, SymptomData, PredictionData } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from '../utils/dateUtils';
import PeriodDatePicker from './PeriodDatePicker';

interface CalendarViewProps {
  periodData: PeriodData[];
  predictions: PredictionData | null;
  symptoms: SymptomData[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onTogglePeriodDay: (date: string) => void;
  onUpdateFlow: (date: string, flow: 'light' | 'medium' | 'heavy') => void;
  onAddPeriodRange: (startDate: string, endDate: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  periodData,
  predictions,
  symptoms,
  selectedDate,
  onDateSelect,
  onTogglePeriodDay,
  onUpdateFlow,
  onAddPeriodRange
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPeriodData = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return periodData.find(p => p.date === dateStr);
  };

  const getSymptoms = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return symptoms.find(s => s.date === dateStr);
  };

  const isPredictedPeriod = (date: Date) => {
    if (!predictions) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr >= predictions.nextPeriodStart && dateStr <= predictions.nextPeriodEnd;
  };

  const isPredictedOvulation = (date: Date) => {
    if (!predictions) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr === predictions.ovulationDate;
  };

  const isFertilityWindow = (date: Date) => {
    if (!predictions) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr >= predictions.fertilityWindow.start && dateStr <= predictions.fertilityWindow.end;
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light': return 'bg-coral-200 text-coral-700';
      case 'medium': return 'bg-coral-400 text-white';
      case 'heavy': return 'bg-coral-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const handleAddPeriodRange = (startDate: string, endDate: string) => {
    onAddPeriodRange(startDate, endDate);
  };

  const today = new Date();
  const isCurrentMonth = isSameMonth(currentMonth, today);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <p className="text-gray-600 mt-1">Track your cycle and symptoms</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Add Period</span>
          </button>
          
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-rose-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        <div className="grid grid-cols-7 bg-rose-50 dark:bg-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{day}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {days.map(date => {
            const periodInfo = getPeriodData(date);
            const symptomInfo = getSymptoms(date);
            const dateStr = format(date, 'yyyy-MM-dd');
            const isSelected = dateStr === selectedDate;
            const isToday = isSameDay(date, new Date());
            const isPeriodPredicted = isPredictedPeriod(date);
            const isOvulation = isPredictedOvulation(date);
            const isFertile = isFertilityWindow(date);
            
            return (
              <div
                key={dateStr}
                className={`relative p-4 border-b border-r border-rose-50 dark:border-gray-600 min-h-[80px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:z-10 ${
                  isSelected ? 'bg-coral-50 dark:bg-coral-900/20 ring-2 ring-coral-300 dark:ring-coral-600' : 'hover:bg-rose-50 dark:hover:bg-gray-700'
                } ${!isSameMonth(date, currentMonth) ? 'text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800' : ''}`}
                onClick={() => onDateSelect(dateStr)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      isToday ? 'text-coral-600 dark:text-coral-400 font-bold animate-pulse' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {format(date, 'd')}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      {periodInfo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onTogglePeriodDay(dateStr);
                          }}
                          className={`w-6 h-6 rounded-full ${getFlowColor(periodInfo.flow)} flex items-center justify-center transition-all duration-200 hover:scale-110`}
                        >
                          <Droplet className="w-3 h-3" />
                        </button>
                      )}
                      
                      {!periodInfo && isPeriodPredicted && (
                        <div className="w-6 h-6 rounded-full bg-coral-100 dark:bg-coral-900/40 border-2 border-coral-300 dark:border-coral-600 border-dashed flex items-center justify-center animate-pulse">
                          <Droplet className="w-3 h-3 text-coral-400 dark:text-coral-500" />
                        </div>
                      )}
                      
                      {isOvulation && (
                        <div className="w-6 h-6 rounded-full bg-sage-200 dark:bg-sage-800 flex items-center justify-center animate-bounce">
                          <Circle className="w-3 h-3 text-sage-700 dark:text-sage-300" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    {isFertile && !isOvulation && (
                      <div className="w-full h-1 bg-sage-200 dark:bg-sage-700 rounded-full animate-pulse"></div>
                    )}
                    
                    {symptomInfo && symptomInfo.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {symptomInfo.symptoms.slice(0, 2).map(symptom => (
                          <div
                            key={symptom}
                            className="w-2 h-2 bg-rose-400 dark:bg-rose-500 rounded-full animate-pulse"
                          />
                        ))}
                        {symptomInfo.symptoms.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">+{symptomInfo.symptoms.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {!periodInfo && isSameMonth(date, currentMonth) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePeriodDay(dateStr);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-coral-50 dark:bg-coral-900/20 flex items-center justify-center transition-all duration-200"
                  >
                    <Droplet className="w-5 h-5 text-coral-400 dark:text-coral-500 animate-bounce" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-rose-100 dark:border-gray-700 p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-coral-400 flex items-center justify-center">
              <Droplet className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Period Day</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-coral-100 dark:bg-coral-900/40 border-2 border-coral-300 dark:border-coral-600 border-dashed flex items-center justify-center">
              <Droplet className="w-3 h-3 text-coral-400 dark:text-coral-500" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Predicted Period</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-sage-200 dark:bg-sage-800 flex items-center justify-center">
              <Circle className="w-3 h-3 text-sage-700 dark:text-sage-300" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Ovulation</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-2 bg-sage-200 dark:bg-sage-700 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Fertility Window</span>
          </div>
        </div>
      </div>
      
      <PeriodDatePicker
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSave={handleAddPeriodRange}
      />
    </div>
  );
};

export default CalendarView;