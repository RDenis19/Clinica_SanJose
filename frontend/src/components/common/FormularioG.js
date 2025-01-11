import React from 'react';
import '../../styles/components/Formulario.css';

function Formulario({ estructura, onChange }) {
  const renderCampos = (campos, prefix = '') => {
    return Object.keys(campos).map((campo) => {
      const nombreCampo = prefix ? `${prefix}.${campo}` : campo;

      if (typeof campos[campo] === 'object' && !Array.isArray(campos[campo])) {
        // Renderiza subgrupos
        return (
          <fieldset key={nombreCampo} className="formulario-seccion">
            <legend>{campo}</legend>
            {renderCampos(campos[campo], nombreCampo)}
          </fieldset>
        );
      } else if (Array.isArray(campos[campo])) {
        // Renderiza listas de objetos
        return (
          <fieldset key={nombreCampo} className="formulario-seccion">
            <legend>{campo}</legend>
            {campos[campo].map((item, index) => (
              <div key={`${nombreCampo}[${index}]`} className="formulario-item">
                {renderCampos(item, `${nombreCampo}[${index}]`)}
              </div>
            ))}
          </fieldset>
        );
      } else {
        // Renderiza campos simples
        return (
          <div key={nombreCampo} className="formulario-campo">
            <label>{campo}:</label>
            <input
              type="text"
              name={nombreCampo}
              value={campos[campo]}
              onChange={(e) => onChange(nombreCampo, e.target.value)}
              className="formulario-input"
            />
          </div>
        );
      }
    });
  };

  return <form className="formulario-contenedor">{renderCampos(estructura)}</form>;
}

export default Formulario;
