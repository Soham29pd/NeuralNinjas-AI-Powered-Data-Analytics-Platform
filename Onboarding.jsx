import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, ClipboardList, Sparkles, Lock, Crown, Zap } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleCSVClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Moving to selection page...");
    navigate('/data-selection'); 
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <Sparkles className="icon-sparkle" size={40} />
          <h1>Unlock Your Personal Insights</h1>
          <p>
            Generic data tells a story, but <b>your data</b> defines the strategy. 
            Analyze your consumption patterns to refine your creator output.
          </p>
        </div>

        <div className="options-grid">
          {/* Option 1: CSV Analysis - Premium Styled */}
          <div className="option-box premium-card" onClick={handleCSVClick}>
            {/* Premium Badge */}
            <div className="premium-badge">
              <Crown size={14} />
              <span>PREMIUM</span>
            </div>

            {/* Lock Icon Decoration */}
            <div className="lock-decoration">
              <Lock size={18} />
            </div>

            {/* Glow Effects */}
            <div className="glow-effect glow-1"></div>
            <div className="glow-effect glow-2"></div>

            <div className="option-icon-wrapper purple">
              <FileSpreadsheet size={32} />
              <div className="icon-ring"></div>
              <div className="icon-ring ring-2"></div>
            </div>
            
            <h3>Direct Social Sync</h3>
            <p>Upload Instagram or Reddit CSVs for an AI-driven audit of your digital footprint.</p>
            
            <button className="option-btn premium-btn">
              <Zap size={16} />
              <span>Analyze CSV</span>
            </button>
          </div>

          {/* Option 2: Guided Questions */}
          <div className="option-box" onClick={() => navigate('/assessment')}>
            <div className="option-icon-wrapper blue">
              <ClipboardList size={32} />
            </div>
            <h3>Guided Assessment</h3>
            <p>No data yet? Answer a strategic question set to generate a predictive dashboard.</p>
            <button className="option-btn outline">Start Questions</button>
          </div>
        </div>

        <p className="skip-link" onClick={() => navigate('/dashboard')}>
          I'll explore the general dashboard first →
        </p>
      </div>
    </div>
  );
};

export default Onboarding;