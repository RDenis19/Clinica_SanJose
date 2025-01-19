import React, { useState } from "react";
import Table from "../../../components/common/Table";
import FormulariosPaciente from "./FormulariosPaciente";
import SearchBar from "../../../components/common/SearchBar";
import Button from "../../../components/common/Button";

const HistoriasClinicasTable = ({ historias }) => {
  const [selectedHistoria, setSelectedHistoria] = useState(null);

  const columns = [
    { label: "ID", accessor: "idHistoriaClinica" },
    { label: "Numero de Historia", accessor: "nroHistoriaClinica" },
    { label: "Fecha de Creación", accessor: "fechaCreacionHC" },
    { label: "Última Edición", accessor: "fechaUltimaEdicion" },
    { label: "Estado", accessor: "Paciente_identificaacion" },
  ];

  return (
    <div>
      <h3>Historias Clínicas</h3>
      {selectedHistoria ? (
        <FormulariosPaciente
          idHistoriaClinica={selectedHistoria.idHistoriaClinica}
          onBack={() => setSelectedHistoria(null)}
          onAddFormulario={() => alert("Agregar nuevo formulario")}
        />
      ) : (
        <div className="formularios-header">
          <div className="actions-row">
            <SearchBar
              placeholder="Buscar historias clínicas"
              value=""
              onChange={() => {}}
            />
            <Button label="Agregar Historia Clínica" onClick={() => alert("Agregar historia clínica")} />
          </div>
          <Table
            columns={columns}
            data={historias}
            onRowAction={(row) => setSelectedHistoria(row)}
          />
        </div>
      )}
    </div>
  );
};

export default HistoriasClinicasTable;
