import React, { useState } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { createJornada } from '../../../../../utils/api';

const AddJornada = ({ onClose }) => {
  const [formData, setFormData] = useState({
    supervisor: '',
    fechaContratacion: '',
    fechaFinContratacion: '',
    inicioJornada: '',
    finJornada: '',
    Usuario_identificacion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createJornada(formData);
      alert('Jornada creada con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al crear la jornada:', error);
      alert('Hubo un error al crear la jornada. Verifica los datos ingresados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Jornada</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Supervisor</label>
          <input
            name="supervisor"
            value={formData.supervisor}
            onChange={handleInputChange}
            placeholder="Nombre del supervisor"
            required
          />
        </div>
        <div>
          <label>Fecha Contratación</label>
          <input
            type="date"
            name="fechaContratacion"
            value={formData.fechaContratacion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fecha Fin Contratación</label>
          <input
            type="date"
            name="fechaFinContratacion"
            value={formData.fechaFinContratacion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Inicio Jornada</label>
          <input
            type="time"
            name="inicioJornada"
            value={formData.inicioJornada}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fin Jornada</label>
          <input
            type="time"
            name="finJornada"
            value={formData.finJornada}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Usuario Identificación</label>
          <input
            name="Usuario_identificacion"
            value={formData.Usuario_identificacion}
            onChange={handleInputChange}
            placeholder="ID del usuario"
            required
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button
            type="submit"
            label={isSubmitting ? 'Guardando...' : 'Guardar'}
            disabled={isSubmitting}
          />
          <Button
            type="button"
            label="Cancelar"
            onClick={onClose}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddJornada;
