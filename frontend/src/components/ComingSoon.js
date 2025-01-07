import React from 'react';
import './comingSoon.css';

const ComingSoon = ({ message = "Próximamente" }) => {
  return (
    <div className="coming-soon-container">
      <div className="animation-container">
        <div className="circle"></div>
      </div>
      <h2 className="coming-soon-text">{message}</h2>
    </div>
  );
};

export default ComingSoon;
