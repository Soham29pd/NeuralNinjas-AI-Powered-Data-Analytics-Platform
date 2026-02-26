import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EngagementChart = ({ data }) => {
    // 🔧 SAFETY GUARD: If data is an object, convert it to an array. 
    // If it's null/undefined, use an empty array.
    const chartData = Array.isArray(data) 
        ? data 
        : data && typeof data === 'object' 
            ? Object.entries(data).map(([name, value]) => ({ Platform: name, Total_Engagement: value }))
            : [];

    if (chartData.length === 0) {
        return (
            <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                No engagement data available to display.
            </div>
        );
    }

    return (
        <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                        dataKey="Platform" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} 
                        itemStyle={{ color: '#6366f1' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="Total_Engagement" 
                        stroke="#6366f1" 
                        fillOpacity={1} 
                        fill="url(#colorEngage)" 
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EngagementChart;