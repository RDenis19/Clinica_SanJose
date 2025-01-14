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
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};


export const createUser = async (userData) => {
  try {
    const response = await API.post("/user/", userData);
    return response.data.data;
  } catch (error) {
    console.error("Error en createUser:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al crear usuario.");
  }
};


export const fetchUserDetails = async (identificacion) => {
  try {
    const response = await API.get(`/user/${identificacion}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
    throw error;
  }
};


export const updateUser = async (identificacion, data) => {
  try {
    const response = await API.put(`/user/${identificacion}`, data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud PUT:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const removeUser = async (identificacion) => {
  try {
    const response = await API.delete(`/user/${identificacion}`);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud DELETE:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};


// Paciente
// Obtener lista de pacientes con paginación
export const fetchPatients = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`/paciente?page=${page}&limit=${limit}`);
    return response.data; // Asegúrate de que el backend devuelve { pacientes, total, totalPages }
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Crear un nuevo paciente
export const createPatient = async (patientData) => {
  try {
    console.log('Datos enviados al backend (API):', patientData);
    const response = await API.post('/paciente', patientData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar paciente:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Obtener detalles de un paciente por su identificación
export const fetchPatientDetails = async (identificacion) => {
  try {
    const response = await API.get(`/paciente/${identificacion}`);
    return response.data.data; // Asume que el backend envía { success: true, data: paciente }
  } catch (error) {
    console.error('Error al obtener detalles del paciente:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error al obtener detalles del paciente.' };
  }
};

// Actualizar datos de un paciente por identificación
export const updatePatient = async (identificacion, patientData) => {
  try {
    const config = {};
    if (patientData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }

    console.log('Datos enviados en la solicitud PUT:', patientData);
    const response = await API.put(`/paciente/${identificacion}`, patientData, config);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar paciente:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Eliminar un paciente por su identificación
export const removePatient = async (identificacion) => {
  try {
    console.log(`Eliminando paciente con identificación: ${identificacion}`);
    const response = await API.delete(`/paciente/${identificacion}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar paciente:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Buscar pacientes por criterios (por ejemplo, nombre, identificación)
export const searchPatients = async (criteria) => {
  try {
    const response = await API.get(`/paciente/search`, { params: criteria });
    return response.data;
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Obtener un resumen de pacientes (por ejemplo, estadísticas generales)
export const fetchPatientSummary = async () => {
  try {
    const response = await API.get(`/paciente/summary`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el resumen de pacientes:', error);
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





