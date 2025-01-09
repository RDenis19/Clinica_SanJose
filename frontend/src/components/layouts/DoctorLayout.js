// src/layouts/DoctorLayout.js
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/layouts/DoctorLayout.css"; // si deseas estilos específicos

function DoctorLayout({ children }) {
  return (
    <div className="doctor-layout">
      {/* Reutilizar el mismo Header */}
      <Header />
      
      <div className="doctor-container">
        {/* Reutilizar el mismo Sidebar pero con links específicos para doctor */}
        <Sidebar 
          links={[
            { label: "Dashboard", to: "/doctor/dashboard" },
            { label: "Pacientes", to: "/doctor/pacientes" },
            { label: "Historias Clínicas", to: "/doctor/historias" }
          ]}
        />
        
        {/* Aquí va el contenido dinámico de cada vista del doctor */}
        <main className="doctor-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;
