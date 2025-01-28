import React, { useState, useEffect } from "react";
import { Form, Input, Button, Divider, notification } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { updateTipoFormulario, fetchTipoFormularioById } from "../../../../../utils/api";
import CamposFormularioList from "./CamposFormularioList";

const EditTipoFormulario = ({ setView, tipoFormularioId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    // Scroll hacia arriba automáticamente al montar el componente
    document.getElementById("root").scrollIntoView({ behavior: "smooth" });

    // Cargar los datos iniciales del formulario
    const loadTipoFormulario = async () => {
      if (tipoFormularioId) {
        try {
          const data = await fetchTipoFormularioById(tipoFormularioId);
          form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
          });
          setCampos(data.campos || []);
        } catch (error) {
          console.error("Error al cargar el formulario:", error);
          notification.error({
            message: "Error",
            description: "No se pudieron cargar los datos del formulario.",
          });
        }
      }
    };

    loadTipoFormulario();
  }, [tipoFormularioId, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await updateTipoFormulario(tipoFormularioId, values);
      notification.success({
        message: "Formulario actualizado",
        description: "El formulario se ha actualizado exitosamente.",
      });
      setView("list"); // Regresar a la lista después de guardar
    } catch (error) {
      console.error("Error al actualizar el formulario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo actualizar el formulario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => setView("list")}
        style={{ marginBottom: 16 }}
      >
        Regresar a la Lista
      </Button>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nombre"
          label="Nombre del Tipo de Formulario"
          rules={[{ required: true, message: "Ingrese el nombre del formulario." }]}
        >
          <Input placeholder="Ejemplo: Registro, Encuesta" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: "Ingrese una descripción." }]}
        >
          <Input.TextArea rows={3} placeholder="Breve descripción del formulario" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
            block
          >
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>

      {campos.length > 0 && (
        <>
          <Divider />
          <h3>Gestión de Campos</h3>
          <CamposFormularioList tipoFormularioId={tipoFormularioId} />
        </>
      )}
    </div>
  );
};

export default EditTipoFormulario;
