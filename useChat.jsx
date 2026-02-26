import { useState } from 'react';

export const useChat = (initialMessage = "Hello! I'm your Personal Insights Assistant.") => {
  const [messages, setMessages] = useState([
    { text: initialMessage, sender: 'ai', type: 'system' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const MAX_MESSAGES = 100;      // Store up to 100 messages locally
  const CONTEXT_MESSAGES = 50;   // AI remembers last 50 messages

  const sendMessage = async (text, dashboardData = null) => {
    // User message
    const userMsg = { text, sender: 'user', type: dashboardData ? 'dashboard' : 'user' };
    setMessages(prev => [...prev, userMsg].slice(-MAX_MESSAGES));
    setIsTyping(true);
    setError(null);

    try {
      // Prepare context
      const context = messages
        .slice(-CONTEXT_MESSAGES)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: String(msg.text)
        }));

      // Current message
      context.push({ role: 'user', content: String(text) });

      // Include dashboardData if available
      const payload = { context };
      if (dashboardData) payload.dashboardData = dashboardData;

      const response = await fetch('http://localhost:8000/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('AI request failed');

      const data = await response.json();

      // Append AI response
      const aiMsg = { text: data.answer, sender: 'ai', type: dashboardData ? 'dashboard' : 'ai' };
      setMessages(prev => [...prev, aiMsg].slice(-MAX_MESSAGES));

    } catch (err) {
      console.error(err);
      setError(err.message);
      setMessages(prev => [
        ...prev,
        { text: "Sorry, I couldn't analyze that right now.", sender: 'ai', type: 'error' }
      ].slice(-MAX_MESSAGES));
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, sendMessage, error };
};
