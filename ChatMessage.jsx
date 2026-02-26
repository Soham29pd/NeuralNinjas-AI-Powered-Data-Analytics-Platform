import React from 'react';

const ChatMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`message-wrapper ${isUser ? 'user-wrapper' : 'ai-wrapper'}`} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
            <div className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}
                style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: isUser ? '#007bff' : '#f0f2f5',
                    color: isUser ? '#fff' : '#333',
                    borderBottomRightRadius: isUser ? '2px' : '12px',
                    borderBottomLeftRadius: isUser ? '12px' : '2px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                {message.text}
            </div>
        </div>
    );
};

export default ChatMessage;
