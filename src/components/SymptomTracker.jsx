import { Heart, Zap, Brain, Thermometer, Moon, Smile, Frown, Meh } from 'lucide-react';
import { format } from '../utils/dateUtils';

const SymptomTracker = ({
  symptoms,
  selectedDate,
  onDateSelect,
  onAddSymptom
}) => {
  const symptomCategories = [
    {
      title: 'Physical Symptoms',
      symptoms: [
        { name: 'Cramps', icon: Zap, color: 'text-red-500' },
        { name: 'Headache', icon: Brain, color: 'text-purple-500' },
        { name: 'Bloating', icon: Heart, color: 'text-blue-500' },
        { name: 'Breast Tenderness', icon: Heart, color: 'text-pink-500' },
        { name: 'Back Pain', icon: Zap, color: 'text-orange-500' },
        { name: 'Fatigue', icon: Moon, color: 'text-indigo-500' },
      ]
    },
    {
      title: 'Emotional Symptoms',
      symptoms: [
        { name: 'Happy', icon: Smile, color: 'text-green-500' },
        { name: 'Sad', icon: Frown, color: 'text-blue-500' },
        { name: 'Irritable', icon: Frown, color: 'text-red-500' },
        { name: 'Anxious', icon: Brain, color: 'text-yellow-500' },
        { name: 'Mood Swings', icon: Meh, color: 'text-purple-500' },
      ]
    }
  ];

  const selectedSymptoms = symptoms.find(s => s.date === selectedDate)?.symptoms || [];

  const isSymptomSelected = (symptom) => {
    return selectedSymptoms.includes(symptom);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Symptom Tracker</h2>
        <p className="text-gray-600 dark:text-white mt-1">
          Track symptoms and mood for {format(new Date(selectedDate), 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateSelect(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
        />
      </div>

      {symptomCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.symptoms.map((symptom, index) => {
              const Icon = symptom.icon;
              const isSelected = isSymptomSelected(symptom.name);

              return (
                <button
                  key={index}
                  onClick={() => onAddSymptom(selectedDate, symptom.name)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-coral-300 bg-coral-50 shadow-lg scale-105 animate-pulse'
                      : 'border-gray-200 hover:border-coral-200 hover:bg-coral-50 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-3 rounded-full ${isSelected ? 'bg-coral-100' : 'bg-gray-100'}`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-coral-600' : symptom.color}`} />
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? 'text-coral-700' : 'text-gray-700'}`}>
                      {symptom.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedSymptoms.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-coral-100 text-coral-700"
              >
                {symptom}
                <button
                  onClick={() => onAddSymptom(selectedDate, symptom)}
                  className="ml-2 text-coral-500 hover:text-coral-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomTracker;
