import axios from 'axios';
import { isTokenExpired } from './authUtils';

const API = axios.create({
  baseURL: 'http://localhost:3301',
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/auth/login')) {
      const token = localStorage.getItem('jwt_token');
      if (token && !isTokenExpired(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
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
export const fetchUsers = async () => {
  try {
    const response = await API.get('/user/');
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
    const response = await API.post('/user/', userData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar usuario:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const fetchUserDetails = async (id) => {
  try {
    const response = await API.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await API.put(`/user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const removeUser = async (id) => {
  try {
    const response = await API.delete(`/user/${id}`);
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

export const createPatients = async (userData) => {
  try {
    const response = await API.post('/patients', userData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar paciente:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};
//Doctor - Enfermera
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
//Enfermera
// asignar Formulario a Paciente 
export const asignarFormularioAPaciente = async ({ pacienteId, tipoFormulario }) => {
  const response = await fetch(`/api/pacientes/${pacienteId}/formularios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tipoFormulario }),
  });

  if (!response.ok) {
    throw new Error('Error al asignar el formulario');
  }

  return await response.json();
};





