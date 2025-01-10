// src/modules/Doctor/HistoriasClinicas.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button'; // Usa tu componente de botón

function HistoriasClinicas() {
  const navigate = useNavigate();

  const handleRegistrar = () => {
    navigate('/doctor/historias/registrar');
  };

  const handleBuscar = () => {
    navigate('/doctor/historias/buscar');
  };

  const handleEmergencia = () => {
    navigate('/doctor/historias/emergencia');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>¡Historial Clínico!</h1>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Button label="Registrar Paciente" onClick={handleRegistrar} />
        <Button label="Buscar Paciente" onClick={handleBuscar} />
        <Button label="Emergencia" onClick={handleEmergencia} />
      </div>
    </div>
  );
}

export default HistoriasClinicas;
