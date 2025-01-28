import React, { useState } from "react";
import { Modal, Form, Input, Button, Divider, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createTipoFormulario } from "../../../../../utils/api"; // Asegúrate de ajustar la ruta
import CamposFormularioList from "./CamposFormularioList"; // Componente de gestión de campos

const AddTipoFormulario = ({ visible, onClose, onTipoFormularioAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tipoFormularioId, setTipoFormularioId] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Llamada a la API para crear el tipo de formulario
      const newTipoFormulario = await createTipoFormulario(values);

      notification.success({
        message: "Tipo de formulario creado",
        description: "El tipo de formulario se ha creado exitosamente.",
      });

      // Guarda el ID del nuevo tipo de formulario creado
      setTipoFormularioId(newTipoFormulario.id_formulario_tipo);

      // Refresca la lista de tipos de formularios
      onTipoFormularioAdded();

      // Limpia el formulario
      form.resetFields();
    } catch (error) {
      console.error("Error al crear tipo de formulario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo crear el tipo de formulario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Tipo de Formulario"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800} // Ancho para acomodar la gestión de campos
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nombre"
          label="Nombre del Tipo de Formulario"
          rules={[{ required: true, message: "Ingrese el nombre del tipo de formulario." }]}
        >
          <Input placeholder="Ejemplo: Admisión, Alta, Evolución" />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: "Ingrese una descripción." }]}
        >
          <Input.TextArea
            placeholder="Breve descripción del tipo de formulario"
            rows={3}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
            block
          >
            Crear Tipo de Formulario
          </Button>
        </Form.Item>
      </Form>

      {/* Mostrar la sección de campos si ya se ha creado un tipo de formulario */}
      {tipoFormularioId && (
        <>
          <Divider />
          <h3>Gestión de Campos</h3>
          <CamposFormularioList tipoFormularioId={tipoFormularioId} />
        </>
      )}
    </Modal>
  );
};

export default AddTipoFormulario;
