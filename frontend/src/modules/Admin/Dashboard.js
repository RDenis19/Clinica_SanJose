import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import '../../styles/admin.css';

function Dashboard() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Header username="Administrador" />
        <div className="dashboard-content">
          <h1>PRÓXIMAMENTE</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
