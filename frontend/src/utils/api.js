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
export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`/user?page=${page}&limit=${limit}`);
    return response.data; // Asegúrate de que el backend devuelve { usuarios, total, totalPages }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
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
    throw new Error(
      error.response?.data?.error || 'Error al obtener los detalles del usuario.'
    );
  }
};

export const updateUser = async (id, data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }

    console.log("Datos enviados en la solicitud PUT:", data);
    const response = await API.put(`/user/${id}`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud PUT:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};



export const removeUser = async (id) => {
  try {
    console.log(`Eliminando usuario con ID: ${id}`); // Depuración
    const response = await API.delete(`/user/${id}`); // Llamar al endpoint DELETE
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Paciente
export const fetchPatient = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`/patient?page=${page}&limit=${limit}`);
    return response.data; // Asegúrate de que el backend devuelve { pacientes, total, totalPages }
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const createPatient = async (patientData) => {
  try {
    console.log("Datos enviados al backend (API):", patientData);
    const response = await API.post('/patient', patientData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar paciente:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const fetchPatientDetails = async (id) => {
  try {
    const response = await API.get(`/patient/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Error al obtener los detalles del paciente.'
    );
  }
};

export const updatePatient = async (id, data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }

    console.log("Datos enviados en la solicitud PUT:", data);
    const response = await API.put(`/patient/${id}`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud PUT:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const removePatient = async (id) => {
  try {
    console.log(`Eliminando paciente con ID: ${id}`); // Depuración
    const response = await API.delete(`/patient/${id}`); // Llamar al endpoint DELETE
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error.response?.data || error.message);
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





