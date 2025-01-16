import React, { useState } from "react";
import Button from "../../../../../components/common/Button";
import { createHistoria } from "../../../../../utils/api";

function AddHistoriaClinica({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    nroHistoriaClinica: "",
    Paciente_identificacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.nroHistoriaClinica || !formData.Paciente_identificacion) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    console.log("Datos enviados al backend:", formData);
  
    try {
      await createHistoria(formData);
      alert("Historia clínica creada exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al crear historia clínica:", error);
      alert(
        error.response?.data?.message || "Error al crear historia clínica."
      );
    }
  };
  
  

  return (
    <div>
      <h2>Agregar Nueva Historia Clínica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nroHistoriaClinica">Número de Historia Clínica:</label>
          <input
            type="text"
            name="nroHistoriaClinica"
            id="nroHistoriaClinica"
            value={formData.nroHistoriaClinica}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Paciente_identificacion">Identificación del Paciente:</label>
          <input
            type="text"
            name="Paciente_identificacion"
            id="Paciente_identificacion"
            value={formData.Paciente_identificacion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <Button type="submit" label="Guardar" />
          <Button type="button" label="Cancelar" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}

export default AddHistoriaClinica;
