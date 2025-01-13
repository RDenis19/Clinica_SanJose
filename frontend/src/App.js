import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { isTokenExpired } from './utils/authUtils';
import { fetchUserDetails } from './utils/api';

import Header from './components/layouts/Header';
import Sidebar from './components/layouts/Sidebar';
import Login from './modules/Login/Login';
import AdminLayout from './components/layouts/AdminLayout';
import DoctorLayout from './components/layouts/DoctorLayout';
import EnfermeraLayout from './components/layouts/EnfermeraLayout';
import Dashboard from './modules/Admin/Dashboard';
import Users from './modules/Admin/Users/Users';
import Patients from './modules/Admin/Patients/Patients';
import ChangeRequest from './modules/Admin/ChangeRequest';
import Formulario from './modules/Admin/Formulario/Form';
import DashboardDoctor from './modules/Doctor/DashboardDoctor';
import PacientesDoctor from './modules/Doctor/PacientesDoctor';
import HistoriasDoctor from './modules/Doctor/HistoriaClinica/HistoriasDoctor';
import DashboardEnfermera from './modules/Enfermera/DashboardEnfermera';
import PacientesEnfermera from './modules/Enfermera/PacientesEnfermera';
import HistoriasEnfermera from './modules/Enfermera/Historia Clinica/HistoriasEnfermera';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token || isTokenExpired(token)) {
      localStorage.clear();
      navigate('/');
    } else {
      fetchUserDetails('current') // Cambia 'current' si necesitas usar un ID real
        .then((data) => {
          setUser(data);

          // Define los enlaces del sidebar según el rol del usuario
          const roleLinks = {
            Admin: [
              { to: '/admin/dashboard', label: 'Dashboard', icon: <i className="fas fa-tachometer-alt"></i> },
              { to: '/admin/users', label: 'Usuarios', icon: <i className="fas fa-users"></i> },
              { to: '/admin/patients', label: 'Pacientes', icon: <i className="fas fa-user-injured"></i> },
              { to: '/admin/form', label: 'Formularios', icon: <i className="fas fa-file-alt"></i> },
            ],
            Doctor: [
              { to: '/doctor/dashboard', label: 'Dashboard', icon: <i className="fas fa-tachometer-alt"></i> },
              { to: '/doctor/pacientes', label: 'Pacientes', icon: <i className="fas fa-user-injured"></i> },
              { to: '/doctor/historias', label: 'Historias Clínicas', icon: <i className="fas fa-notes-medical"></i> },
            ],
            Enfermera: [
              { to: '/enfermera/dashboard', label: 'Dashboard', icon: <i className="fas fa-tachometer-alt"></i> },
              { to: '/enfermera/paciente', label: 'Pacientes', icon: <i className="fas fa-user-injured"></i> },
              { to: '/enfermera/historias', label: 'Historias Clínicas', icon: <i className="fas fa-notes-medical"></i> },
            ],
          };

          setLinks(roleLinks[data.role] || []); // Asigna enlaces basados en el rol
        })
        .catch(() => {
          localStorage.clear();
          navigate('/');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirige al login después de cerrar sesión
  };

  return (
    <>
      {user && (
        <>
          <Header username={user.name} profilePic={user.profilePic} />
          <Sidebar links={links} onLogout={handleLogout} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
        <Route path="/admin/patients" element={<AdminLayout><Patients /></AdminLayout>} />
        <Route path="/admin/change" element={<AdminLayout><ChangeRequest /></AdminLayout>} />
        <Route path="/admin/form" element={<AdminLayout><Formulario /></AdminLayout>} />
        <Route path="/doctor/dashboard" element={<DoctorLayout><DashboardDoctor /></DoctorLayout>} />
        <Route path="/doctor/pacientes" element={<DoctorLayout><PacientesDoctor /></DoctorLayout>} />
        <Route path="/doctor/historias" element={<DoctorLayout><HistoriasDoctor /></DoctorLayout>} />
        <Route path="/enfermera/dashboard" element={<EnfermeraLayout><DashboardEnfermera /></EnfermeraLayout>} />
        <Route path="/enfermera/paciente" element={<EnfermeraLayout><PacientesEnfermera /></EnfermeraLayout>} />
        <Route path="/enfermera/historias" element={<EnfermeraLayout><HistoriasEnfermera /></EnfermeraLayout>} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
