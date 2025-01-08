import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import Pagination from '../../components/common/Pagination';
import Table from '../../components/common/Table';
import UserProfileModal from '../../components/common/UserProfileModal';
import '../../styles/modules/Administrador/users.css';
import { fetchUsers, deleteUser, updateUser } from '../../utils/api'; // Peticiones API

const Users = () => {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [filteredUsers, setFilteredUsers] = useState([]); // Usuarios filtrados
  const [expandedUser, setExpandedUser] = useState(null); // Usuario seleccionado para el modal
  const [searchQuery, setSearchQuery] = useState(''); // Búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Usuarios por página

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(); // Petición para obtener usuarios
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchData();
  }, []);

  // Filtrar usuarios en tiempo real con la búsqueda
  useEffect(() => {
    const filtrados = users.filter((user) =>
      user.nombres.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtrados);
  }, [searchQuery, users]);

  // Cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Manejo de eliminación de usuario
  const handleDelete = async (idUsuario) => {
    try {
      await deleteUser(idUsuario); // Petición DELETE
      const data = users.filter((user) => user.idUsuario !== idUsuario);
      setUsers(data);
      setFilteredUsers(data);
      setExpandedUser(null); // Cerrar modal si el usuario estaba abierto
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Manejo de edición de usuario
  const handleSave = async (updatedUser) => {
    try {
      const response = await updateUser(updatedUser); // Petición PUT
      const updatedUsers = users.map((user) =>
        user.idUsuario === response.idUsuario ? response : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setExpandedUser(null); // Cerrar modal
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  // Usuarios paginados
  const usuariosPaginados = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Columnas de la tabla
  const columnas = [
    { label: 'Cédula', accessor: 'identificacion' },
    { label: 'Nombre', accessor: 'nombres' },
    { label: 'Correo', accessor: 'correo' },
    { label: 'Teléfono', accessor: 'telefono' },
    { label: 'Rol', accessor: 'rol' },
    { label: 'Estado', accessor: 'estado' },
    {
      label: 'Acción',
      accessor: 'accion',
      render: (user) => (
        <button onClick={() => setExpandedUser(user)}>🔍</button>
      ),
    },
  ];

  return (
    <div className="users-container">
      <div className="actions-container">
        <SearchBar
          placeholder="Buscar Usuario"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <FilterDropdown filters={[]} setFilters={() => {}} />
        <button className="add-user-button">Agregar Usuario</button>
      </div>
      <Table columns={columnas} data={usuariosPaginados} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
      {expandedUser && (
        <UserProfileModal
          user={expandedUser}
          onClose={() => setExpandedUser(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Users;
