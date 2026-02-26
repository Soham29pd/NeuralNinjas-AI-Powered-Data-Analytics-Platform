import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, BarChart2, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import './Assessment.css';

const questions = [
    {
        id: 1,
        question: "Which platforms are you currently active on?",
        description: "We'll analyze your cross-platform presence.",
        options: ["Instagram", "Twitter / X", "Facebook", "LinkedIn", "YouTube"],
        multi: true,
        icon: <Sparkles size={24} />
    },
    {
        id: 2,
        question: "What is your primary goal for using these platforms?",
        description: "This helps us tailor your growth strategy.",
        options: ["Brand Awareness", "Lead Generation", "Direct Sales", "Community Building", "Customer Support"],
        multi: false,
        icon: <BarChart2 size={24} />
    },
    {
        id: 3,
        question: "Which platform do you feel is your strongest?",
        description: "Where do you see the most engagement currently?",
        options: ["Instagram", "Twitter / X", "Facebook", "LinkedIn", "YouTube", "None/Not Sure"],
        multi: false,
        icon: <TrendingUp size={24} />
    },
    {
        id: 4,
        question: "What is your biggest pain point right now?",
        description: "We'll identify areas for immediate improvement.",
        options: ["Low Engagement", "Inconsistent Posting", "Content Creation Fatigue", "Lack of Strategy", "Converting Followers to Customers"],
        multi: true,
        icon: <AlertCircle size={24} />
    },
    {
        id: 5,
        question: "How often do you analyze your performance metrics?",
        description: "Understanding your data usage habits.",
        options: ["Daily", "Weekly", "Monthly", "Rarely/Never"],
        multi: false,
        icon: <BarChart2 size={24} />
    },
    {
        id: 6,
        question: "Do you currently repurpose content across platforms?",
        description: "E.g., posting a Tweet as an Instagram story.",
        options: ["Yes, consistently", "Sometimes", "No, I create unique content for each", "No, but I want to"],
        multi: false,
        icon: <Zap size={24} />
    },
    {
        id: 7,
        question: "How would you describe your current content strategy?",
        description: "This defines your baseline.",
        options: ["Planned & Structured", "Spontaneous & Reactive", "Experimental", "Non-existent"],
        multi: false,
        icon: <TrendingUp size={24} />
    },
    {
        id: 8,
        question: "What kind of insights are you most interested in?",
        description: "We'll prioritize these in your dashboard.",
        options: ["Best times to post", "Audience demographics", "Competitor analysis", "Content sentiment", "Growth predictions"],
        multi: true,
        icon: <Sparkles size={24} />
    },
    {
        id: 9,
        question: "How do you handle negative feedback or low engagement?",
        description: "Analyzing your resilience and adaptability.",
        options: ["I adjust my strategy immediately", "I ignore it and keep going", "I get discouraged", "I analyze it to understand why"],
        multi: false,
        icon: <AlertCircle size={24} />
    },
    {
        id: 10,
        question: "We're building a personalized dashboard for you...",
        description: "What's the ONE thing you wish a tool could tell you about your social media?",
        options: ["Why my posts aren't going viral", "Exactly what to post next", "Which followers are most likely to buy", "How I compare to my competitors"],
        multi: false,
        icon: <Sparkles size={24} />
    }
];

const Assessment = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);

    const handleOptionClick = (option) => {
        const currentQ = questions[currentStep];
        const currentAnswer = answers[currentQ.id] || [];

        if (currentQ.multi) {
            let newAnswers;
            if (currentAnswer.includes(option)) {
                newAnswers = currentAnswer.filter(a => a !== option);
            } else {
                newAnswers = [...currentAnswer, option];
            }
            setAnswers({ ...answers, [currentQ.id]: newAnswers });
        } else {
            setAnswers({ ...answers, [currentQ.id]: [option] });
            // Auto-advance for single choice after a brief delay
            setTimeout(() => handleNext(), 350);
        }
    };

    const handleNext = () => {
        if (isAnimating) return;

        if (currentStep < questions.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsAnimating(false);
            }, 400);
        } else {
            console.log("Assessment complete:", answers);
            localStorage.setItem('userAssessment', JSON.stringify(answers));
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (currentStep > 0 && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev - 1);
                setIsAnimating(false);
            }, 400);
        }
    };

    const currentQ = questions[currentStep];
    const currentAnswer = answers[currentQ.id] || [];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="assessment-container">
            <div className="mesh-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="glass-card">
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="assessment-header">
                    <div className="step-badge">
                        Step {currentStep + 1} of {questions.length}
                    </div>
                </div>

                <div className={`question-wrapper ${isAnimating ? 'slide-exit' : 'slide-enter'}`}>
                    <div className="icon-container">
                        {currentQ.icon}
                    </div>
                    <h2 className="question-title">{currentQ.question}</h2>
                    <p className="question-description">{currentQ.description}</p>

                    <div className="options-grid-container">
                        {currentQ.options.map((option, index) => {
                            const isSelected = currentAnswer.includes(option);
                            return (
                                <button
                                    key={index}
                                    className={`option-card ${isSelected ? 'active' : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <span className="option-label">{option}</span>
                                    <div className={`checkbox ${isSelected ? 'checked' : ''}`}>
                                        {isSelected && <CheckCircle size={14} color="white" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="action-row">
                    <button
                        className="text-btn"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        <ArrowLeft size={16} /> Previous
                    </button>

                    <button
                        className="primary-btn"
                        onClick={handleNext}
                        disabled={currentAnswer.length === 0}
                    >
                        {currentStep === questions.length - 1 ? 'Analyze Profile' : 'Continue'}
                        {currentStep < questions.length - 1 && <ArrowRight size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
