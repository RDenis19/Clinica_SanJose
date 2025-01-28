import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, notification, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateTipoFormulario, fetchTipoFormularioById } from "../../../../../utils/api";
import CamposFormularioList from "./CamposFormularioList"; // Componente de gestión de campos

const EditTipoFormulario = ({ visible, onClose, onTipoFormularioUpdated, tipoFormularioId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar los datos iniciales del tipo de formulario
    const loadTipoFormulario = async () => {
      if (tipoFormularioId) {
        try {
          const data = await fetchTipoFormularioById(tipoFormularioId); // Llama a la API para obtener los datos
          form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
          });
        } catch (error) {
          console.error("Error al cargar el tipo de formulario:", error);
          notification.error({
            message: "Error",
            description: "No se pudieron cargar los datos del tipo de formulario.",
          });
        }
      }
    };

    if (visible) loadTipoFormulario();
  }, [tipoFormularioId, visible, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Llamada a la API para actualizar el tipo de formulario
      await updateTipoFormulario(tipoFormularioId, values);
      notification.success({
        message: "Tipo de formulario actualizado",
        description: "El tipo de formulario se ha actualizado correctamente.",
      });
      onTipoFormularioUpdated(); // Refresca la lista de tipos de formularios
      form.resetFields(); // Limpia el formulario
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el tipo de formulario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo actualizar el tipo de formulario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Tipo de Formulario"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800} // Se amplía el tamaño del modal para acomodar los campos
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
            icon={<EditOutlined />}
            loading={loading}
            block
          >
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      {/* Gestión de Campos Asociados */}
      <h3>Gestión de Campos</h3>
      <CamposFormularioList tipoFormularioId={tipoFormularioId} />
    </Modal>
  );
};

export default EditTipoFormulario;
