import React from 'react';
import '../styles/components/stats.css';

const Stats = ({ stats }) => {
  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <p className="stat-label">{stat.label}</p>
          <h3 className="stat-value">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default Stats;
