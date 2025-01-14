import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import '../../../styles/modules/Administrador/patient/patientProfileModal.css'; // Asegúrate de tener un CSS adaptado
import { fetchPatientDetails } from '../../../utils/api'; // Correcta función importada


const PatientProfileModal = ({ patientId, onClose }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchPatientDetails(patientId); // Cambia a la función de API para pacientes
        setFormData(response);
      } catch (error) {
        console.error('Error al obtener detalles del paciente:', error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchDetails();
    }
  }, [patientId]);

  if (loading) return <p>Cargando...</p>;
  if (!formData) return <p>No se encontraron datos del paciente.</p>;

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>Detalles del Paciente</h2>
      </div>
      <div className="patient-details">
        <p><strong>Identificación:</strong> {formData.identificacion}</p>
        <p><strong>Primer Nombre:</strong> {formData.primerNombre}</p>
        <p><strong>Apellido Paterno:</strong> {formData.apellidoParteno}</p>
        <p><strong>Apellido Materno:</strong> {formData.apellidoMaterno || 'No especificado'}</p>
        <p><strong>Correo:</strong> {formData.correo}</p>
        <p><strong>Teléfono:</strong> {formData.telefonoPaciente || 'No especificado'}</p>
        <p><strong>Dirección:</strong> {formData.direccionResidenciaHab || 'No especificada'}</p>
        <p><strong>Fecha de Nacimiento:</strong> {formData.fechaNacimiento ? new Date(formData.fechaNacimiento).toLocaleDateString() : 'No especificada'}</p>
        <p><strong>Nacionalidad:</strong> {formData.nacionalidad || 'No especificada'}</p>
        <p><strong>Sexo:</strong> {formData.sexo === 'M' ? 'Masculino' : 'Femenino'}</p>
        <p><strong>Estado Civil:</strong> {formData.estadoCivil || 'No especificado'}</p>
        <p><strong>Grupo Sanguíneo:</strong> {formData.grupoSanguineo || 'No especificado'}</p>
        <p><strong>Alergias:</strong> {formData.alergias || 'No especificadas'}</p>
        <p><strong>Ocupación:</strong> {formData.ocupacion || 'No especificada'}</p>
        <p><strong>Tipo de Seguro de Salud:</strong> {formData.tipoSeguroSalud || 'No especificado'}</p>
        <p><strong>Observaciones:</strong> {formData.observaciones || 'No especificadas'}</p>
      </div>
    </Modal>
  );
};

export default PatientProfileModal;
