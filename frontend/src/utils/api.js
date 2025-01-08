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

// Usuario
// Obtener lista parcial de usuarios (para tabla)
export const fetchUsers = async () => {
  try {
    const response = await API.get('/usuarios', {
      params: { fields: 'idUsuario,identificacion,nombres,correo,telefono,rol,estado' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Obtener detalles completos de un usuario
export const fetchUserDetails = async (idUsuario) => {
  try {
    const response = await API.get(`/usuarios/${idUsuario}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Agregar un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await API.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Actualizar datos de un usuario
export const updateUser = async (idUsuario, updatedData) => {
  try {
    const response = await API.put(`/usuarios/${idUsuario}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Eliminar un usuario
export const removeUser = async (idUsuario) => {
  try {
    const response = await API.delete(`/usuarios/${idUsuario}`);
    return response.data;
  } catch (error) {
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
