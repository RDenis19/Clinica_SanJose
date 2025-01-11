import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './modules/Login/Login';

// Layouts
import AdminLayout from './components/layouts/AdminLayout';
import DoctorLayout from './components/layouts/DoctorLayout';
import EnfermeraLayout from './components/layouts/EnfermeraLayout';

// Vistas de Admin
import Dashboard from './modules/Admin/Dashboard';
import Users from './modules/Admin/Users/Users';
import Patients from './modules/Admin/Patients';
import ChangeRequest from './modules/Admin/ChangeRequest';
import Formulario from './modules/Admin/Formulario/Form';  

// Vistas de Doctor
import DashboardDoctor from './modules/Doctor/DashboardDoctor';
import PacientesDoctor from './modules/Doctor/PacientesDoctor';
import HistoriasDoctor from './modules/Doctor/HistoriaClinica/HistoriasDoctor';




// Vistas de Enfermera
import DashboardEnfermera from './modules/Enfermera/DashboardEnfermera';
import PacientesEnfermera from './modules/Enfermera/PacientesEnfermera';
import HistoriasEnfermera from './modules/Enfermera/Historia Clinica/HistoriasEnfermera';

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
              <Formulario />
            </AdminLayout>
          }
        />

        {/* Rutas del Doctor */}
        <Route
          path="/doctor/dashboard"
          element={
            <DoctorLayout>
              <DashboardDoctor />
            </DoctorLayout>
          }
        />
        <Route
          path="/doctor/pacientes"
          element={
            <DoctorLayout>
              <PacientesDoctor />
            </DoctorLayout>
          }
        />
        <Route
          path="/doctor/historias"
          element={
            <DoctorLayout>
              <HistoriasDoctor />
            </DoctorLayout>
          }
        />

        {/* Rutas de la Enfermera */}
        <Route
          path="/enfermera/dashboard"
          element={
            <EnfermeraLayout>
              <DashboardEnfermera />
            </EnfermeraLayout>
          }
        />

        <Route
          path="/enfermera/paciente"
          element={
            <EnfermeraLayout>
              <PacientesEnfermera />
            </EnfermeraLayout>
          }
        /> 

        <Route
          path="/enfermera/historias"
          element={
            <EnfermeraLayout>
              <HistoriasEnfermera />
            </EnfermeraLayout>
          }
        />   

        {/* 404 si la ruta no existe */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
