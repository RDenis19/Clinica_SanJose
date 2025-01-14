import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/layouts/AdminLayout.css';

// Importar íconos desde react-icons
import { AiOutlineDashboard, AiOutlineUser, AiOutlineTeam, AiOutlineTool } from 'react-icons/ai';
import { BiBookContent } from 'react-icons/bi';

function AdminLayout({ children }) {
  const adminLinks = [
    {
      label: 'Dashboard',
      to: '/admin/dashboard',
      icon: <AiOutlineDashboard />,
    },
    {
      label: 'Usuarios',
      to: '/admin/users',
      icon: <AiOutlineUser />,
      subMenu: [
        { label: 'Firma Electrónica', to: '/admin/users/firma-electronica' },
        { label: 'Jornada', to: '/admin/users/jornada' },
        { label: 'Título', to: '/admin/users/titulo' },
      ],
    },
    {
      label: 'Pacientes',
      to: '/admin/patients',
      icon: <AiOutlineTeam />,
    },
    {
      label: 'Solicitudes de Cambio',
      to: '/admin/change',
      icon: <AiOutlineTool />,
    },
    {
      label: 'Formulario',
      to: '/admin/form',
      icon: <BiBookContent />,
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar con enlaces dinámicos */}
      <Sidebar links={adminLinks} />
      <div className="admin-main">
        <Header username="Administrador" profilePic="https://via.placeholder.com/40" />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
