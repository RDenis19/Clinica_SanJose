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
      label: 'Historia Clínica',
      to: '/admin/historia-clinica',
      icon: <BiBookContent />,
      subMenu: [
        { label: 'Establecimiento', to: '/admin/historia-clinica/establecimiento' },
        { label: 'Plantillas', to: '/admin/historia-clinica/plantillas' },
        { label: 'Formularios', to: '/admin/historia-clinica/formularios' },
      ],
    },
  ];

  return (
    <div className="admin-layout">
      <Sidebar links={adminLinks} />
      <div className="admin-main">
        <Header username="Administrador" profilePic="https://via.placeholder.com/40" />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
