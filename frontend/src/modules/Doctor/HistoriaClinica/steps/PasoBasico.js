// src/modules/Doctor/steps/PasoBasico.js
import React, { useState } from 'react';
import Button from '../../../../components/common/Button';

function PasoBasico({ prevStep, onSubmit }) {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellidos: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchOrRegister = () => {
    if (!formData.cedula.trim()) {
      alert('Por favor, ingresa la cédula.');
      return;
    }
    onSubmit();
  };

  return (
    <div>
      <h2>Registro Básico</h2>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button label="Atrás" onClick={prevStep} className="secondary" />
        <Button label="Finalizar" onClick={handleSearchOrRegister} style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
}

export default PasoBasico;
