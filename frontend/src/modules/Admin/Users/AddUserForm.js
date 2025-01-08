import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';

const AddUserForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ identificacion: '', nombres: '' });

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ identificacion: '', nombres: '' });
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Usuario</h2>
      <input
        type="text"
        placeholder="Identificación"
        value={formData.identificacion}
        onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={formData.nombres}
        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
      />
      <Button label="Agregar" onClick={handleSubmit} />
    </Modal>
  );
};

export default AddUserForm;
