import React from 'react';
import './Card.css';

const Card = ({ title, value, trend }) => {
  return (
    <div className="stat-card">
      <span className="card-title">{title}</span>
      <h2 className="card-value">{value}</h2>
      <span className={`card-trend ${trend.includes('+') ? 'positive' : ''}`}>
        {trend} vs last month
      </span>
    </div>
  );
};

export default Card;