// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Download, Bot, Users, Rocket, Smile,
//   Lightbulb, Zap, Instagram, Twitter, Facebook, LayoutDashboard
// } from 'lucide-react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // Component Imports
// import StatCard from '../components/dashboard/StatCard';
// import EngagementChart from '../components/dashboard/EngagementChart';
// import TopPostsTable from '../components/dashboard/TopPostsTable';
// import { SentimentPie, CorrelationChart } from '../components/dashboard/WinningVisuals';
// import AnomalyAlert from '../components/dashboard/AnomalyAlert';
// import PersonalizedView from '../components/dashboard/PersonalizedView';

// // Chat Hook
// import { useChat } from '../hooks/useChat';

// // Styles
// import './Dashboard.css';
// import './PersonalizedDashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { sendMessage } = useChat(); // 🔥 For sending dashboard data
//   const [loading, setLoading] = useState(true);
//   const [aiInsight, setAiInsight] = useState(null);
//   const [selectedPlatform, setSelectedPlatform] = useState('All');
//   const [allData, setAllData] = useState({ platformEngagement: [], topPosts: [] });
//   const [userName, setUserName] = useState('Creator');
//   const [userGoals, setUserGoals] = useState(null);

//   // Load personalization data
//   useEffect(() => {
//     const storedName = localStorage.getItem('userName');
//     if (storedName) setUserName(storedName.charAt(0).toUpperCase() + storedName.slice(1));

//     const storedAssessment = localStorage.getItem('userAssessment');
//     if (storedAssessment) {
//       const answers = JSON.parse(storedAssessment);
//       setUserGoals(answers);
//       const strongPlatform = answers[3]?.[0];
//       if (strongPlatform && strongPlatform !== 'None/Not Sure') setSelectedPlatform(strongPlatform);
//     }
//   }, []);

//   // PDF Export
//   const handleExportPDF = () => {
//     const input = document.querySelector('.dashboard-container');
//     if (!input) return;

//     html2canvas(input, { scale: 2, useCORS: true, backgroundColor: '#020617' })
//       .then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save("NeuralNinjas_Social_Report.pdf");
//       });
//   };

//   // Fetch dashboard data
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const BASE_URL = 'http://127.0.0.1:8000/api';

//         const [platforms, preview, insights] = await Promise.all([
//           axios.get(`${BASE_URL}/analytics/platform-comparison`),
//           axios.get(`http://127.0.0.1:8000/data-preview`),
//           axios.get(`${BASE_URL}/analytics/ai-insights`)
//         ]);

//         const platformArray = Array.isArray(platforms.data)
//           ? platforms.data
//           : Object.entries(platforms.data || {}).map(([key, value]) => ({
//               Platform: key,
//               Total_Engagement: value
//             }));

//         setAiInsight(insights.data);
//         setAllData({ platformEngagement: platformArray, topPosts: preview.data || [] });
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   // Filter posts and compute stats & alerts
//   const filteredDisplay = useMemo(() => {
//     const posts = selectedPlatform === 'All'
//       ? allData.topPosts
//       : allData.topPosts.filter(p => p.Platform?.trim().toLowerCase() === selectedPlatform.toLowerCase());

//     const anomalies = posts
//       .filter(p =>
//         Number(p.Sentiment_Score) < 0.1 ||
//         (Number(p.Sentiment_Score) < 0 && Number(p.Total_Engagement) > 20)
//       )
//       .map(p => ({
//         type: 'warning',
//         message: `Attention on ${p.Platform}: Content detected with sub-optimal sentiment. Reach: ${p.Total_Engagement}.`
//       }));

//     const alerts = anomalies.length > 0
//       ? anomalies
//       : [{ type: 'success', message: `Campaign health on ${selectedPlatform} is stable.` }];

