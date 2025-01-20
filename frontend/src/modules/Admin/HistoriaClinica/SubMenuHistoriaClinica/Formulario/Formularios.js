import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../../../../../components/common/SearchBar";
import Button from "../../../../../components/common/Button";
import Table from "../../../../../components/common/Table";
import TipoFormularios from "./TipoFormularios";
import NuevoFormulario from "./NuevoFormulario"; // Importamos el nuevo componente
import VerFormulario from "./VerFormulario"; // Importar el componente para visualizar
import { fetchFormularios, deleteFormulario } from "../../../../../utils/api";

const Formulario = () => {
  const [formularios, setFormularios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null); // Para manejar la plantilla seleccionada
  const [selectedFormulario, setSelectedFormulario] = useState(null); // Para manejar el formulario seleccionado para visualizar

  useEffect(() => {
    const loadFormularios = async () => {
      try {
        const data = await fetchFormularios();
        setFormularios(data || []);
      } catch (error) {
        console.error("Error al cargar los formularios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFormularios();
  }, []);

  const handleCreateFormulario = () => {
    setCurrentStep(2); // Cambiar al paso de selección de tipo de formulario
  };

  const handleViewFormulario = (idFormulario) => {
    setSelectedFormulario(idFormulario); // Guardar el ID del formulario seleccionado
    setCurrentStep(4); // Cambiar al paso de visualización
  };

  const handleBackToFormularios = () => {
    setCurrentStep(1); // Volver a la lista de Formularios
  };

  const handlePlantillaSeleccionada = (plantilla) => {
    setCurrentStep(3); // Cambiar al paso de llenado del formulario
    setSelectedPlantilla(plantilla); // Guardar la plantilla seleccionada
  };

  const handleDeleteFormulario = async (id) => {
    try {
      await deleteFormulario(id);
      setFormularios((prev) => prev.filter((formulario) => formulario.idFormulario !== id));
      alert("Formulario eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar formulario:", error);
      alert("Error al eliminar el formulario. Intente nuevamente.");
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredFormularios = formularios.filter((formulario) =>
    formulario?.nroHistoriaClinica?.toString().includes(searchValue)
  );

  const columns = [
    { label: "Número de Historia Clínica", accessor: "nroHistoriaClinica" },
    { label: "Fecha de Creación", accessor: "fechaCreacionF" },
    { label: "Última Modificación", accessor: "fechaUltimaModificacionF" },
    { label: "Estado", accessor: "estadoFormulario" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (formulario) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <FaEye
            onClick={() => handleViewFormulario(formulario.idFormulario)} // Llamada al manejador de visualización
            title="Ver formulario"
            style={{ cursor: "pointer", color: "#007bff" }}
          />
          <FaEdit
            onClick={() => console.log("Editar formulario con ID:", formulario.idFormulario)}
            title="Editar formulario"
            style={{ cursor: "pointer", color: "#ffc107" }}
          />
          <FaTrash
            onClick={() => handleDeleteFormulario(formulario.idFormulario)}
            title="Eliminar formulario"
            style={{ cursor: "pointer", color: "#dc3545" }}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return <p>Cargando formularios...</p>;
  }

  return (
    <div className="formulario-container">
      {currentStep === 1 && (
        <>
          <div className="actions-row">
            <h2>Lista de Formularios</h2>
            <SearchBar
              placeholder="Buscar por número de historia clínica"
              value={searchValue}
              onChange={handleSearch}
            />
            <Button
              label="Crear Formulario"
              onClick={handleCreateFormulario}
              className="primary"
            />
          </div>
          <Table columns={columns} data={filteredFormularios} />
        </>
      )}
      {currentStep === 2 && (
        <TipoFormularios
          onBack={handleBackToFormularios}
          onPlantillaSeleccionada={handlePlantillaSeleccionada}
        />
      )}
      {currentStep === 3 && (
        <NuevoFormulario plantilla={selectedPlantilla} onBack={handleBackToFormularios} />
      )}
      {currentStep === 4 && (
        <VerFormulario idFormulario={selectedFormulario} onBack={handleBackToFormularios} />
      )}
    </div>
  );
};

export default Formulario;
