import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Stats from '../../components/Stats';
import '../../styles/Administrador/patients.css';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  // Obtener datos desde la API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };
    fetchPatients();
  }, []);

  // Filtrar pacientes por búsqueda
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  // Configuración de las columnas de la tabla
  const columns = [
    { label: 'Cédula', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo', accessor: 'email' },
    { label: 'Teléfono', accessor: 'phone' },
    { label: 'Tipo de Atención', accessor: 'attention' },
    { label: 'Estado', accessor: 'status' },
  ];

  // Datos con tipo de atención y estado dinámico
  const tableData = filteredPatients.map((patient, index) => ({
    id: `098051189${index}`,
    name: patient.name,
    email: patient.email,
    phone: patient.phone,
    attention: index % 2 === 0 ? 'Consulta Externa' : 'Hospitalización',
    status: index % 2 === 0 ? 'Activo' : 'Inactivo',
  }));

  return (
    <div className="patients-page">
      <h2 className="patients-title">Pacientes</h2>

      {/* Estadísticas */}
      <Stats
        stats={[
          { label: 'Pacientes Totales', value: patients.length },
          { label: 'Pacientes Activos', value: Math.floor(patients.length * 0.75) },
          { label: 'Pacientes Inactivos', value: Math.floor(patients.length * 0.25) },
        ]}
      />

      {/* Barra de búsqueda y botón */}
      <div className="patients-actions">
        <SearchBar
          placeholder="Buscar Paciente"
          value={search}
          onChange={setSearch}
        />
        <Button
          label="Agregar Paciente"
          onClick={() => alert('Agregar Paciente')}
        />
      </div>

      {/* Tabla */}
      <Table
        columns={columns}
        data={tableData}
        actions={{
          icon: '→',
          onClick: (row) => alert(`Ver detalles del paciente: ${row.name}`),
        }}
      />
    </div>
  );
}

export default Patients;
