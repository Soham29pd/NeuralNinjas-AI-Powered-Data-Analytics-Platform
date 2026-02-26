import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, ReferenceLine, Label
} from 'recharts';

const COLORS = { 'Positive': '#4ade80', 'Neutral': '#94a3b8', 'Negative': '#f87171' };

export const SentimentPie = ({ data }) => {
  const counts = (data || []).reduce((acc, curr) => {
    const s = curr.Sentiment || 'Neutral';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div className="chart-card">
      <h3>Sentiment Mood Distribution</h3>
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
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const CorrelationChart = ({ data }) => {
  // Calculate average engagement to draw the horizontal "Success Line"
  const avgEngagement = data.length > 0 
    ? data.reduce((acc, curr) => acc + (Number(curr.Total_Engagement) || 0), 0) / data.length 
    : 0;

  return (
    <div className="chart-card span-8">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Impact Analysis: Engagement vs. Sentiment</h3>
        <span style={{ fontSize: '0.75rem', color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
          Target: Top Right Quadrant
        </span>
      </div>
      
      <div style={{ height: '350px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <XAxis 
                type="number" 
                dataKey="Sentiment_Score" 
                name="Sentiment" 
                stroke="#94a3b8" 
                domain={[-1, 1]} 
                tick={{fontSize: 12}}
            >
              <Label value="Negative ↔ Positive Sentiment" offset={-10} position="insideBottom" fill="#64748b" />
            </XAxis>
            
            <YAxis 
                type="number" 
                dataKey="Total_Engagement" 
                name="Engagement" 
                stroke="#94a3b8" 
                tick={{fontSize: 12}}
            />
            
            <ZAxis type="number" range={[60, 400]} />
            
            <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
            />

            {/* 💡 THE MAGIC: Quadrant Lines */}
            {/* Vertical line at 0 sentiment (Neutral) */}
            <ReferenceLine x={0} stroke="#475569" strokeDasharray="5 5" />
            
            {/* Horizontal line at Average Engagement */}
            <ReferenceLine y={avgEngagement} stroke="#475569" strokeDasharray="5 5">
                <Label value="Avg Engagement" position="insideTopLeft" fill="#475569" fontSize={10} />
            </ReferenceLine>

            {/* Color-coded dots based on quadrant */}
            <Scatter name="Posts" data={data}>
              {data.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={entry.Sentiment_Score > 0 ? '#4ade80' : '#f87171'} 
                    fillOpacity={0.6} 
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', fontSize: '0.7rem', color: '#64748b' }}>
        <span>🔴 Controversial (High Engage / Low Sent)</span>
        <span>🟢 Viral Success (High Engage / High Sent)</span>
      </div>
    </div>
  );
};