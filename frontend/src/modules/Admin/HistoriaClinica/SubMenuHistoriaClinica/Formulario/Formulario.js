import React, { useEffect, useState } from 'react';
import { fetchPlantilla } from '../../../../../utils/api';
import '../../../../../styles/modules/Administrador/formulario.css';
import BackButton from '../../../../../components/common/BackButton';
import Button from '../../../../../components/common/Button';

function Formulario({ match }) {
  const [formulario, setFormulario] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const { id } = match.params;

  useEffect(() => {
    const loadFormulario = async () => {
      try {
        const data = await fetchPlantilla(id);
        setFormulario(data.data);
      } catch (error) {
        console.error('Error al cargar el formulario:', error);
      }
    };

    loadFormulario();
  }, [id]);

  const handleNextSection = () => {
    if (activeSection < formulario.secciones.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <div className="formulario">
      <BackButton to="/formularios" label="Volver" />

      {formulario && (
        <div>
          <h1>{formulario.nombre}</h1>
          <div className="formulario-sections">
            {formulario.secciones.map((seccion, index) => (
              <button
                key={index}
                className={`section-button ${
                  index === activeSection ? 'active' : ''
                }`}
                onClick={() => setActiveSection(index)}
              >
                {seccion.nombre}
              </button>
            ))}
          </div>

          <div className="formulario-content">
            <h2>{formulario.secciones[activeSection].nombre}</h2>
            <p>{formulario.secciones[activeSection].contenido}</p>
          </div>

          <div className="formulario-navigation">
            <Button
              label="Anterior"
              onClick={handlePrevSection}
              className="secondary"
            />
            <Button
              label="Siguiente"
              onClick={handleNextSection}
              className="primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Formulario;
