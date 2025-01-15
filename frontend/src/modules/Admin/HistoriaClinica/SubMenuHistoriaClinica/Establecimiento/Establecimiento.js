import React, { useState, useEffect } from "react";
import Table from "../../../../../components/common/Table";
import Button from "../../../../../components/common/Button";
import SearchBar from "../../../../../components/common/SearchBar";
import AddEstablecimiento from "./AddEstablecimiento";
import Modal from "../../../../../components/common/Modal";
import EditEstablecimiento from "./EditEstablecimiento";
import { fetchEstablecimientos, deleteEstablecimiento } from "../../../../../utils/api";

function Establecimiento() {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [filteredEstablecimientos, setFilteredEstablecimientos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentEstablecimiento, setCurrentEstablecimiento] = useState(null);

  useEffect(() => {
    loadEstablecimientos();
  }, []);

  useEffect(() => {
    const filteredData = establecimientos.filter((item) =>
      item.nombreEstablecimiento
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredEstablecimientos(filteredData);
  }, [searchQuery, establecimientos]);

  const loadEstablecimientos = async () => {
    try {
      const data = await fetchEstablecimientos();
      setEstablecimientos(data);
      setFilteredEstablecimientos(data);
    } catch (error) {
      console.error("Error al cargar establecimientos:", error);
    }
  };

  const handleDelete = async (idEstablecimiento) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este establecimiento?"
    );
    if (!confirmDelete) return;
    try {
      await deleteEstablecimiento(idEstablecimiento);
      alert("Establecimiento eliminado exitosamente");
      loadEstablecimientos();
    } catch (error) {
      console.error("Error al eliminar establecimiento:", error);
      alert("Error al eliminar el establecimiento");
    }
  };

  const handleEdit = (establecimiento) => {
    setCurrentEstablecimiento(establecimiento);
    setEditModalOpen(true);
  };

  const columns = [
    { label: "ID", accessor: "idEstablecimiento" },
    { label: "Nombre", accessor: "nombreEstablecimiento" },
    { label: "Código", accessor: "codigoEstablecimiento" },
    { label: "Sistema", accessor: "institucionSistema" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            label="Editar"
            className="secondary"
            onClick={() => handleEdit(row)}
          />
          <Button
            label="Eliminar"
            className="danger"
            onClick={() => handleDelete(row.idEstablecimiento)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Gestión de Establecimientos</h1>
      <SearchBar
        placeholder="Buscar por nombre"
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <Button label="Agregar Establecimiento" onClick={() => setModalOpen(true)} />
      <Table columns={columns} data={filteredEstablecimientos} />
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddEstablecimiento
            onClose={() => setModalOpen(false)}
            onRefresh={loadEstablecimientos}
          />
        </Modal>
      )}
      {isEditModalOpen && currentEstablecimiento && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <EditEstablecimiento
            establecimiento={currentEstablecimiento}
            onClose={() => setEditModalOpen(false)}
            onRefresh={loadEstablecimientos}
          />
        </Modal>
      )}
    </div>
  );
}

export default Establecimiento;
