import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import '../../../styles/modules/Administrador/user/userProfileModal.css';
import { fetchUserDetails } from '../../../utils/api';

const UserProfileModal = ({ userId, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchUserDetails(userId);
        if (response && response.usuario) {
          setFormData(response.usuario);
        } else {
          console.error("No se encontró información para el usuario con ID:", userId);
        }
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDetails();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identificacion || formData.identificacion.length !== 10) {
      newErrors.identificacion = "La identificación debe tener 10 caracteres.";
    }
    if (!formData.nombres) {
      newErrors.nombres = "El nombre es obligatorio.";
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
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === undefined ? null : value])
      );

      // Usar FormData si hay archivos en los datos
      const hasFile = sanitizedData.fotografia instanceof File;
      const dataToSend = hasFile ? new FormData() : sanitizedData;

      if (hasFile) {
        Object.entries(sanitizedData).forEach(([key, value]) => {
          dataToSend.append(key, value);
        });
      }

      console.log("Datos enviados al backend:", dataToSend);

      await onUpdate(userId, dataToSend);

      setIsEditing(false);
      alert("Usuario actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      if (error.identificacionExists) {
        setErrors((prev) => ({ ...prev, identificacion: "La identificación ya está en uso." }));
      }
      if (error.usuarioExists) {
        setErrors((prev) => ({ ...prev, usuario: "El usuario ya está en uso." }));
      }
      if (error.correoExists) {
        setErrors((prev) => ({ ...prev, correo: "El correo ya está en uso." }));
      }
      setServerError(error.mensaje || "Error al actualizar el usuario. Intente nuevamente.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!formData) return <p>No se encontraron datos del usuario.</p>;

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>{isEditing ? 'Editar Usuario' : 'Detalles del Usuario'}</h2>
        <button className="modal-close" onClick={onClose}>×</button>
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
            <label>Nombres</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres || ''}
              onChange={handleChange}
            />
            {errors.nombres && <span className="error">{errors.nombres}</span>}
          </div>
          <div className="form-field">
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento?.split('T')[0] || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Dirección Domicilio</label>
            <input
              type="text"
              name="direccionDomicilio"
              value={formData.direccionDomicilio || ''}
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
            <label>Sexo</label>
            <select
              name="sexo"
              value={formData.sexo || ''}
              onChange={handleChange}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
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
            <label>Estado Civil</label>
            <input
              type="text"
              name="estadoCivil"
              value={formData.estadoCivil || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Especialidad</label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Consultorio</label>
            <input
              type="text"
              name="consultorio"
              value={formData.consultorio || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Fotografía</label>
            <input
              type="file"
              name="fotografia"
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Rol</label>
            <select
              name="rol"
              value={formData.rol || ''}
              onChange={handleChange}
            >
              <option value="Doctor">Doctor</option>
              <option value="Enfermera">Enfermera</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
          <div className="form-field">
            <label>Estado</label>
            <select
              name="estado"
              value={formData.estado || ''}
              onChange={handleChange}
            >
              <option value="Act">Activo</option>
              <option value="Inact">Inactivo</option>
            </select>
          </div>
          <div className="form-field">
            <label>Usuario</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario || ''}
              onChange={handleChange}
            />
          </div>
          <div className="actions">
            <Button label="Guardar Cambios" onClick={handleSave} />
            <Button label="Cancelar" onClick={() => setIsEditing(false)} />
          </div>
        </form>
      ) : (
        <div className="user-details">
          <p><strong>Identificación:</strong> {formData.identificacion}</p>
          <p><strong>Nombres:</strong> {formData.nombres}</p>
          <p><strong>Apellidos:</strong> {formData.apellidos}</p>
          <p><strong>Fecha de Nacimiento:</strong> {formData.fechaNacimiento ? new Date(formData.fechaNacimiento).toLocaleDateString() : 'No especificado'}</p>
          <p><strong>Dirección Domicilio:</strong> {formData.direccionDomicilio || 'No especificada'}</p>
          <p><strong>Teléfono:</strong> {formData.telefono || 'No especificado'}</p>
          <p><strong>Sexo:</strong> {formData.sexo === 'M' ? 'Masculino' : 'Femenino'}</p>
          <p><strong>Correo Electrónico:</strong> {formData.correo || 'No especificado'}</p>
          <p><strong>Estado Civil:</strong> {formData.estadoCivil || 'No especificado'}</p>
          <p><strong>Especialidad:</strong> {formData.especialidad || 'No especificada'}</p>
          <p><strong>Consultorio:</strong> {formData.consultorio || 'No especificado'}</p>
          <p><strong>Rol:</strong> {formData.rol || 'No especificado'}</p>
          <p><strong>Estado:</strong> {formData.estado === 'Act' ? 'Activo' : 'Inactivo'}</p>
          <p><strong>Fotografía:</strong> {formData.fotografia ? <img src={formData.fotografia} alt="Fotografía del usuario" /> : 'No disponible'}</p>
          <div className="actions">
            <Button label="Editar" onClick={() => setIsEditing(true)} />
            <Button
              label="Eliminar"
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
                  onDelete(userId);
                }
              }}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserProfileModal;
