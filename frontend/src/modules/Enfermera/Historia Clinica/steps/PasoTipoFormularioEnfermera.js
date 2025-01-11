import React, { useEffect, useState } from 'react';
import Button from '../../../../components/common/Button';
import SearchBar from '../../../../components/common/SearchBar';
import '../../../../styles/modules/Enfermera/PasoTipoFormularioEnfermera.css'; 

const formulariosEnfermera = [
  'EMERGENCIA',
  'EVOLUCIÓN Y PRESCRIPCIONES',
  'SIGNOS VITALES',
];

function PasoTipoFormularioEnfermera({ nextStep }) {
  const [tipo, setTipo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    setFormularios(formulariosEnfermera); // Carga los formularios disponibles para enfermera
  }, []);

  const filteredFormularios = formularios.filter((formulario) =>
    formulario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (!tipo) {
      alert('Por favor, selecciona un tipo de formulario.');
      return;
    }
    nextStep(tipo); // Pasa el tipo seleccionado al siguiente paso
  };

  return (
    <div className="paso-tipo-formulario-enfermera">
      <h2 className="titulo-paso">Tipo de Formulario</h2>
      <div className="busqueda-contenedor">
        <SearchBar
          placeholder="Buscar formulario..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="search-bar"
        />
      </div>
      <div className="formulario-list-container">
        <div className="formulario-list">
          {filteredFormularios.map((formulario, index) => (
            <label key={index} className="formulario-option">
              <input
                type="radio"
                name="tipo"
                value={formulario}
                checked={tipo === formulario}
                onChange={(e) => setTipo(e.target.value)}
              />
              <span>{formulario}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="actions">
        <Button label="Siguiente" onClick={handleNext} />
      </div>
    </div>
  );
}

export default PasoTipoFormularioEnfermera;
