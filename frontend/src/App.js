import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { isTokenExpired, logout } from "./utils/authUtils";

// Componentes generales
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import Login from "./modules/Login/Login";

// Layouts específicos
import AdminLayout from "./components/layouts/AdminLayout";
import DoctorLayout from "./components/layouts/DoctorLayout";
import EnfermeraLayout from "./components/layouts/EnfermeraLayout";

// Módulos del Administrador
import Dashboard from "./modules/Admin/Dashboard";
import Users from "./modules/Admin/Users/Users";
import Patients from "./modules/Admin/Patients/Patients";
import ChangeRequest from "./modules/Admin/ChangeRequest";
import HistoriaClinica from "./modules/Admin/HistoriaClinica/HistoriaClinica/HistoriaClinica";
import Plantillas from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Plantilla/TipoFormularioList";
import Formularios from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Formulario/Formularios";
import FirmaElectronica from "./modules/Admin/Users/SubMenu/FirmaEletronica/FirmaElectronica";

// Módulos del Doctor
import DashboardDoctor from "./modules/Doctor/DashboardDoctor";
import PacientesDoctor from "./modules/Doctor/Pacientes/PacientesDoctor";
import HistoriasDoctor from "./modules/Doctor/HistoriaClinica/HistoriasDoctor";
import FormulariosDoctor from "./modules/Doctor/HistoriaClinica/Formulario/Formularios";

// Módulos de la Enfermera
import DashboardEnfermera from "./modules/Enfermera/DashboardEnfermera";
import PacientesEnfermera from "./modules/Enfermera/PacientesEnfermera/PacientesEnfermera";
import HistoriasEnfermera from "./modules/Enfermera/HistoriaClinica/HistoriasEnfermera";
import FormulariosEnfermera from "./modules/Enfermera/HistoriaClinica/Formulario/FormularioEnfermera";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("jwt_token");
  const navigate = useNavigate();

  if (!token || isTokenExpired(token)) {
    logout(navigate);
    return null;
  }

  return children;
};

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const role = localStorage.getItem("userRole");

    if (!token || isTokenExpired(token)) {
      logout(navigate);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);

      const roleLinks = {
        Administrador: [
          { to: "/admin/dashboard", label: "Dashboard" },
          {
            to: "/admin/users",
            label: "Usuarios",
            subMenu: [
              { to: "/admin/users/firma-electronica", label: "Firma Electrónica" },
            ],
          },
          {
            to: "/admin/patients",
            label: "Pacientes",
            subMenu: [
              { to: "/admin/patients/referido", label: "Referidos" },
            ],
          },
          { to: "/admin/change", label: "Solicitudes de Cambio" },
          {
            to: "/admin/historia-clinica",
            label: "Historia Clínica",
            subMenu: [
              { to: "/admin/historia-clinica/plantillas", label: "Plantillas" },
              { to: "/admin/historia-clinica/formularios", label: "Formularios" },
            ],
          },
        ],
        Doctor: [
          { to: "/doctor/dashboard", label: "Dashboard" },
          { to: "/doctor/pacientes", label: "Pacientes" },
          {
            to: "/doctor/historias",
            label: "Historias Clínicas",
            subMenu: [
              { to: "/doctor/historias/formulariosDoctor", label: "Formularios" },
            ],
          },
        ],
        Enfermera: [
          { to: "/enfermera/dashboard", label: "Dashboard" },
          { to: "/enfermera/paciente", label: "Pacientes" },
          {
            to: "/enfermera/historias",
            label: "Historias Clínicas",
            subMenu: [
              { to: "/enfermera/historias/formularioEnfermera", label: "Formularios" },
            ],
          },
        ],
      };

      setLinks(roleLinks[role] || []);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {isAuthenticated && (
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Sidebar links={links} onLogout={() => logout(navigate)} />
            </>
          }
        />
      )}

      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
              <Route path="users" element={<AdminLayout><Users /></AdminLayout>} />
              <Route path="users/firma-electronica" element={<AdminLayout><FirmaElectronica /></AdminLayout>} />
              <Route path="patients" element={<AdminLayout><Patients /></AdminLayout>} />
              <Route path="patients/referido" element={<AdminLayout><ChangeRequest /></AdminLayout>} />
              <Route path="historia-clinica" element={<AdminLayout><HistoriaClinica /></AdminLayout>} />
              <Route path="historia-clinica/plantillas" element={<AdminLayout><Plantillas /></AdminLayout>} />
              <Route path="historia-clinica/formularios" element={<AdminLayout><Formularios /></AdminLayout>} />
            </Routes>
          </PrivateRoute>
        }
      />

      <Route
        path="/doctor/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="dashboard" element={<DoctorLayout><DashboardDoctor /></DoctorLayout>} />
              <Route path="pacientes" element={<DoctorLayout><PacientesDoctor /></DoctorLayout>} />
              <Route path="historias" element={<DoctorLayout><HistoriasDoctor /></DoctorLayout>} />
              <Route path="historias/formulariosDoctor" element={<DoctorLayout><FormulariosDoctor /></DoctorLayout>} />
            </Routes>
          </PrivateRoute>
        }
      />

      <Route
        path="/enfermera/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="dashboard" element={<EnfermeraLayout><DashboardEnfermera /></EnfermeraLayout>} />
              <Route path="pacientes" element={<EnfermeraLayout><PacientesEnfermera /></EnfermeraLayout>} />
              <Route path="historias" element={<EnfermeraLayout><HistoriasEnfermera /></EnfermeraLayout>} />
              <Route path="historias/formularioEnfermera" element={<EnfermeraLayout><FormulariosEnfermera /></EnfermeraLayout>} />
            </Routes>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
