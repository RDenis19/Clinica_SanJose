import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { LogoutOutlined, HeartOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ links = [], onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (collapsed) setOpenKeys([]); // Reset open keys when sidebar collapses
  };

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []); // Allow only one submenu to stay open
  };

  const handleMenuClick = (path) => {
    navigate(path); // Navega a la ruta del menú principal
    if (collapsed) setOpenKeys([]); // Cierra todos los submenús si el sidebar está colapsado
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      style={{ backgroundColor: "#F6FFED" }}
    >
      <div style={{ padding: "16px", textAlign: "center" }}>
        {collapsed ? (
          <HeartOutlined style={{ fontSize: "24px", color: "#333" }} />
        ) : (
          <h1 style={{ color: "#333", fontSize: "24px" }}>
            Clínica <span>San José</span>
          </h1>
        )}
        {!collapsed && <p style={{ color: "#333", marginTop: "-10px" }}>Todo Corazón</p>}
      </div>

      <Menu
        mode="inline"
        openKeys={!collapsed ? openKeys : []} // No abrir submenús si está colapsado
        onOpenChange={handleOpenChange}
        style={{ backgroundColor: "#F6FFED", borderRight: "none" }}
      >
        {links.map((link) =>
          link.subMenu ? (
            <SubMenu
              key={link.to}
              title={
                <div
                  onClick={() => handleMenuClick(link.to)} // Navega al hacer clic en el menú principal
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span className="icon" style={{ marginRight: collapsed ? "0" : "8px" }}>
                    {link.icon}
                  </span>
                  {!collapsed && link.label}
                </div>
              }
            >
              {link.subMenu.map((subLink) => (
                <Menu.Item key={subLink.to}>
                  <NavLink to={subLink.to} activeClassName="active">
                    {subLink.label}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={link.to}>
              <NavLink to={link.to} activeClassName="active">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span className="icon" style={{ marginRight: collapsed ? "0" : "8px" }}>
                    {link.icon}
                  </span>
                  {!collapsed && link.label}
                </span>
              </NavLink>
            </Menu.Item>
          )
        )}
      </Menu>

      <div
        className="ant-layout-sider-trigger"
        style={{
          textAlign: "center",
          backgroundColor: "#001F3F",
          color: "#fff",
          height: "48px",
          lineHeight: "48px",
          cursor: "pointer",
        }}
        onClick={toggleCollapse}
      >
        {collapsed ? ">" : "<"}
      </div>

      <div style={{ textAlign: "center", padding: "16px" }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined style={{ fontSize: "18px" }} />}
          onClick={onLogout}
          style={{
            width: collapsed ? "48px" : "90%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </Sider>
  );
}

export default Sidebar;
