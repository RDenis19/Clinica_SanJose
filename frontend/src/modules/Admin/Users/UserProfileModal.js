import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import '../../../styles/modules/Administrador/user/userProfileModal.css';
import { fetchUserDetails } from '../../../utils/api';

const UserProfileModal = ({ userId, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (userId) {
      // Llama a la API para obtener los detalles del usuario
      const fetchDetails = async () => {
        try {
          const userDetails = await fetchUserDetails(userId);
          setFormData(userDetails);
        } catch (error) {
          console.error('Error al obtener detalles del usuario:', error);
        }
      };
      fetchDetails();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      await onUpdate(userId, formData);
      setIsEditing(false);
      alert('Usuario actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario. Intente nuevamente.');
    }
  };

  if (!formData) return <p>Cargando...</p>;

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
              value={formData.identificacion}
              onChange={(e) =>
                setFormData({ ...formData, identificacion: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Nombres</label>
            <input
              type="text"
              value={formData.nombres}
              onChange={(e) =>
                setFormData({ ...formData, nombres: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Apellidos</label>
            <input
              type="text"
              value={formData.apellidos}
              onChange={(e) =>
                setFormData({ ...formData, apellidos: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) =>
                setFormData({ ...formData, correo: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Teléfono</label>
            <input
              type="text"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Estado</label>
            <select
              value={formData.estado}
              onChange={(e) =>
                setFormData({ ...formData, estado: e.target.value })
              }
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Suspendido">Suspendido</option>
            </select>
          </div>
          <Button label="Guardar Cambios" onClick={handleSave} />
        </form>
      ) : (
        <div className="user-details">
          <p><strong>Identificación:</strong> {formData.identificacion}</p>
          <p><strong>Nombres:</strong> {formData.nombres}</p>
          <p><strong>Apellidos:</strong> {formData.apellidos}</p>
          <p><strong>Correo Electrónico:</strong> {formData.correo}</p>
          <p><strong>Teléfono:</strong> {formData.telefono}</p>
          <p><strong>Estado:</strong> {formData.estado}</p>
          <div className="actions">
            <Button label="Editar" onClick={() => setIsEditing(true)} />
            <Button
              label="Eliminar"
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
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
