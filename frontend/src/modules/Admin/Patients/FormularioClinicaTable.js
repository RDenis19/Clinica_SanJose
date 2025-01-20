import React, { useEffect, useState } from "react";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import SearchBar from "../../../components/common/SearchBar";
import { fetchFormularioById } from "../../../utils/api";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const FormularioClinicaTable = ({ idHistoriaClinica, onBack }) => {
  const [formularios, setFormularios] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const loadFormularios = async () => {
      try {
        const response = await fetchFormularioById(idHistoriaClinica);
        setFormularios(response);
      } catch (error) {
        console.error("Error al cargar los formularios:", error);
      }
    };
    loadFormularios();
  }, [idHistoriaClinica]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredFormularios = formularios.filter((formulario) =>
    Object.values(formulario).some((field) =>
      String(field).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleView = (idFormulario) => {
    alert(`Visualizando formulario ${idFormulario}`);
  };

  const handleEdit = (idFormulario) => {
    alert(`Editando formulario ${idFormulario}`);
  };

  const handleDelete = (idFormulario) => {
    if (window.confirm("¿Seguro que deseas eliminar este formulario?")) {
      alert(`Formulario ${idFormulario} eliminado`);
    }
  };

  const columns = [
    { label: "Nr Historia Clinica", accessor: "nroHistoriaClinica" },
    { label: "Creacion", accessor: "fechaCreacionF" },
    { label: "Modificación", accessor: "fechaUltimaModificacionF" },
    { label: "Estado", accessor: "estadoFormulario" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (formulario) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <FaEye
            title="Ver formulario"
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => handleView(formulario.idFormulario)}
          />
          <FaEdit
            title="Editar formulario"
            style={{ cursor: "pointer", color: "#ffc107" }}
            onClick={() => handleEdit(formulario.idFormulario)}
          />
          <FaTrash
            title="Eliminar formulario"
            style={{ cursor: "pointer", color: "#dc3545" }}
            onClick={() => handleDelete(formulario.idFormulario)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3>Formularios Asociados</h3>
      <div className="actions-row">
        <SearchBar
          placeholder="Buscar formularios"
          value={searchValue}
          onChange={handleSearch}
        />
        <Button
          label="Agregar Formulario"
          onClick={() => alert("Agregar nuevo formulario")}
        />
      </div>
      <Table columns={columns} data={filteredFormularios} />
    </div>
  );
};

export default FormularioClinicaTable;
