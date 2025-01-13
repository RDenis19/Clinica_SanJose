import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import '../../../styles/modules/Administrador/patient/patientProfileModal.css';
import { fetchPatientDetails } from '../../../utils/api';

const PatientProfileModal = ({ patientId, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchPatientDetails(patientId);
        if (response && response.paciente) {
          setFormData(response.paciente);
        } else {
          console.error("No se encontró información para el paciente con ID:", patientId);
        }
      } catch (error) {
        console.error("Error al obtener detalles del paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchDetails();
    }
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identificacion || formData.identificacion.length !== 10) {
      newErrors.identificacion = "La identificación debe tener 10 caracteres.";
    }
    if (!formData.primerNombre) {
      newErrors.primerNombre = "El primer nombre es obligatorio.";
    }
    if (!formData.apellidoPaterno) {
      newErrors.apellidoPaterno = "El apellido paterno es obligatorio.";
    }
    if (!formData.correo || !formData.correo.includes("@")) {
      newErrors.correo = "Correo inválido.";
    }
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onUpdate(patientId, formData);
      setIsEditing(false);
      alert("Paciente actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      setServerError(error.mensaje || "Error al actualizar el paciente. Intente nuevamente.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!formData) return <p>No se encontraron datos del paciente.</p>;

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>{isEditing ? 'Editar Paciente' : 'Detalles del Paciente'}</h2>
      </div>
      {isEditing ? (
        <form className="form-grid">
          {serverError && <p className="error">{serverError}</p>}
          <div className="form-field">
            <label>Identificación</label>
            <input
              type="text"
              name="identificacion"
              value={formData.identificacion || ''}
              onChange={handleChange}
            />
            {errors.identificacion && <span className="error">{errors.identificacion}</span>}
          </div>
          <div className="form-field">
            <label>Primer Nombre</label>
            <input
              type="text"
              name="primerNombre"
              value={formData.primerNombre || ''}
              onChange={handleChange}
            />
            {errors.primerNombre && <span className="error">{errors.primerNombre}</span>}
          </div>
          <div className="form-field">
            <label>Segundo Nombre</label>
            <input
              type="text"
              name="segundoNombre"
              value={formData.segundoNombre || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Apellido Paterno</label>
            <input
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno || ''}
              onChange={handleChange}
            />
            {errors.apellidoPaterno && <span className="error">{errors.apellidoPaterno}</span>}
          </div>
          <div className="form-field">
            <label>Apellido Materno</label>
            <input
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo || ''}
              onChange={handleChange}
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
          </div>
          <div className="form-field">
            <label>Estado</label>
            <select
              name="estado"
              value={formData.estado || ''}
              onChange={handleChange}
            >
              <option value="Act">Activo</option>
              <option value="Ina">Inactivo</option>
            </select>
          </div>
          <div className="actions">
            <Button label="Guardar Cambios" onClick={handleSave} />
            <Button label="Cancelar" onClick={() => setIsEditing(false)} />
          </div>
        </form>
      ) : (
        <div className="patient-details">
          <p><strong>Identificación:</strong> {formData.identificacion}</p>
          <p><strong>Primer Nombre:</strong> {formData.primerNombre}</p>
          <p><strong>Segundo Nombre:</strong> {formData.segundoNombre || 'No especificado'}</p>
          <p><strong>Apellido Paterno:</strong> {formData.apellidoPaterno}</p>
          <p><strong>Apellido Materno:</strong> {formData.apellidoMaterno || 'No especificado'}</p>
          <p><strong>Dirección:</strong> {formData.direccion || 'No especificada'}</p>
          <p><strong>Teléfono:</strong> {formData.telefono || 'No especificado'}</p>
          <p><strong>Correo Electrónico:</strong> {formData.correo || 'No especificado'}</p>
          <p><strong>Estado:</strong> {formData.estado === 'Act' ? 'Activo' : 'Inactivo'}</p>
          <div className="actions">
            <Button label="Editar" onClick={() => setIsEditing(true)} />
            <Button
              label="Eliminar"
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
                  onDelete(patientId);
                }
              }}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PatientProfileModal;
