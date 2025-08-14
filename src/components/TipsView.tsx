import React, { useState } from 'react';
import { Heart, AlertTriangle, Coffee, Droplet, Moon, Thermometer, Activity, Shield, CheckCircle, XCircle } from 'lucide-react';

const TipsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'relief' | 'avoid'>('relief');

  const painReliefTips = [
    {
      category: 'Heat Therapy',
      icon: Thermometer,
      color: 'text-orange-500',
      tips: [
        'Apply a heating pad to your lower abdomen or back for 15-20 minutes',
        'Take a warm bath with Epsom salts to relax muscles',
        'Use heat patches for on-the-go relief',
        'Try a warm compress on your lower back'
      ]
    },
    {
      category: 'Natural Remedies',
      icon: Heart,
      color: 'text-green-500',
      tips: [
        'Drink ginger tea to reduce inflammation and nausea',
        'Try chamomile tea for its anti-inflammatory properties',
        'Take magnesium supplements (consult your doctor first)',
        'Use essential oils like lavender or peppermint for aromatherapy'
      ]
    },
    {
      category: 'Physical Activity',
      icon: Activity,
      color: 'text-blue-500',
      tips: [
        'Do gentle yoga poses like child\'s pose or cat-cow stretches',
        'Take light walks to improve blood circulation',
        'Try pelvic tilts to relieve lower back pain',
        'Practice deep breathing exercises to reduce stress'
      ]
    },
    {
      category: 'Hydration & Nutrition',
      icon: Droplet,
      color: 'text-cyan-500',
      tips: [
        'Drink plenty of water to reduce bloating',
        'Eat foods rich in omega-3 fatty acids like salmon',
        'Include anti-inflammatory foods like berries and leafy greens',
        'Consider herbal teas like raspberry leaf or nettle'
      ]
    },
    {
      category: 'Rest & Self-Care',
      icon: Moon,
      color: 'text-purple-500',
      tips: [
        'Get adequate sleep (7-9 hours) to help your body recover',
        'Practice meditation or mindfulness to manage pain',
        'Use a supportive pillow between your knees when sleeping',
        'Take warm showers to relax tense muscles'
      ]
    }
  ];

  const thingsToAvoid = [
    {
      category: 'Foods & Drinks',
      icon: Coffee,
      color: 'text-red-500',
      warnings: [
        'Limit caffeine as it can increase anxiety and breast tenderness',
        'Reduce salt intake to minimize bloating and water retention',
        'Avoid excessive sugar which can worsen mood swings',
        'Limit alcohol consumption as it can disrupt sleep and worsen cramps'
      ]
    },
    {
      category: 'Activities to Limit',
      icon: AlertTriangle,
      color: 'text-yellow-500',
      warnings: [
        'Avoid intense workouts if you\'re experiencing severe cramps',
        'Don\'t ignore severe pain - consult a healthcare provider',
        'Limit stress-inducing activities when possible',
        'Avoid sitting or standing in one position for too long'
      ]
    },
    {
      category: 'Medications & Substances',
      icon: Shield,
      color: 'text-indigo-500',
      warnings: [
        'Don\'t exceed recommended doses of pain relievers',
        'Avoid aspirin if you have heavy bleeding (consult your doctor)',
        'Be cautious with blood-thinning medications',
        'Don\'t rely solely on medication - combine with other relief methods'
      ]
    },
    {
      category: 'Lifestyle Habits',
      icon: XCircle,
      color: 'text-gray-500',
      warnings: [
        'Don\'t skip meals as this can worsen mood and energy levels',
        'Avoid tight clothing that can restrict blood flow',
        'Don\'t ignore your body\'s need for rest',
        'Avoid smoking as it can worsen cramps and reduce oxygen flow'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Period Tips & Guidance</h2>
        <p className="text-gray-600 dark:text-white mt-1">Natural remedies and important precautions for your cycle</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <div className="flex border-b border-rose-100">
          <button
            onClick={() => setActiveTab('relief')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
              activeTab === 'relief'
                ? 'bg-green-50 text-green-700 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50 hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Pain Relief Tips</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('avoid')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
              activeTab === 'avoid'
                ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50 hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <XCircle className="w-5 h-5" />
              <span>Things to Avoid</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'relief' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Natural Pain Relief Methods</h3>
                </div>
                <p className="text-green-700 text-sm">
                  These natural remedies can help alleviate period pain and discomfort. Always consult with a healthcare provider for severe symptoms.
                </p>
              </div>

              {painReliefTips.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-white p-2 rounded-full">
                        <Icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-coral-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'avoid' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">Important Precautions</h3>
                </div>
                <p className="text-red-700 text-sm">
                  Avoiding these things can help prevent worsening of period symptoms and promote better overall health during your cycle.
                </p>
              </div>

              {thingsToAvoid.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-white p-2 rounded-full">
                        <Icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.warnings.map((warning, warningIndex) => (
                        <li key={warningIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">When to Seek Medical Help</h4>
            <p className="text-amber-700 text-sm">
              Consult a healthcare provider if you experience severe pain that interferes with daily activities, 
              periods lasting longer than 7 days, bleeding between periods, or sudden changes in your cycle pattern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsView;