import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, notification, Divider } from "antd";
import {
  updateUser,
  updateUserPersonalInfo,
  updateUserAcademicInfo,
  updateUserContactInfo,
} from "../../../utils/api";
import dayjs from "dayjs";


const { Option } = Select;

const EditUserModal = ({ open, userData, onClose, onUserUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        usuario: userData.usuario || "",
        correo: userData.correo || "",
        contraseña: userData.contraseña || "",
        id_rol: userData.id_rol || 1,
        // Información personal
        cedula: userData.informacion_personal?.cedula || "",
        nombres: userData.informacion_personal?.nombres || "",
        apellidos: userData.informacion_personal?.apellidos || "",
        fecha_nacimiento: userData.informacion_personal?.fecha_nacimiento
          ? dayjs(userData.informacion_personal.fecha_nacimiento)
          : null,
        genero: userData.informacion_personal?.genero || null,
        estado_civil: userData.informacion_personal?.estado_civil || null,
        // Información académica
        institucion: userData.informacion_academica?.institucion || "",
        titulo: userData.informacion_academica?.titulo || "",
        anio_graduacion: userData.informacion_academica?.anio_graduacion || "",
        especialidad: userData.informacion_academica?.especialidad || "",
        registro_senescyt: userData.informacion_academica?.registro_senescyt || "",
        // Información de contacto
        provincia: userData.informacion_contacto?.provincia || "",
        ciudad: userData.informacion_contacto?.ciudad || "",
        calle_principal: userData.informacion_contacto?.calle_principal || "",
        calle_secundaria: userData.informacion_contacto?.calle_secundaria || "",
        celular: userData.informacion_contacto?.celular || "",
      });
    }
  }, [userData, form]);
  

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Paso 1: Actualizar el usuario principal
      await updateUser(userData.id_usuario, {
        usuario: values.usuario,
        correo: values.correo,
        contraseña: values.contraseña,
        id_rol: values.id_rol,
        ultimo_login: userData.ultimo_login,
        activo: userData.activo,
        estado: userData.estado,
      });

      // Paso 2: Actualizar información personal
      await updateUserPersonalInfo(userData.informacion_personal.id_informacion_personal, {
        cedula: values.cedula,
        nombres: values.nombres,
        apellidos: values.apellidos,
        fecha_nacimiento: values.fecha_nacimiento,
        genero: values.genero,
        estado_civil: values.estado_civil,
      });

      // Paso 3: Actualizar información académica
      await updateUserAcademicInfo(userData.informacion_academica.id_informacion_academica, {
        institucion: values.institucion,
        titulo: values.titulo,
        anio_graduacion: values.anio_graduacion,
        especialidad: values.especialidad,
        registro_senescyt: values.registro_senescyt,
      });

      // Paso 4: Actualizar información de contacto
      await updateUserContactInfo(userData.informacion_contacto.id_informacion_contacto, {
        provincia: values.provincia,
        ciudad: values.ciudad,
        calle_principal: values.calle_principal,
        calle_secundaria: values.calle_secundaria,
        celular: values.celular,
      });

      notification.success({
        message: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente.",
      });
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      notification.error({
        message: "Error",
        description: error.message || "No se pudo actualizar el usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={userData}
      >
        <Divider orientation="left">Información de Usuario</Divider>
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

        <Divider orientation="left">Información Personal</Divider>
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
          <Input type="date" />
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

        <Divider orientation="left">Información Académica</Divider>
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

        <Divider orientation="left">Información de Contacto</Divider>
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Actualizar Usuario
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
