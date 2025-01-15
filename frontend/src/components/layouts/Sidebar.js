import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../styles/layouts/sidebar.css';

function Sidebar({ links = [], onLogout }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSubMenu = (menuLabel) => {
    setExpandedMenu(expandedMenu === menuLabel ? null : menuLabel);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>
          Clínica Hospital <span>San José</span>
        </h1>
        <p>Todo Corazón</p>
      </div>
      <ul className="menu">
        {links.map((link) =>
          link.subMenu ? (
            <li key={link.label} className="menu-item">
              <div
                className={`menu-link ${expandedMenu === link.label ? 'active' : ''}`}
                onClick={() => toggleSubMenu(link.label)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <span className="icon">{link.icon}</span>
                  {link.label}
                </NavLink>
                <button className="toggleButton">
                  {expandedMenu === link.label ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {expandedMenu === link.label && (
                <ul className="submenu">
                  {link.subMenu.map((subLink) => (
                    <li key={subLink.to}>
                      <NavLink
                        to={subLink.to}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {subLink.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <span className="icon">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          )
        )}
      </ul>
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
