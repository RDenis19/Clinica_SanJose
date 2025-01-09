import axios from 'axios';

// Configuración base de Axios
const API = axios.create({
  baseURL: 'http://localhost:3301', // URL base de tu API
  timeout: 10000,
});

// Interceptor para agregar el token en el encabezado Authorization
API.interceptors.request.use(
  (config) => {
    // Obtener el token desde el almacenamiento local o donde lo guardes
    const token = localStorage.getItem('token'); // Cambia esto si usas otro método de almacenamiento
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
// Funciones de Usuario
export const fetchUsers = async () => {
  try {
    const response = await API.get('/usuarios');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await API.post('/usuarios', userData);
    return response.data;
  } catch (error) {
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
