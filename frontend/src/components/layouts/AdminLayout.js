// src/layouts/AdminLayout.js
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
// Si tienes estilos específicos, puedes importarlos
// import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Cabecera reutilizable */}
      <Header />

      {/* Contenedor principal que alberga Sidebar y el contenido */}
      <div className="admin-container" style={{ display: "flex" }}>
        {/* Barra lateral. 
            Puedes pasar props si quieres controlar los menús: */}
        <Sidebar
          links={[
            { label: "Dashboard", to: "/admin/dashboard" },
            { label: "Usuarios", to: "/admin/users" },
            { label: "Pacientes", to: "/admin/patients" },
            { label: "Solicitudes de Cambio", to: "/admin/change" },
            { label: "Formulario", to: "/admin/form" },
          ]}
        />

        {/* Zona donde se renderizan las vistas hijas (Dashboard, Users, etc.) */}
        <main className="admin-content" style={{ flex: 1, padding: "1rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
