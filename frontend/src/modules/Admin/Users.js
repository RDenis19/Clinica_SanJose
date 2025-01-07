import React, { useEffect, useState } from 'react';
import '../../styles/Administrador/users.css';
import { AiOutlineArrowRight, AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';

function Users() {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [search, setSearch] = useState(''); // Estado para la búsqueda

  // Petición para obtener los datos de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // API temporal
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  // Filtrar usuarios según la búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">
      <h2 className="users-title">Usuarios</h2>
      <div className="users-stats">
        <div className="stat">
          <p>Usuarios Totales</p>
          <h3>{users.length}</h3>
        </div>
        <div className="stat">
          <p>Usuarios Activos</p>
          <h3>{Math.floor(users.length * 0.75)}</h3>
        </div>
        <div className="stat">
          <p>Usuarios Inactivos</p>
          <h3>{Math.floor(users.length * 0.25)}</h3>
        </div>
      </div>
      <div className="users-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar Usuario"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch className="icon" />
        </div>
        <AiOutlineFilter className="icon filter-icon" />
        <button className="add-user-button">Agregar Usuario</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>0980511892</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{index % 2 === 0 ? 'Administrador' : 'Doctor'}</td>
              <td>
                <label className="switch">
                  <input type="checkbox" defaultChecked={index % 2 === 0} />
                  <span className="slider round"></span>
                </label>
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

export default Users;
