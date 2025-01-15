import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'; // Icono de react-icons
import '../../styles/components/BackButton.css'; // Opcional para estilos

const BackButton = ({ to, label = 'Volver', className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to); 
    } else {
      navigate(-1); /
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
