import React from 'react';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai'; // Iconos para la lupa y notificaciones
import '../styles/header.css';

function Header({ username, profilePic }) {
  return (
    <div className="header">
      <h1>Bienvenido, <span>{username}</span></h1>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Buscar Paciente" />
          <AiOutlineSearch className="search-icon" />
        </div>
        <AiOutlineBell className="notification-icon" />
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
