// src/modules/Doctor/steps/PasoFormulario.js
import React, { useState } from 'react';
import Button from '../../../../components/common/Button';
import BackButton from '../../../../components//common/BackButton'; 

function PasoFormulario({ prevStep, onSubmit }) {
  const [info, setInfo] = useState({
    celular: '',
    habitacion: '',
  });

  const handleChange = (e) => {
    setInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFinal = () => {
    onSubmit(); // Enviar los datos
  };

  return (
    <div>
      <BackButton to="/doctor/historias" label="Volver al Historial" />
      <h2>Formulario Detallado</h2>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <label>Celular:</label><br/>
          <input
            type="text"
            name="celular"
            value={info.celular}
            onChange={handleChange}
            placeholder="Ej: 0999999999"
          />
        </div>
        <div>
          <label>Asignación de Habitación:</label><br/>
          <input
            type="text"
            name="habitacion"
            value={info.habitacion}
            onChange={handleChange}
            placeholder="Ej: 101"
          />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button label="Anterior" onClick={prevStep} className="secondary" />
        <Button label="Completado" onClick={handleFinal} style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
}

export default PasoFormulario;
