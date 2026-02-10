import React, { useState, useEffect, useRef } from 'react';
import chatbotData from './chatbot-data.json';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: chatbotData.chatbotResponses.greetings[0], sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const matchKeywords = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const [category, keywords] of Object.entries(chatbotData.keywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return category;
      }
    }
    return 'default';
  };

  const getResponse = (category) => {
    const responses = chatbotData.chatbotResponses[category];
    
    if (Array.isArray(responses)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (typeof responses === 'object') {
      return responses.general || responses[Object.keys(responses)[0]];
    }
    
    return chatbotData.chatbotResponses.default[0];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const category = matchKeywords(input);
    const botResponse = { text: getResponse(category), sender: 'bot' };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
    "What certifications do you have?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>💬 Ask Me Anything</h3>
          <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-questions">
          {quickQuestions.map((q, idx) => (
            <button key={idx} onClick={() => handleQuickQuestion(q)} className="quick-q">
              {q}
            </button>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
};

export default Chatbot;
