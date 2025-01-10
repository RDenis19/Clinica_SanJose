import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/common/SearchBar';
import FilterDropdown from '../../../components/common/FilterDropdown';
import Pagination from '../../../components/common/Pagination';
import Table from '../../../components/common/Table';
import AddUserForm from './AddUserForm';
import UserProfileModal from './UserProfileModal';
import '../../../styles/modules/Administrador/user/users.css';
import { fetchUsers, fetchUserDetails, removeUser, createUser, updateUser } from '../../../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]); // Estado para usuarios
  const [expandedUser, setExpandedUser] = useState(null); // Usuario expandido para detalles
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // Estado para modal de agregar usuario
  const [currentPage, setCurrentPage] = useState(1); // Paginación
  const itemsPerPage = 10;

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        if (response && response.usuarios && Array.isArray(response.usuarios)) {
          setUsers(response.usuarios); // Ajustar para extraer el array `usuarios`
        } else {
          console.error('La respuesta del servidor no contiene un array de usuarios:', response);
          setUsers([]); // Asegurar que sea un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setUsers([]); // Asegurar que sea un array vacío en caso de error
      }
    };
    loadUsers();
  }, []);

  // Manejar la expansión de detalles de un usuario
  const handleExpandUser = async (id) => {
    try {
      const userDetails = await fetchUserDetails(id);
      setExpandedUser(userDetails);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  // Agregar un nuevo usuario
  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers([...users, addedUser]); // Actualiza el estado con el nuevo usuario
      setIsAddUserModalOpen(false);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  // Eliminar un usuario
  const handleDeleteUser = async (id) => {
    try {
      await removeUser(id);
      setUsers(users.filter((user) => user.idUsuario !== id));
      setExpandedUser(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Actualizar un usuario
  const handleUpdateUser = async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      setUsers(users.map((user) => (user.idUsuario === id ? updatedUser : user)));
      setExpandedUser(null);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  // Paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  console.log('Usuarios mostrados en la tabla:', paginatedUsers); // Depuración

  return (
    <div className="users-container">
      {/* Barra de acciones */}
      <div className="actions-container">
        <SearchBar placeholder="Buscar Usuario" />
        <FilterDropdown filters={{}} setFilters={() => { }} />
        <button onClick={() => setIsAddUserModalOpen(true)}>Agregar Usuario</button>
      </div>

      {/* Tabla de usuarios */}
      <Table
        columns={[
          { label: 'Cédula', accessor: 'identificacion' },
          { label: 'Nombre', accessor: 'nombres' },
          { label: 'Correo', accessor: 'correo' },
          { label: 'Teléfono', accessor: 'telefono' },
          { label: 'Rol', accessor: 'rol' },
          { label: 'Estado', accessor: 'estado' },
          {
            label: 'Acción',
            accessor: 'acciones',
            render: (user) => (
              <button onClick={() => handleExpandUser(user.idUsuario)}>🔍</button>
            ),
          },
        ]}
        data={paginatedUsers}
      />

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      {/* Modal de detalles del usuario */}
      {expandedUser && (
        <UserProfileModal
          user={expandedUser}
          onClose={() => setExpandedUser(null)}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      )}

      {/* Modal de agregar usuario */}
      {isAddUserModalOpen && (
        <AddUserForm
          onClose={() => setIsAddUserModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
};

export default Users;
