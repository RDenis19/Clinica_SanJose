import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import '../../../styles/modules/Administrador/user/userProfileModal.css';
import { fetchUserDetails } from '../../../utils/api';

const UserProfileModal = ({ userId, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchUserDetails(userId);
        if (response && response.usuario) {
          setFormData(response.usuario); // Establecer los datos del usuario
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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Reemplazar undefined con null para evitar errores
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === undefined ? null : value])
      );

      console.log("Datos enviados al backend:", sanitizedData); // Depuración

      await onUpdate(userId, sanitizedData); // Llamar a la función de actualización
      setIsEditing(false);
      alert("Usuario actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar el usuario. Intente nuevamente.");
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
          <div className="form-field">
            <label>Identificación</label>
            <input
              type="text"
              name="identificacion"
              value={formData.identificacion || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Nombres</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres || ''}
              onChange={handleChange}
            />
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
            <label>Dirección</label>
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
          <p><strong>Fecha de Nacimiento:</strong> {new Date(formData.fechaNacimiento).toLocaleDateString()}</p>
          <p><strong>Dirección:</strong> {formData.direccionDomicilio}</p>
          <p><strong>Teléfono:</strong> {formData.telefono}</p>
          <p><strong>Sexo:</strong> {formData.sexo}</p>
          <p><strong>Correo Electrónico:</strong> {formData.correo}</p>
          <p><strong>Estado Civil:</strong> {formData.estadoCivil}</p>
          <p><strong>Especialidad:</strong> {formData.especialidad}</p>
          <p><strong>Consultorio:</strong> {formData.consultorio}</p>
          <p><strong>Rol:</strong> {formData.rol}</p>
          <p><strong>Estado:</strong> {formData.estado}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(formData.fechaCreacion).toLocaleString()}</p>
          <p><strong>Última Modificación:</strong> {new Date(formData.fechaModificacion).toLocaleString()}</p>
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
