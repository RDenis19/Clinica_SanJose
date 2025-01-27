import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import CustomHeader from "./Header"; // Reutilizamos el CustomHeader
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function EnfermeraLayout({ children }) {
  const nurseLinks = [
    {
      label: "Dashboard",
      to: "/enfermera/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Pacientes",
      to: "/enfermera/pacientes",
      icon: <UserOutlined />,
      subMenu: [
        { label: "Referidos", to: "/enfermera/pacientes/referidoEnfermera" },
      ],
    },
    {
      label: "Historias Clínicas",
      to: "/enfermera/historias",
      icon: <FileTextOutlined />,
      subMenu: [
        { label: "Formulario", to: "/enfermera/historias/formulariosEnfermera" },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Cerrando sesión de la enfermera...");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar links={nurseLinks} onLogout={handleLogout} />
      <Layout>
        <CustomHeader username="Enfermera" profilePic="https://via.placeholder.com/40" />
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default EnfermeraLayout;
