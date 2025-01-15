import React, { useState, useEffect } from "react";
import { updatePlantilla } from "../../../../utils/api";
import Button from "../../../../components/common/Button";
import "../../../../styles/modules/Administrador/Formulario/EditPlantilla.css";

function EditPlantilla({ plantilla, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    ...plantilla,
    id: plantilla.id || plantilla.idPlantilla_Formulario, // Asegurarte de que el ID esté definido
    Estructura:
      typeof plantilla.Estructura === "string"
        ? JSON.parse(plantilla.Estructura || "{}")
        : plantilla.Estructura || {},
  });
  

  useEffect(() => {
    setFormData({
      ...plantilla,
      Estructura:
        typeof plantilla.Estructura === "string"
          ? JSON.parse(plantilla.Estructura || "{}")
          : plantilla.Estructura || {}, // Verificación para evitar errores
    });
  }, [plantilla]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStructureChange = (key, value) => {
    const updatedStructure = { ...formData.Estructura, [key]: value };
    setFormData({ ...formData, Estructura: updatedStructure });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlantilla = {
        ...formData,
        Estructura: JSON.stringify(formData.Estructura), // Asegurar que Estructura sea un string JSON
      };

      console.log("Datos enviados al backend:", updatedPlantilla); 
      console.log("ID enviado al backend:", formData.id); 
      await updatePlantilla(formData.id, updatedPlantilla);
      alert("Plantilla actualizada exitosamente");
      onRefresh();
      onClose(); 
    } catch (error) {
      console.error("Error al actualizar plantilla:", error);
      alert("Error al actualizar la plantilla");
    }
  };


  const handleAddFieldToStructure = () => {
    const newKey = `nuevoCampo${Object.keys(formData.Estructura).length + 1}`;
    setFormData({
      ...formData,
      Estructura: { ...formData.Estructura, [newKey]: "" },
    });
  };

  const handleRemoveFieldFromStructure = (key) => {
    const updatedStructure = { ...formData.Estructura };
    delete updatedStructure[key];
    setFormData({ ...formData, Estructura: updatedStructure });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-plantilla-form">
      <h2>Editar Plantilla</h2>
      <div className="form-group">
        <label>Número de Formulario:</label>
        <input
          type="text"
          name="nroTipoFormulario"
          value={formData.nroTipoFormulario || ""}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Nombre del Formulario:</label>
        <input
          type="text"
          name="nombreTipoFormulario"
          value={formData.nombreTipoFormulario || ""}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Estructura (JSON):</label>
        <div className="structure-fields">
          {Object.keys(formData.Estructura).map((key) => (
            <div key={key} className="structure-field">
              <input
                type="text"
                value={key}
                readOnly
                className="form-input key-input"
              />
              <input
                type="text"
                value={formData.Estructura[key]}
                onChange={(e) =>
                  handleStructureChange(key, e.target.value)
                }
                className="form-input value-input"
              />
              <button
                type="button"
                className="remove-field-btn"
                onClick={() => handleRemoveFieldFromStructure(key)}
              >
                ❌
              </button>
            </div>
          ))}
          <Button
            type="button"
            label="Agregar Campo"
            onClick={handleAddFieldToStructure}
            className="add-field-btn"
          />
        </div>
      </div>
      <div className="form-buttons">
        <Button type="submit" label="Guardar" className="form-submit-btn" />
        <Button
          type="button"
          label="Cancelar"
          className="form-cancel-btn"
          onClick={onClose}
        />
      </div>
    </form>
  );
}

export default EditPlantilla;
