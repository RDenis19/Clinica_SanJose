import React, { useState, useEffect } from "react";
import { Modal, Spin, Row, Col, Typography, Divider, Avatar } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  ManOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { fetchPatientDetails } from "../../../utils/api"; // Función para obtener detalles del paciente

const { Title, Text } = Typography;

const PatientProfileModal = ({ patientId, visible, onClose }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchPatientDetails(patientId);
        setPatientData(response);
      } catch (error) {
        console.error("Error al obtener detalles del paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchDetails();
    }
  }, [patientId]);

  if (!visible) return null;

  return (
    <Modal
      title={
        <Row align="middle">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginRight: 16, backgroundColor: "#87d068" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Detalles del Paciente
          </Title>
        </Row>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {loading ? (
        <Spin tip="Cargando detalles del paciente..." style={{ width: "100%" }} />
      ) : patientData ? (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>
                <IdcardOutlined /> Número de Identificación:
              </Text>
              <p>{patientData.nro_identificacion || "No especificado"}</p>
            </Col>
            <Col span={12}>
              <Text strong>
                <FileTextOutlined /> Tipo de Identificación:
              </Text>
              <p>{patientData.tipo_identificacion || "No especificado"}</p>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>
                <UserOutlined /> Nombres:
              </Text>
              <p>
                {patientData.primer_nombre} {patientData.segundo_nombre || ""}
              </p>
            </Col>
            <Col span={12}>
              <Text strong>
                <UserOutlined /> Apellidos:
              </Text>
              <p>
                {patientData.primer_apellido} {patientData.segundo_apellido}
              </p>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>
                <ManOutlined /> Género:
              </Text>
              <p>
                {patientData.genero === "M"
                  ? "Masculino"
                  : patientData.genero === "F"
                  ? "Femenino"
                  : "Otro"}
              </p>
            </Col>
            <Col span={12}>
              <Text strong>
                <CalendarOutlined /> Fecha de Nacimiento:
              </Text>
              <p>
                {patientData.fecha_nacimiento
                  ? new Date(patientData.fecha_nacimiento).toLocaleDateString()
                  : "No especificada"}
              </p>
            </Col>
          </Row>
        </div>
      ) : (
        <p>No se encontraron datos del paciente.</p>
      )}
    </Modal>
  );
};

export default PatientProfileModal;
