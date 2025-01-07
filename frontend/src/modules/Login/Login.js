import React, { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:3301/api/login', {
        email,
        password,
      });

      if (response.data.role === 'Admin') {
        window.location.href = '/admin';
      } else if (response.data.role === 'Doctor') {
        window.location.href = '/doctor';
      } else if (response.data.role === 'Nurse') {
        window.location.href = '/nurse';
      } else {
        setError('Rol no reconocido.');
      }
    } catch (err) {
      setError('Credenciales inválidas o error en el servidor.');
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
