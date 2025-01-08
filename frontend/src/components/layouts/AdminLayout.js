import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/layouts/AdminLayout.css';

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <Sidebar />
    <div className="main-content">
      <Header />
      <div className="content">
        {children}
      </div>
    </div>
  </div>
);

export default AdminLayout;
