import React, { useState, useEffect } from "react";
import Modal from "../../../../components/common/Modal";
import AddPlantilla from "./AddPlantilla";
import EditPlantilla from "./EditPlantilla"; 
import { fetchPlantillas, deletePlantilla } from "../../../../utils/api";
import Table from "../../../../components/common/Table";
import Button from "../../../../components/common/Button";

function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
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
    try {
      await deletePlantilla(id);
      loadPlantillas();
    } catch (error) {
      console.error("Error al eliminar plantilla:", error);
    }
  };

  const handleEdit = (plantilla) => {
    console.log("Plantilla seleccionada:", plantilla); 
    setCurrentPlantilla(plantilla); 
    setEditModalOpen(true); 
  };
  

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Nombre", accessor: "nombreTipoFormulario" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            label="Editar"
            className="secondary"
            onClick={() => handleEdit(row)} // Manejar clic en el botón de editar
          />
          <Button
            label="Eliminar"
            className="danger"
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Gestión de Plantillas</h1>
      <Button label="Agregar Plantilla" onClick={() => setAddModalOpen(true)} />

      <Table columns={columns} data={plantillas} />

      {isAddModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)}>
          <AddPlantilla onClose={() => setAddModalOpen(false)} onRefresh={loadPlantillas} />
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
