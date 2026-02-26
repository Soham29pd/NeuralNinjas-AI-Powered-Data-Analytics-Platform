import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../../hooks/useChat';
import './PersonalInsightsChat.css';
import { Upload } from 'lucide-react';

const PersonalInsightsChat = () => {
  const [input, setInput] = useState("");

  const { messages, isTyping, sendMessage } = useChat(
    "Hello! I'm your Personal Insights Assistant. I can analyze your unique data patterns. What would you like to know?"
  );

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const prompt = `I have uploaded a CSV file (${file.name}) with the following data:\n\n${text}\n\nPlease analyze this data and provide 3 key insights.`;
      sendMessage(prompt);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="pi-chat-box-container">
      <div className="pi-messages-window">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>
      <div className="pi-chat-input-area">
        <input
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <button onClick={handleFileSelect} className="pi-upload-btn" title="Upload CSV for analysis">
          <Upload size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for personal insights..."
        />
        <button onClick={handleSend} className="pi-send-btn">Analyze</button>
      </div>
    </div>
  );
};

export default PersonalInsightsChat;
