// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'; // Icono de react-icons
import '../../styles/components/BackButton.css'; // Opcional para estilos

const BackButton = ({ to, label = 'Regresar', className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to); // Navegar a una ruta específica
    } else {
      navigate(-1); // Retroceder en el historial
    }
  };

  return (
    <button className={`back-button ${className}`} onClick={handleBack}>
      <AiOutlineArrowLeft size={20} style={{ marginRight: '8px' }} />
      {label}
    </button>
  );
};

export default BackButton;
