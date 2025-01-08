import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { getFormularios } from '../../../utils/api'; // Ejemplo de import

function FormularioList() {
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    // Ejemplo de petición al backend
    // getFormularios()
    //   .then(response => setFormularios(response.data))
    //   .catch(error => console.log(error));
    setFormularios([
      { id: 1, nombre: 'Historia Clínica General' },
      { id: 2, nombre: 'Historia Odontológica' },
    ]);
  }, []);

  return (
    <div className="formulario-list">
      <h2>Lista de Formularios</h2>
      <ul>
        {formularios.map((form) => (
          <li key={form.id}>
            {form.nombre}
            <Link to={`/admin/formulario/edit/${form.id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/admin/formulario/new">
        <button>Crear Nuevo Formulario</button>
      </Link>
    </div>
  );
}

export default FormularioList;
