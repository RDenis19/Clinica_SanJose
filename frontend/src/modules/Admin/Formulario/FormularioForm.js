import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { getFormularioById, createFormulario, updateFormulario } from '../../../utils/api';

function FormularioForm() {
  const { id } = useParams(); // si existe, estás editando
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (id) {
      // getFormularioById(id)
      //   .then(response => {
      //     setNombre(response.data.nombre);
      //     setDescripcion(response.data.descripcion);
      //   })
      //   .catch(error => console.log(error));

      // EJEMPLO HARDCODEADO:
      setNombre('Historia Clínica General');
      setDescripcion('Plantilla para registrar datos generales...');
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (id) {
    //   updateFormulario(id, { nombre, descripcion })
    //     .then(() => navigate('/admin/formulario/list'))
    //     .catch(error => console.log(error));
    // } else {
    //   createFormulario({ nombre, descripcion })
    //     .then(() => navigate('/admin/formulario/list'))
    //     .catch(error => console.log(error));
    // }

    // EJEMPLO HARDCODEADO:
    console.log('Datos del formulario:', { nombre, descripcion });
    navigate('/admin/formulario/list');
  };

  return (
    <div className="formulario-form">
      <h2>{id ? 'Editar Formulario' : 'Crear Formulario'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre de la Plantilla</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default FormularioForm;
