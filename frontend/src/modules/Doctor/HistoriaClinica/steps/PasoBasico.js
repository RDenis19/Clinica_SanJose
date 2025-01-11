import React, { useState } from 'react';
import Button from '../../../../components/common/Button';
import { fetchPatients, createPatients } from '../../../../utils/api'; // Importa las funciones necesarias

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
    if (!formData.cedula.trim()) {
      alert('Por favor, ingresa una cédula.');
      return;
    }

    try {
      const pacientes = await fetchPatients();
      const pacienteEncontrado = pacientes.find(
        (p) => p.cedula === formData.cedula
      );

      if (pacienteEncontrado) {
        alert('Paciente encontrado.');
        setPacienteExistente(true);
        setPacienteId(pacienteEncontrado.id);
      } else {
        alert('Paciente no encontrado. Completa el registro.');
        setPacienteExistente(false);
      }
    } catch (error) {
      console.error('Error al buscar paciente:', error);
      alert('Hubo un error al buscar el paciente.');
    }
  };

  const handleRegistrarPaciente = async () => {
    if (!formData.nombre.trim() || !formData.apellidos.trim()) {
      alert('Por favor, completa todos los campos antes de registrar.');
      return;
    }

    try {
      const nuevoPaciente = await createPatients({
        cedula: formData.cedula,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
      });
      setPacienteId(nuevoPaciente.id);
      alert('Paciente registrado exitosamente.');
      nextStep(); // Avanza al paso siguiente
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      alert('Hubo un error al registrar el paciente.');
    }
  };

  const handleAsignarFormulario = async () => {
    try {
      await createPatients({
        id: pacienteId,
        tipoFormulario: tipoFormulario,
      });
      alert('Formulario asignado exitosamente.');
      nextStep();
    } catch (error) {
      console.error('Error al asignar formulario:', error);
      alert('Hubo un error al asignar el formulario.');
    }
  };

  return (
    <div>
      <h2>Registro Básico</h2>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            placeholder="Ej: 1723456789"
          />
        </div>
        {!pacienteExistente && (
          <>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan"
              />
            </div>
            <div>
              <label>Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej: Pérez Morales"
              />
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button label="Atrás" onClick={prevStep} className="secondary" />
        {!pacienteExistente ? (
          <Button
            label="Registrar Paciente"
            onClick={handleRegistrarPaciente}
            style={{ marginLeft: '10px' }}
          />
        ) : (
          <Button
            label="Asignar Formulario"
            onClick={handleAsignarFormulario}
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>
    </div>
  );
}

export default PasoBasico;
