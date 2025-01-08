import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './modules/Login/Login';
import AdminLayout from './components/layouts/AdminLayout';
import Dashboard from './modules/Admin/Dashboard';
import Users from './modules/Admin/Users/Users';
import Patients from './modules/Admin/Patients';
import ChangeRequest from './modules/Admin/ChangeRequest';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas del Administrador */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <AdminLayout>
              <Patients />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/change"
          element={
            <AdminLayout>
              <ChangeRequest />
            </AdminLayout>
          }
        />
      <Route
          path="/admin/form"
          element={
            <AdminLayout>
              <form />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
