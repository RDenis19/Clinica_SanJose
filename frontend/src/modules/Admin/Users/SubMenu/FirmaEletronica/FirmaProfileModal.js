import React, { useEffect, useState } from "react";
import { Modal, Typography, Row, Col, Divider, Spin } from "antd";
import { IdcardOutlined, CalendarOutlined } from "@ant-design/icons";
import { fetchUserPersonalInfo } from "../../../../../utils/api";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const FirmaProfileModal = ({ visible, onClose, firma }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (firma && firma.id_usuario) {
        try {
          setLoading(true);
          const data = await fetchUserPersonalInfo(); // Obtiene información personal
          const user = data.find((u) => u.id_usuario === firma.id_usuario); // Busca el usuario correspondiente
          setUserInfo(user || null);
        } catch (error) {
          console.error("Error al obtener información del usuario:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [firma]);

  if (!firma || loading) {
    return (
      <Modal visible={visible} onCancel={onClose} footer={null}>
        <Spin tip="Cargando detalles..." />
      </Modal>
    );
  }

  return (
    <Modal
      title="Detalles de la Firma Electrónica"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <div style={{ textAlign: "center" }}>
        <Title level={4}>{userInfo ? `${userInfo.nombres} ${userInfo.apellidos}` : "No disponible"}</Title>
        <Divider />
        <Row>
          <Col span={12} style={{ textAlign: "center" }}>
            <Text strong>
              <IdcardOutlined /> Cédula:
            </Text>
            <Text> {userInfo ? userInfo.cedula : "No disponible"}</Text>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Text strong>
              <CalendarOutlined /> Fecha de Creación:
            </Text>
            <Text>
              {dayjs(firma.fecha_creacion).format("dddd, MMMM D, YYYY h:mm A")}
            </Text>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default FirmaProfileModal;
