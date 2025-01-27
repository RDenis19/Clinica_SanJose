import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, notification, Tabs, DatePicker } from "antd";
import { createUser, createUserPersonalInfo, createUserAcademicInfo, createUserContactInfo } from "../../../utils/api";
import dayjs from "dayjs";

const { Option } = Select;
const { TabPane } = Tabs;

const AddUserModal = ({ visible, onClose, onUserAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const createdUser = await createUser({
        usuario: values.usuario,
        correo: values.correo,
        contraseña: values.contraseña,
        id_rol: values.id_rol,
      });

      const userId = createdUser.id_usuario;

      await createUserPersonalInfo({
        id_usuario: userId,
        cedula: values.cedula,
        nombres: values.nombres,
        apellidos: values.apellidos,
        fecha_nacimiento: values.fecha_nacimiento ? dayjs(values.fecha_nacimiento).format('YYYY-MM-DD') : null,
        genero: values.genero,
        estado_civil: values.estado_civil,
      });

      await createUserAcademicInfo({
        id_usuario: userId,
        institucion: values.institucion,
        titulo: values.titulo,
        anio_graduacion: values.anio_graduacion,
        especialidad: values.especialidad,
        registro_senescyt: values.registro_senescyt,
      });

      await createUserContactInfo({
        id_usuario: userId,
        provincia: values.provincia,
        ciudad: values.ciudad,
        calle_principal: values.calle_principal,
        calle_secundaria: values.calle_secundaria,
        celular: values.celular,
      });

      notification.success({
        message: "Usuario agregado",
        description: "El usuario se ha creado exitosamente.",
      });
      onUserAdded();
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      notification.error({
        message: "Error",
        description: error.message || "No se pudo crear el usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Usuario"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ id_rol: 1 }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Información de Usuario" key="1">
            <Form.Item
              name="usuario"
              label="Usuario"
              rules={[{ required: true, message: "El usuario es obligatorio." }]}
            >
              <Input placeholder="Nombre de usuario" />
            </Form.Item>
            <Form.Item
              name="correo"
              label="Correo"
              rules={[{ required: true, type: "email", message: "Correo inválido." }]}
            >
              <Input placeholder="Correo electrónico" />
            </Form.Item>
            <Form.Item
              name="contraseña"
              label="Contraseña"
              rules={[{ required: true, message: "La contraseña es obligatoria." }]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>
            <Form.Item
              name="id_rol"
              label="Rol"
              rules={[{ required: true, message: "El rol es obligatorio." }]}
            >
              <Select placeholder="Seleccione un rol">
                <Option value={1}>Administrador</Option>
                <Option value={2}>Doctor</Option>
                <Option value={3}>Enfermera</Option>
              </Select>
            </Form.Item>
          </TabPane>

          <TabPane tab="Información Personal" key="2">
            <Form.Item
              name="cedula"
              label="Cédula"
              rules={[{ required: true, message: "La cédula es obligatoria." }]}
            >
              <Input placeholder="Cédula de identidad" />
            </Form.Item>
            <Form.Item
              name="nombres"
              label="Nombres"
              rules={[{ required: true, message: "Los nombres son obligatorios." }]}
            >
              <Input placeholder="Nombres" />
            </Form.Item>
            <Form.Item
              name="apellidos"
              label="Apellidos"
              rules={[{ required: true, message: "Los apellidos son obligatorios." }]}
            >
              <Input placeholder="Apellidos" />
            </Form.Item>
            <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento">
              <DatePicker style={{ width: "100%" }} placeholder="Seleccione una fecha" />
            </Form.Item>
            <Form.Item name="genero" label="Género">
              <Select placeholder="Seleccione un género">
                <Option value="M">Masculino</Option>
                <Option value="F">Femenino</Option>
                <Option value="O">Otro</Option>
              </Select>
            </Form.Item>
            <Form.Item name="estado_civil" label="Estado Civil">
              <Select placeholder="Seleccione un estado civil">
                <Option value="SOLTERO">Soltero</Option>
                <Option value="CASADO">Casado</Option>
                <Option value="DIVORCIADO">Divorciado</Option>
                <Option value="VIUDO">Viudo</Option>
                <Option value="OTRO">Otro</Option>
              </Select>
            </Form.Item>
          </TabPane>

          <TabPane tab="Información Académica" key="3">
            <Form.Item name="institucion" label="Institución">
              <Input placeholder="Nombre de la institución" />
            </Form.Item>
            <Form.Item name="titulo" label="Título">
              <Input placeholder="Título académico" />
            </Form.Item>
            <Form.Item name="anio_graduacion" label="Año de Graduación">
              <Input type="number" placeholder="Año de graduación" />
            </Form.Item>
            <Form.Item name="especialidad" label="Especialidad">
              <Input placeholder="Especialidad" />
            </Form.Item>
            <Form.Item name="registro_senescyt" label="Registro Senescyt">
              <Input placeholder="Registro Senescyt" />
            </Form.Item>
          </TabPane>

          <TabPane tab="Información de Contacto" key="4">
            <Form.Item
              name="provincia"
              label="Provincia"
              rules={[{ required: true, message: "La provincia es obligatoria." }]}
            >
              <Input placeholder="Provincia" />
            </Form.Item>
            <Form.Item
              name="ciudad"
              label="Ciudad"
              rules={[{ required: true, message: "La ciudad es obligatoria." }]}
            >
              <Input placeholder="Ciudad" />
            </Form.Item>
            <Form.Item
              name="calle_principal"
              label="Calle Principal"
              rules={[{ required: true, message: "La calle principal es obligatoria." }]}
            >
              <Input placeholder="Calle principal" />
            </Form.Item>
            <Form.Item
              name="calle_secundaria"
              label="Calle Secundaria"
              rules={[{ required: true, message: "La calle secundaria es obligatoria." }]}
            >
              <Input placeholder="Calle secundaria" />
            </Form.Item>
            <Form.Item
              name="celular"
              label="Celular"
              rules={[{ required: true, message: "El celular es obligatorio." }]}
            >
              <Input placeholder="Número de celular" />
            </Form.Item>
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
