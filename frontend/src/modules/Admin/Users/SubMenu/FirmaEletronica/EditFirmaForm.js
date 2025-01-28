import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, Upload, notification } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { updateFirmaElectronica, fetchUserPersonalInfo } from "../../../../../utils/api";

const { Option } = Select;

const EditFirmaForm = ({ visible, onClose, onFirmaUpdated, firma }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // Lista de usuarios filtrados por cédula
  const [firmaContent, setFirmaContent] = useState(null); // Contenido del archivo .txt
  const [fileList, setFileList] = useState([]); // Lista de archivos subidos

  useEffect(() => {
    // Cargar usuarios por cédula para el desplegable
    const loadUsers = async () => {
      try {
        const data = await fetchUserPersonalInfo(); // Llama a la API para obtener información personal
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        notification.error({
          message: "Error",
          description: "No se pudieron cargar los usuarios.",
        });
      }
    };
    loadUsers();

    // Cargar datos iniciales del formulario
    if (firma) {
      form.setFieldsValue({
        id_usuario: firma.id_usuario,
      });
    }
  }, [firma, form]);

  // Manejo de la carga del archivo .txt
  const handleFileChange = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;

    if (!uploadedFile) {
      notification.error({
        message: "Error",
        description: "No se pudo procesar el archivo. Intente nuevamente.",
      });
      return;
    }

    if (uploadedFile.type !== "text/plain") {
      notification.error({
        message: "Error",
        description: "Solo se permiten archivos .txt.",
      });
      setFileList([]); // Resetea la lista si el archivo no es válido
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const wordsOnly = text
        .replace(/[^a-zA-Z0-9\s]/g, "") // Elimina caracteres no alfanuméricos
        .split(/\s+/) // Divide el texto por espacios
        .join(" "); // Une las palabras en un solo string
      setFirmaContent(wordsOnly); // Guarda el contenido limpio
      setFileList([info.file]); // Actualiza la lista de archivos subidos
      notification.success({
        message: "Archivo procesado",
        description: "El archivo se procesó correctamente.",
      });
    };
    reader.onerror = () => {
      notification.error({
        message: "Error",
        description: "No se pudo leer el archivo. Intente nuevamente.",
      });
      setFileList([]); // Resetea la lista si hay un error
    };

    reader.readAsText(uploadedFile); // Usa el archivo asegurado como un Blob
  };

  const uploadProps = {
    accept: ".txt", // Solo acepta archivos .txt
    maxCount: 1, // Limita a un solo archivo
    onRemove: () => {
      setFirmaContent(null); // Limpia el contenido procesado
      setFileList([]); // Limpia la lista de archivos
    },
    beforeUpload: () => false, // Evita la subida automática del archivo
    onChange: handleFileChange, // Maneja los cambios de archivo
    fileList, // Vincula la lista de archivos al estado
  };

  // Enviar el formulario para actualizar la firma electrónica
  const handleSubmit = async (values) => {
    if (!firmaContent) {
      notification.error({
        message: "Error",
        description: "Debe subir un archivo .txt válido.",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id_usuario: values.id_usuario, // ID del usuario seleccionado
        firma_base64: firmaContent, // Contenido del archivo .txt
      };

      await updateFirmaElectronica(firma.id_firma_electronica, payload); // Llama a la API para actualizar la firma
      notification.success({
        message: "Firma actualizada",
        description: "La firma electrónica se ha actualizado exitosamente.",
      });
      onFirmaUpdated(); // Refresca la lista en el componente principal
      form.resetFields();
      setFirmaContent(null);
      setFileList([]);
      onClose();
    } catch (error) {
      console.error("Error al actualizar firma electrónica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo actualizar la firma electrónica.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Firma Electrónica"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="id_usuario"
          label="Usuario"
          rules={[{ required: true, message: "Seleccione un usuario." }]}
        >
          <Select placeholder="Seleccione un usuario" disabled>
            {users.map((user) => (
              <Option key={user.id_usuario} value={user.id_usuario}>
                {user.cedula} - {user.nombres} {user.apellidos}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="firma"
          label="Archivo de Firma Electrónica (.txt)"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Subir Archivo</Button>
          </Upload>
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
    </Modal>
  );
};

export default EditFirmaForm;
