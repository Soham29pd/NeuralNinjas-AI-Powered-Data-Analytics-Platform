import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assistant.css';
import ChatBox from '../components/chat/ChatBox';

const Assistant = () => {
  const navigate = useNavigate();

  return (
    <div className="assistant-page">
      <button className="back-btn" onClick={() => navigate('/')} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>← Back to Dashboard</button>
      <div className="assistant-intro">
        <h1>AI Strategy Consultant</h1>
        <p>Ask anything about your performance, like "Which Reel performed best?"</p>
      </div>
      <ChatBox />
    </div>
  );
};

export default Assistant;