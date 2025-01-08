import axios from 'axios';

// Configuración base de Axios
const API = axios.create({
  baseURL: 'http://localhost:3301/api', // URL base de tu API
  timeout: 10000, // Tiempo límite para las peticiones
});

// Petición para iniciar sesión
export const loginRequest = async (credentials) => {
  try {
    const response = await API.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};

// Obtener lista de usuarios (paginada si es necesario)
export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await API.get('/usuarios', {
      params: { page, limit }, // Parámetros para paginación
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener detalles de un usuario específico
export const fetchUserDetails = async (id) => {
  try {
    const response = await API.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};

// Actualizar un usuario
export const updateUser = async (user) => {
  try {
    const response = await API.put(`/usuarios/${user.idUsuario}`, user);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    await API.delete(`/usuarios/${id}`);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};

// Obtener pacientes (si también es necesario en este proyecto)
export const fetchPatients = async () => {
  try {
    const response = await API.get('/patients');
    return response.data;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};
