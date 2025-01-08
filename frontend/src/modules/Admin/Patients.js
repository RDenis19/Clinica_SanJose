import React, { useEffect, useState } from 'react';
import { fetchPatients } from '../../utils/api';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Stats from '../../components/Stats';
import FilterDropdown from '../../components/FilterDropdown';
import '../../styles/Administrador/patients.css';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ attention: '', status: '' });
  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };
    loadPatients();
  }, []);

  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (patient) =>
        (filters.attention ? patient.attention === filters.attention : true) &&
        (filters.status ? patient.status === filters.status : true)
    );

  const pageSize = 10;
  const paginatedPatients = filteredPatients.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const columns = [
    { label: 'Cédula', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo', accessor: 'email' },
    { label: 'Teléfono', accessor: 'phone' },
    { label: 'Tipo de Atención', accessor: 'attention' },
    { label: 'Estado', accessor: 'status' },
  ];

  return (
    <div className="page-content">
      <Stats
        stats={[
          { label: 'Totales', value: patients.length },
          { label: 'Activos', value: patients.filter((p) => p.status === 'Activo').length },
          { label: 'Inactivos', value: patients.filter((p) => p.status === 'Inactivo').length },
        ]}
      />
      <div className="actions-container">
        <div className="actions-left">
          <SearchBar
            className="search-bar"
            placeholder="Buscar Paciente"
            value={search}
            onChange={setSearch}
          />
          <FilterDropdown
            isOpen={isFilterOpen}
            toggle={() => setFilterOpen(!isFilterOpen)}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="actions-right">
          <Button label="Agregar Paciente" onClick={() => alert('Agregar Paciente')} />
        </div>
      </div>
      <Table
        columns={columns}
        data={paginatedPatients}
        actions={{
          icon: '→',
          onClick: (row) => alert(`Ver detalles del paciente: ${row.name}`),
        }}
      />
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Anterior
        </button>
        <span>
          Página {page} de {Math.ceil(filteredPatients.length / pageSize) || 1}
        </span>
        <button
          disabled={page === Math.ceil(filteredPatients.length / pageSize)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Patients;
