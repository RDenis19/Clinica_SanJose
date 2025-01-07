import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './AdminLayout.css';

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        {/* Aquí se renderiza dinámicamente el contenido de la ruta */}
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
