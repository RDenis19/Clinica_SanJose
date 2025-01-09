import React from 'react';
import '../../styles/layouts/sidebar.css';
import { NavLink } from 'react-router-dom';

function Sidebar({ links = [] }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Clínica Hospital <span>San José</span></h1>
        <p>Todo Corazón</p>
      </div>
      <ul className="menu">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

