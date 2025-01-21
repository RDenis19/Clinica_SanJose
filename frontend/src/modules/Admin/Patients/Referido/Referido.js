import React, { useEffect, useState } from 'react';
import { fetchReferidos, createReferido } from '../../../../utils/api';
import SearchBar from '../../../../components/common/SearchBar';
import Table from '../../../../components/common/Table';
import Button from '../../../../components/common/Button';
import AddReferido from './AddReferido';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function Referido() {
  const [referidos, setReferidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

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

  const handleAddReferido = async (newReferido) => {
    try {
      await createReferido(newReferido);
      loadReferidos(); // Recargar la lista después de agregar
    } catch (error) {
      console.error('Error al agregar referido:', error);
    }
  };

  const columns = [
    { label: 'ID Referido', accessor: 'idReferido' },
    { label: 'Nombre', accessor: 'nombreReferido' },
    { label: 'Parentesco', accessor: 'parentescoReferido' },
    { label: 'Dirección', accessor: 'direccionReferido' },
    { label: 'Identificación', accessor: 'Paciente_identificacion' },
    {
      label: 'Acciones',
      accessor: 'acciones',
      render: (row) => (
        <div>
          <FaEye
            className="icon-view"
            onClick={() => console.log('Ver detalles de:', row.idReferido)}
            title="Ver detalles"
            style={{ cursor: 'pointer', color: '#007bff', marginRight: '8px' }}
          />
          <FaEdit
            className="icon-edit"
            onClick={() => console.log('Editar:', row.idReferido)}
            title="Editar referido"
            style={{ cursor: 'pointer', color: '#ffc107', marginRight: '8px' }}
          />
          <FaTrash
            className="icon-delete"
            onClick={() => console.log('Eliminar:', row.idReferido)}
            title="Eliminar referido"
            style={{ cursor: 'pointer', color: '#dc3545' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Gestión de Referidos</h1>
      <Button label="Agregar Referido" onClick={() => setShowAddModal(true)} />
      <SearchBar
        placeholder="Buscar por identificación del paciente"
        value={searchTerm}
        onChange={setSearchTerm}
      />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table columns={columns} data={referidos} />
      )}
      {showAddModal && (
        <AddReferido
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddReferido}
        />
      )}
    </div>
  );
}

export default Referido;
