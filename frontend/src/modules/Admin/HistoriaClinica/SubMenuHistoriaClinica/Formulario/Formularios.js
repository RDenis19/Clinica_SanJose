import React, { useEffect, useState } from 'react';
import NavigationSteps from '../../../../../components/common/NavigationSteps';
import Table from '../../../../../components/common/Table';
import { fetchPlantillas } from '../../../../../utils/api'; // Asegúrate de que esta ruta sea correcta
import '../../../../../styles/modules/Administrador/formulario.css'; // Agrega tu CSS aquí si es necesario



function Formulario({ onNext }) {
  const [plantillas, setPlantillas] = useState([]);
  const [filteredPlantillas, setFilteredPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleRowAction = (form) => {
    onNext(form); // Enviar el formulario seleccionado al siguiente paso
  };

  return (
    <div className="formulario">
      <NavigationSteps step={2} />

      <h1 className="formulario-title">Seleccionar Formulario</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre de formulario..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <Table
        columns={[
          { label: 'Nombre', accessor: 'nombreTipoFormulario' },
          {
            label: 'Acción',
            accessor: 'action',
            render: (row) => (
              <button
                className="table-action-button"
                onClick={() => handleRowAction(row)}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            ),
          },
        ]}
        data={filteredPlantillas}
        onRowAction={handleRowAction}
      />
    </div>
  );
}

export default Formulario;

