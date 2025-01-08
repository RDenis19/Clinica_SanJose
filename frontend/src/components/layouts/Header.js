import React from 'react';
import { AiOutlineBell } from 'react-icons/ai'; // Icono para las notificaciones
import '../../styles/layouts/header.css';

function Header({ username, profilePic }) {
  return (
    <div className="header">
      <h1>Bienvenido, <span>{username}</span></h1>
      <div className="header-right">
        {/* Icono de notificaciones */}
        <AiOutlineBell className="notification-icon" />
        {/* Foto de perfil */}
        <div className="profile">
          <img
            src={profilePic}
            alt="Perfil"
            className="profile-pic"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
