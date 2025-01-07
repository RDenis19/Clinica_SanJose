import React from 'react';
import '../styles/header.css';

function Header({ username }) {
  return (
    <div className="header">
      <h1>Bienvenido, <span>{username}</span></h1>
      <div className="header-right">
        <input type="text" placeholder="Buscar Paciente" />
        <button>🔍</button>
        <div className="profile">
          <span className="notification-dot"></span>
          <img
            src="../assets/images/Administrador.png" // Reemplaza con la imagen de perfil
            alt="Perfil"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
