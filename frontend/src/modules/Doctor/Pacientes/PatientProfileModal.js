import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Avatar, Spin, Button, Tag, Descriptions, Collapse, Row, Col } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  ManOutlined,
  CalendarOutlined,
  FileTextOutlined,
  FileOutlined,
  FormOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { fetchPatientDetails, fetchHistoriaClinica, fetchFormularios } from "../../../utils/api";

const { Title } = Typography;
const { Panel } = Collapse;

const PatientProfileView = ({ patient }) => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clinicalRecords, setClinicalRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [formularios, setFormularios] = useState([]);
  const [formulariosLoading, setFormulariosLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchPatientDetails(patient.nro_identificacion);
        setPatientData(response);
      } catch (error) {
        console.error("Error al obtener detalles del paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecords = async () => {
      try {
        setRecordsLoading(true);
        const response = await fetchHistoriaClinica();
        const filteredRecords = response.filter(
          (record) => record.nro_identificacion === patient.nro_identificacion
        );
        setClinicalRecords(filteredRecords);
      } catch (error) {
        console.error("Error al obtener historias clínicas:", error);
      } finally {
        setRecordsLoading(false);
      }
    };

    const fetchForms = async () => {
      try {
        setFormulariosLoading(true);
        const response = await fetchFormularios();
        setFormularios(response);
      } catch (error) {
        console.error("Error al obtener formularios:", error);
      } finally {
        setFormulariosLoading(false);
      }
    };

    if (patient) {
      fetchDetails();
      fetchRecords();
      fetchForms();
    }
  }, [patient]);

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "10px", maxWidth: "900px", margin: "0 auto" }}>
      <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        Volver
      </Button>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: "#87d068" }} />
        <Title level={4} style={{ marginTop: 10 }}>
          {patient.primer_nombre} {patient.primer_apellido}
        </Title>
      </div>

      {loading ? (
        <Spin tip="Cargando detalles del paciente..." style={{ width: "100%" }} />
      ) : (
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label={<IdcardOutlined />}> {patientData.nro_identificacion} </Descriptions.Item>
          <Descriptions.Item label={<FileTextOutlined />}> {patientData.tipo_identificacion || "No especificado"} </Descriptions.Item>
          <Descriptions.Item label={<ManOutlined />}> {patientData.genero === "M" ? "Masculino" : patientData.genero === "F" ? "Femenino" : "Otro"} </Descriptions.Item>
          <Descriptions.Item label={<CalendarOutlined />}> {new Date(patientData.fecha_nacimiento).toLocaleDateString()} </Descriptions.Item>
        </Descriptions>
      )}

      <Collapse accordion style={{ marginTop: "20px" }}>
        <Panel header={<span><FileOutlined /> Archivos de Historia Clínica</span>} key="1">
          {recordsLoading ? (
            <Spin tip="Cargando historias clínicas..." style={{ width: "100%" }} />
          ) : clinicalRecords.length > 0 ? (
            <Row gutter={[16, 16]}>
              {clinicalRecords.map((record) => (
                <Col span={12} key={record.nro_archivo}>
                  <Card>
                    <Title level={5}>Historia Clínica #{record.nro_archivo}</Title>
                    <Tag color="blue">ID Paciente: {record.nro_identificacion}</Tag>
                    <p><strong>Fecha Creación:</strong> {new Date(record.fecha_creacion).toLocaleDateString()}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No se encontraron archivos clínicos para este paciente.</p>
          )}
        </Panel>

        <Panel header={<span><FormOutlined /> Formularios Completados</span>} key="2">
          {formulariosLoading ? (
            <Spin tip="Cargando formularios..." style={{ width: "100%" }} />
          ) : formularios.length > 0 ? (
            <Row gutter={[16, 16]}>
              {formularios.map((form) => (
                <Col span={12} key={form.id_formulario}>
                  <Card title={`Formulario #${form.id_formulario}`} bordered>
                    <p><strong>Estado:</strong> {form.estado}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(form.fecha_creacion).toLocaleDateString()}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No se encontraron formularios asociados.</p>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default PatientProfileView;