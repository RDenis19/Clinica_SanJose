import React, { useState, useEffect } from "react";
import { Spin, Row, Col, Typography, Divider, Avatar, Button, Collapse, Card, Modal, Tag, Descriptions } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  ManOutlined,
  CalendarOutlined,
  FileTextOutlined,
  FileOutlined,
  FormOutlined
} from "@ant-design/icons";
import { fetchPatientDetails, fetchHistoriaClinica } from "../../../utils/api";

const { Title } = Typography;
const { Panel } = Collapse;

const PatientDetailsView = ({ patient, onBack }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clinicalRecords, setClinicalRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

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

    if (patient) {
      fetchDetails();
      fetchRecords();
    }
  }, [patient]);

  const showRecordDetails = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
      <Button type="primary" onClick={onBack} style={{ marginBottom: "20px" }}>
        Volver a la lista
      </Button>

      <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShowPatientInfo(!showPatientInfo)}>
        <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: "#1890ff" }} />
      </div>

      {showPatientInfo && (
        <Card bordered={false} style={{ marginTop: "20px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
          <Title level={3} style={{ textAlign: "center" }}>{`${patient.primer_nombre} ${patient.segundo_nombre || ""} ${patient.primer_apellido} ${patient.segundo_apellido}`}</Title>
          <Divider />
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
        </Card>
      )}

      <Collapse accordion style={{ marginTop: "20px" }}>
        <Panel header={<span><FileOutlined /> Archivos de Historia Clínica</span>} key="1">
          {recordsLoading ? (
            <Spin tip="Cargando historias clínicas..." style={{ width: "100%" }} />
          ) : clinicalRecords.length > 0 ? (
            <Row gutter={[16, 16]}>
              {clinicalRecords.map((record) => (
                <Col span={8} key={record.nro_archivo}>
                  <Card
                    hoverable
                    onClick={() => showRecordDetails(record)}
                    style={{ borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", textAlign: "center" }}
                  >
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
          <Spin tip="Cargando formularios..." style={{ width: "100%" }} />
        </Panel>
      </Collapse>

      <Modal
        title="Detalles de la Historia Clínica"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Número de Archivo">{selectedRecord.nro_archivo}</Descriptions.Item>
            <Descriptions.Item label="ID Paciente">{selectedRecord.nro_identificacion}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Creación">{new Date(selectedRecord.fecha_creacion).toLocaleString()}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default PatientDetailsView;
