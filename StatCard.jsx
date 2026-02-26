import React from 'react';
import { Users, Activity, TrendingUp, Video, Heart, Repeat, Smile, Rocket } from 'lucide-react';

const iconMap = { Users, Activity, TrendingUp, Video, Heart, Repeat, Smile, Rocket };

const StatCard = ({ title, value, trend, icon, color }) => {
    const Icon = iconMap[icon] || Activity;
    const isPositive = parseFloat(trend) >= 0;

    return (
        <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
            <div className="stat-header">
                <span className="stat-title">{title}</span>
                <div className="stat-icon-bg" style={{ backgroundColor: `${color}22`, color: color }}>
                    <Icon size={20} />
                </div>
            </div>
            <div className="stat-body">
                <h2 className="stat-value">{value}</h2>
                <span className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(trend)}%
                </span>
            </div>
        </div>
    );
};

export default StatCard;