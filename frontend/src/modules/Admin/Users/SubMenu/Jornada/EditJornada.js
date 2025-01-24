import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { updateJornada } from '../../../../../utils/api';

const EditJornada = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    idJornada: '',
    supervisor: '',
    fechaContratacion: '',
    fechaFinContratacion: '',
    inicioJornada: '',
    finJornada: '',
    Usuario_identificacion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { idJornada, Usuario_identificacion } = formData;
      await updateJornada(idJornada, Usuario_identificacion, formData);
      alert('Jornada actualizada con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al actualizar la jornada:', error);
      alert('Hubo un error al actualizar la jornada.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Editar Jornada</h2>
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
        <Button
          type="submit"
          label={isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          disabled={isSubmitting}
        />
        <Button
          type="button"
          label="Cancelar"
          onClick={onClose}
          disabled={isSubmitting}
        />
      </form>
    </Modal>
  );
};

export default EditJornada;
