import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createCampoFormulario } from "../../../../../utils/api";

const { Option } = Select;

const AddCampoFormulario = ({ visible, onClose, onCampoAdded, tipoFormularioId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createCampoFormulario({ ...values, id_formulario_tipo: tipoFormularioId });
      notification.success({
        message: "Campo creado",
        description: "El campo se ha creado exitosamente.",
      });
      onCampoAdded(); // Refresca la lista
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error al crear campo:", error);
      notification.error({
        message: "Error",
        description: "No se pudo crear el campo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Campo"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nombre_campo"
          label="Nombre del Campo"
          rules={[{ required: true, message: "Ingrese el nombre del campo." }]}
        >
          <Input placeholder="Ejemplo: Fecha de Admisión" />
        </Form.Item>
        <Form.Item
          name="tipo_dato"
          label="Tipo de Dato"
          rules={[{ required: true, message: "Seleccione un tipo de dato." }]}
        >
          <Select placeholder="Seleccione el tipo de dato">
            <Option value="TEXT">Texto</Option>
            <Option value="NUMBER">Numérico</Option>
            <Option value="DATE">Fecha</Option>
            <Option value="BOOLEAN">Booleano</Option>
            <Option value="ENUM">Opciones (ENUM)</Option>
          </Select>
        </Form.Item>
        <Form.Item name="opciones" label="Opciones (solo para ENUM)">
          <Input placeholder="Separar las opciones por comas (Ejemplo: Opción1,Opción2)" />
        </Form.Item>
        <Form.Item name="requerido" label="¿Es requerido?" initialValue={false}>
          <Select>
            <Option value={true}>Sí</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
            block
          >
            Crear Campo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCampoFormulario;
