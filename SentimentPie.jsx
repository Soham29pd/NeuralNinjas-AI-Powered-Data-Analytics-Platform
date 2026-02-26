import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SentimentPie = ({ data }) => {
  // Guard for empty data
  const posts = Array.isArray(data) ? data : [];

  // Aggregate sentiment counts
  const counts = posts.reduce((acc, curr) => {
    const s = curr.Sentiment || 'Neutral';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const COLORS = { 'Positive': '#4ade80', 'Neutral': '#94a3b8', 'Negative': '#f87171' };

  return (
    <div className="chart-card">
      <h3>Sentiment Distribution</h3>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#6366f1'} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentPie;