import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/common/SearchBar';
import FilterDropdown from '../../../components/common/FilterDropdown';
import Pagination from '../../../components/common/Pagination';
import Table from '../../../components/common/Table';
import AddPatientForm from './AddPatientForm';
import PatientProfileModal from './PatientProfileModal';
import '../../../styles/modules/Administrador/patient/patient.css';
import Button from '../../../components/common/Button';
import { fetchPatient, fetchPatientDetails, removePatient, createPatient, updatePatient } from '../../../utils/api';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({ estado: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar pacientes desde el backend
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await fetchPatient();
        if (response && response.pacientes && Array.isArray(response.pacientes)) {
          setPatients(response.pacientes);
          setFilteredPatients(response.pacientes);
        } else {
          console.error('La respuesta del servidor no contiene un array de pacientes:', response);
          setPatients([]);
        }
      } catch (error) {
        console.error('Error al cargar los pacientes:', error);
        setPatients([]);
      }
    };
    loadPatients();
  }, []);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const handleExpandPatient = async (id) => {
    try {
      const patientDetails = await fetchPatientDetails(id);
      setExpandedPatient(patientDetails);
      setSelectedPatientId(id);
    } catch (error) {
      console.error('Error al obtener detalles del paciente:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await removePatient(id);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.idPaciente !== id));
      setFilteredPatients((prevPatients) => prevPatients.filter((patient) => patient.idPaciente !== id));
      alert('Paciente eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      alert('Error al eliminar el paciente. Intente nuevamente.');
    }
  };

  const handleUpdatePatient = async (id, updatedData) => {
    try {
      const updatedPatient = await updatePatient(id, updatedData);
      setPatients((prevPatients) =>
        prevPatients.map((patient) => (patient.idPaciente === id ? { ...patient, ...updatedPatient } : patient))
      );
      setFilteredPatients((prevPatients) =>
        prevPatients.map((patient) => (patient.idPaciente === id ? { ...patient, ...updatedPatient } : patient))
      );
      setExpandedPatient(null);
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
    }
  };

  const handleAddPatient = async (newPatient) => {
    try {
      const addedPatient = await createPatient(newPatient);
      setPatients((prevPatients) => [addedPatient, ...prevPatients]);
      setFilteredPatients((prevPatients) => [addedPatient, ...prevPatients]);
      setIsAddPatientModalOpen(false);
    } catch (error) {
      console.error('Error al agregar paciente:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const lowercasedValue = value.toLowerCase();
    const filtered = patients.filter(
      (patient) =>
        patient.identificacion.toLowerCase().includes(lowercasedValue) ||
        patient.primerNombre.toLowerCase().includes(lowercasedValue)
    );
    setFilteredPatients(filtered);
    setCurrentPage(1); // Reinicia la paginación al buscar
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: value };

      const filtered = patients.filter((patient) => {
        const matchEstado = !updatedFilters.estado || patient.estado === updatedFilters.estado;
        return matchEstado;
      });

      setFilteredPatients(filtered);
      setCurrentPage(1); // Reinicia la paginación al filtrar
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ estado: '' });
    setFilteredPatients(patients);
    setCurrentPage(1); // Reinicia la paginación
  };

  // Lógica de paginación
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  return (
    <div className="patients-container">
      <div className="actions-container">
        <div className="actions-row">
          <div className="title-container">
            <h2 className="title">Lista de Pacientes</h2>
          </div>
          <SearchBar
            placeholder="Buscar por nombre o cédula"
            value={searchValue}
            onChange={handleSearch}
          />
          <FilterDropdown
            isOpen={isFilterOpen}
            toggle={toggleFilter}
            filters={filters}
            setFilters={handleFilterChange}
            options={[
              { key: 'estado', label: 'Estado', values: ['Act', 'Ina'] },
            ]}
          />
          <Button label="Quitar Filtros" onClick={clearFilters} />
          <Button label="Agregar Paciente" onClick={() => setIsAddPatientModalOpen(true)} />
        </div>
      </div>

      <Table
        columns={[
          { label: 'Identificación', accessor: 'identificacion' },
          { label: 'Primer Nombre', accessor: 'primerNombre' },
          { label: 'Apellido Paterno', accessor: 'apellidoPaterno' },
          { label: 'Correo', accessor: 'correo' },
          { label: 'Estado', accessor: 'estado' },
          {
            label: 'Acción',
            accessor: 'acciones',
            render: (patient) => (
              <Button label="Detalles" onClick={() => handleExpandPatient(patient.idPaciente)} />
            ),
          },
        ]}
        data={paginatedPatients}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {expandedPatient && (
        <PatientProfileModal
          patientId={selectedPatientId}
          patient={expandedPatient}
          onClose={() => setExpandedPatient(null)}
          onDelete={handleDeletePatient}
          onUpdate={handleUpdatePatient}
        />
      )}

      {isAddPatientModalOpen && (
        <AddPatientForm onClose={() => setIsAddPatientModalOpen(false)} onAdd={handleAddPatient} />
      )}
    </div>
  );
};

export default Patient;
