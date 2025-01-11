import React, { useEffect, useState } from 'react';
import Button from '../../../../components/common/Button';
import SearchBar from '../../../../components/common/SearchBar';
import '../../../../styles/modules/Doctor/HistoriasClinicas/PasoTipoFormulario.css'; // Estilos actualizados

const formulariosMock = [
  'ALTA – EGRESO',
  'ADMINISTRACIÓN DE MEDICAMENTOS',
  'EVOLUCIÓN Y PRESCRIPCIONES',
  'SIGNOS VITALES',
  'EMERGENCIA',
  'CONSULTA EXTERNA - ANAMNESIS Y EXAMEN FÍSICO',
  'EPICRISIS',
];

function PasoTipoFormulario({ nextStep }) {
  const [tipo, setTipo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    setFormularios(formulariosMock);
  }, []);

  const filteredFormularios = formularios.filter((formulario) =>
    formulario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (!tipo) {
      alert('Por favor, selecciona un tipo de formulario.');
      return;
    }
    nextStep(tipo);
  };

  return (
    <div className="paso-tipo-formulario">
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

export default PasoTipoFormulario;
