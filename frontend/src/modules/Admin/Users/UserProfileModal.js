import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';

const UserProfileModal = ({ user, onClose, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    onUpdate(user.idUsuario, formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <Modal onClose={onClose}>
      <h2>{isEditing ? 'Editar Usuario' : 'Detalles del Usuario'}</h2>
      {isEditing ? (
        <form>
          <input
            type="text"
            placeholder="Identificación"
            value={formData.identificacion}
            onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
          />
          <input
            type="date"
            placeholder="Fecha de Nacimiento"
            value={formData.fechaNacimiento}
            onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
          <select
            value={formData.sexo}
            onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
          >
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </select>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
          />
          <input
            type="text"
            placeholder="Especialidad"
            value={formData.especialidad}
            onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
          />
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Suspendido">Suspendido</option>
          </select>
          <select
            value={formData.rol}
            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
          >
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Enfermera">Enfermera</option>
          </select>
          <Button label="Guardar Cambios" onClick={handleSave} />
        </form>
      ) : (
        <div>
          <p><strong>Identificación:</strong> {user.identificacion}</p>
          <p><strong>Nombres:</strong> {user.nombres} {user.apellidos}</p>
          <p><strong>Correo:</strong> {user.correo}</p>
          <p><strong>Teléfono:</strong> {user.telefono}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(user.fechaNacimiento).toLocaleDateString()}</p>
          <p><strong>Sexo:</strong> {user.sexo === 'F' ? 'Femenino' : 'Masculino'}</p>
          <p><strong>Estado:</strong> {user.estado}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
          <Button label="Editar" onClick={() => setIsEditing(true)} />
          <Button label="Eliminar" onClick={() => onDelete(user.idUsuario)} />
        </div>
      )}
      <Button label="Cerrar" onClick={onClose} />
    </Modal>
  );
};

export default UserProfileModal;
