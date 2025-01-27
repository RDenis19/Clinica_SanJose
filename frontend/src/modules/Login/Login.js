import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { loginRequest } from "../../utils/api";
import jwtDecode from "jwt-decode";
import "./login.css";
import logo from "../../assets/images/LogoCorazon.png";
import doctors from "../../assets/images/img aparte/DoctoresLogin.png";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);


  const handleLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const correo = email;
      const contraseña = password;

      const data = await loginRequest({ correo, contraseña });
      console.log("Datos recibidos del backend:", data);

      if (!data?.token) {
        console.error("Estructura de datos no válida:", data);
        throw new Error("Respuesta inválida del servidor.");
      }

      const { token } = data;

      // Decodificar el token para obtener el rol
      const decodedToken = jwtDecode(token);
      const { rol } = decodedToken;

      if (!rol) {
        throw new Error("Rol no encontrado en el token.");
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", rol);
      localStorage.setItem("jwt_token", token);

      const routes = {
        Administrador: "/admin/dashboard", 
        Doctor: "/doctor/dashboard", 
        Enfermera: "/enfermera/dashboard", 
      };

      if (routes[rol]) {
        message.success("Login exitoso");
        window.location.href = routes[rol];
      } else {
        throw new Error("Rol no reconocido.");
      }
    } catch (err) {
      console.error("Error en el login:", err);
      message.error(err.message || "Usuario No Reconocido.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo de la clínica" className="logo" />
        <img src={doctors} alt="Doctores" className="doctors" />
      </div>
      <div className="login-right">
        <div className="login-box">
          <Title level={2}>
            Clínica Hospital <span>San José</span>
          </Title>
          <Form
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
            className="login-form"
          >
            <Form.Item
              label="Correo"
              name="email"
              rules={[
                { required: true, message: "Por favor, ingresa tu correo" },
                { type: "email", message: "Correo no válido" },
              ]}
            >
              <Input placeholder="Ingresa tu correo" />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Por favor, ingresa tu contraseña" },
              ]}
            >
              <Input.Password placeholder="Ingresa tu contraseña" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
