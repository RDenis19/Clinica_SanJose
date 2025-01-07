import React from 'react';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import '../../styles/Administrador/admin.css';

function Dashboard() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <Header />
        <div className="dashboard-content">
          <h1>PRÓXIMAMENTE</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
