import React, { useState } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { createTitulo } from '../../../../../utils/api';

const AddTitulo = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombreTitulo: '',
    institucionEducacionSuperior: '',
    tipoTitulo: '',
    reconocidoPor: '',
    numeroRegistro: '',
    fechaRegistro: '',
    areaConocimiento: '',
    Usuario_identificacion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTitulo(formData);
      alert('Título creado con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al crear el título:', error);
      alert('Hubo un error al crear el título.');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Título</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Título</label>
          <input name="nombreTitulo" value={formData.nombreTitulo} onChange={handleInputChange} />
        </div>
        {/* Agrega más campos aquí */}
        <Button type="submit" label="Guardar" />
        <Button type="button" label="Cancelar" onClick={onClose} />
      </form>
    </Modal>
  );
};

export default AddTitulo;
