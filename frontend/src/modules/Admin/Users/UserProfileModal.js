import React from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';

const UserProfileModal = ({ user, onClose, onDelete }) => {
  if (!user) return null;

  return (
    <Modal onClose={onClose}>
      <h2>Detalles del Usuario</h2>
      <p><strong>Identificación:</strong> {user.identificacion}</p>
      <p><strong>Nombres:</strong> {user.nombres} {user.apellidos}</p>
      <p><strong>Correo:</strong> {user.correo}</p>
      <p><strong>Teléfono:</strong> {user.telefono}</p>
      <p><strong>Fecha de Nacimiento:</strong> {new Date(user.fechaNacimiento).toLocaleDateString()}</p>
      <p><strong>Dirección:</strong> {user.direccion}</p>
      <p><strong>Sexo:</strong> {user.sexo === 'F' ? 'Femenino' : 'Masculino'}</p>
      <p><strong>Estado Civil:</strong> {user.estadoCivil}</p>
      <p><strong>Usuario:</strong> {user.usuario}</p>
      <p><strong>Especialidad:</strong> {user.especialidad}</p>
      <p><strong>Consultorio:</strong> {user.consultorio}</p>
      <p><strong>Estado:</strong> {user.estado}</p>
      <p><strong>Rol:</strong> {user.rol}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(user.fechaCreacion).toLocaleString()}</p>
      <p><strong>Fecha de Modificación:</strong> {new Date(user.fechaModificacion).toLocaleString()}</p>
      <p><strong>Interna Clínica (ID):</strong> {user.InternaClinica_idInternaClinica}</p>
      <p><strong>Firma Electrónica (ID):</strong> {user.FirmaElectronica_idFirmaElec}</p>
      <div>
        <Button label="Editar" onClick={() => console.log('Editar usuario')} />
        <Button label="Eliminar" onClick={() => onDelete(user.idUsuario)} />
        <Button label="Cerrar" onClick={onClose} />
      </div>
    </Modal>
  );
};

export default UserProfileModal;
