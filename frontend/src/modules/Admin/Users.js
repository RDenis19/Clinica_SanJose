import React, { useEffect, useState } from 'react';
import { getUsers } from '../../utils/api';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Stats from '../../components/Stats';
import FilterDropdown from '../../components/FilterDropdown';
import '../../styles/Administrador/users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ role: '', status: '' });
  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (user) =>
        (filters.role ? user.role === filters.role : true) &&
        (filters.status ? user.status === filters.status : true)
    );

  const pageSize = 10;
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const columns = [
    { label: 'Cédula', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo', accessor: 'email' },
    { label: 'Teléfono', accessor: 'phone' },
    { label: 'Rol', accessor: 'role' },
    { label: 'Estado', accessor: 'status' },
  ];

  return (
    <div className="page-content">
      <Stats
        stats={[
          { label: 'Totales', value: users.length },
          { label: 'Activos', value: users.filter((u) => u.status === 'Activo').length },
          { label: 'Inactivos', value: users.filter((u) => u.status === 'Inactivo').length },
        ]}
      />
      <div className="actions-container">
        <div className="actions-left">
          <SearchBar
            className="search-bar"
            placeholder="Buscar Usuario"
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
          <Button label="Agregar Usuario" onClick={() => alert('Agregar Usuario')} />
        </div>
      </div>
      <Table
        columns={columns}
        data={paginatedUsers}
        actions={{
          icon: '→',
          onClick: (row) => alert(`Ver detalles del usuario: ${row.name}`),
        }}
      />
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Anterior
        </button>
        <span>
          Página {page} de {Math.ceil(filteredUsers.length / pageSize) || 1}
        </span>
        <button
          disabled={page === Math.ceil(filteredUsers.length / pageSize)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Users;
