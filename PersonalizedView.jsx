import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Instagram, Twitter, Facebook,
    Zap, Map, Users, Bot, Calendar, Sparkles, MessageSquare
} from 'lucide-react';
import { STRATEGIES } from '../../data/strategyData';

const PersonalizedView = ({ userName, userGoals, onExit }) => {
    const navigate = useNavigate();

    // 🎲 Deterministic Randomness based on userName
    // This ensures the user sees the SAME "random" strategy every time they log in,
    // but different users see different strategies.
    const strategyIndex = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < userName.length; i++) {
            hash = userName.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    }, [userName]);

    // Select Strategy based on Index
    const painPointKey = userGoals[4]?.[0];
    const goalKey = userGoals[2]?.[0];

    const painPointStrategies = STRATEGIES.PAIN_POINTS[painPointKey] || [];
    const goalStrategies = STRATEGIES.GOALS[goalKey] || [];

    // Safe fallback if key not found
    const selectedPainStrategy = painPointStrategies.length > 0
        ? painPointStrategies[strategyIndex % painPointStrategies.length]
        : { title: "Consistency", step: "Step 1", text: "Focus entirely on showing up daily." };

    const selectedGoalStrategy = goalStrategies.length > 0
        ? goalStrategies[strategyIndex % goalStrategies.length]
        : { title: "Optimization", step: "Step 2", text: "Analyze your metrics and double down on what works." };

    // 🗓️ Smart Content Planner Logic
    const platform = userGoals[1]?.[0] || 'Instagram'; // Primary Platform
    const style = userGoals[7]?.[0] || 'Educational'; // Style

    const contentPlan = [
        { day: 'Day 1', type: style === 'Educational' ? 'How-To Guide' : 'Behind the Scenes', icon: 'Meme' },
        { day: 'Day 2', type: style === 'Educational' ? 'Industry Myth Busting' : 'Personal Story/Skit', icon: 'Vid' },
        { day: 'Day 3', type: style === 'Educational' ? 'Q&A Session' : 'Trend/Challenge', icon: 'Poll' }
    ];

    return (
        <div className="personalized-theme">
            <header className="dashboard-header">
                <div>
                    <h1>Refined for {userName}</h1>
                    <p style={{ color: '#a5b4fc', marginTop: '4px' }}>
                        Focus: <span style={{ color: 'var(--neon-blue)', fontWeight: 'bold' }}>{userGoals[2]?.[0]}</span>
                    </p>
                </div>
                <div className="header-actions" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="action-btn"
                        onClick={() => navigate('/personal-insights')}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                            color: 'white',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <MessageSquare size={16} /> Personal Insights
                    </button>
                    <button className="action-btn outline" onClick={onExit}>
                        Exit Personal View
                    </button>
                </div>
            </header>

            <section className="p-grid">
                {/* Row 1: Ecosystem, Identity, Planner */}

                {/* 1. Ecosystem */}
                <div className="p-card span-4">
                    <h3><LayoutDashboard size={18} color="#00f3ff" /> Ecosystem</h3>
                    <div style={{ marginTop: '10px' }}>
                        {userGoals[1]?.map(platform => (
                            <span key={platform} className="platform-pill active">
                                {platform === 'Instagram' && <Instagram size={14} />}
                                {platform === 'Twitter' && <Twitter size={14} />}
                                {platform === 'Facebook' && <Facebook size={14} />}
                                {platform}
                            </span>
                        ))}
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '15px' }}>Tracking active channels.</p>
                    </div>
                </div>

                {/* 2. Your Identity */}
                <div className="p-card span-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <h3><Users size={18} color="#a5b4fc" /> Your Identity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                        {[
                            { l: 'Goal', v: userGoals[2]?.[0] },
                            { l: 'Platform', v: userGoals[3]?.[0] },
                            { l: 'Pain Point', v: userGoals[4]?.[0] },
                            { l: 'Style', v: userGoals[7]?.[0] },
                        ].map((item, i) => (
                            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>{item.l}</span>
                                <span style={{ fontSize: '0.85rem', color: '#e0e0e0', textAlign: 'right' }}>{item.v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. 🔥 Smart Content Planner (Replaces North Star) */}
                <div className="p-card span-4 planner-card">
                    <h3><Calendar size={18} color="#fcd34d" /> 3-Day Action Plan</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        {contentPlan.map((plan, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', borderLeft: `3px solid ${i === 0 ? '#fcd34d' : 'rgba(255,255,255,0.2)'}` }}>
                                <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{plan.day}</span>
                                <span style={{ color: 'var(--neon-blue)', fontSize: '0.85rem', fontWeight: '500' }}>{plan.type}</span>
                                {i === 0 && <Sparkles size={14} color="#fcd34d" />}
                            </div>
                        ))}
                        <p style={{ fontSize: '0.7rem', color: '#666', textAlign: 'center', marginTop: '5px' }}>Generated for {platform} ({style})</p>
                    </div>
                </div>

                {/* Row 2: Strategic Roadmap (Full Width) */}
                <div className="p-card span-12" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3><Map size={18} color="#22c55e" /> Strategic Roadmap</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Strategy A: Based on Pain Point */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #f43f5e' }}>
                            <h4 style={{ marginBottom: '8px', color: '#f43f5e', fontSize: '1.1rem' }}>
                                {selectedPainStrategy.step}: {selectedPainStrategy.title}
                            </h4>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#ccc' }}>
                                {selectedPainStrategy.text}
                            </p>
                        </div>

                        {/* Strategy B: Based on Goal */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid #bc13fe' }}>
                            <h4 style={{ marginBottom: '8px', color: '#bc13fe', fontSize: '1.1rem' }}>
                                {selectedGoalStrategy.step}: {selectedGoalStrategy.title}
                            </h4>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#ccc' }}>
                                {selectedGoalStrategy.text}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Row 3: Genie Wish */}
                <div className="p-card span-12 genie-wish">
                    <h3><Bot size={18} color="#00f3ff" /> Your AI Assistant says...</h3>
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#e0e0e0' }}>
                        "You asked to know <b>'{userGoals[10]?.[0]}'</b>. Based on your data, your top performing content uses video hooks under 3 seconds. Pivot to Reels for 20% faster growth."
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PersonalizedView;