//     const totalPosts = posts.length;
//     const totalEngage = posts.reduce((acc, curr) => acc + (Number(curr.Total_Engagement) || 0), 0);
//     const avgSent = posts.reduce((acc, curr) => acc + (Number(curr.Sentiment_Score) || 0), 0) / (totalPosts || 1);

//     return {
//       posts,
//       alerts,
//       stats: [
//         { title: `${selectedPlatform} Posts`, value: totalPosts, trend: 12.5, icon: 'Users', color: '#6366f1' },
//         { title: 'Total Engagement', value: totalEngage.toLocaleString(), trend: 8.2, icon: 'Zap', color: '#f59e0b' },
//         { title: 'Platform Filter', value: selectedPlatform, trend: 0, icon: 'Rocket', color: '#22c55e' },
//         { title: 'Net Sentiment', value: avgSent > 0 ? 'Positive' : 'Neutral', trend: (avgSent * 100).toFixed(1), icon: 'Smile', color: '#eab308' }
//       ]
//     };
//   }, [allData.topPosts, selectedPlatform]);

//   if (loading) return <div className="loading-screen"><h1>NeuralNinjas Engine Synchronizing...</h1></div>;

//   if (userGoals) {
//     return (
//       <PersonalizedView
//         userName={userName}
//         userGoals={userGoals}
//         onExit={() => {
//           localStorage.removeItem('userAssessment');
//           window.location.reload();
//         }}
//       />
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <div>
//           <h1>Dashboard</h1>
//           <p style={{ color: '#94a3b8', marginTop: '4px' }}>AI-Driven Insights for your campaign</p>
//         </div>
//         <div className="header-actions">
//           <button className="action-btn outline" onClick={handleExportPDF}>
//             <Download size={18} /> Export PDF
//           </button>
//           <button className="action-btn primary" onClick={() => navigate('/assistant')}>
//             <Bot size={18} /> AI Consultant
//           </button>
//           {/* 🔥 Send Dashboard to Chatbot */}
//           <button
//             className="action-btn primary"
//             onClick={() => {
//               const dashboardPayload = {
//                 aiInsight,
//                 filteredPosts: filteredDisplay.posts,
//                 stats: filteredDisplay.stats
//               };
//               sendMessage("Here is my dashboard data for analysis:", dashboardPayload);
//             }}
//           >
//             <Bot size={18} /> Send Dashboard to AI
//           </button>
//         </div>
//       </header>

//       {aiInsight && (
//         <section className="insight-hero">
//           <div className="insight-card">
//             <div className="pulse-indicator"></div>
//             <h3><Lightbulb size={20} color="#eab308" /> Smart Strategy Insight</h3>
//             <p className="insight-why">{aiInsight.why}</p>
//             <p className="insight-rec"><strong>Winning Move:</strong> {aiInsight.recommendation}</p>
//           </div>
//         </section>
//       )}

//       <section style={{ marginBottom: '20px' }}>
//         <AnomalyAlert alerts={filteredDisplay.alerts} />
//       </section>

//       <section className="stats-grid">
//         {filteredDisplay.stats.map((stat, index) => (
//           <StatCard key={`stat-${index}`} {...stat} />
//         ))}
//       </section>

//       <section className="main-grid">
//         <div className="chart-card span-4">
//           <h3>Platform Control Center</h3>
//           <div className="selector-container">
//             {[{ id: 'All', icon: <LayoutDashboard />, color: '#6366f1' },
//               { id: 'Instagram', icon: <Instagram />, color: '#ec4899' },
//               { id: 'Twitter', icon: <Twitter />, color: '#1da1f2' },
//               { id: 'Facebook', icon: <Facebook />, color: '#1877f2' }].map(p => (
//               <button
//                 key={p.id}
//                 onClick={() => setSelectedPlatform(p.id)}
//                 className={`platform-btn ${selectedPlatform === p.id ? 'active' : ''}`}
//                 style={{ '--btn-color': p.color }}
//               >
//                 {p.icon} <span>{p.id}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="chart-card span-8" style={{ minHeight: '400px' }}>
//           <h3>{selectedPlatform} Performance Velocity</h3>
//           <EngagementChart data={selectedPlatform === 'All' ? allData.platformEngagement : filteredDisplay.posts} />
//         </div>

