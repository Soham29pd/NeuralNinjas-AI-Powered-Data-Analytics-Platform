import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="typing-indicator" style={{ padding: '10px', color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>
            AI is thinking...
            <style>{`
                .typing-indicator::after {
                    content: '...';
                    animation: dots 1.5s steps(5, end) infinite;
                }
                @keyframes dots {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60%, 100% { content: '...'; }
                }
            `}</style>
        </div>
    );
};

export default TypingIndicator;
