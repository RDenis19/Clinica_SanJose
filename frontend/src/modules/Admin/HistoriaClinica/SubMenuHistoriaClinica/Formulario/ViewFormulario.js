import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Spin, notification } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { fetchFormularioById } from "../../../../../utils/api";

const ViewFormulario = ({ formularioId, setView }) => {
  const [formulario, setFormulario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarFormulario = async () => {
      try {
        const data = await fetchFormularioById(formularioId);
        setFormulario(data);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "No se pudo cargar el formulario.",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarFormulario();
  }, [formularioId]);

  if (loading) {
    return <Spin tip="Cargando formulario..." style={{ display: "block", margin: "20px auto" }} />;
  }

  if (!formulario) {
    return <p>No se encontró el formulario.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Button type="link" icon={<LeftOutlined />} onClick={() => setView("formularios")} style={{ marginBottom: 16 }}>
        Regresar
      </Button>
      <Card title={`Formulario ID: ${formulario.id_formulario}`} bordered>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Tipo">{formulario.id_formulario_tipo}</Descriptions.Item>
          <Descriptions.Item label="Número de Archivo">{formulario.nro_archivo}</Descriptions.Item>
          <Descriptions.Item label="Usuario Creador">{formulario.id_usuario_creador}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Creación">{formulario.fecha_creacion}</Descriptions.Item>
          <Descriptions.Item label="Estado">{formulario.estado}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ViewFormulario;
