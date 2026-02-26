import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../../hooks/useChat';
import './ChatBox.css';


const ChatBox = () => {
    const [input, setInput] = useState("");
    const { messages, isTyping, sendMessage } = useChat();
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className="chat-box-container">
            <div className="messages-window">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={scrollRef} />
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about your content strategy..."
                />
                <button onClick={handleSend} className="send-btn">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
