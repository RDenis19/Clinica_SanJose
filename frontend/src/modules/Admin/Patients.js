import React, { useEffect, useState } from 'react';
import '../../styles/Administrador/patients.css';
import { AiOutlineArrowRight, AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';

function Patients() {
  const [patients, setPatients] = useState([]); // Lista de pacientes
  const [search, setSearch] = useState(''); // Estado para la búsqueda

  // Petición para obtener los datos de pacientes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // API temporal
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };
    fetchPatients();
  }, []);

  // Filtrar pacientes según la búsqueda
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patients-page">
      <h2 className="patients-title">Pacientes</h2>
      <div className="patients-stats">
        <div className="stat">
          <p>Pacientes Totales</p>
          <h3>{patients.length}</h3>
        </div>
        <div className="stat">
          <p>Pacientes Activos</p>
          <h3>{Math.floor(patients.length * 0.75)}</h3>
        </div>
        <div className="stat">
          <p>Pacientes Inactivos</p>
          <h3>{Math.floor(patients.length * 0.25)}</h3>
        </div>
      </div>
      <div className="patients-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar Paciente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch className="icon" />
        </div>
        <AiOutlineFilter className="icon filter-icon" />
        <button className="add-patient-button">Agregar Paciente</button>
      </div>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              <td>0980511892</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>
                <span
                  className={`status-badge ${
                    index % 2 === 0 ? 'hospitalization' : 'external-consultation'
                  }`}
                >
                  {index % 2 === 0 ? 'Hospitalización' : 'Consulta Externa'}
                </span>
              </td>
              <td>
                <button className="action-button">
                  <AiOutlineArrowRight />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;
