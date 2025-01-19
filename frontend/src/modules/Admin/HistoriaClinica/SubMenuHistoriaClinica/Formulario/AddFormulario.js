import React, { useState } from "react";
import Button from "../../../../../components/common/Button";
import { createFormulario } from "../../../../../utils/api";

const AddFormulario = ({ onFormularioAdded }) => {
  const [formularioData, setFormularioData] = useState({
    nroHistoriaClinica: "",
    contenido: "",
    estadoFormulario: "",
    notas: "",
    observaciones: "",
    HistoriaClinica_idHistoriaClinica: "",
    Plantilla_Formulario_idPlantilla_Formulario: "",
    Establecimiento_idEstablecimiento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormularioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFormulario = await createFormulario(formularioData);
      alert("Formulario creado exitosamente.");
      onFormularioAdded(newFormulario);
    } catch (error) {
      console.error("Error al crear el formulario:", error);
      alert("Error al crear el formulario. Intente nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Número de Historia Clínica</label>
        <input
          type="text"
          name="nroHistoriaClinica"
          value={formularioData.nroHistoriaClinica}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Contenido</label>
        <textarea
          name="contenido"
          value={formularioData.contenido}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Estado</label>
        <input
          type="text"
          name="estadoFormulario"
          value={formularioData.estadoFormulario}
          onChange={handleChange}
        />
      </div>
      {/* Agregar más campos según sea necesario */}
      <div className="form-actions">
        <Button label="Cancelar" onClick={() => onFormularioAdded(null)} className="secondary" />
        <Button label="Guardar" type="submit" className="primary" />
      </div>
    </form>
  );
};

export default AddFormulario;
