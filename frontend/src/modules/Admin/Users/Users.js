import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/common/SearchBar';
import FilterDropdown from '../../../components/common/FilterDropdown';
import Pagination from '../../../components/common/Pagination';
import Table from '../../../components/common/Table';
import AddUserForm from './AddUserForm';
import UserProfileModal from './UserProfileModal';
import '../../../styles/modules/Administrador/users.css';
import { fetchUsers, fetchUserDetails, removeUser, createUser } from '../../../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleExpandUser = async (idUsuario) => {
    try {
      const userDetails = await fetchUserDetails(idUsuario);
      setExpandedUser(userDetails);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers([...users, addedUser]);
      setIsAddUserModalOpen(false);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const handleDeleteUser = async (idUsuario) => {
    try {
      await removeUser(idUsuario);
      setUsers(users.filter((user) => user.idUsuario !== idUsuario));
      setExpandedUser(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="users-container">
      <div className="actions-container">
        <SearchBar placeholder="Buscar Usuario" />
        <FilterDropdown filters={{}} setFilters={() => {}} />
        <button onClick={() => setIsAddUserModalOpen(true)}>Agregar Usuario</button>
      </div>
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
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
      {expandedUser && (
        <UserProfileModal
          user={expandedUser}
          onClose={() => setExpandedUser(null)}
          onDelete={handleDeleteUser}
        />
      )}
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
