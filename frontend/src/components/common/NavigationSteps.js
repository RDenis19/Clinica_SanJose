// src/modules/Doctor/steps/NavigationSteps.js
import React from 'react';
import '../../styles/components/NavigationSteps.css'; // si gustas un CSS

function NavigationSteps({ step }) {
  return (
    <div className="navigation-steps">
      <div className={`step-item ${step >= 1 ? 'active' : ''}`}>Registro Básico</div>
      <div className={`step-item ${step >= 2 ? 'active' : ''}`}>Tipo Formulario</div>
      <div className={`step-item ${step >= 3 ? 'active' : ''}`}>Formulario</div>
    </div>
  );
}

export default NavigationSteps;
