// src/components/layouts/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layouts/sidebar.css';

function Sidebar({ links = [] }) {
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
              {link.icon} {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
