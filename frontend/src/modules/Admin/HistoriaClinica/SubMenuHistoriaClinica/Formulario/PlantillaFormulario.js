import React, { useState } from "react";
import "../../../../../styles/modules/Administrador/formulario.css";
import BackButton from "../../../../../components/common/BackButton";
import Button from "../../../../../components/common/Button";
import NavigationSteps from "../../../../../components/common/NavigationSteps"; // Importamos NavigationSteps

function PlantillaFormulario({ plantilla, onBack }) {
  const [activeSection, setActiveSection] = useState(0);

  const handleNextSection = () => {
    if (plantilla?.secciones && activeSection < plantilla.secciones.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <div className="formulario-page">
      {/* Colocamos NavigationSteps en la parte superior */}
      <NavigationSteps step={2} />

      <div className="formulario">
        <BackButton onClick={onBack} label="Volver" />
        <div className="formulario-layout">
          {/* Sidebar para las secciones */}
          <div className="formulario-sidebar">
            <h2>Secciones</h2>
            <ul>
              {plantilla.secciones.map((seccion, index) => (
                <li
                  key={index}
                  className={index === activeSection ? "active" : ""}
                  onClick={() => setActiveSection(index)}
                >
                  {seccion.nombre}
                </li>
              ))}
            </ul>
          </div>

          {/* Contenido del formulario */}
          <div className="formulario-content">
            <h2>{plantilla.secciones[activeSection]?.nombre}</h2>
            <div className="formulario-grid">
              {/* Renderizamos los campos de la sección actual */}
              {plantilla.secciones[activeSection]?.campos?.map((campo, idx) => (
                <div key={idx} className="formulario-field">
                  <label htmlFor={`campo-${idx}`}>{campo.label}</label>
                  <input
                    type={campo.type || "text"}
                    id={`campo-${idx}`}
                    name={`campo-${idx}`}
                    placeholder={campo.placeholder || ""}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navegación del formulario */}
        <div className="formulario-navigation">
          <Button
            label="Anterior"
            onClick={handlePrevSection}
            className="secondary"
            disabled={activeSection === 0}
          />
          <Button
            label="Siguiente"
            onClick={handleNextSection}
            className="primary"
            disabled={activeSection >= plantilla.secciones.length - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default PlantillaFormulario;
