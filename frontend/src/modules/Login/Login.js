import React, { useState } from 'react';
import { loginRequest } from '../../utils/api'; // Importa la función de login
import './login.css';
import logo from '../../assets/images/LogoCorazon.png';
import doctors from '../../assets/images/DoctoresLogin.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginRequest({ email, password });

      const { rol } = data;
      const { token } = data;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', rol);
      localStorage.setItem('jwt_token', token);

      if (rol === 'Admin') {
        window.location.href = '/admin/dashboard';
      } else if (rol === 'Doctor') {
        window.location.href = '/doctor/dashboard';
      } else if (rol === 'Enfermera') {
        window.location.href = '/nurse/dashboard';
      } else {
        setError('Rol no reconocido.');
      }
    } catch (err) {
      setError(err.error || 'Error en el servidor.');
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
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="example"
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
