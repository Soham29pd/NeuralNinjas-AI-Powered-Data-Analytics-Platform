import { useState, useEffect } from 'react';

export const useAnalytics = () => {
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = "http://localhost:8000/api";
    
    Promise.all([
      fetch(`${API_BASE}/analytics/overview`).then(res => res.json()),
      fetch(`${API_BASE}/analytics/ai-insights`).then(res => res.json())
    ])
    .then(([analyticsData, insightData]) => {
      setData(analyticsData);
      setInsights(insightData);
    })
    .catch(err => console.error("404 Error - Check API Prefixes:", err))
    .finally(() => setLoading(false));
  }, []);

  return { data, insights, loading };
};