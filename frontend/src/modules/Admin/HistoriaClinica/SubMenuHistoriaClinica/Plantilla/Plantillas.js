import React, { useState, useEffect } from "react";
import Modal from "../../../../../components/common/Modal";
import AddPlantilla from "./AddPlantilla";
import EditPlantilla from "./EditPlantilla";
import { fetchPlantillas, deletePlantilla } from "../../../../../utils/api";
import Table from "../../../../../components/common/Table";
import Button from "../../../../../components/common/Button";
import SearchBar from "../../../../../components/common/SearchBar";

// IMPORTA LOS ICONOS DE react-icons
import { FaEdit, FaTrash } from "react-icons/fa";

function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPlantilla, setCurrentPlantilla] = useState(null);

  useEffect(() => {
    loadPlantillas();
  }, []);

  const loadPlantillas = async () => {
    try {
      const data = await fetchPlantillas();
      setPlantillas(data);
    } catch (error) {
      console.error("Error al cargar plantillas:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta plantilla?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deletePlantilla(id);
      alert(response.message || "Plantilla eliminada exitosamente");
      loadPlantillas();
    } catch (error) {
      console.error("Error al eliminar plantilla:", error);
      alert(
        error.message ||
          "No se pudo eliminar la plantilla. Inténtalo nuevamente más tarde."
      );
    }
  };

  const handleEdit = (plantilla) => {
    console.log("Plantilla seleccionada:", plantilla);
    setCurrentPlantilla(plantilla);
    setEditModalOpen(true);
  };

  // Definición de columnas para la tabla
  const columns = [
    { label: "ID", accessor: "idPlantilla_Formulario" },
    { label: "Numero Tipo Formulario", accessor: "nroTipoFormulario" },
    { label: "Nombre", accessor: "nombreTipoFormulario" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* ICONO DE EDITAR */}
          <FaEdit
            onClick={() => handleEdit(row)}
            title="Editar plantilla"
            style={{ cursor: "pointer", color: "#ffc107" }}
          />
          {/* ICONO DE ELIMINAR */}
          <FaTrash
            onClick={() => handleDelete(row.idPlantilla_Formulario)}
            title="Eliminar plantilla"
            style={{ cursor: "pointer", color: "#dc3545" }}
          />
        </div>
      ),
    },
  ];

  // Filtramos las plantillas según el texto ingresado en la barra de búsqueda
  const filteredPlantillas = plantillas.filter((plantilla) =>
    plantilla.nombreTipoFormulario
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="actions-row">
        <h2>Gestión de Plantillas de Formularios</h2>
        <SearchBar
          placeholder="Buscar por nombre de formulario..."
          value={searchTerm}
          onChange={(valor) => setSearchTerm(valor)}
        />

        <Button label="Agregar Plantilla" onClick={() => setAddModalOpen(true)} />
      </div>

      {/* Mostramos la tabla con los datos ya filtrados */}
      <Table columns={columns} data={filteredPlantillas} />

      {isAddModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)}>
          <AddPlantilla
            onClose={() => setAddModalOpen(false)}
            onRefresh={loadPlantillas}
          />
        </Modal>
      )}

      {isEditModalOpen && currentPlantilla && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <EditPlantilla
            plantilla={currentPlantilla}
            onClose={() => setEditModalOpen(false)}
            onRefresh={loadPlantillas}
          />
        </Modal>
      )}
    </div>
  );
}

export default Plantillas;
