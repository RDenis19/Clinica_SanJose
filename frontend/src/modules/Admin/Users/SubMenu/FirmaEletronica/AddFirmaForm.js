import React, { useState } from "react";
import { Modal, Form, Select, Button, Upload, notification } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { createFirmaElectronica, fetchUserPersonalInfo } from "../../../../../utils/api";

const { Option } = Select;

const AddFirmaForm = ({ visible, onClose, onFirmaAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // Almacena usuarios filtrados por cédula
  const [firmaContent, setFirmaContent] = useState(null); // Contenido extraído del archivo .txt
  const [fileList, setFileList] = useState([]); // Estado para manejar la lista de archivos subidos

  // Función para buscar usuarios por cédula
  const handleSearch = async (value) => {
    if (value.length >= 3) { // Empieza a buscar después de 3 caracteres
      try {
        const data = await fetchUserPersonalInfo(); // Llama a la API para obtener información personal
        const filtered = data.filter((user) =>
          user.cedula.toLowerCase().includes(value.toLowerCase())
        );
        setUsers(filtered); // Actualiza la lista de resultados
      } catch (error) {
        console.error("Error al buscar usuarios por cédula:", error);
        notification.error({
          message: "Error",
          description: "No se pudieron cargar los usuarios por cédula.",
        });
      }
    } else {
      setUsers([]); // Limpia los resultados si el input es menor a 3 caracteres
    }
  };

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
  

  // Enviar el formulario para crear la firma electrónica
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

      await createFirmaElectronica(payload); // Llama a la API para crear la firma
      notification.success({
        message: "Firma agregada",
        description: "La firma electrónica se ha creado exitosamente.",
      });
      onFirmaAdded(); // Refresca la lista en el componente principal
      form.resetFields();
      setFirmaContent(null);
      setFileList([]);
      onClose();
    } catch (error) {
      console.error("Error al agregar firma electrónica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo agregar la firma electrónica.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Firma Electrónica"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="id_usuario"
          label="Buscar Usuario por Cédula"
          rules={[{ required: true, message: "Seleccione un usuario." }]}
        >
          <Select
            showSearch
            placeholder="Escriba la cédula para buscar"
            onSearch={handleSearch} // Llama a la función de búsqueda al escribir
            filterOption={false} // Deshabilita el filtrado por defecto de Ant Design
          >
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
          rules={[{ required: true, message: "Suba un archivo .txt." }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Subir Archivo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
            block
          >
            Crear Firma Electrónica
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFirmaForm;
