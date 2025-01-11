import React, { useState } from 'react';
import Button from '../../../../components/common/Button';
import { fetchPatients, createPatients, asignarFormularioAPaciente } from '../../../../utils/api';

function PasoBasico({ prevStep, nextStep, tipoFormulario }) {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellidos: '',
  });
  const [pacienteExistente, setPacienteExistente] = useState(false);
  const [pacienteId, setPacienteId] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBuscarPaciente = async () => {
    try {
      if (!formData.cedula.trim()) {
        alert('Por favor, ingresa una cédula.');
        return;
      }

      const pacientes = await fetchPatients();
      const pacienteEncontrado = pacientes.find((p) => p.cedula === formData.cedula);

      if (pacienteEncontrado) {
        alert('Paciente encontrado.');
        setPacienteExistente(true);
        setPacienteId(pacienteEncontrado.id);
      } else {
        try {
          const nuevoPaciente = await createPatients(formData);
          setPacienteId(nuevoPaciente.id);
          alert('Paciente registrado exitosamente.');
          setPacienteExistente(true);
        } catch (error) {
          console.error('Error al registrar paciente:', error);
          alert('Hubo un error al registrar el paciente.');
        }
      }
    } catch (error) {
      console.error('Error al buscar paciente:', error);
      alert('Hubo un error al buscar el paciente.');
    }
  };

  const handleAsignarFormulario = async () => {
    try {
      if (!pacienteId) {
        alert('No se encontró un paciente válido para asignar el formulario.');
        return;
      }
      await asignarFormularioAPaciente({ pacienteId, tipoFormulario });
      alert('Formulario asignado exitosamente al paciente.');
      nextStep();
    } catch (error) {
      console.error('Error al asignar el formulario:', error);
      alert('Hubo un error al asignar el formulario.');
    }
  };

  return (
    <div>
      <h2>Registro Básico</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Cédula"
        />
        {!pacienteExistente && (
          <>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Apellidos"
            />
          </>
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button label="Atrás" onClick={prevStep} className="secondary" />
        {!pacienteExistente ? (
          <Button label="Buscar o Registrar" onClick={handleBuscarPaciente} />
        ) : (
          <Button label="Asignar Formulario" onClick={handleAsignarFormulario} />
        )}
      </div>
    </div>
  );
}

export default PasoBasico;
