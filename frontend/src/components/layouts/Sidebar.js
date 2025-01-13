// src/components/layouts/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import '../../styles/layouts/sidebar.css';

function Sidebar({ links = [], onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>
          Clínica Hospital <span>San José</span>
        </h1>
        <p>Todo Corazón</p>
      </div>
      <ul className="menu">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="icon">{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Cerrar Sesión */}
      <div className="logout-section">
        <button className="logout-button" onClick={onLogout}>
          <AiOutlineLogout className="logout-icon" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
