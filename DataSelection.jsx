import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Instagram, MessageSquare, Plus, CheckCircle, ArrowRight, 
  Rocket, Lock, Crown, ShieldCheck, X, Mail, Key, CreditCard, Sparkles, HelpCircle, Layout 
} from 'lucide-react';
import './DataSelection.css';

const DataSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- AUTHENTICATION STATE ---
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('isPremiumActive') === 'true';
  }); 
  
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('options'); 
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [activeInstruction, setActiveInstruction] = useState(null);

  // --- TEAM CREDENTIALS ---
  const TEAM_CREDENTIALS = [
    { email: "team1@neuralninja.com", password: "ninja_admin_01" },
    { email: "team2@neuralninja.com", password: "ninja_admin_02" },
    { email: "team3@neuralninja.com", password: "ninja_admin_03" },
    { email: "team4@neuralninja.com", password: "ninja_admin_04" },
    { email: "team5@neuralninja.com", password: "ninja_admin_05" }
  ];

  const [files, setFiles] = useState({ instagram: null, reddit: null });
  const igRef = useRef(null);
  const redditRef = useRef(null);

  const handleGenerateClick = () => {
    if (!isUnlocked) {
      setShowModal(true);
      setView('options');
    } else {
      navigate('/creator-insights', { state: { files, mode: 'creator' } });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = TEAM_CREDENTIALS.find(c => 
      c.email === loginData.email && c.password === loginData.password
    );

    if (isValid) {
      setIsUnlocked(true);
      sessionStorage.setItem('isPremiumActive', 'true'); 
      setShowModal(false);
      setError('');
    } else {
      setError('Access Denied: Invalid Credentials.');
    }
  };

  const instructions = {
    ig: { title: "Instagram Guide", steps: ["Settings > Your Activity > Download Info", "Choose 'Interactions'", "Select Format: CSV"] },
    reddit: { title: "Reddit Guide", steps: ["Settings > Privacy & Security", "Request Data Export", "Find 'comments.csv' in ZIP"] }
  };

  return (
    <div className="selection-container">
      <div className="selection-content">
        <header className="selection-header">
          {isUnlocked ? (
            <div className="premium-status-tag"><ShieldCheck size={14}/> Active Premium Session</div>
          ) : (
            <div className="intelligence-tag"><Sparkles size={14} /> AI Creator Intelligence Hub</div>
          )}
          <h1>Sync Your <span className="gradient-text">Creator DNA</span></h1>
          <p>The premium portal to cross-platform growth metrics and automated data parsing.</p>
        </header>

        <div className="platform-grid">
          {/* Instagram Card */}
          <div className={`platform-card pro-card ${files.instagram ? 'file-ready' : ''}`}>
             <div className="card-top">
                <div className="brand-icon"><Instagram size={32} /></div>
                <div className="card-actions">
                  {/* SUCCESS TICK ADDED HERE */}
                  {files.instagram && <div className="upload-success-badge"><CheckCircle size={14}/> Instagram Linked</div>}
                  <button className="help-btn" onClick={() => setActiveInstruction('ig')}><HelpCircle size={16} /></button>
                  {isUnlocked ? <ShieldCheck size={20} color="#10b981"/> : <Lock size={20} color="#475569"/>}
                </div>
             </div>
             <h3>Instagram Insights</h3>
             <input type="file" ref={igRef} hidden accept=".csv" onChange={(e) => setFiles({...files, instagram: e.target.files[0]})} />
             <button className="upload-btn" onClick={() => igRef.current.click()}>
                {files.instagram ? <CheckCircle size={18} color="#fff"/> : <Plus size={18}/>}
                {files.instagram ? 'Data Synced' : 'Select Instagram CSV'}
             </button>
          </div>

          {/* Reddit Card */}
          <div className={`platform-card pro-card ${files.reddit ? 'file-ready' : ''}`}>
             <div className="card-top">
                <div className="brand-icon"><MessageSquare size={32} /></div>
                <div className="card-actions">
                  {/* SUCCESS TICK ADDED HERE */}
                  {files.reddit && <div className="upload-success-badge"><CheckCircle size={14}/> Reddit Linked</div>}
                  <button className="help-btn" onClick={() => setActiveInstruction('reddit')}><HelpCircle size={16} /></button>
                  {isUnlocked ? <ShieldCheck size={20} color="#10b981"/> : <Lock size={20} color="#475569"/>}
                </div>
             </div>
             <h3>Reddit Authority</h3>
             <input type="file" ref={redditRef} hidden accept=".csv" onChange={(e) => setFiles({...files, reddit: e.target.files[0]})} />
             <button className="upload-btn" onClick={() => redditRef.current.click()}>
                {files.reddit ? <CheckCircle size={18} color="#fff"/> : <Plus size={18}/>}
                {files.reddit ? 'Data Synced' : 'Select Reddit CSV'}
             </button>
          </div>

          <div className="platform-card pro-card disabled-card">
            <div className="card-top">
              <div className="brand-icon opacity-30"><Layout size={32} /></div>
              <span className="coming-soon">Phase 2</span>
            </div>
            <h3>X / LinkedIn</h3>
            <p>Future CSV integration for professional thread metrics coming soon.</p>
            <button className="upload-btn disabled" disabled>Integrated Soon</button>
          </div>
        </div>

        <div className="selection-footer">
          <button className="main-proceed-btn pro-glow" disabled={!files.instagram && !files.reddit} onClick={handleGenerateClick}>
            {isUnlocked ? 'Generate Neural Analysis' : 'Unlock Pro Access'} <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* --- INSTRUCTION GUIDES MODAL --- */}
      {activeInstruction && (
        <div className="modal-overlay" onClick={() => setActiveInstruction(null)}>
          <div className="guide-modal" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setActiveInstruction(null)}><X size={20}/></button>
            <div className="guide-header">
              {activeInstruction === 'ig' ? <Instagram color="#E4405F"/> : <MessageSquare color="#FF4500"/>}
              <h2>{instructions[activeInstruction].title}</h2>
            </div>
            <div className="step-container">
              {instructions[activeInstruction].steps.map((step, i) => (
                <div key={i} className="step-row">
                  <span className="step-number">{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <button className="got-it-btn" onClick={() => setActiveInstruction(null)}>Got it</button>
          </div>
        </div>
      )}

      {/* --- PREMIUM GATE MODAL --- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="paywall-modal creator-theme" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowModal(false)}><X size={20}/></button>
            {view === 'options' && (
              <div className="modal-view">
                <Crown size={48} className="gold-icon pulse" />
                <h2>Unlock Pro Analysis</h2>
                <div className="option-stack">
                  <button className="primary-pay-btn" onClick={() => setView('payment')}>Subscribe $10</button>
                  <button className="secondary-login-btn" onClick={() => setView('login')}>Already Premium? Login</button>
                </div>
              </div>
            )}
            {view === 'payment' && (
              <div className="modal-view">
                <CreditCard size={48} className="blue-icon" />
                <h2>Premium Subscription</h2>
                <div className="payment-form-mock">
                   <div className="mock-input">Card Number: **** **** **** 8899</div>
                   <button className="pay-confirm-btn" onClick={() => setView('success')}>Confirm $10 Payment</button>
                </div>
              </div>
            )}
            {view === 'success' && (
              <div className="modal-view">
                <ShieldCheck size={48} className="green-icon" />
                <h2>Success!</h2>
                <p>Payment received. Check email for logins within 24 hours.</p>
                <button className="modal-btn" onClick={() => setShowModal(false)}>Return</button>
              </div>
            )}
            {view === 'login' && (
              <form onSubmit={handleLogin} className="login-view">
                <h2>Team Verification</h2>
                <div className="input-field"><Mail size={16}/><input type="email" placeholder="Email" required onChange={e => setLoginData({...loginData, email: e.target.value})}/></div>
                <div className="input-field"><Key size={16}/><input type="password" placeholder="Key" required onChange={e => setLoginData({...loginData, password: e.target.value})}/></div>
                {error && <p className="error-hint">{error}</p>}
                <button type="submit" className="login-submit-btn">Unlock Hub</button>
                <button type="button" className="back-link" onClick={() => setView('options')}>Back</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSelection;