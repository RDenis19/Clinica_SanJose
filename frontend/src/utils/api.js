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
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Obtener Usuarios
export const getUsers = async () => {
  try {
    const response = await API.get('/users'); // Actualiza con la ruta correcta
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Obtener Pacientes
export const fetchPatients = async () => {
  try {
    const response = await API.get('/patients'); // Ruta actualizada
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};