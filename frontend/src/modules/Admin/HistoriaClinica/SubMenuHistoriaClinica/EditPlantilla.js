import React, { useState, useEffect } from "react";
import { updatePlantilla } from "../../../../utils/api";
import Button from "../../../../components/common/Button";
import "../../../../styles/modules/Administrador/Formulario/EditPlantilla.css";

function EditPlantilla({ plantilla, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    ...plantilla,
    id: plantilla.idPlantilla_Formulario || plantilla.id || null,
    Estructura: typeof plantilla.Estructura === "string"
      ? JSON.parse(plantilla.Estructura || "{}")
      : plantilla.Estructura || { sections: [] },
  });

  const [activeSection, setActiveSection] = useState(0); // Para manejar la sección activa

  useEffect(() => {
    setFormData({
      ...plantilla,
      id: plantilla.idPlantilla_Formulario || plantilla.id || null,
      Estructura:
        typeof plantilla.Estructura === "string"
          ? JSON.parse(plantilla.Estructura || "{}")
          : plantilla.Estructura || { sections: [] },
    });
  }, [plantilla]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStructureChange = (path, value) => {
    const keys = path.split(".");
    const updatedStructure = { ...formData.Estructura };

    let temp = updatedStructure;
    keys.slice(0, -1).forEach((key) => {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    });

    temp[keys[keys.length - 1]] = value;
    setFormData({ ...formData, Estructura: updatedStructure });
  };

  const handleAddSection = () => {
    const updatedSections = [
      ...formData.Estructura.sections,
      { title: `Sección ${formData.Estructura.sections.length + 1}`, fields: [] },
    ];
    setFormData({
      ...formData,
      Estructura: { ...formData.Estructura, sections: updatedSections },
    });
    setActiveSection(updatedSections.length - 1); // Mueve a la nueva sección
  };

  const handleAddField = (sectionIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections[sectionIndex].fields.push({
      name: "",
      type: "text",
      label: "",
    });
    setFormData({
      ...formData,
      Estructura: { ...formData.Estructura, sections: updatedSections },
    });
  };

  const handleRemoveField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections[sectionIndex].fields.splice(fieldIndex, 1);
    setFormData({
      ...formData,
      Estructura: { ...formData.Estructura, sections: updatedSections },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      console.error("El ID de la plantilla es indefinido:", formData); // Depuración
      alert("El ID de la plantilla es indefinido. Verifica los datos.");
      return;
    }
    try {
      const updatedPlantilla = {
        ...formData,
        Estructura: JSON.stringify(formData.Estructura),
      };
      await updatePlantilla(formData.id, updatedPlantilla);
      alert("Plantilla actualizada exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al actualizar plantilla:", error);
      alert("Error al actualizar la plantilla");
    }
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
      <div className="tabs-container">
        <div className="tabs">
          {formData.Estructura.sections.map((section, index) => (
            <button
              type="button"
              key={`tab-${index}`}
              className={`tab-button ${activeSection === index ? "active" : ""}`}
              onClick={() => setActiveSection(index)}
            >
              {section.title || `Sección ${index + 1}`}
            </button>
          ))}
          <Button
            type="button"
            label="Agregar Sección"
            onClick={handleAddSection}
            className="add-section-btn"
          />
        </div>
        <div className="tab-content">
          {formData.Estructura.sections[activeSection] && (
            <div className="section">
              <div className="form-group">
                <label>Título de la Sección:</label>
                <input
                  type="text"
                  value={formData.Estructura.sections[activeSection].title || ""}
                  onChange={(e) =>
                    handleStructureChange(`sections.${activeSection}.title`, e.target.value)
                  }
                  className="form-input"
                  required
                />
              </div>
              <div className="fields-container">
                {formData.Estructura.sections[activeSection].fields.map(
                  (field, fieldIndex) => (
                    <div key={`field-${fieldIndex}`} className="form-group">
                      <label>Campo {fieldIndex + 1}:</label>
                      <input
                        type="text"
                        placeholder="Nombre del Campo"
                        value={field.name || ""}
                        onChange={(e) =>
                          handleStructureChange(
                            `sections.${activeSection}.fields.${fieldIndex}.name`,
                            e.target.value
                          )
                        }
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Etiqueta del Campo"
                        value={field.label || ""}
                        onChange={(e) =>
                          handleStructureChange(
                            `sections.${activeSection}.fields.${fieldIndex}.label`,
                            e.target.value
                          )
                        }
                        className="form-input"
                        required
                      />
                      <select
                        value={field.type || "text"}
                        onChange={(e) =>
                          handleStructureChange(
                            `sections.${activeSection}.fields.${fieldIndex}.type`,
                            e.target.value
                          )
                        }
                        className="form-input"
                      >
                        <option value="text">Texto</option>
                        <option value="textarea">Área de Texto</option>
                        <option value="signature">Firma</option>
                      </select>
                      <button
                        type="button"
                        className="remove-field-btn"
                        onClick={() =>
                          handleRemoveField(activeSection, fieldIndex)
                        }
                      >
                        Eliminar Campo
                      </button>
                    </div>
                  )
                )}
              </div>
              <Button
                type="button"
                label="Agregar Campo"
                onClick={() => handleAddField(activeSection)}
              />
            </div>
          )}
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
