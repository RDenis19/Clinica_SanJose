import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaPhone, FaBirthdayCake, FaMapMarkerAlt, FaGlobe, FaVenusMars, FaTint, FaAllergies } from "react-icons/fa";
import { fetchPatientDetails, fetchHistorias } from "../../../utils/api";
import HistoriasClinicasTable from "./FormularioClinicaTable"; // Actualización para reflejar el nuevo nombre del componente
import "../../../styles/modules/Administrador/patientProfilePage.css";
import BackButton from "../../../components/common/BackButton";

const PatientProfilePage = () => {
  const { identificacion } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patient = await fetchPatientDetails(identificacion);
        setPatientData(patient);

        const historias = await fetchHistorias(identificacion);
        setHistorias(historias);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [identificacion]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!patientData) {
    return <p>No se encontró información del paciente.</p>;
  }

  return (
    <div className="patient-profile-page">
      <div className="patient-sidebar">
        <BackButton to="/admin/patients" />
        <div className="patient-header">
          <div className="patient-avatar-container">
            <img
              src="https://via.placeholder.com/150/cccccc/000000?text=Foto"
              alt={`${patientData.primerNombre} ${patientData.apellidoParteno}`}
              className="patient-avatar"
            />
          </div>
          <h2 className="patient-name">{`${patientData.primerNombre} ${patientData.apellidoParteno || ""}`}</h2>
          <p className="patient-role">Paciente</p>
        </div>
        <div className="patient-info">
          <p><FaUser className="icon" /> <strong>Identificación:</strong> {patientData.identificacion}</p>
          <p><FaPhone className="icon" /> <strong>Teléfono:</strong> {patientData.telefonoPaciente || "No especificado"}</p>
          <p><FaBirthdayCake className="icon" /> <strong>Fecha de Nacimiento:</strong> {patientData.fechaNacimiento ? new Date(patientData.fechaNacimiento).toLocaleDateString() : "No especificada"}</p>
          <p><FaMapMarkerAlt className="icon" /> <strong>Provincia:</strong> {patientData.provincia || "No especificada"}</p>
          <p><FaGlobe className="icon" /> <strong>Nacionalidad:</strong> {patientData.nacionalidad || "No especificada"}</p>
          <p><FaVenusMars className="icon" /> <strong>Sexo:</strong> {patientData.sexo === "M" ? "Masculino" : "Femenino"}</p>
          <p><FaAllergies className="icon" /> <strong>Alergias:</strong> {patientData.alergias || "No especificadas"}</p>
          <p><FaTint className="icon" /> <strong>Grupo Sanguíneo:</strong> {patientData.grupoSanguineo || "No especificado"}</p>
        </div>
      </div>

      <div className="patient-content">
        <HistoriasClinicasTable historias={historias} />
      </div>
    </div>
  );
};

export default PatientProfilePage;
