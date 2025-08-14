import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Heart, Sparkles } from 'lucide-react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi there! I'm Luna, your AI wellness companion. I'm here to support you through your menstrual cycle with personalized advice, emotional support, and practical tips. How are you feeling today? 💕",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAdvancedResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Advanced pain and cramps responses
    if (lowerMessage.includes('pain') || lowerMessage.includes('cramp') || lowerMessage.includes('hurt') || lowerMessage.includes('ache')) {
      const painResponses = [
        "I'm really sorry you're dealing with pain right now. That sounds tough. 💙 Let's work through this together - have you tried applying heat? A heating pad on your lower abdomen for 15-20 minutes can work wonders. Also, gentle movement like stretching or a short walk can help release natural pain-relieving endorphins. What kind of pain are you experiencing specifically?",
        "Pain during your cycle is so challenging, and I want you to know that what you're feeling is valid. 🤗 Here's what might help: try some deep breathing exercises (4 counts in, hold for 4, out for 6), take a warm bath with Epsom salts, or gently massage your lower back. On a scale of 1-10, how would you rate your pain? If it's above 7, please consider reaching out to a healthcare provider.",
        "I hear you, and I'm here to help you feel better. 💕 For natural pain relief, try making some ginger tea - it's a powerful anti-inflammatory. You could also try the 'child's pose' yoga position, or place a tennis ball between your back and the wall for a gentle massage. Remember, severe pain isn't something you should have to endure - have you spoken with a doctor about your pain levels?"
      ];
      return painResponses[Math.floor(Math.random() * painResponses.length)];
    }
    
    // Enhanced emotional support
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('emotional') || lowerMessage.includes('cry') || lowerMessage.includes('upset')) {
      const emotionalResponses = [
        "I can hear that you're going through a difficult time emotionally, and I want you to know that these feelings are completely normal and valid. 🌸 Hormonal changes during your cycle can really impact your mood. Would it help to talk about what's specifically making you feel this way? Sometimes just expressing these feelings can provide relief. You're stronger than you know. 💪",
        "Your emotions during your cycle are real and important. It's okay to feel sad or overwhelmed - you're not alone in this. 🤗 Try this: put on your favorite comfort show, make yourself a warm drink, and practice some self-compassion. Treat yourself like you would treat your best friend going through the same thing. What usually brings you comfort when you're feeling down?",
        "I'm sending you virtual hugs right now. 🫂 What you're feeling is part of being human, and it's especially common during your cycle. Have you tried journaling? Sometimes writing down your thoughts can help process these emotions. Also, gentle movement like yoga or even dancing to your favorite song can boost those feel-good hormones. What's one small thing that usually makes you smile?"
      ];
      return emotionalResponses[Math.floor(Math.random() * emotionalResponses.length)];
    }
    
    // Advanced fatigue and energy responses
    if (lowerMessage.includes('tired') || lowerMessage.includes('fatigue') || lowerMessage.includes('exhausted') || lowerMessage.includes('energy') || lowerMessage.includes('sleepy')) {
      const fatigueResponses = [
        "Feeling exhausted during your cycle is so common - your body is doing incredible work right now! 🌙 Let's focus on gentle energy support: make sure you're eating iron-rich foods (spinach, lentils, dark chocolate), stay hydrated, and don't feel guilty about needing more rest. Your body is literally rebuilding itself. How many hours of sleep are you getting? Sometimes even 20 minutes of extra rest can make a difference.",
        "That fatigue is your body's way of asking for care and attention. Listen to it! 💤 Try having a protein-rich snack (like nuts or yogurt), take a 10-minute walk in fresh air if possible, and consider some gentle stretching. B-vitamins can also help with energy (but check with your doctor first). Most importantly, be patient with yourself - this tiredness is temporary. What does your current sleep routine look like?",
        "I totally understand that exhaustion. Your body is working so hard during your cycle! 🌺 Here's a gentle energy boost plan: drink plenty of water, eat regular small meals with complex carbs, and try some light movement when you can. Even 5 minutes of deep breathing can help. Remember, it's okay to say no to extra commitments right now. Your energy will return. What's one thing you can take off your plate today to rest more?"
      ];
      return fatigueResponses[Math.floor(Math.random() * fatigueResponses.length)];
    }
    
    // Enhanced bloating responses
    if (lowerMessage.includes('bloat') || lowerMessage.includes('swollen') || lowerMessage.includes('puffy') || lowerMessage.includes('uncomfortable')) {
      const bloatingResponses = [
        "Bloating is so uncomfortable and frustrating! I feel for you. 🤗 Let's tackle this: try reducing salt for the next day or two, drink warm water with lemon, and eat potassium-rich foods like bananas or avocados. Peppermint tea is amazing for digestion too. Gentle twisting yoga poses can also help move things along. Have you noticed if certain foods make the bloating worse?",
        "That bloated feeling is the worst! Your body is retaining water due to hormonal changes, which is totally normal but still uncomfortable. 💙 Try this: eat smaller, more frequent meals, avoid carbonated drinks, and do some gentle walking. A warm compress on your tummy can provide relief too. Fennel tea is another great natural remedy. How long have you been feeling bloated?",
        "I understand how uncomfortable bloating can make you feel. 🌸 Here's a gentle approach: focus on anti-inflammatory foods like berries, leafy greens, and ginger. Try some gentle abdominal massage in circular motions, and consider probiotics (yogurt or kefir). Most importantly, wear comfortable, loose clothing - your comfort matters more than anything else right now. What usually helps you feel more comfortable?"
      ];
      return bloatingResponses[Math.floor(Math.random() * bloatingResponses.length)];
    }
    
    // Mood swings and irritability
    if (lowerMessage.includes('irritable') || lowerMessage.includes('angry') || lowerMessage.includes('mood') || lowerMessage.includes('annoyed') || lowerMessage.includes('frustrated')) {
      const moodResponses = [
        "Those mood swings can feel so intense and overwhelming! 😤 First, know that this is completely normal - your hormones are fluctuating significantly right now. Try the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help center you when emotions feel too big. What's been triggering your irritability most?",
        "I can sense your frustration, and it's totally valid to feel this way during your cycle. 💕 When you feel that irritability rising, try stepping away for a few deep breaths, splash cold water on your face, or do some quick jumping jacks to release that energy. Sometimes our bodies just need to move the emotion through. Have you been able to communicate to people around you that you're having a tough day?",
        "Mood swings during your cycle are like emotional weather - they come and go, and you're not broken for experiencing them! 🌈 Try keeping a small comfort kit ready: your favorite tea, a soft blanket, calming music, or essential oils. When irritability hits, use your kit and remind yourself 'this feeling will pass.' You're doing great managing all these changes. What usually helps you feel more balanced?"
      ];
      return moodResponses[Math.floor(Math.random() * moodResponses.length)];
    }
    
    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('rest') || lowerMessage.includes('wake up')) {
      const sleepResponses = [
        "Sleep issues during your cycle are so common! Your changing hormones can really disrupt your sleep patterns. 🌙 Try creating a calming bedtime routine: dim lights 1 hour before bed, try some chamomile tea, and keep your room cool. Magnesium supplements can also help (check with your doctor first). Are you having trouble falling asleep or staying asleep?",
        "I understand how frustrating poor sleep can be, especially when you're already dealing with cycle symptoms. 💤 Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, out for 8. Also, avoid screens 30 minutes before bed, and consider a warm bath with lavender. Your body needs that restorative sleep right now. What's your current bedtime routine like?",
        "Sleep disruption during your cycle is your body responding to hormonal changes - you're not doing anything wrong! 🌸 Try keeping a sleep diary to identify patterns, use a white noise app, and make sure you're not having caffeine after 2 PM. Sometimes gentle stretching or reading can help wind down. How many hours of sleep are you typically getting?"
      ];
      return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
    }
    
    // Cravings and appetite
    if (lowerMessage.includes('craving') || lowerMessage.includes('hungry') || lowerMessage.includes('appetite') || lowerMessage.includes('chocolate') || lowerMessage.includes('food')) {
      const cravingResponses = [
        "Those cravings are so real and intense! Your body is actually asking for specific nutrients. 🍫 Craving chocolate? You might need magnesium. Try dark chocolate (70% cacao or higher), nuts, or seeds. Craving carbs? Your serotonin levels might be low - try complex carbs like oatmeal or sweet potatoes. What are you craving most right now?",
        "Food cravings during your cycle are your body's way of communicating its needs! 🥗 Instead of fighting them, try to satisfy them in nourishing ways. Want something sweet? Try dates with almond butter. Want something salty? Try roasted chickpeas or nuts. The key is listening to your body while also giving it quality fuel. How are your energy levels with eating?",
        "I totally get those intense cravings! Your body is working hard and needs extra fuel. 🌟 Try to eat regular, balanced meals to prevent extreme hunger, and when cravings hit, ask yourself: 'What does my body actually need right now?' Sometimes it's comfort, sometimes it's specific nutrients. Don't feel guilty about honoring your body's requests - just try to make choices that make you feel good. What sounds good to you right now?"
      ];
      return cravingResponses[Math.floor(Math.random() * cravingResponses.length)];
    }
    
    // General support and check-ins
    if (lowerMessage.includes('better') || lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('advice')) {
      const supportResponses = [
        "I'm so glad you reached out for support - that takes courage and self-awareness! 💕 You're already doing something wonderful by tracking your cycle and being mindful of your body's needs. What specific area would you like to focus on today? Whether it's physical comfort, emotional support, or practical tips, I'm here for all of it.",
        "You're taking such good care of yourself by being proactive about your health and seeking support. That's really admirable! 🌟 I'm here to help with whatever you need - whether that's pain management strategies, emotional support, nutrition tips, or just someone to listen. What's been on your mind lately about your cycle?",
        "I love that you're prioritizing your wellbeing! Self-care during your cycle isn't selfish - it's essential. 🌸 Every person's experience is unique, and I'm here to provide personalized support for whatever you're going through. What would be most helpful for you right now? We can tackle this together!"
      ];
      return supportResponses[Math.floor(Math.random() * supportResponses.length)];
    }
    
    // Greetings and conversation starters
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good evening')) {
      const greetingResponses = [
        "Hello! I'm so happy you're here! 🌸 I'm Luna, and I'm genuinely excited to support you on your wellness journey. Whether you're having a great day or a challenging one, I'm here to listen and help however I can. How are you feeling today, and what's going on with your cycle?",
        "Hi there! Welcome! I'm Luna, your personal wellness companion. 💕 I love connecting with people and helping them feel their best during their cycles. Every conversation is unique, and I'm here to provide exactly the kind of support you need today. What's on your mind?",
        "Hey! It's wonderful to meet you! 🌟 I'm Luna, and I'm here to be your supportive companion through all the ups and downs of your menstrual cycle. I believe in personalized care and meeting you exactly where you are today. How can I help you feel a little bit better right now?"
      ];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // Questions about the app or tracking
    if (lowerMessage.includes('track') || lowerMessage.includes('app') || lowerMessage.includes('calendar') || lowerMessage.includes('data')) {
      const trackingResponses = [
        "I love that you're taking charge of your health by tracking your cycle! 📊 This data is so valuable for understanding your patterns and predicting future cycles. Have you noticed any interesting patterns in your symptoms or cycle length? The more you track, the better you'll understand your unique rhythm.",
        "Tracking your cycle is such a powerful tool for self-awareness! 🗓️ You can use this information to plan ahead, understand your body better, and even share valuable data with healthcare providers if needed. What aspects of your cycle are you most interested in tracking? Symptoms, mood, energy levels?",
        "You're doing amazing by being so proactive about tracking your health! 💪 This kind of self-awareness can really help you anticipate your needs and take better care of yourself. Are there any patterns you've started to notice? I'd love to help you interpret what your body might be telling you."
      ];
      return trackingResponses[Math.floor(Math.random() * trackingResponses.length)];
    }
    
    // Default responses for unrecognized input
    const defaultResponses = [
      "I'm here to listen and support you through whatever you're experiencing. 💙 Can you tell me a bit more about how you're feeling today? Whether it's physical symptoms, emotional challenges, or just general thoughts about your cycle, I'm here to help and provide personalized guidance.",
      "Thank you for sharing with me. Every person's cycle experience is so unique and valid. 🌸 I'm here to provide support, practical tips, and a caring ear whenever you need it. What would be most helpful for you right now? We can talk about anything related to your wellbeing.",
      "I can sense you might be going through something, and I want you to know that whatever you're feeling is completely valid. 🤗 I'm here to offer support, whether that's practical wellness advice, emotional encouragement, or just a compassionate conversation. How can I best support you today?",
      "I'm here for you, and I want to make sure I give you the most helpful response possible. 💕 Could you share a bit more about what's on your mind? Whether you're dealing with physical symptoms, emotional ups and downs, or just want to chat about your cycle, I'm here to listen and help however I can."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate more realistic AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: generateAdvancedResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2500); // More realistic response time
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-coral-500/30 transition-all duration-500 hover:scale-110 transform ${
          isOpen ? 'hidden' : 'block'
        } animate-bounce-gentle group`}
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
          <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
        </div>
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-rose-100 dark:border-gray-700 flex flex-col animate-in slide-in-from-bottom-4 duration-500 hover:shadow-3xl transition-all">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 border-b border-rose-100 dark:border-gray-700 bg-gradient-to-r from-coral-50 via-rose-50 to-pink-50 dark:from-coral-900/30 dark:via-rose-900/30 dark:to-pink-900/30 rounded-t-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="relative bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 p-2 rounded-full animate-pulse shadow-lg">
                <Bot className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-1">
                  <span>Luna</span>
                  <Sparkles className="w-4 h-4 text-coral-500 animate-pulse" />
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">AI Wellness Companion • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 transform hover:rotate-90"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Enhanced Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-rose-50/30 dark:to-gray-900/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full shadow-md ${message.isUser ? 'bg-gradient-to-r from-coral-100 to-rose-100 dark:from-coral-900 dark:to-rose-900' : 'bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 dark:from-rose-900 dark:via-pink-900 dark:to-purple-900'}`}>
                    {message.isUser ? (
                      <User className="w-4 h-4 text-coral-600 dark:text-coral-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 text-white'
                        : 'bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white border border-rose-100 dark:border-gray-600'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 dark:from-rose-900 dark:via-pink-900 dark:to-purple-900 shadow-md">
                    <Bot className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="bg-white/90 dark:bg-gray-700/90 p-3 rounded-2xl shadow-lg border border-rose-100 dark:border-gray-600 backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-coral-400 to-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-rose-100 dark:border-gray-700 bg-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share how you're feeling today..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-coral-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm backdrop-blur-sm hover:shadow-md"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-coral-500 via-rose-500 to-pink-500 text-white rounded-full hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 transform shadow-lg disabled:hover:scale-100"
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