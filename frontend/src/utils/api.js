import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3301',
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;


// Funciones para las peticiones
// Petición para iniciar sesión
export const loginRequest = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};

// Usuario
export const fetchUsers = async () => {
  try {
    const response = await API.get('/usuarios');
    console.log('Respuesta del servidor:', response.data);
    return response.data; // Esto debe ser un array
  } catch (error) {
    console.error('Error al obtener usuarios:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const createUser = async (userData) => {
  try {
    console.log("Datos enviados al backend (API):", userData);
    const response = await API.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar usuario:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const fetchUserDetails = async (id) => {
  try {
    const response = await API.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await API.put(`/usuarios/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const removeUser = async (id) => {
  try {
    const response = await API.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
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

// Obtener formulario
export const fetchFormularioEstructura = async (tipo) => {
  try {
    const response = await API.get(`/formularios/${tipo}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la estructura del formulario:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};