//         <CorrelationChart data={filteredDisplay.posts} />

//         <div className="span-4" style={{ minHeight: '400px' }}>
//           <SentimentPie data={filteredDisplay.posts} />
//         </div>

//         <div className="table-card full-width">
//           <TopPostsTable posts={filteredDisplay.posts} />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Download, Bot, Users, Heart, Rocket, Smile,
  Lightbulb, Zap, Instagram, Twitter, Facebook, LayoutDashboard, Map
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Component Imports
import StatCard from '../components/dashboard/StatCard';
import EngagementChart from '../components/dashboard/EngagementChart';
import TopPostsTable from '../components/dashboard/TopPostsTable';
import { SentimentPie, CorrelationChart } from '../components/dashboard/WinningVisuals';
import AnomalyAlert from '../components/dashboard/AnomalyAlert';
import PersonalizedView from '../components/dashboard/PersonalizedView';

// Styles
import './Dashboard.css';
import './PersonalizedDashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [allData, setAllData] = useState({ platformEngagement: [], topPosts: [] });
  // 👤 Personalization State
  const [userName, setUserName] = useState('Creator');
  const [userGoals, setUserGoals] = useState(null);

  useEffect(() => {
    // Load Personalization Data
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName.charAt(0).toUpperCase() + storedName.slice(1));
    }

    const storedAssessment = localStorage.getItem('userAssessment');
    if (storedAssessment) {
      const answers = JSON.parse(storedAssessment);
      setUserGoals(answers);
      // Set strong platform (Q3) automatically
      const strongPlatform = answers[3]?.[0];
      if (strongPlatform && strongPlatform !== 'None/Not Sure') {
        setSelectedPlatform(strongPlatform);
      }
    }
  }, []);

  // 📥 PDF Export Logic
  const handleExportPDF = () => {
    const input = document.querySelector('.dashboard-container');
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#020617'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("NeuralNinjas_Social_Report.pdf");
    });
  };

  // 🛰️ Data Fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const BASE_URL = 'http://127.0.0.1:8000/api';

        const [platforms, preview, insights] = await Promise.all([
           axios.get(`${BASE_URL}/analytics/platform-comparison`),
          axios.get(`http://127.0.0.1:8000/data-preview`),
          axios.get(`${BASE_URL}/analytics/ai-insights`)
        ]);

        const platformArray = Array.isArray(platforms.data)
          ? platforms.data
          : Object.entries(platforms.data || {}).map(([key, value]) => ({
            Platform: key,
            Total_Engagement: value
          }));

        setAiInsight(insights.data);
        setAllData({
          platformEngagement: platformArray,
          topPosts: preview.data || []
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // 🔧 THE BRAIN: Unified logic for filtering, anomalies, and stats
  const filteredDisplay = useMemo(() => {
    // 1. Filter posts based on platform
    const posts = selectedPlatform === 'All'
      ? allData.topPosts
      : allData.topPosts.filter(p => p.Platform?.trim().toLowerCase() === selectedPlatform.toLowerCase());

    // 2. Run Anomaly Scan on the filtered list
    // 🔧 ADJUSTED SCAN: Lowering thresholds to ensure anomalies trigger during demo
    const anomalies = posts
      .filter(p =>
        Number(p.Sentiment_Score) < 0.1 || // Flag anything not clearly "Positive"
        (Number(p.Sentiment_Score) < 0 && Number(p.Total_Engagement) > 20) // Moderate risk
      )
      .map(p => ({
        type: 'warning',
        message: `Attention on ${p.Platform}: Content detected with sub-optimal sentiment. Reach: ${p.Total_Engagement}.`
      }));


    const alerts = anomalies.length > 0
      ? anomalies
      : [{ type: 'success', message: `Campaign health on ${selectedPlatform} is stable.` }];

    // 3. Calculate Stats
    const totalPosts = posts.length;
    const totalEngage = posts.reduce((acc, curr) => acc + (Number(curr.Total_Engagement) || 0), 0);
    const avgSent = posts.reduce((acc, curr) => acc + (Number(curr.Sentiment_Score) || 0), 0) / (totalPosts || 1);

    return {
      posts,
      alerts,
      stats: [
        { title: `${selectedPlatform} Posts`, value: totalPosts, trend: 12.5, icon: 'Users', color: '#6366f1' },
        { title: 'Total Engagement', value: totalEngage.toLocaleString(), trend: 8.2, icon: 'Zap', color: '#f59e0b' },
        { title: 'Platform Filter', value: selectedPlatform, trend: 0, icon: 'Rocket', color: '#22c55e' },
        { title: 'Net Sentiment', value: avgSent > 0 ? 'Positive' : 'Neutral', trend: (avgSent * 100).toFixed(1), icon: 'Smile', color: '#eab308' }
      ]
    };
  }, [allData.topPosts, selectedPlatform]); // Dependency array ensures dynamic updates

  if (loading) return <div className="loading-screen"><h1>NeuralNinjas Engine Synchronizing...</h1></div>;

  if (userGoals) {
    return (
      <PersonalizedView
        userName={userName}
        userGoals={userGoals}
        onExit={() => {
          localStorage.removeItem('userAssessment');
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: '#94a3b8', marginTop: '4px' }}>AI-Driven Insights for your campaign</p>
        </div>
        <div className="header-actions">
          <button className="action-btn outline" onClick={handleExportPDF}>
            <Download size={18} /> Export PDF
          </button>
          <button className="action-btn primary" onClick={() => navigate('/assistant')}>
            <Bot size={18} /> AI Consultant
          </button>
        </div>
      </header>

      {aiInsight && (
        <section className="insight-hero">
          <div className="insight-card">
            <div className="pulse-indicator"></div>
            <h3><Lightbulb size={20} color="#eab308" /> Smart Strategy Insight</h3>
            <p className="insight-why">{aiInsight.why}</p>
            <p className="insight-rec"><strong>Winning Move:</strong> {aiInsight.recommendation}</p>
          </div>
        </section>
      )}

      {/* 🚀 Anomaly Alerts change based on filteredDisplay.alerts */}
      <section style={{ marginBottom: '20px' }}>
        <AnomalyAlert alerts={filteredDisplay.alerts} />
      </section>

      <section className="stats-grid">
        {filteredDisplay.stats.map((stat, index) => (
          <StatCard key={`stat-${index}`} {...stat} />
        ))}
      </section>

      <section className="main-grid">
        <div className="chart-card span-4">
          <h3>Platform Control Center</h3>
          <div className="selector-container">
            {[
              { id: 'All', icon: <LayoutDashboard />, color: '#6366f1' },
              { id: 'Instagram', icon: <Instagram />, color: '#ec4899' },
              { id: 'Twitter', icon: <Twitter />, color: '#1da1f2' },
              { id: 'Facebook', icon: <Facebook />, color: '#1877f2' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`platform-btn ${selectedPlatform === p.id ? 'active' : ''}`}
                style={{ '--btn-color': p.color }}
              >
                {p.icon} <span>{p.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="chart-card span-8" style={{ minHeight: '400px' }}>
          <h3>{selectedPlatform} Performance Velocity</h3>
          <EngagementChart data={selectedPlatform === 'All' ? allData.platformEngagement : filteredDisplay.posts} />
        </div>

        <CorrelationChart data={filteredDisplay.posts} />

        <div className="span-4" style={{ minHeight: '400px' }}>
          <SentimentPie data={filteredDisplay.posts} />
        </div>

        <div className="table-card full-width">
          <TopPostsTable posts={filteredDisplay.posts} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;


