import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './modules/Login/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './modules/Admin/Dashboard';
import Users from './modules/Admin/Users';
import Patients from './modules/Admin/Patients';
import ChangeRequest from './modules/Admin/ChangeRequest';

// Verificar autenticación
const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas del Administrador */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Patients />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/change"
          element={
            <PrivateRoute>
              <AdminLayout>
                <ChangeRequest />
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
