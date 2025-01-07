import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Clínica Hospital <span>San José</span></h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/admin/patients">Pacientes</Link>
        </li>
        <li>
          <span>Solicitud Cambio</span> {/* Módulo no funcional */}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
