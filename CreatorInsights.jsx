// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   BarChart, Bar, Cell, PieChart, Pie, Legend
// } from 'recharts';
// import { 
//   Instagram, MessageSquare, TrendingUp, Zap, ArrowLeft, 
//   Share2, Activity, Award, ShieldCheck, BarChart3, 
//   Rocket, Sparkles, Target, Globe, User, Clock, Heart, MessageCircle, AlertCircle
// } from 'lucide-react';
// import './CreatorInsights.css';

// /**
//  * CreatorInsights Component
//  * Provides a dynamic, data-driven dashboard that reconfigures based on 
//  * uploaded CSV data (Instagram and Reddit).
//  */
// const CreatorInsights = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { files, mode } = location.state || { files: {}, mode: 'standard' };
  
//   const [igData, setIgData] = useState({
//     avgReach: 0,
//     engagement: 0,
//     topCategory: "Analyzing...",
//     weeklyTrend: [],
//     categoryBreakdown: [],
//     isViral: false
//   });

//   const [redditData, setRedditData] = useState({
//     avgUpvotes: 0,
//     sentiment: 0,
//     upvoteRatio: 0,
//     topSubreddit: "Analyzing...",
//     subredditReach: [],
//     isAuthority: false
//   });

//   const isPro = mode === 'creator';
//   const hasIG = !!files.instagram;
//   const hasReddit = !!files.reddit;

//   // Synergy Score Calculation (0-100)
//   const synergyScore = (hasIG && hasReddit) ? 88 : (hasIG || hasReddit) ? 45 : 0;

//   useEffect(() => {
//     // Dynamic Instagram Analysis Engine
//     if (hasIG) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const text = e.target.result;
//         const rows = text.split('\n').slice(1).filter(row => row.trim() !== '');
        
//         const parsed = rows.map(row => {
//           const cols = row.split(',');
//           return {
//             reach: parseInt(cols[13]) || 0,
//             engagement: parseFloat(cols[17]) || 0,
//             category: cols[6] || 'Uncategorized',
//             day: cols[3] || 'Unknown'
//           };
//         });

//         const totalReach = parsed.reduce((a, c) => a + c.reach, 0);
//         const avgR = Math.round(totalReach / parsed.length);
//         const avgE = (parsed.reduce((a, c) => a + c.engagement, 0) / parsed.length).toFixed(1);
        
//         // Category Extraction
//         const catMap = {};
//         parsed.forEach(p => {
//           catMap[p.category] = (catMap[p.category] || 0) + p.reach;
//         });
//         const catList = Object.keys(catMap).map(name => ({ name, value: catMap[name] })).sort((a, b) => b.value - a.value);

//         // Weekly Trend
//         const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//         const trend = days.map(d => ({
//           name: d.substring(0, 3),
//           reach: Math.round(parsed.filter(p => p.day === d).reduce((a, c) => a + c.reach, 0) / 10 || 1000)
//         }));

//         setIgData({
//           avgReach: avgR.toLocaleString(),
//           engagement: avgE,
//           topCategory: catList[0]?.name || "General",
//           weeklyTrend: trend,
//           categoryBreakdown: catList.slice(0, 5),
//           isViral: avgR > 50000
//         });
//       };
//       reader.readAsText(files.instagram);
//     }

//     // Dynamic Reddit Analysis Engine
//     if (hasReddit) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const rows = e.target.result.split('\n').slice(1).filter(r => r.trim());
//         const parsed = rows.map(r => {
//             const cols = r.split(',');
//             return {
//                 subreddit: cols[2],
//                 upvotes: parseInt(cols[3]) || 0,
//                 ratio: parseFloat(cols[5]) || 0,
//                 sentiment: parseFloat(cols[6]) || 0,
//                 reach: parseInt(cols[8]) || 0
//             };
//         });

//         const avgU = Math.round(parsed.reduce((a, c) => a + c.upvotes, 0) / parsed.length);
//         const avgS = (parsed.reduce((a, c) => a + c.sentiment, 0) / parsed.length).toFixed(2);
//         const avgR = (parsed.reduce((a, c) => a + c.ratio, 0) / parsed.length * 100).toFixed(0);
        
//         const subMap = {};
//         parsed.forEach(p => {
//           subMap[p.subreddit] = (subMap[p.subreddit] || 0) + p.upvotes;
//         });
//         const subList = Object.keys(subMap).map(name => ({ name, val: subMap[name] })).sort((a,b) => b.val - a.val);

//         setRedditStats({
//           avgUpvotes: avgU.toLocaleString(),
//           sentiment: avgS,
//           upvoteRatio: avgR,
//           topSubreddit: subList[0]?.name || "N/A",
//           subredditReach: subList.slice(0, 5),
//           isAuthority: avgR > 90
//         });
//       };
//       reader.readAsText(files.reddit);
//     }
//   }, [files, hasIG, hasReddit]);

//   return (
//     <div className="ultimate-dashboard">
//       <div className="bg-blobs">
//         <div className="blob blob-1"></div>
//         <div className="blob blob-2"></div>
//         <div className="blob blob-3"></div>
//       </div>

