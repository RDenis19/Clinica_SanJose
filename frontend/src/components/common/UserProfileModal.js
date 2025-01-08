import React, { useState } from 'react';
import {
  AiOutlineDownload,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSave,
} from 'react-icons/ai';
import '../../styles/components/UserProfileModal.css';

const UserProfileModal = ({ user, onClose, onSave, onDelete }) => {
  const [editing, setEditing] = useState(false); // Modo edición
  const [formData, setFormData] = useState({ ...user }); // Datos del usuario

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar los cambios
  const handleSave = () => {
    onSave(formData); // Llama a la función onSave
    setEditing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Botón de cierre */}
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2 className="modal-title">Detalles del Usuario</h2>
        <form className="user-form">
          <div className="form-row">
            <label>Cédula:</label>
            <input
              type="text"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              readOnly={!editing}
            />
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion || ''}
              onChange={handleChange}
              readOnly={!editing}
            />
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>
          <div className="form-row">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              readOnly={!editing}
            />
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              readOnly={!editing}
            />
            <label>Especialidad:</label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>
          <div className="form-row">
            <label>Fecha de Nacimiento:</label>
            <input
              type="text"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              readOnly={!editing}
            />
            <label>Sexo:</label>
            <input
              type="text"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              readOnly={!editing}
            />
            <label>Rol:</label>
            <input
              type="text"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>
        </form>
        <div className="modal-actions">
          {editing ? (
            <button className="save-button" onClick={handleSave}>
              <AiOutlineSave /> Guardar
            </button>
          ) : (
            <button className="edit-button" onClick={() => setEditing(true)}>
              <AiOutlineEdit /> Editar
            </button>
          )}
          <button
            className="delete-button"
            onClick={() => onDelete(user.idUsuario)}
          >
            <AiOutlineDelete /> Eliminar
          </button>
          <button className="download-button">
            <AiOutlineDownload /> Descargar Firma
          </button>
          <button className="view-button">
            <AiOutlineEye /> Visualizar Firma
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
