import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/modules/Administrador/formulario.css'; 
// <-- Importa tu CSS, ajusta la ruta si es necesario

function Index() {
  return (
    <div className="formulario-container">
      <h2>Plantillas de Historias Clínicas</h2>
      <p>Esta sección te permite gestionar las plantillas.</p>

      <Link to="/admin/formulario/list">
        <button>Ver Lista de Formularios</button>
      </Link>
      <Link to="/admin/formulario/new">
        <button>Crear Nuevo Formulario</button>
      </Link>
    </div>
  );
}

export default Index;
