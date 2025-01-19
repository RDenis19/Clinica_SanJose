import React, { useEffect, useState } from "react";
import NavigationSteps from "../../../../../components/common/NavigationSteps";
import BackButton from "../../../../../components/common/BackButton";
import Table from "../../../../../components/common/Table";
import Pagination from "../../../../../components/common/Pagination"; 
import PlantillaFormulario from "./PlantillaFormulario"; 
import { fetchPlantillas, fetchPlantilla } from "../../../../../utils/api"; // Importamos fetchPlantilla
import "../../../../../styles/modules/Administrador/tipoFormulario.css";

function TipoFormularios({ onBack }) {
  const [plantillas, setPlantillas] = useState([]);
  const [filteredPlantillas, setFilteredPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null); // Para mostrar la plantilla seleccionada
  const itemsPerPage = 5;

  useEffect(() => {
    const loadPlantillas = async () => {
      try {
        const data = await fetchPlantillas();
        setPlantillas(data);
        setFilteredPlantillas(data);
      } catch (error) {
        console.error("Error al cargar las plantillas:", error);
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
    setCurrentPage(1);
  };

  const handlePlantillaSelect = async (plantilla) => {
    try {
      const response = await fetchPlantilla(plantilla.idPlantilla_Formulario);
      console.log("Datos de la plantilla seleccionada:", response);
  
      // Adaptamos la estructura esperada
      const transformedData = {
        nombreTipoFormulario: response.data.Estructura.title,
        secciones: response.data.Estructura.sections.map((section) => ({
          nombre: section.title,
          contenido: section.content,
          campos: section.fields // Incluimos los campos directamente
        })),
      };
  
      setSelectedPlantilla(transformedData);
    } catch (error) {
      console.error("Error al cargar la plantilla seleccionada:", error);
      alert("No se pudo cargar la plantilla. Inténtalo nuevamente.");
    }
  };
  
  

  const paginatedPlantillas = filteredPlantillas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (selectedPlantilla) {
    // Mostrar PlantillaFormulario si se selecciona una plantilla
    return (
      <PlantillaFormulario
        plantilla={selectedPlantilla}
        onBack={() => setSelectedPlantilla(null)} // Volver a la lista de plantillas
      />
    );
  }

  return (
    <div className="tipo-formularios-container">
      <NavigationSteps step={1} />
      <div className="tipo-formularios-header">
        <BackButton onClick={onBack} />
        <h2 className="tipo-formularios-title">Seleccionar Plantilla</h2>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar por nombre de plantilla..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <Table
        columns={[
          { label: "Nombre de Plantilla", accessor: "nombreTipoFormulario" },
          {
            label: "Acción",
            accessor: "action",
            render: (row) => (
              <button
                className="table-action-button"
                onClick={() => handlePlantillaSelect(row)}
              >
                →
              </button>
            ),
          },
        ]}
        data={paginatedPlantillas}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPlantillas.length / itemsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default TipoFormularios;
