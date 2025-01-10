// src/modules/Doctor/EmergenciaTabs.js
import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import '../../../styles/modules/Doctor/Emergencia.css';

const FORM_STRUCTURE = {
  cabecera: {
    institucionUnidadOperativa: '',
    codigoLocalizacion: '',
    numeroHistoriaClinica: '',
    nombreApellido: '',
    sexo: '',
    edad: '',
    direccion: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    paisNacionalidad: '',
    grupoCultural: '',
  },
  registroAdmision: {
    fechaAdmision: '',
    datosLaborales: {
      institucionOEntrega: '',
      numeroTelefonico: '',
    },
    nombreFamiliarAmigo: '',
    FormaLlegada: '',
    fuenteInformacion: '',
    hora: '',
    causaLlegada: '',
  },
  inicioAtencionMotivo: {
    notificacionPolicia: '',
    otroMotivoConsulta: '',
    grupoSanguineo: '',
    factorRh: '',
  },
  enfermedadActualRevisionSistemas: {
    opcionesMarcadas: [],
    resultadoInterrogatorio: {
      cronologia: '',
      localizacion: '',
      caracteristicas: '',
      intensidad: '',
      frecuencia: '',
      factoresAgravantes: '',
    },
  },
  accidenteViolenciaIntoxicacion: {
    fecha: '',
    lugar: '',
    direccion: '',
    custodiaPolicial: '',
    tipoEmergencia: '',
    observaciones: '',
    alientoEtilico: '',
    valorAlcocheck: '',
  },
  antecedentesPersonalesFamiliares: {
    personales: [],
    familiares: [],
    detalles: '',
  },
  signosVitalesMedicionesValores: {
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    peso: '',
    talla: '',
    escalaGlasgow: '',
    reaccionPupilarDerecha: '',
    reaccionPupilarIzquierda: '',
    tiempoLlenadoCapilar: '',
    saturacionOxigeno: '',
  },
  examenFisico: {
    sinPatologia: false,
    conPatologia: false,
    hallazgosPatologicos: [],
  },
};

const SECTION_TITLES = {
  cabecera: 'Cabecera',
  registroAdmision: 'Registro de admisión',
  inicioAtencionMotivo: 'Inicio de atención y motivo',
  enfermedadActualRevisionSistemas: 'Enfermedad actual y revisión de sistemas',
  accidenteViolenciaIntoxicacion: 'Accidente, violencia o intoxicación',
  antecedentesPersonalesFamiliares: 'Antecedentes personales y familiares',
  signosVitalesMedicionesValores: 'Signos vitales y mediciones',
  examenFisico: 'Examen físico',
};

function EmergenciaTabs() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [formData, setFormData] = useState(FORM_STRUCTURE);

  const handleInputChange = (e, section, field, subField) => {
    setFormData((prev) => ({
      ...prev,
      [section]: subField
        ? {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subField]: e.target.value,
            },
          }
        : {
            ...prev[section],
            [field]: e.target.value,
          },
    }));
  };

  const handleSubmit = () => {
    alert('Formulario enviado: ' + JSON.stringify(formData, null, 2));
  };

  const handleNextSection = () => {
    if (activeSectionIndex < Object.keys(FORM_STRUCTURE).length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    }
  };

  const handlePreviousSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const renderSection = (sectionKey) => {
    const sectionData = formData[sectionKey];
    return (
      <div className="form-grid">
        {Object.keys(sectionData).map((field) =>
          typeof sectionData[field] === 'object' && !Array.isArray(sectionData[field]) ? (
            Object.keys(sectionData[field]).map((subField) => (
              <div key={subField} className="form-group">
                <label>{subField}:</label>
                <input
                  type="text"
                  value={sectionData[field][subField]}
                  onChange={(e) => handleInputChange(e, sectionKey, field, subField)}
                />
              </div>
            ))
          ) : (
            <div key={field} className="form-group">
              <label>{field}:</label>
              <input
                type="text"
                value={sectionData[field]}
                onChange={(e) => handleInputChange(e, sectionKey, field)}
              />
            </div>
          )
        )}
      </div>
    );
  };

  const sectionKeys = Object.keys(FORM_STRUCTURE);

  return (
    <div className="emergencia-tabs-container">
      <div className="tabs-sidebar">
        {sectionKeys.map((key, index) => (
          <button
            key={key}
            className={`tab-button ${activeSectionIndex === index ? 'active' : ''}`}
            onClick={() => setActiveSectionIndex(index)}
          >
            {SECTION_TITLES[key]}
          </button>
        ))}
      </div>
      <div className="form-content">
        <h3>{SECTION_TITLES[sectionKeys[activeSectionIndex]]}</h3>
        {renderSection(sectionKeys[activeSectionIndex])}
        <div className="form-actions">
          <Button label="Anterior" onClick={handlePreviousSection} disabled={activeSectionIndex === 0} />
          <Button label="Crear" onClick={handleSubmit} />
          <Button
            label="Siguiente"
            onClick={handleNextSection}
            disabled={activeSectionIndex === sectionKeys.length - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default EmergenciaTabs;
