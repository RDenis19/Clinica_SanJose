import React, { useEffect, useState } from "react";
import Modal from "../../../../components/common/Modal";
import { fetchHistoriaById } from "../../../../utils/api";

function HistoriaClinicaProfile({ pacienteIdentificacion, onClose }) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        console.log("Cargando historia clínica para el paciente:", pacienteIdentificacion);

        // Llamada directa al backend para obtener la historia clínica
        const response = await fetchHistoriaById(pacienteIdentificacion);

        if (!response) {
          console.error("Historia clínica no encontrada para el paciente:", pacienteIdentificacion);
          setFormData(null);
        } else {
          setFormData(response);
        }
      } catch (error) {
        console.error("Error al obtener detalles de la historia clínica:", error);
        setFormData(null);
      } finally {
        setLoading(false);
      }
    };

    if (pacienteIdentificacion) {
      fetchDetails();
    }
  }, [pacienteIdentificacion]);

  if (loading) {
    return (
      <Modal onClose={onClose}>
        <p>Cargando datos...</p>
      </Modal>
    );
  }

  if (!formData) {
    return (
      <Modal onClose={onClose}>
        <p>No se encontró la historia clínica del paciente.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>Detalles de la Historia Clínica</h2>
      </div>
      <div>
        <p><strong>ID de la Historia:</strong> {formData.idHistoriaClinica}</p>
        <p><strong>Número de Historia:</strong> {formData.nroHistoriaClinica}</p>
        <p><strong>Fecha de Creación:</strong> {formData.fechaCreacionHC}</p>
        <p><strong>Fecha de Última Edición:</strong> {formData.fechaUltimaEdicion}</p>
        <p><strong>Identificación del Paciente:</strong> {formData.Paciente_identificacion}</p>
      </div>
    </Modal>
  );
}

export default HistoriaClinicaProfile;
