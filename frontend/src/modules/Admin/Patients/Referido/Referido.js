import React, { useEffect, useState } from 'react';
import { fetchReferidos } from '../../../../utils/api';
import SearchBar from '../../../../components/common/SearchBar';
import Table from '../../../../components/common/Table';
import Button from '../../../../components/common/Button';

function Referido() {
  const [referidos, setReferidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const loadReferidos = async (pacienteIdentificacion) => {
    try {
      setLoading(true);
      const data = await fetchReferidos(pacienteIdentificacion);
      setReferidos(data);
    } catch (error) {
      console.error('Error al cargar referidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cargar todos los referidos al inicio
    loadReferidos();
  }, []);

  const handleSearch = () => {
    loadReferidos(searchTerm); // Buscar por identificación de paciente
  };

  const columns = [
    { label: 'ID Referido', accessor: 'idReferido' },
    { label: 'Nombre', accessor: 'nombreReferido' },
    { label: 'Parentesco', accessor: 'parentescoReferido' },
    { label: 'Dirección', accessor: 'direccionReferido' },
    { label: 'Identificación', accessor: 'Paciente_identificacion' },
  ];

  return (
    <div>
      <h1>Gestión de Referidos</h1>
      <SearchBar
        placeholder="Buscar por identificación del paciente"
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <Button label="Buscar" onClick={handleSearch} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table columns={columns} data={referidos} />
      )}
    </div>
  );
}

export default Referido;
