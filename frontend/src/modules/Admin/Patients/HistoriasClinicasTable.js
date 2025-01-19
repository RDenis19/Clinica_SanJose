import React from "react";
import Table from "../../../components/common/Table";

const HistoriasClinicasTable = ({ historias }) => {
  const columns = [
    { label: "ID", accessor: "idHistoriaClinica" },
    { label: "Numero de Historia", accessor: "nroHistoriaClinica" },
    { label: "Fecha de Creación", accessor: "fechaCreacionHC" },
    { label: "Ultima Edición", accessor: "fechaUltimaEdicion" },
    { label: "Estado", accessor: "Paciente_identificacion" },
  ];

  return (
    <div>
      <h3>Historias Clínicas</h3>
      <Table
        columns={columns}
        data={historias}
        onRowAction={(row) => alert(`Seleccionaste la historia: ${row.idHistoriaClinica}`)}
      />
    </div>
  );
};

export default HistoriasClinicasTable;