//       <div className="dashboard-content">
//         {/* --- Global Navigation & Dynamic Header --- */}
//         <header className="premium-header">
//           <div className="header-left">
//             <button className="glass-back-btn" onClick={() => navigate('/data-selection')}>
//               <ArrowLeft size={20} />
//             </button>
//             <div className="title-stack">
//               <span className="eyebrow">Neural Intelligence v2.0</span>
//               <h1>Creator <span className="gradient-text">Studio Hub</span></h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className={`status-pill ${isPro ? 'gold' : 'blue'}`}>
//               {isPro ? <Rocket size={16} /> : <User size={16} />}
//               {isPro ? 'Pro Strategist' : 'Standard Audit'}
//             </div>
//             <div className="synergy-badge">
//                 <Share2 size={16} /> Synergy: {synergyScore}%
//             </div>
//           </div>
//         </header>

//         {/* --- Real-Time Performance Grid --- */}
//         <div className="hero-metrics">
//           <div className="hero-card glow-indigo">
//             <div className="card-glass">
//               <div className="icon-badge"><Activity size={24} /></div>
//               <div className="stat-content">
//                 <p>Unified Influence</p>
//                 <h2>{igData.engagement}<span className="percent">%</span></h2>
//                 <span className="trend-up">+1.2% this week</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="hero-card glow-pink">
//             <div className="card-glass">
//               <div className="icon-badge"><Instagram size={24} /></div>
//               <div className="stat-content">
//                 <p>Avg. IG Reach</p>
//                 <h2>{igData.avgReach}</h2>
//                 <span className="tag-niche">{igData.topCategory}</span>
//               </div>
//             </div>
//           </div>

//           <div className="hero-card glow-orange">
//             <div className="card-glass">
//               <div className="icon-badge"><MessageSquare size={24} /></div>
//               <div className="stat-content">
//                 <p>Reddit Upvote Ratio</p>
//                 <h2>{redditData.upvoteRatio}<span className="percent">%</span></h2>
//                 <span className="tag-niche">Subreddit: {redditData.topSubreddit}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- Main Analytics Layout --- */}
//         <div className="analytics-grid">
          
//           {/* Visual 1: Cross-Platform Growth Area Chart */}
//           <section className="chart-container span-8 glass-box">
//             <div className="box-head">
//               <div className="flex-row">
//                 <TrendingUp size={20} color="#6366f1" />
//                 <h3>Reach Performance Trajectory</h3>
//               </div>
//               <div className="legend-items">
//                 <span className="dot ig"></span> Instagram
//               </div>
//             </div>
//             <div className="chart-height">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={igData.weeklyTrend}>
//                   <defs>
//                     <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '12px'}} />
//                   <Area type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={4} fill="url(#colorReach)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </section>

//           {/* Visual 2: Niche Distribution (Instagram Categories) */}
//           <section className="chart-container span-4 glass-box">
//             <div className="box-head">
//                <div className="flex-row"><BarChart3 size={20} color="#E4405F" /><h3>Niche Authority</h3></div>
//             </div>
//             <div className="category-bars">
//                {igData.categoryBreakdown.map((cat, i) => (
//                  <div key={i} className="bar-item">
//                    <div className="bar-labels">
//                        <span>{cat.name}</span>
//                        <span>{Math.round((cat.value / 100000) * 10)}%</span>
//                    </div>
//                    <div className="bar-rail">
//                        <div 
//                         className={`bar-fill cat-${i}`} 
//                         style={{width: `${Math.min(100, (cat.value / 1000000) * 100)}%`}}>
//                        </div>
//                     </div>
//                  </div>
//                ))}
//                {igData.categoryBreakdown.length === 0 && <p className="empty-msg">No Category Data Found</p>}
//             </div>
//           </section>

//           {/* Visual 3: Reddit Subreddit Impact (Bar Chart) */}
//           {hasReddit && (
//             <section className="chart-container span-6 glass-box">
//                 <div className="box-head">
//                     <div className="flex-row"><Globe size={20} color="#FF4500" /><h3>Reddit Subreddit Impact</h3></div>
//                 </div>
//                 <div className="chart-height-small">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={redditData.subredditReach}>
//                             <XAxis dataKey="name" tick={{fontSize: 10, fill: '#94a3b8'}} />
//                             <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{background: '#0f172a', border: 'none'}} />
//                             <Bar dataKey="val" fill="#FF4500" radius={[10, 10, 0, 0]} />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </section>
//           )}

