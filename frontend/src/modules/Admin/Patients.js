import React, { useState, useEffect } from 'react';
import { fetchPatients } from '../../utils/api';
import Table from '../../components/common/Table';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import '../../styles/components/table.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      const data = await fetchPatients();
      setPatients(data);
    };
    loadPatients();
  }, []);

  // Filtrar pacientes con base en búsqueda y filtros
  useEffect(() => {
    let result = [...patients];
    if (search) {
      result = result.filter((patient) =>
        patient.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredPatients(result);
  }, [search, filters, patients]);

  const columns = [
    { title: 'Cédula', field: 'identificacion' },
    { title: 'Nombre', field: 'nombre' },
    { title: 'Correo', field: 'correo' },
    { title: 'Teléfono', field: 'telefono' },
    { title: 'Tipo de Atención', field: 'tipoAtencion' },
    { title: 'Estado', field: 'estado' },
  ];

  return (
    <div className="patients-page">
      <div className="stats">
        <div className="stat-item">Totales <span> {patients.length}</span></div>
        <div className="stat-item">Activos <span>{patients.filter(p => p.estado === 'Activo').length}</span></div>
        <div className="stat-item">Inactivos <span>{patients.filter(p => p.estado === 'Inactivo').length}</span></div>
      </div>
      <div className="actions-container">
        <div className="actions-left">
          <SearchBar
            placeholder="Buscar Paciente"
            value={search}
            onChange={setSearch}
          />
          <FilterDropdown
            isOpen={false} // Puedes manejar el estado para abrir/cerrar
            toggle={() => {}}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="actions-right">
          <button className="add-patient-button">Agregar Paciente</button>
        </div>
      </div>
      <Table columns={columns} data={filteredPatients} />
    </div>
  );
};

export default Patients;
