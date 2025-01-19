import React, { useEffect, useState } from 'react';
import NavigationSteps from '../../../../../components/common/NavigationSteps';
import BackButton from '../../../../../components/common/BackButton';
import Table from '../../../../../components/common/Table';
import { fetchPlantillas, fetchPlantilla } from '../../../../../utils/api';
import '../../../../../styles/modules/Administrador/tipoFormulario.css';

function TipoFormularios() {
  const [plantillas, setPlantillas] = useState([]);
  const [filteredPlantillas, setFilteredPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [selectedForm, setSelectedForm] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const loadPlantillas = async () => {
      try {
        const data = await fetchPlantillas();
        setPlantillas(data);
        setFilteredPlantillas(data);
      } catch (error) {
        console.error('Error al cargar las plantillas:', error);
      }
    };

    loadPlantillas();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPlantillas(
      plantillas.filter((plantilla) =>
        plantilla.nombreTipoFormulario.toLowerCase().includes(term)
      )
    );
  };

  const handleRowAction = async (form) => {
    try {
      const data = await fetchPlantilla(form.idPlantilla_Formulario);
      setSelectedForm(data.data);
      setActiveStep(2);
    } catch (error) {
      console.error('Error al cargar el formulario:', error);
    }
  };

  const handleBack = () => {
    setActiveStep(1);
    setSelectedForm(null);
    setActiveSection(0);
  };

  return (
    <div className="formulario">
      <NavigationSteps step={activeStep} />

      {activeStep === 1 && (
        <div>
          <h1 className="formulario-title">Seleccionar Formulario</h1>

          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Buscar por nombre de formulario..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="formulario-table-container">
            <Table
              columns={[
                { label: 'Nombre del Formulario', accessor: 'nombreTipoFormulario' },
                {
                  label: 'Acción',
                  accessor: 'action',
                  render: (row) => (
                    <button
                      className="table-action-button"
                      onClick={() => handleRowAction(row)}
                    >
                      →
                    </button>
                  ),
                },
              ]}
              data={filteredPlantillas}
            />
          </div>
        </div>
      )}

      {activeStep === 2 && selectedForm && (
        <div className="formulario-expanded">
          {/* Botón Back */}
          <BackButton onClick={handleBack} />

          {/* Sidebar de Secciones */}
          <aside className="formulario-sidebar">
            <h3>Secciones</h3>
            {selectedForm.Estructura?.sections?.map((section, index) => (
              <button
                key={index}
                className={`sidebar-item ${
                  index === activeSection ? 'active' : ''
                }`}
                onClick={() => setActiveSection(index)}
              >
                {section.title || `Sección ${index + 1}`}
              </button>
            ))}
          </aside>

          {/* Contenido del Formulario */}
          <main className="formulario-main">
            <div className="formulario-grid">
              {selectedForm.Estructura?.sections?.[activeSection]?.fields?.map(
                (field, index) => (
                  <div key={index} className="field">
                    <label>{field.label || `Campo ${index + 1}`}</label>
                    {field.type === 'text' && <input type="text" />}
                    {field.type === 'textarea' && <textarea />}
                    {field.type === 'signature' && <p>[Área de Firma]</p>}
                  </div>
                )
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default TipoFormularios;
