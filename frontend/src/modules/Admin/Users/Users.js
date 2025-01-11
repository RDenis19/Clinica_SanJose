import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/common/SearchBar';
import FilterDropdown from '../../../components/common/FilterDropdown';
import Pagination from '../../../components/common/Pagination';
import Table from '../../../components/common/Table';
import AddUserForm from './AddUserForm';
import UserProfileModal from './UserProfileModal';
import '../../../styles/modules/Administrador/user/users.css';
import Button from '../../../components/common/Button';
import { fetchUsers, fetchUserDetails, removeUser, createUser, updateUser } from '../../../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({ estado: '', rol: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar usuarios desde el backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        if (response && response.usuarios && Array.isArray(response.usuarios)) {
          setUsers(response.usuarios);
          setFilteredUsers(response.usuarios); // Inicializar lista de usuarios filtrados
        } else {
          console.error('La respuesta del servidor no contiene un array de usuarios:', response);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const handleExpandUser = async (id) => {
    try {
      const userDetails = await fetchUserDetails(id);
      setExpandedUser(userDetails);
      setSelectedUserId(id);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await removeUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.idUsuario !== id));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.idUsuario !== id));
      alert('Usuario eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario. Intente nuevamente.');
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.idUsuario === id ? { ...user, ...updatedUser } : user))
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) => (user.idUsuario === id ? { ...user, ...updatedUser } : user))
      );
      setExpandedUser(null);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers((prevUsers) => [addedUser, ...prevUsers]);
      setFilteredUsers((prevUsers) => [addedUser, ...prevUsers]);
      setIsAddUserModalOpen(false);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  // Función de búsqueda
  const handleSearch = (value) => {
    setSearchValue(value);
    const lowercasedValue = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.identificacion.toLowerCase().includes(lowercasedValue) ||
        user.nombres.toLowerCase().includes(lowercasedValue)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Función de filtrado
  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    const filtered = users.filter((user) => {
      const matchEstado = updatedFilters.estado
        ? user.estado === updatedFilters.estado
        : true;
      const matchRol = updatedFilters.rol
        ? user.rol === updatedFilters.rol
        : true;
      return matchEstado && matchRol;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const filterOptions = [
    {
      key: 'estado',
      label: 'Estado',
      values: ['Activo', 'Inactivo'],
    },
    {
      key: 'rol',
      label: 'Rol',
      values: ['Doctor', 'Enfermera', 'Administrador'],
    },
  ];

  return (
    <div className="users-container">
      <div className="actions-container">
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
          options={filterOptions}
        />
        <Button label="Agregar Usuario" onClick={() => setIsAddUserModalOpen(true)} />
      </div>

      <Table
        columns={[
          { label: 'Identificación', accessor: 'identificacion' },
          { label: 'Nombres', accessor: 'nombres' },
          { label: 'Apellidos', accessor: 'apellidos' },
          { label: 'Correo', accessor: 'correo' },
          { label: 'Rol', accessor: 'rol' },
          { label: 'Estado', accessor: 'estado' },
          {
            label: 'Acción',
            accessor: 'acciones',
            render: (user) => (
              <Button
                label="Detalles"
                onClick={() => handleExpandUser(user.idUsuario)}
              />
            ),
          },
        ]}
        data={paginatedUsers}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      {expandedUser && (
        <UserProfileModal
          userId={selectedUserId}
          user={expandedUser}
          onClose={() => setExpandedUser(null)}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      )}

      {isAddUserModalOpen && (
        <AddUserForm onClose={() => setIsAddUserModalOpen(false)} onAdd={handleAddUser} />
      )}
    </div>
  );
};

export default Users;
