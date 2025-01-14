import React, { useState } from "react";
import { loginRequest } from "../../utils/api";
import "./login.css";
import logo from "../../assets/images/LogoCorazon.png";
import doctors from "../../assets/images/DoctoresLogin.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const correo = email;
      const contraseña = password;

      const data = await loginRequest({ correo, contraseña });

      console.log("Datos recibidos del backend:", data);

      if (!data?.token || !data?.data?.rol) {
        console.error("Estructura de datos no válida:", data);
        throw new Error("Respuesta inválida del servidor.");
      }

      const { token } = data;
      const { rol } = data.data;

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", rol);
      localStorage.setItem("jwt_token", token);

      const routes = {
        Admin: "/admin/dashboard",
        Doctor: "/doctor/dashboard",
        Enfermera: "/enfermera/dashboard",
      };

      if (routes[rol]) {
        window.location.href = routes[rol];
      } else {
        throw new Error("Rol no reconocido.");
      }
    } catch (err) {
      console.error("Error en el login:", err); // Depuración
      setError(err.message || "Usuario No Reconocido.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo de la clínica" className="logo" />
        <img src={doctors} alt="Doctores" className="doctors" />
      </div>
      <div className="login-right">
        <h1>
          Clínica Hospital <span>San José</span>
        </h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
