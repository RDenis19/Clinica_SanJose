// src/components/layouts/AdminLayout.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/layouts/AdminLayout.css';

// Íconos (admin)
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineTool
} from 'react-icons/ai';
import { BiBookContent } from 'react-icons/bi';

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Columna Izquierda: Sidebar */}
      <Sidebar
        links={[
          { label: 'Dashboard', to: '/admin/dashboard', icon: <AiOutlineDashboard /> },
          { label: 'Usuarios', to: '/admin/users', icon: <AiOutlineUser /> },
          { label: 'Pacientes', to: '/admin/patients', icon: <AiOutlineTeam /> },
          { label: 'Solicitudes de Cambio', to: '/admin/change', icon: <AiOutlineTool /> },
          { label: 'Formulario', to: '/admin/form', icon: <BiBookContent /> }
        ]}
      />

      {/* Columna Derecha: Header arriba + contenido abajo */}
      <div className="admin-main">
        <Header username="Administrador" profilePic="https://via.placeholder.com/40" />

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
