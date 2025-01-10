// src/modules/Doctor/steps/PasoBasico.js
import React, { useState } from 'react';
import Button from '../../../../components/common/Button'; // Reutilizar tu botón
import BackButton from '../../../../components//common/BackButton'; 

function PasoBasico({ nextStep }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    // ...
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    // Validaciones (si es necesario)
    nextStep();
  };

  return (
    <div>
      {/* Botón de regreso */}
      <BackButton to="/doctor/historias" label="Volver al Historial" />
      
      <h2>Registro Básico</h2>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <label>Nombre Completo:</label><br/>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
          />
        </div>
        <div>
          <label>Apellidos Completos:</label><br/>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Ej: Román Morales"
          />
        </div>
      </div>
      {/* Más campos (edad, correo, etc.) */}

      <div style={{ marginTop: '1rem' }}>
        <Button label="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
}

export default PasoBasico;
