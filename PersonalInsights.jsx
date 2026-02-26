import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInsightsChat from '../components/chat/PersonalInsightsChat';

const PersonalInsights = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            padding: '2rem',
            background: '#0a0a0a',
            minHeight: '100vh',
            color: '#fff'
        }}>
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    marginBottom: '1rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: '1px solid #eba417',
                    color: '#eba417',
                    borderRadius: '8px',
                    transition: 'all 0.3s'
                }}
            >
                ← Back to Dashboard
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    background: 'linear-gradient(to right, #f59e0b, #ea580c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    Personal Insights
                </h1>
                <p style={{ color: '#aaa' }}>
                    Deep dive into your specific metrics and strategies
                </p>
            </div>

            <PersonalInsightsChat />
        </div>
    );
};

export default PersonalInsights;
