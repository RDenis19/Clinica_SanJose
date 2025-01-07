import React from 'react';
import ReactDOM from 'react-dom/client'; // Nota: usamos "react-dom/client" en lugar de "react-dom"
import './styles/global.css'; // Opcional, si tienes un archivo de estilos globales
import App from './App'; // Importamos el componente principal

// Seleccionamos el div con id "root" desde el index.html
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Montamos el componente principal "App"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
