import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Droplet, Heart, Circle, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from '../utils/dateUtils';
import PeriodDatePicker from './PeriodDatePicker';

const CalendarView = ({
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

  const getPeriodData = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return periodData.find(p => p.date === dateStr);
  };

  const getSymptoms = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return symptoms.find(s => s.date === dateStr);
  };

  const isPredictedPeriod = (date) => {
    if (!predictions) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr >= predictions.nextPeriodStart && dateStr <= predictions.nextPeriodEnd;
  };

  const isPredictedOvulation = (date) => {
    if (!predictions) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr === predictions.ovulationDate;
  };

  const isFertilityWindow = (date) => {
    if (!predictions) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr >= predictions.fertilityWindow.start && dateStr <= predictions.fertilityWindow.end;
  };

  const getFlowColor = (flow) => {
    switch (flow) {
      case 'light': return 'bg-coral-200 text-coral-700';
      case 'medium': return 'bg-coral-400 text-white';
      case 'heavy': return 'bg-coral-600 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const handleAddPeriodRange = (startDate, endDate) => {
    onAddPeriodRange(startDate, endDate);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">Track your cycle and symptoms</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDatePicker(true)}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-coral-500 to-rose-500 text-white rounded-lg hover:from-coral-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
          >
            <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-medium">Add Period</span>
          </button>
          
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 transform hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 transform hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-rose-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="grid grid-cols-7 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-700 dark:to-gray-600">
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
                className={`relative p-4 border-b border-r border-rose-50 dark:border-gray-600 min-h-[80px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:z-10 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 ${
                  isSelected ? 'bg-coral-50 dark:bg-coral-900/30 ring-2 ring-coral-300 dark:ring-coral-600 shadow-lg' : ''
                } ${!isSameMonth(date, currentMonth) ? 'text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/50' : ''}`}
                onClick={() => onDateSelect(dateStr)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium transition-all duration-300 ${
                      isToday ? 'text-coral-600 dark:text-coral-400 font-bold animate-pulse bg-coral-100 dark:bg-coral-900/50 px-2 py-1 rounded-full' : 'text-gray-700 dark:text-gray-300'
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
                          className={`w-6 h-6 rounded-full ${getFlowColor(periodInfo.flow)} flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-lg transform`}
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
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sage-200 to-sage-300 dark:from-sage-800 dark:to-sage-700 flex items-center justify-center animate-bounce shadow-lg">
                          <Circle className="w-3 h-3 text-sage-700 dark:text-sage-300" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    {isFertile && !isOvulation && (
                      <div className="w-full h-1 bg-gradient-to-r from-sage-200 to-sage-300 dark:from-sage-700 dark:to-sage-600 rounded-full animate-pulse shadow-sm"></div>
                    )}
                    
                    {symptomInfo && symptomInfo.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {symptomInfo.symptoms.slice(0, 2).map(symptom => (
                          <div
                            key={symptom}
                            className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 dark:from-rose-500 dark:to-pink-500 rounded-full animate-pulse shadow-sm"
                          />
                        ))}
                        {symptomInfo.symptoms.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1 rounded">+{symptomInfo.symptoms.length - 2}</span>
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
                    className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-gradient-to-br from-coral-50/80 to-rose-50/80 dark:from-coral-900/30 dark:to-rose-900/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
                  >
                    <Droplet className="w-5 h-5 text-coral-400 dark:text-coral-500 animate-bounce drop-shadow-lg" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-rose-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 group">
            <div className="w-6 h-6 rounded-full bg-coral-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Droplet className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Period Day</span>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="w-6 h-6 rounded-full bg-coral-100 dark:bg-coral-900/40 border-2 border-coral-300 dark:border-coral-600 border-dashed flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Droplet className="w-3 h-3 text-coral-400 dark:text-coral-500" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Predicted Period</span>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sage-200 to-sage-300 dark:from-sage-800 dark:to-sage-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Circle className="w-3 h-3 text-sage-700 dark:text-sage-300" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Ovulation</span>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="w-6 h-2 bg-gradient-to-r from-sage-200 to-sage-300 dark:from-sage-700 dark:to-sage-600 rounded-full transition-transform duration-300 group-hover:scale-110"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Fertility Window</span>
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