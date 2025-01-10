// src/modules/Doctor/steps/PasoTipoFormulario.js
import React, { useState } from 'react';
import Button from '../../../../components/common/Button';
import BackButton from '../../../../components//common/BackButton'; 

function PasoTipoFormulario({ nextStep, prevStep }) {
  const [tipo, setTipo] = useState('');

  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  return (
    <div>
      <BackButton to="/doctor/historias" label="Volver al Historial" />
      <h2>Tipo de Formulario</h2>
      <p>Selecciona qué tipo de atención:</p>
      <label>
        <input
          type="radio"
          name="tipo"
          value="consulta"
          checked={tipo === 'consulta'}
          onChange={(e) => setTipo(e.target.value)}
        />
        Consulta Externa
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="tipo"
          value="emergencia"
          checked={tipo === 'emergencia'}
          onChange={(e) => setTipo(e.target.value)}
        />
        Emergencia
      </label>
      <div style={{ marginTop: '1rem' }}>
        <Button label="Anterior" onClick={handlePrev} className="secondary" />
        <Button label="Siguiente" onClick={handleNext} style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
}

export default PasoTipoFormulario;