//           {/* Visual 4: Sentiment & Voice Analysis */}
//           <section className={`chart-container glass-box ${hasReddit ? 'span-6' : 'span-12'}`}>
//             <div className="box-head">
//                 <div className="flex-row"><MessageCircle size={20} color="#10b981" /><h3>Community Voice Audit</h3></div>
//             </div>
//             <div className="sentiment-display">
//                 <div className="sentiment-score-ring">
//                     <div className="ring-content">
//                         <h4>{redditData.sentiment}</h4>
//                         <span>Score</span>
//                     </div>
//                 </div>
//                 <div className="sentiment-details">
//                     <div className="detail-row">
//                         <span>Sentiment:</span> <strong>{parseFloat(redditData.sentiment) > 0.5 ? 'Highly Positive' : 'Neutral'}</strong>
//                     </div>
//                     <div className="detail-row">
//                         <span>Vibe Check:</span> <strong>{redditData.isAuthority ? 'Authority Leader' : 'Active Contributor'}</strong>
//                     </div>
//                     <div className="detail-row">
//                         <span>Viral Factor:</span> <strong>{igData.isViral ? 'Critical' : 'Stable'}</strong>
//                     </div>
//                 </div>
//             </div>
//           </section>

//           {/* AI Neural Strategy Console (DYNAMIC RECOMMENDATIONS) */}
//           <section className="strategy-console span-12 glass-box">
//             <div className="console-head">
//               <ShieldCheck size={32} className="pulse-green" />
//               <div>
//                 <h2>Neural Growth Strategy</h2>
//                 <p>AI tactical recommendations for <strong>{igData.topCategory}</strong> niche</p>
//               </div>
//             </div>
//             <div className="console-grid">
//               <div className="console-item">
//                 <Zap size={22} color="#f59e0b" />
//                 <div className="advice-text">
//                     <p><b>Peak Optimization:</b> Your reach spikes on <strong>{igData.weeklyTrend.sort((a,b)=>b.reach-a.reach)[0]?.name || 'Saturdays'}</strong>. Move high-production content to this window to maximize "Neural Drift" reach.</p>
//                 </div>
//               </div>
//               <div className="console-item">
//                 <Share2 size={22} color="#818cf8" />
//                 <div className="advice-text">
//                     <p><b>Cross-Pollination:</b> Your technical sentiment in <strong>r/{redditData.topSubreddit}</strong> is exceptional. Repurpose these discussions into Instagram <strong>"Authority Carousels"</strong> to build professional credibility.</p>
//                 </div>
//               </div>
//               <div className="console-item">
//                 <AlertCircle size={22} color="#fb7185" />
//                 <div className="advice-text">
//                     <p><b>Anomaly Alert:</b> We detected a 40% reach deviation in <strong>{igData.topCategory}</strong> on Sundays. Use this gap for low-effort, high-engagement community Q&As.</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatorInsights;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Instagram, MessageSquare, TrendingUp, Zap, ArrowLeft, 
  Share2, Activity, Award, ShieldCheck, BarChart3, 
  Rocket, Sparkles, Target, Globe, User, Clock, Heart, MessageCircle, 
  AlertCircle, TrendingDown, Eye, Users, ThumbsUp, Bookmark, 
  Hash, Calendar, MapPin, Link, AlignLeft, Film, Grid
} from 'lucide-react';
import './CreatorInsights.css';

