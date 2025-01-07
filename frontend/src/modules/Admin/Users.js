import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Stats from '../../components/Stats';
import '../../styles/Administrador/users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  // Obtener datos desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Configuración de las columnas de la tabla
  const columns = [
    { label: 'Cédula', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo', accessor: 'email' },
    { label: 'Teléfono', accessor: 'phone' },
    { label: 'Rol', accessor: 'role' },
    { label: 'Estado', accessor: 'status' },
  ];

  // Datos dinámicos con roles y estado
  const tableData = filteredUsers.map((user, index) => ({
    id: `098051189${index}`, // Ejemplo de cédula dinámica
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: index % 2 === 0 ? 'Administrador' : 'Doctor',
    status: index % 2 === 0 ? 'Activo' : 'Inactivo',
  }));

  return (
    <div className="users-page">
      <h2 className="users-title">Usuarios</h2>

      {/* Estadísticas */}
      <Stats
        stats={[
          { label: 'Usuarios Totales', value: users.length },
          { label: 'Usuarios Activos', value: Math.floor(users.length * 0.75) },
          { label: 'Usuarios Inactivos', value: Math.floor(users.length * 0.25) },
        ]}
      />

      {/* Barra de búsqueda y botón */}
      <div className="users-actions">
        <SearchBar
          placeholder="Buscar Usuario"
          value={search}
          onChange={setSearch}
        />
        <Button
          label="Agregar Usuario"
          onClick={() => alert('Agregar Usuario')}
        />
      </div>

      {/* Tabla */}
      <Table
        columns={columns}
        data={tableData}
        actions={{
          icon: '→',
          onClick: (row) => alert(`Ver detalles del usuario: ${row.name}`),
        }}
      />
    </div>
  );
};

export default Users;
