import React from 'react';
import '../styles/layouts/sidebar.css';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineTeam, AiOutlineTool } from 'react-icons/ai';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Clínica Hospital <span>San José</span></h1>
        <p>Todo Corazón</p>
      </div>
      <ul className="menu">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <AiOutlineDashboard /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <AiOutlineUser /> Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/patients"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <AiOutlineTeam /> Pacientes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/change"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <AiOutlineTool /> Solicitud Cambio
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
