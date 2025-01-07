import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import '../../styles/Administrador/admin.css';

function Dashboard() {
  const username = "Juan Pérez"; // Simulación del usuario actual
  const profilePic = "https://via.placeholder.com/40"; // Imagen de perfil simulada

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Header username={username} profilePic={profilePic} />
        <div className="dashboard-content">
          <h1>PRÓXIMAMENTE</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
