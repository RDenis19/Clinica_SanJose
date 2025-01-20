import React, { useState } from "react";
import { createFormulario } from "../../../../../utils/api";
import Button from "../../../../../components/common/Button"; // Asegúrate de que la ruta al componente sea correcta

const NuevoFormulario = ({ plantilla, onBack }) => {
  const [formValues, setFormValues] = useState({
    HistoriaClinica_idHistoriaClinica: "",
    Establecimiento_idEstablecimiento: "",
    Plantilla_Formulario_idPlantilla_Formulario: plantilla.idPlantilla_Formulario,
    contenido: {},
    estadoFormulario: "",
    notas: "",
    observaciones: "",
  });

  const handleChange = (fieldName, value) => {
    if (plantilla.secciones.some((section) =>
        section.campos.some((campo) => campo.name === fieldName)
    )) {
      setFormValues((prev) => ({
        ...prev,
        contenido: { ...prev.contenido, [fieldName]: value },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formValues,
        contenido: JSON.stringify(formValues.contenido || {}),
      };

      if (!payload.HistoriaClinica_idHistoriaClinica) {
        alert("El campo 'Historia Clínica' es obligatorio.");
        return;
      }
      if (!payload.Establecimiento_idEstablecimiento) {
        alert("El campo 'Establecimiento' es obligatorio.");
        return;
      }

      await createFormulario(payload);
      alert("Formulario creado exitosamente");
      onBack();
    } catch (error) {
      console.error("Error al crear formulario:", error);
      alert(error.response?.data?.message || "Error al crear el formulario. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <h2>{plantilla.nombreTipoFormulario || "Formulario Sin Título"}</h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="HistoriaClinica_idHistoriaClinica">Historia Clínica (Obligatorio):</label>
        <input
          id="HistoriaClinica_idHistoriaClinica"
          type="text"
          placeholder="Ingrese el ID de la historia clínica"
          value={formValues.HistoriaClinica_idHistoriaClinica}
          onChange={(e) => handleChange("HistoriaClinica_idHistoriaClinica", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="Establecimiento_idEstablecimiento">Establecimiento (Obligatorio):</label>
        <input
          id="Establecimiento_idEstablecimiento"
          type="text"
          placeholder="Ingrese el ID del establecimiento"
          value={formValues.Establecimiento_idEstablecimiento}
          onChange={(e) => handleChange("Establecimiento_idEstablecimiento", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="estadoFormulario">Estado del Formulario (Opcional):</label>
        <input
          id="estadoFormulario"
          type="text"
          placeholder="Ingrese el estado del formulario"
          value={formValues.estadoFormulario}
          onChange={(e) => handleChange("estadoFormulario", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="notas">Notas (Opcional):</label>
        <input
          id="notas"
          type="text"
          placeholder="Ingrese notas"
          value={formValues.notas}
          onChange={(e) => handleChange("notas", e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="observaciones">Observaciones (Opcional):</label>
        <input
          id="observaciones"
          type="text"
          placeholder="Ingrese observaciones"
          value={formValues.observaciones}
          onChange={(e) => handleChange("observaciones", e.target.value)}
        />
      </div>

      {plantilla.secciones.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{section.nombre || `Sección ${index + 1}`}</h3>
          {section.campos.map((campo, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <label htmlFor={campo.name}>
                {campo.label || campo.name || "Campo sin nombre"}:
              </label>
              <input
                id={campo.name}
                type={campo.type || "text"}
                placeholder={campo.placeholder || `Ingrese ${campo.label || campo.name}`}
                value={formValues.contenido[campo.name] || ""}
                onChange={(e) => handleChange(campo.name, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <Button label="Guardar Formulario" onClick={handleSubmit} className="primary" />
        <Button label="Volver" onClick={onBack} className="secondary" />
      </div>
    </div>
  );
};

export default NuevoFormulario;
