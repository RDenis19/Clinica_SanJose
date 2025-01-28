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
    console.log("Respuesta del servidor:", response.data); // Depuración opcional
    return response.data;
  } catch (error) {
    console.error("Error en loginRequest:", error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};


// Usuario
export const fetchUsers = async () => {
  try {
    const response = await API.get('/usuario/'); 
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};


// Crear un nuevo usuario con su información completa
export const createUser = async (userData) => {
  try {
    const response = await API.post('/usuario/', userData);
    return response.data;
  } catch (error) {
    console.error('Error en createUser:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear el usuario.');
  }
};

// Crear información personal del usuario
export const createUserPersonalInfo = async (personalInfo) => {
  try {
    const response = await API.post('/uip/', personalInfo);
    return response.data;
  } catch (error) {
    console.error('Error en createUserPersonalInfo:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear información personal.');
  }
};

// Crear información académica del usuario
export const createUserAcademicInfo = async (academicInfo) => {
  try {
    const response = await API.post('/uia/', academicInfo);
    return response.data;
  } catch (error) {
    console.error('Error en createUserAcademicInfo:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear información académica.');
  }
};

// Crear información de contacto del usuario
export const createUserContactInfo = async (contactInfo) => {
  try {
    const response = await API.post('/uic/', contactInfo);
    return response.data;
  } catch (error) {
    console.error('Error en createUserContactInfo:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear información de contacto.');
  }
};

// editar Usuario codigo
export const fetchUserDetails = async (idUsuario) => {
  console.log("Consultando detalles para el ID de usuario:", idUsuario); // Depuración
  const usuario = await API.get(`/usuario/${idUsuario}`);
  const informacionPersonal = await API.get(`/uip/${idUsuario}`);
  const informacionAcademica = await API.get(`/uia/${idUsuario}`);
  const informacionContacto = await API.get(`/uic/${idUsuario}`);

  console.log("Datos obtenidos:", { usuario, informacionPersonal, informacionAcademica, informacionContacto });

  return {
    ...usuario.data,
    informacion_personal: informacionPersonal.data,
    informacion_academica: informacionAcademica.data,
    informacion_contacto: informacionContacto.data,
  };
};



// Actualizar Usuario
export const updateUser = async (idUsuario, userData) => {
  try {
    const response = await API.put(`/usuario/${idUsuario}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en updateUser:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al actualizar el usuario.");
  }
};

// Actualizar Información Personal
export const updateUserPersonalInfo = async (idInformacionPersonal, personalData) => {
  try {
    const response = await API.put(`/uip/${idInformacionPersonal}`, personalData);
    return response.data;
  } catch (error) {
    console.error("Error en updateUserPersonalInfo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al actualizar información personal.");
  }
};

// Actualizar Información Académica
export const updateUserAcademicInfo = async (idInformacionAcademica, academicData) => {
  try {
    const response = await API.put(`/uia/${idInformacionAcademica}`, academicData);
    return response.data;
  } catch (error) {
    console.error("Error en updateUserAcademicInfo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al actualizar información académica.");
  }
};

// Actualizar Información de Contacto
export const updateUserContactInfo = async (idInformacionContacto, contactData) => {
  try {
    const response = await API.put(`/uic/${idInformacionContacto}`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error en updateUserContactInfo:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al actualizar información de contacto.");
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/usuario/${id}`);
    return response.data; // Devuelve el resultado de la eliminación
  } catch (error) {
    console.error("Error al eliminar usuario:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al eliminar el usuario.");
  }
};
// Obtener información personal de todos los usuarios
export const fetchUserPersonalInfo = async () => {
  try {
    const response = await API.get("/uip"); // Ruta para obtener información personal
    return response.data; // Devuelve la lista de información personal
  } catch (error) {
    console.error("Error al obtener información personal:", error);
    throw error.response
      ? error.response.data
      : { error: "Error en el servidor" };
  }
};


// Paciente

export const findPacienteById = async (identificacion) => {
  try {
    const response = await API.get(`/paciente/${identificacion}`);
    return response.data; 
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; 
    }
    throw error; 
  }
};



// Obtener lista completa de pacientes
export const fetchPatients = async () => {
  try {
    const response = await API.get('/pacientes/'); // Asegúrate de que esta ruta es correcta en tu backend
    return response.data; // Debe devolver el arreglo de pacientes
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};



// Crear un nuevo paciente
export const createPatient = async (patientData) => {
  try {
    console.log('Datos enviados al backend:', patientData); // Debug
    const response = await API.post('/pacientes/', patientData); // URL del backend
    return response.data; // Respuesta esperada
  } catch (error) {
    console.error('Error al agregar paciente:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear el paciente.');
  }
};

// Obtener detalles de un paciente por identificación
export const fetchPatientDetails = async (id) => {
  try {
    console.log("Consultando datos del paciente con ID:", id); // Debug
    const response = await API.get(`/pacientes/${id}`); // Confirma que esta sea la ruta correcta
    return response.data; // Devuelve los datos del paciente
  } catch (error) {
    console.error("Error al obtener detalles del paciente:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al obtener los datos del paciente.");
  }
};

// Actualizar datos de un paciente por identificación
export const updatePatient = async (identificacion, patientData) => {
  try {
    // Asegúrate de que los datos sean un objeto JSON
    console.log('Datos enviados en la solicitud PUT:', patientData);
    const response = await API.put(`/pacientes/${identificacion}`, patientData); // Verifica que la ruta sea correcta
    return response.data;
  } catch (error) {
    console.error('Error al actualizar paciente:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al actualizar el paciente.');
  }
};

// Eliminar un paciente por identificación
export const deletePatient = async (id) => {
  try {
    console.log("Eliminando paciente con ID:", id); // Debug
    const response = await API.delete(`/pacientes/${id}`); // Confirma que esta sea la ruta correcta
    return response.data; // Devuelve el resultado de la eliminación
  } catch (error) {
    console.error("Error al eliminar paciente:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al eliminar el paciente.");
  }
};

// Historia Clinica 

// Obtener todas las historias clínicas
export const fetchHistoriaClinica = async () => {
  try {
    const response = await API.get("/archivos/"); // Cambia "/archivo_clinico" a "/archivos"
    return response.data;
  } catch (error) {
    console.error("Error al obtener las historias clínicas:", error);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};


// Crear una nueva historia clínica
export const createHistoriaClinica = async (data) => {
  try {
    const response = await API.post("/archivos/", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear historia clínica:", error);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

// Actualizar una historia clínica
export const updateHistoriaClinica = async (nroArchivo, data) => {
  try {
    const response = await API.put(`/archivos/${nroArchivo}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar historia clínica:", error);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

// Eliminar una historia clínica
export const deleteHistoriaClinica = async (nroArchivo) => {
  try {
    const response = await API.delete(`/archivos/${nroArchivo}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar historia clínica:", error);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

//Firma Electronica

// 1. Obtener todas las firmas electrónicas
export const fetchFirmaElectronica = async () => {
  try {
    const response = await API.get("/firma/");
    return response.data; // Devuelve la lista de firmas electrónicas
  } catch (error) {
    console.error("Error al obtener las firmas electrónicas:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

// 2. Eliminar una firma electrónica por ID
export const deleteFirmaElectronica = async (id) => {
  try {
    const response = await API.delete(`/firma/${id}`);
    return response.data; // Devuelve una confirmación de eliminación
  } catch (error) {
    console.error("Error al eliminar la firma electrónica:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

// 3. Crear una nueva firma electrónica
export const createFirmaElectronica = async (firmaData) => {
  try {
    const response = await API.post("/firma/", firmaData);
    return response.data; // Devuelve los datos de la nueva firma creada
  } catch (error) {
    console.error("Error al crear la firma electrónica:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

// 4. Actualizar una firma electrónica existente
export const updateFirmaElectronica = async (idFirma, payload) => {
  try {
    const response = await API.put(`/firma/${idFirma}`, payload); // Verifica que la ruta sea correcta
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la firma electrónica:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al actualizar la firma electrónica.");
  }
};


// 5. Obtener una firma electrónica específica por ID
export const fetchFirmaElectronicaById = async (id) => {
  try {
    const response = await API.get(`/firma/${id}`);
    return response.data; // Devuelve los datos de la firma electrónica
  } catch (error) {
    console.error("Error al obtener la firma electrónica:", error.response?.data || error.message);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};


// APIs para Tipos de Formulario


// Obtener todos los tipos de formulario
export const fetchTiposFormulario = async () => {
  try {
      const response = await API.get('/formularios/tipos');
      return response.data;
  } catch (error) {
      console.error('Error al obtener tipos de formulario:', error);
      throw error;
  }
};

// Crear un nuevo tipo de formulario
export const createTipoFormulario = async (data) => {
  try {
      const response = await API.post('/formularios/tipos', data);
      return response.data;
  } catch (error) {
      console.error('Error al crear tipo de formulario:', error);
      throw error;
  }
};

// Editar un tipo de formulario existente
export const updateTipoFormulario = async (id, data) => {
  try {
      const response = await API.put(`/formularios/tipos/${id}`, data);
      return response.data;
  } catch (error) {
      console.error('Error al actualizar tipo de formulario:', error);
      throw error;
  }
};

// Eliminar un tipo de formulario
export const deleteTipoFormulario = async (id) => {
  try {
      const response = await API.delete(`/formularios/tipos/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al eliminar tipo de formulario:', error);
      throw error;
  }
};

// Obtener los campos de un tipo de formulario específico
export const fetchCamposFormulario = async (idFormularioTipo) => {
  try {
    const response = await API.get(`/campos/formulario_tipo/${idFormularioTipo}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener campos de formulario:', error);
    throw error;
  }
};

// Crear un campo en un tipo de formulario
export const createCampoFormulario = async (data) => {
  try {
      const response = await API.post('/campos/', data);
      return response.data;
  } catch (error) {
      console.error('Error al crear campo de formulario:', error);
      throw error;
  }
};

// Obtener un tipo de formulario por ID
export const fetchTipoFormularioById = async (id) => {
  try {
      const response = await API.get(`/formularios/tipos/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener el tipo de formulario por ID:', error);
      throw error;
  }
};


//Campo

// Editar un campo de formulario
export const updateCampoFormulario = async (id, data) => {
  try {
    // Verifica que los datos sean válidos
    if (!data.id_formulario_tipo || !data.nombre_campo || !data.tipo_dato) {
      throw new Error("Datos incompletos: id_formulario_tipo, nombre_campo y tipo_dato son obligatorios.");
    }
    const response = await API.put(`/campos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar campo de formulario:", error);
    throw error;
  }
};


// Eliminar un campo de formulario
export const deleteCampoFormulario = async (id) => {
  try {
      const response = await API.delete(`/campos/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al eliminar campo de formulario:', error);
      throw error;
  }
};