const CreatorInsights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { files, mode } = location.state || { files: {}, mode: 'standard' };
  
  const [igData, setIgData] = useState({
    avgReach: 0,
    avgImpressions: 0,
    avgLikes: 0,
    avgComments: 0,
    avgShares: 0,
    avgSaves: 0,
    engagement: 0,
    profileVisits: 0,
    followsFromPost: 0,
    topCategory: "Analyzing...",
    weeklyTrend: [],
    hourlyPerformance: [],
    categoryBreakdown: [],
    postTypeBreakdown: [],
    locationBreakdown: [],
    trendingPosts: 0,
    anomalyCount: 0,
    bestPostType: "",
    bestTime: "",
    bestDay: "",
    avgHashtags: 0,
    avgCaptionLength: 0,
    isViral: false,
    growthRate: 0
  });

  const [redditData, setRedditData] = useState({
    avgUpvotes: 0,
    avgDownvotes: 0,
    sentiment: 0,
    upvoteRatio: 0,
    avgComments: 0,
    totalReach: 0,
    avgClicks: 0,
    controversialPosts: 0,
    topSubreddit: "Analyzing...",
    subredditReach: [],
    sentimentTrend: [],
    controversyRate: 0,
    isAuthority: false,
    topPerformers: []
  });

  const [crossPlatform, setCrossPlatform] = useState({
    totalEngagement: 0,
    avgReach: 0,
    contentGap: "",
    synergyScore: 0,
    recommendations: []
  });

  const isPro = mode === 'creator';
  const hasIG = !!files.instagram;
  const hasReddit = !!files.reddit;

  const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];

  useEffect(() => {
    if (hasIG) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n').slice(1).filter(row => row.trim() !== '');
        
        const parsed = rows.map(row => {
          const cols = row.split(',');
          return {
            postId: cols[0],
            date: cols[1],
            time: cols[2],
            day: cols[3],
            hour: parseInt(cols[4]) || 0,
            postType: cols[5],
            category: cols[6] || 'Uncategorized',
            captionLength: parseInt(cols[7]) || 0,
            hashtags: parseInt(cols[8]) || 0,
            likes: parseInt(cols[9]) || 0,
            comments: parseInt(cols[10]) || 0,
            shares: parseInt(cols[11]) || 0,
            saves: parseInt(cols[12]) || 0,
            reach: parseInt(cols[13]) || 0,
            impressions: parseInt(cols[14]) || 0,
            profileVisits: parseInt(cols[15]) || 0,
            follows: parseInt(cols[16]) || 0,
            engagement: parseFloat(cols[17]) || 0,
            location: cols[18],
            isTrending: cols[19] === 'Yes',
            anomaly: cols[20]?.trim()
          };
        });

        const totalPosts = parsed.length;
        const avgReach = Math.round(parsed.reduce((a, c) => a + c.reach, 0) / totalPosts);
        const avgImpressions = Math.round(parsed.reduce((a, c) => a + c.impressions, 0) / totalPosts);
        const avgLikes = Math.round(parsed.reduce((a, c) => a + c.likes, 0) / totalPosts);
        const avgComments = Math.round(parsed.reduce((a, c) => a + c.comments, 0) / totalPosts);
        const avgShares = Math.round(parsed.reduce((a, c) => a + c.shares, 0) / totalPosts);
        const avgSaves = Math.round(parsed.reduce((a, c) => a + c.saves, 0) / totalPosts);
        const avgEngagement = (parsed.reduce((a, c) => a + c.engagement, 0) / totalPosts).toFixed(1);
        const totalProfileVisits = parsed.reduce((a, c) => a + c.profileVisits, 0);
        const totalFollows = parsed.reduce((a, c) => a + c.follows, 0);
        const avgHashtags = (parsed.reduce((a, c) => a + c.hashtags, 0) / totalPosts).toFixed(1);
        const avgCaptionLength = Math.round(parsed.reduce((a, c) => a + c.captionLength, 0) / totalPosts);
        
        // Category breakdown
        const catMap = {};
        parsed.forEach(p => {
          catMap[p.category] = (catMap[p.category] || 0) + p.reach;
        });
        const catList = Object.keys(catMap)
          .map(name => ({ name, value: catMap[name] }))
          .sort((a, b) => b.value - a.value);

        // Post type breakdown
        const typeMap = {};
        parsed.forEach(p => {
          typeMap[p.postType] = (typeMap[p.postType] || 0) + 1;
        });
        const typeList = Object.keys(typeMap)
          .map(name => ({ name, value: typeMap[name], percentage: ((typeMap[name]/totalPosts)*100).toFixed(1) }))
          .sort((a, b) => b.value - a.value);

        // Location breakdown
        const locMap = {};
        parsed.forEach(p => {
          locMap[p.location] = (locMap[p.location] || 0) + p.reach;
        });
        const locList = Object.keys(locMap)
          .map(name => ({ name, value: locMap[name] }))
          .sort((a, b) => b.value - a.value);

        // Weekly trend
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayMap = {};
        days.forEach(d => {
          const dayPosts = parsed.filter(p => p.day === d);
          if (dayPosts.length > 0) {
            dayMap[d] = {
              name: d.substring(0, 3),
              reach: Math.round(dayPosts.reduce((a, c) => a + c.reach, 0) / dayPosts.length),
              engagement: parseFloat((dayPosts.reduce((a, c) => a + c.engagement, 0) / dayPosts.length).toFixed(1)),
              posts: dayPosts.length
            };
          }
        });
        const weeklyTrend = days.map(d => dayMap[d] || { name: d.substring(0, 3), reach: 0, engagement: 0, posts: 0 });

        // Hourly performance
        const hourMap = {};
        for (let h = 0; h < 24; h++) {
          const hourPosts = parsed.filter(p => p.hour === h);
          if (hourPosts.length > 0) {
            hourMap[h] = {
              hour: `${h}:00`,
              engagement: parseFloat((hourPosts.reduce((a, c) => a + c.engagement, 0) / hourPosts.length).toFixed(1)),
              posts: hourPosts.length
            };
          }
        }
        const hourlyPerformance = Object.values(hourMap);

        // Best performers
        const bestDayData = weeklyTrend.filter(d => d.reach > 0).sort((a, b) => b.reach - a.reach)[0];
        const bestDay = bestDayData ? days[days.findIndex(d => d.substring(0,3) === bestDayData.name)] : 'Saturday';
        const bestHourData = hourlyPerformance.sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement))[0];
        const bestHour = bestHourData ? bestHourData.hour : '18:00';
        const bestType = typeList[0]?.name || 'Reel';

        // Trending and anomaly counts
        const trendingPosts = parsed.filter(p => p.isTrending).length;
        const anomalyCount = parsed.filter(p => p.anomaly && p.anomaly !== 'Normal').length;

        // Growth calculation
        const midPoint = Math.floor(totalPosts / 2);
        const firstHalf = parsed.slice(0, midPoint);
        const secondHalf = parsed.slice(midPoint);
        const firstHalfAvg = firstHalf.reduce((a, c) => a + c.engagement, 0) / firstHalf.length;
        const secondHalfAvg = secondHalf.reduce((a, c) => a + c.engagement, 0) / secondHalf.length;
        const growthRate = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg * 100).toFixed(1);

        setIgData({
          avgReach: avgReach.toLocaleString(),
          avgImpressions: avgImpressions.toLocaleString(),
          avgLikes: avgLikes.toLocaleString(),
          avgComments: avgComments.toLocaleString(),
          avgShares: avgShares.toLocaleString(),
          avgSaves: avgSaves.toLocaleString(),
          engagement: avgEngagement,
          profileVisits: totalProfileVisits.toLocaleString(),
          followsFromPost: totalFollows.toLocaleString(),
          topCategory: catList[0]?.name || "General",
          weeklyTrend: weeklyTrend,
          hourlyPerformance: hourlyPerformance,
          categoryBreakdown: catList.slice(0, 6),
          postTypeBreakdown: typeList,
          locationBreakdown: locList,
          trendingPosts: trendingPosts,
          anomalyCount: anomalyCount,
          bestPostType: bestType,
          bestTime: bestHour,
          bestDay: bestDay,
          avgHashtags: avgHashtags,
          avgCaptionLength: avgCaptionLength,
          isViral: avgReach > 50000,
          growthRate: growthRate
        });
      };
      reader.readAsText(files.instagram);
    }

    if (hasReddit) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rows = e.target.result.split('\n').slice(1).filter(r => r.trim());
        const parsed = rows.map(r => {
          const cols = r.split(',');
          return {
            postId: cols[0],
            date: cols[1],
            subreddit: cols[2],
            upvotes: parseInt(cols[3]) || 0,
            downvotes: parseInt(cols[4]) || 0,
            ratio: parseFloat(cols[5]) || 0,
            sentiment: parseFloat(cols[6]) || 0,
            comments: parseInt(cols[7]) || 0,
            reach: parseInt(cols[8]) || 0,
            clicks: parseInt(cols[9]) || 0,
            isControversial: cols[10]?.trim() === 'Yes'
          };
        });

        const totalPosts = parsed.length;
        const avgUpvotes = Math.round(parsed.reduce((a, c) => a + c.upvotes, 0) / totalPosts);
        const avgDownvotes = Math.round(parsed.reduce((a, c) => a + c.downvotes, 0) / totalPosts);
        const avgSentiment = (parsed.reduce((a, c) => a + c.sentiment, 0) / totalPosts).toFixed(2);
        const avgRatio = (parsed.reduce((a, c) => a + c.ratio, 0) / totalPosts * 100).toFixed(0);
        const avgComments = Math.round(parsed.reduce((a, c) => a + c.comments, 0) / totalPosts);
        const totalReach = parsed.reduce((a, c) => a + c.reach, 0);
        const avgClicks = Math.round(parsed.reduce((a, c) => a + c.clicks, 0) / totalPosts);
        const controversialPosts = parsed.filter(p => p.isControversial).length;
        const controversyRate = ((controversialPosts / totalPosts) * 100).toFixed(1);

        const subMap = {};
        parsed.forEach(p => {
          if (!subMap[p.subreddit]) {
            subMap[p.subreddit] = { upvotes: 0, reach: 0, posts: 0, sentiment: 0 };
          }
          subMap[p.subreddit].upvotes += p.upvotes;
          subMap[p.subreddit].reach += p.reach;
          subMap[p.subreddit].posts += 1;
          subMap[p.subreddit].sentiment += p.sentiment;
        });
        
        const subList = Object.keys(subMap)
          .map(name => ({
            name,
            upvotes: subMap[name].upvotes,
            reach: subMap[name].reach,
            posts: subMap[name].posts,
            avgSentiment: (subMap[name].sentiment / subMap[name].posts).toFixed(2)
          }))
          .sort((a, b) => b.upvotes - a.upvotes);

        const sentimentTrend = parsed.map((p, idx) => ({
          post: idx + 1,
          sentiment: p.sentiment,
          upvotes: p.upvotes
        }));

        const topPerformers = parsed
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, 5)
          .map(p => ({
            subreddit: p.subreddit,
            upvotes: p.upvotes,
            comments: p.comments,
            sentiment: p.sentiment
          }));

        setRedditData({
          avgUpvotes: avgUpvotes.toLocaleString(),
          avgDownvotes: avgDownvotes.toLocaleString(),
          sentiment: avgSentiment,
          upvoteRatio: avgRatio,
          avgComments: avgComments.toLocaleString(),
          totalReach: totalReach.toLocaleString(),
          avgClicks: avgClicks.toLocaleString(),
          controversialPosts: controversialPosts,
          topSubreddit: subList[0]?.name || "N/A",
          subredditReach: subList.slice(0, 6),
          sentimentTrend: sentimentTrend,
          controversyRate: controversyRate,
          isAuthority: parseFloat(avgRatio) > 90,
          topPerformers: topPerformers
        });
      };
      reader.readAsText(files.reddit);
    }
  }, [files, hasIG, hasReddit]);

  const synergyScore = (hasIG && hasReddit) ? 88 : (hasIG || hasReddit) ? 45 : 0;

  return (
    <div className="ultimate-dashboard">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="dashboard-content">
        <header className="premium-header">
          <div className="header-left">
            <button className="glass-back-btn" onClick={() => navigate('/data-selection')}>
              <ArrowLeft size={20} />
            </button>
            <div className="title-stack">
              <span className="eyebrow">Neural Intelligence v2.0</span>
              <h1>Creator <span className="gradient-text">Studio Hub</span></h1>
            </div>
          </div>
          <div className="header-right">
            <div className={`status-pill ${isPro ? 'gold' : 'blue'}`}>
              {isPro ? <Rocket size={16} /> : <User size={16} />}
              {isPro ? 'Pro Strategist' : 'Standard Audit'}
            </div>
            <div className="synergy-badge">
              <Share2 size={16} /> Synergy: {synergyScore}%
            </div>
          </div>
        </header>

        {/* Enhanced Hero Metrics */}
        <div className="hero-metrics-enhanced">
          {hasIG && (
            <>
              <div className="hero-card glow-indigo">
                <div className="card-glass">
                  <div className="icon-badge"><Heart size={20} /></div>
                  <div className="stat-content">
                    <p>Avg Engagement</p>
                    <h2>{igData.engagement}<span className="percent">%</span></h2>
                    <span className={`trend-indicator ${parseFloat(igData.growthRate) >= 0 ? 'up' : 'down'}`}>
                      {parseFloat(igData.growthRate) >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(parseFloat(igData.growthRate))}% growth
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="hero-card glow-pink">
                <div className="card-glass">
                  <div className="icon-badge"><Eye size={20} /></div>
                  <div className="stat-content">
                    <p>Avg Reach</p>
                    <h2>{igData.avgReach}</h2>
                    <span className="tag-niche">{igData.topCategory}</span>
                  </div>
                </div>
              </div>

              <div className="hero-card glow-purple">
                <div className="card-glass">
                  <div className="icon-badge"><Bookmark size={20} /></div>
                  <div className="stat-content">
                    <p>Avg Saves</p>
                    <h2>{igData.avgSaves}</h2>
                    <span className="tag-niche">High Intent</span>
                  </div>
                </div>
              </div>

              <div className="hero-card glow-orange">
                <div className="card-glass">
                  <div className="icon-badge"><Users size={20} /></div>
                  <div className="stat-content">
                    <p>New Follows</p>
                    <h2>{igData.followsFromPost}</h2>
                    <span className="tag-niche">From Posts</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {hasReddit && (
            <>
              <div className="hero-card glow-reddit">
                <div className="card-glass">
                  <div className="icon-badge"><ThumbsUp size={20} /></div>
                  <div className="stat-content">
                    <p>Avg Upvotes</p>
                    <h2>{redditData.avgUpvotes}</h2>
                    <span className="tag-niche">r/{redditData.topSubreddit}</span>
                  </div>
                </div>
              </div>

              <div className="hero-card glow-green">
                <div className="card-glass">
                  <div className="icon-badge"><Activity size={20} /></div>
                  <div className="stat-content">
                    <p>Sentiment Score</p>
                    <h2>{redditData.sentiment}</h2>
                    <span className="tag-niche">{parseFloat(redditData.sentiment) > 0.7 ? 'Very Positive' : 'Positive'}</span>
                  </div>
                </div>
              </div>

              <div className="hero-card glow-yellow">
                <div className="card-glass">
                  <div className="icon-badge"><MessageSquare size={20} /></div>
                  <div className="stat-content">
                    <p>Avg Comments</p>
                    <h2>{redditData.avgComments}</h2>
                    <span className="tag-niche">Discussions</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Analytics Grid */}
        <div className="analytics-grid">
          
          {/* Instagram Weekly Trend */}
          {hasIG && (
            <section className="chart-container span-8 glass-box">
              <div className="box-head">
                <div className="flex-row">
                  <TrendingUp size={20} color="#6366f1" />
                  <h3>Weekly Performance Trajectory</h3>
                </div>
                <div className="legend-items">
                  <span className="dot ig"></span> Reach
                  <span className="dot engagement"></span> Engagement
                </div>
              </div>
              <div className="chart-height">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={igData.weeklyTrend}>
                    <defs>
                      <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={3} fill="url(#colorReach)" />
                    <Area type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={3} fill="url(#colorEngagement)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Hourly Performance */}
          {hasIG && (
            <section className="chart-container span-4 glass-box">
              <div className="box-head">
                <div className="flex-row"><Clock size={20} color="#f59e0b" /><h3>Best Posting Times</h3></div>
              </div>
              <div className="chart-height">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={igData.hourlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="hour" stroke="#64748b" tick={{fontSize: 10}} />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '12px'}} />
                    <Bar dataKey="engagement" fill="#f59e0b" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Category Performance */}
          {hasIG && (
            <section className="chart-container span-6 glass-box">
              <div className="box-head">
                <div className="flex-row"><BarChart3 size={20} color="#E4405F" /><h3>Content Category Performance</h3></div>
              </div>
              <div className="category-bars">
                {igData.categoryBreakdown.map((cat, i) => (
                  <div key={i} className="bar-item">
                    <div className="bar-labels">
                      <span>{cat.name}</span>
                      <span>{(cat.value / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="bar-rail">
                      <div 
                        className={`bar-fill cat-${i}`} 
                        style={{width: `${Math.min(100, (cat.value / Math.max(...igData.categoryBreakdown.map(c => c.value))) * 100)}%`}}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Post Type Distribution */}
          {hasIG && (
            <section className="chart-container span-6 glass-box">
              <div className="box-head">
                <div className="flex-row"><Grid size={20} color="#8b5cf6" /><h3>Post Type Distribution</h3></div>
              </div>
              <div className="chart-height">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={igData.postTypeBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percentage}) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {igData.postTypeBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '12px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Reddit Subreddit Performance */}
          {hasReddit && (
            <section className="chart-container span-6 glass-box">
              <div className="box-head">
                <div className="flex-row"><Globe size={20} color="#FF4500" /><h3>Subreddit Performance</h3></div>
              </div>
              <div className="chart-height-small">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={redditData.subredditReach}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 10}} angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '12px'}} />
                    <Bar dataKey="upvotes" fill="#FF4500" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Reddit Sentiment Trend */}
          {hasReddit && (
            <section className="chart-container span-6 glass-box">
              <div className="box-head">
                <div className="flex-row"><Activity size={20} color="#10b981" /><h3>Sentiment Evolution</h3></div>
              </div>
              <div className="chart-height-small">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={redditData.sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="post" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '12px'}} />
                    <Line type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Instagram KPIs */}
          {hasIG && (
            <section className="chart-container span-4 glass-box">
              <div className="box-head">
                <div className="flex-row"><Target size={20} color="#6366f1" /><h3>Key Performance Indicators</h3></div>
              </div>
              <div className="kpi-grid">
                <div className="kpi-item">
                  <div className="kpi-icon"><Heart size={18} color="#ec4899" /></div>
                  <div className="kpi-data">
                    <span className="kpi-label">Avg Likes</span>
                    <span className="kpi-value">{igData.avgLikes}</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-icon"><MessageCircle size={18} color="#8b5cf6" /></div>
                  <div className="kpi-data">
                    <span className="kpi-label">Avg Comments</span>
                    <span className="kpi-value">{igData.avgComments}</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-icon"><Share2 size={18} color="#10b981" /></div>
                  <div className="kpi-data">
                    <span className="kpi-label">Avg Shares</span>
                    <span className="kpi-value">{igData.avgShares}</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-icon"><Eye size={18} color="#f59e0b" /></div>
                  <div className="kpi-data">
                    <span className="kpi-label">Impressions</span>
                    <span className="kpi-value">{igData.avgImpressions}</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-icon"><User size={18} color="#06b6d4" /></div>
                  <div className="kpi-data">
                    <span className="kpi-label">Profile Visits</span>
                    <span className="kpi-value">{igData.profileVisits}</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-icon"><Hash size={18} color="#a855f7" /></div>
                  <div className="kpi-data">
                    <span className="kpi-label">Avg Hashtags</span>
                    <span className="kpi-value">{igData.avgHashtags}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Audience Location */}
          {hasIG && (
            <section className="chart-container span-4 glass-box">
              <div className="box-head">
                <div className="flex-row"><MapPin size={20} color="#ef4444" /><h3>Audience Geography</h3></div>
              </div>
              <div className="location-list">
                {igData.locationBreakdown.map((loc, i) => (
                  <div key={i} className="location-item">
                    <div className="location-info">
                      <MapPin size={16} color={COLORS[i % COLORS.length]} />
                      <span>{loc.name}</span>
                    </div>
                    <span className="location-reach">{(loc.value / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Content Insights */}
          {hasIG && (
            <section className="chart-container span-4 glass-box">
              <div className="box-head">
                <div className="flex-row"><Sparkles size={20} color="#fbbf24" /><h3>Content Insights</h3></div>
              </div>
              <div className="insights-list">
                <div className="insight-item">
                  <Award size={18} color="#fbbf24" />
                  <div>
                    <span className="insight-label">Trending Posts</span>
                    <span className="insight-value">{igData.trendingPosts} posts went viral</span>
                  </div>
                </div>
                <div className="insight-item">
                  <Film size={18} color="#ec4899" />
                  <div>
                    <span className="insight-label">Best Format</span>
                    <span className="insight-value">{igData.bestPostType}</span>
                  </div>
                </div>
                <div className="insight-item">
                  <Clock size={18} color="#8b5cf6" />
                  <div>
                    <span className="insight-label">Optimal Time</span>
                    <span className="insight-value">{igData.bestTime} on {igData.bestDay}</span>
                  </div>
                </div>
                <div className="insight-item">
                  <AlignLeft size={18} color="#10b981" />
                  <div>
                    <span className="insight-label">Caption Length</span>
                    <span className="insight-value">{igData.avgCaptionLength} characters avg</span>
                  </div>
                </div>
                <div className="insight-item">
                  <AlertCircle size={18} color="#ef4444" />
                  <div>
                    <span className="insight-label">Anomalies Detected</span>
                    <span className="insight-value">{igData.anomalyCount} unusual patterns</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Reddit Top Performers */}
          {hasReddit && redditData.topPerformers.length > 0 && (
            <section className="chart-container span-6 glass-box">
              <div className="box-head">
                <div className="flex-row"><Award size={20} color="#fbbf24" /><h3>Top Performing Posts</h3></div>
              </div>
              <div className="top-posts-list">
                {redditData.topPerformers.map((post, i) => (
                  <div key={i} className="top-post-item">
                    <div className="post-rank">#{i + 1}</div>
                    <div className="post-info">
                      <span className="post-sub">r/{post.subreddit}</span>
                      <div className="post-metrics">
                        <span><ThumbsUp size={14} /> {post.upvotes}</span>
                        <span><MessageCircle size={14} /> {post.comments}</span>
                        <span className={`sentiment-badge ${parseFloat(post.sentiment) > 0.7 ? 'positive' : 'neutral'}`}>
                          {parseFloat(post.sentiment) > 0.7 ? '😊 Positive' : '😐 Neutral'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reddit Community Stats */}
          {hasReddit && (
            <section className="chart-container span-6 glass-box">
              <div className="box-head">
                <div className="flex-row"><Users size={20} color="#FF4500" /><h3>Community Engagement</h3></div>
              </div>
              <div className="reddit-stats-grid">
                <div className="reddit-stat">
                  <div className="stat-icon"><ThumbsUp size={24} color="#10b981" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Upvote Ratio</span>
                    <span className="stat-number">{redditData.upvoteRatio}%</span>
                  </div>
                </div>
                <div className="reddit-stat">
                  <div className="stat-icon"><Eye size={24} color="#6366f1" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Total Reach</span>
                    <span className="stat-number">{redditData.totalReach}</span>
                  </div>
                </div>
                <div className="reddit-stat">
                  <div className="stat-icon"><Link size={24} color="#f59e0b" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Avg Clicks</span>
                    <span className="stat-number">{redditData.avgClicks}</span>
                  </div>
                </div>
                <div className="reddit-stat">
                  <div className="stat-icon"><AlertCircle size={24} color="#ef4444" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Controversial</span>
                    <span className="stat-number">{redditData.controversyRate}%</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AI Strategy Console */}
          <section className="strategy-console span-12 glass-box">
            <div className="console-head">
              <ShieldCheck size={32} className="pulse-green" />
              <div>
                <h2>AI-Powered Growth Strategy</h2>
                <p>Personalized recommendations based on your {hasIG ? igData.topCategory : ''} content performance</p>
              </div>
            </div>
            <div className="console-grid">
              {hasIG && (
                <>
                  <div className="console-item">
                    <Zap size={22} color="#f59e0b" />
                    <div className="advice-text">
                      <p><b>Peak Optimization:</b> Your engagement peaks on <strong>{igData.bestDay}</strong> at <strong>{igData.bestTime}</strong>. Schedule your highest-quality {igData.bestPostType} content during this window for maximum reach.</p>
                    </div>
                  </div>
                  <div className="console-item">
                    <Target size={22} color="#ec4899" />
                    <div className="advice-text">
                      <p><b>Content Strategy:</b> <strong>{igData.topCategory}</strong> performs best with {igData.avgHashtags} hashtags and {igData.avgCaptionLength} character captions. Your saves-to-reach ratio indicates high-intent audience.</p>
                    </div>
                  </div>
                  <div className="console-item">
                    <TrendingUp size={22} color="#10b981" />
                    <div className="advice-text">
                      <p><b>Growth Trajectory:</b> {parseFloat(igData.growthRate) >= 0 ? `You're growing at ${igData.growthRate}% - maintain consistency!` : `Engagement dropped ${Math.abs(parseFloat(igData.growthRate))}% - try A/B testing formats.`}</p>
                    </div>
                  </div>
                </>
              )}
              {hasReddit && (
                <>
                  <div className="console-item">
                    <Globe size={22} color="#FF4500" />
                    <div className="advice-text">
                      <p><b>Community Authority:</b> Your {redditData.upvoteRatio}% upvote ratio in <strong>r/{redditData.topSubreddit}</strong> signals strong credibility. Leverage this for thought leadership content.</p>
                    </div>
                  </div>
                  <div className="console-item">
                    <Activity size={22} color="#8b5cf6" />
                    <div className="advice-text">
                      <p><b>Sentiment Analysis:</b> Your {redditData.sentiment} sentiment score shows {parseFloat(redditData.sentiment) > 0.7 ? 'highly positive' : 'positive'} reception. Discussions generate {redditData.avgComments} comments on average - ideal for engagement.</p>
                    </div>
                  </div>
                </>
              )}
              {hasIG && hasReddit && (
                <div className="console-item">
                  <Share2 size={22} color="#818cf8" />
                  <div className="advice-text">
                    <p><b>Cross-Platform Synergy:</b> Repurpose your Reddit discussions from r/{redditData.topSubreddit} into Instagram {igData.bestPostType} content. {synergyScore}% audience overlap detected.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreatorInsights;