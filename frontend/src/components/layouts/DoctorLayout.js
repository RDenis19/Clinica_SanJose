// src/components/layouts/DoctorLayout.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/layouts/DoctorLayout.css';

// Íconos (doctor)
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaBookMedical } from 'react-icons/fa';

function DoctorLayout({ children }) {
  return (
    <div className="doctor-layout">
      {/* Columna Izquierda */}
      <Sidebar
        links={[
          { label: 'Dashboard', to: '/doctor/dashboard', icon: <AiOutlineDashboard /> },
          { label: 'Pacientes', to: '/doctor/pacientes', icon: <BiUserCircle /> },
          { label: 'Historias Clínicas', to: '/doctor/historias', icon: <FaBookMedical /> }
        ]}
      />

      {/* Columna Derecha: Header arriba + contenido abajo */}
      <div className="doctor-main">
        <Header username="Doctor" profilePic="https://via.placeholder.com/40" />

        <div className="doctor-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DoctorLayout;
