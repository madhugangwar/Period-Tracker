import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Heart } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Luna, your period wellness companion. I'm here to help you feel better during your cycle. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Pain and cramps
    if (lowerMessage.includes('pain') || lowerMessage.includes('cramp') || lowerMessage.includes('hurt')) {
      const responses = [
        "I'm sorry you're experiencing pain. Try applying a heating pad to your lower abdomen for 15-20 minutes. Gentle stretching or yoga can also help relieve cramps. Would you like some specific pose suggestions?",
        "Period pain can be tough. Consider taking a warm bath with Epsom salts, or try some light walking to improve circulation. Staying hydrated is also important. How severe is your pain on a scale of 1-10?",
        "For natural pain relief, try ginger tea or chamomile tea - both have anti-inflammatory properties. Deep breathing exercises can also help manage pain. Remember, severe pain isn't normal, so consult a doctor if it's unbearable."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Mood and emotions
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('emotional')) {
      const responses = [
        "It's completely normal to feel emotional during your cycle. Hormonal changes can affect your mood. Try some self-care activities like listening to music, journaling, or calling a friend. You're not alone in this. 💕",
        "Period blues are real! Consider doing something that brings you joy - maybe watching a favorite movie, taking a relaxing bath, or practicing mindfulness. Your feelings are valid, and this will pass.",
        "Emotional ups and downs during your cycle are totally normal. Try to be gentle with yourself. Some light exercise, like a walk in nature, can help boost your mood naturally."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Fatigue and tiredness
    if (lowerMessage.includes('tired') || lowerMessage.includes('fatigue') || lowerMessage.includes('exhausted') || lowerMessage.includes('energy')) {
      const responses = [
        "Period fatigue is so common! Make sure you're getting enough iron-rich foods like spinach and lean meats. Also, try to get 7-9 hours of sleep and don't feel guilty about resting more during your cycle.",
        "Low energy during your period is normal. Stay hydrated, eat regular meals with complex carbs, and consider gentle movement like stretching. Listen to your body - it's okay to take things slower.",
        "Your body is working hard during your cycle! Prioritize rest, eat nourishing foods, and consider a B-vitamin complex (after consulting your doctor). Remember, this fatigue is temporary."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Bloating
    if (lowerMessage.includes('bloat') || lowerMessage.includes('swollen') || lowerMessage.includes('puffy')) {
      const responses = [
        "Bloating during your period is so frustrating! Try reducing salt intake, drinking plenty of water, and eating potassium-rich foods like bananas. Peppermint tea can also help with digestion.",
        "Period bloating is caused by hormonal changes. Gentle yoga poses like child's pose or knee-to-chest can help. Also, try to avoid carbonated drinks and eat smaller, more frequent meals.",
        "To reduce bloating, focus on anti-inflammatory foods like berries and leafy greens. A warm compress on your abdomen can also provide relief. Remember, this is temporary!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // General support and encouragement
    if (lowerMessage.includes('better') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
      const responses = [
        "You're taking great care of yourself by tracking your cycle! Remember that every period is different, and it's important to listen to your body. What specific area would you like help with today?",
        "I'm here to support you through your cycle journey. Whether it's pain management, mood support, or just someone to talk to, I've got you covered. What's on your mind?",
        "You're doing amazing by being proactive about your health! Self-care during your period isn't selfish - it's necessary. How can I help make your day a little brighter?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      const responses = [
        "Hello! I'm so glad you're here. How are you feeling today? I'm here to help with any period-related concerns or just to chat if you need support. 🌸",
        "Hi there! Welcome back. Whether you're dealing with cramps, mood changes, or just need someone to talk to, I'm here for you. What's going on today?",
        "Hey! It's great to see you. I'm here to provide support, tips, and encouragement during your cycle. How can I help you feel better today?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default responses
    const defaultResponses = [
      "I understand you're going through something. Can you tell me more about how you're feeling? I'm here to help with period-related concerns, pain management, or just provide emotional support.",
      "Thank you for sharing with me. Every person's cycle experience is unique. Whether you need practical tips or just someone to listen, I'm here for you. What would be most helpful right now?",
      "I hear you. Your feelings and experiences are completely valid. I'm here to provide support, whether that's wellness tips, pain relief suggestions, or just a caring conversation. How can I best support you today?",
      "It sounds like you might be going through a tough time. Remember that you're strong and this is temporary. I'm here to help however I can - whether with practical advice or just emotional support. What's weighing on your mind?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-coral-500 to-rose-500 text-white p-4 rounded-full shadow-2xl hover:shadow-coral-500/25 transition-all duration-300 hover:scale-110 animate-bounce-gentle ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-rose-100 dark:border-gray-700 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-rose-100 dark:border-gray-700 bg-gradient-to-r from-coral-50 to-rose-50 dark:from-coral-900/20 dark:to-rose-900/20 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-coral-500 to-rose-500 p-2 rounded-full animate-pulse">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Luna</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Your wellness companion</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-200`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${message.isUser ? 'bg-coral-100 dark:bg-coral-900' : 'bg-rose-100 dark:bg-rose-900'}`}>
                    {message.isUser ? (
                      <User className="w-4 h-4 text-coral-600 dark:text-coral-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-coral-500 to-rose-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900">
                    <Bot className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-rose-100 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How are you feeling today?"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-2 bg-gradient-to-r from-coral-500 to-rose-500 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;