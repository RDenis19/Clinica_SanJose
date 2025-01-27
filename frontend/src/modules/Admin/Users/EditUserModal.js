import React, { useState } from "react";
import { Modal, Form, Input, Button, notification, Tabs, DatePicker, Select } from "antd";
import {
  updateUser,
  updateUserContactInfo,
  updateUserAcademicInfo,
  updateUserPersonalInfo,
} from "../../../utils/api";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { Option } = Select;

const EditUserModal = ({ visible, onClose, userData, onUserUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
  
      const activo = values.activo === true || values.activo === 1 ? 1 : 0;
  
      // Actualizar Usuario
      await updateUser(userData.id_usuario, {
        usuario: values.usuario,
        correo: values.correo,
        contraseña: values.contraseña,
        id_rol: values.id_rol,
        activo,
        estado: values.estado || "activo",
      });
  
      // Actualizar Información Personal
      if (userData.informacion_personal?.id) {
        await updateUserPersonalInfo(userData.informacion_personal.id, {
          cedula: values.cedula,
          nombres: values.nombres,
          apellidos: values.apellidos,
          fecha_nacimiento: values.fecha_nacimiento,
          genero: values.genero,
          estado_civil: values.estado_civil,
        });
      } else {
        console.error("id_informacion_personal no definido.");
        throw new Error("El ID de la información personal es undefined.");
      }
  
      // Actualizar Información Académica
      await updateUserAcademicInfo(userData.informacion_academica.id, {
        institucion: values.institucion,
        titulo: values.titulo,
        anio_graduacion: values.anio_graduacion,
        especialidad: values.especialidad,
        registro_senescyt: values.registro_senescyt,
      });
  
      // Actualizar Información de Contacto
      await updateUserContactInfo(userData.informacion_contacto.id, {
        provincia: values.provincia,
        ciudad: values.ciudad,
        calle_principal: values.calle_principal,
        calle_secundaria: values.calle_secundaria,
        celular: values.celular,
      });
  
      notification.success({ message: "Usuario actualizado correctamente" });
      onUserUpdated();
      onClose();
    } catch (error) {
      notification.error({ message: "Error al actualizar el usuario" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Editar Usuario"
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          usuario: userData?.usuario || "",
          correo: userData?.correo || "",
          contraseña: userData?.contraseña || "",
          id_rol: userData?.id_rol ? String(userData.id_rol) : "",
          activo: userData?.activo ?? true,
          cedula: userData?.informacion_personal?.cedula || "",
          nombres: userData?.informacion_personal?.nombres || "",
          apellidos: userData?.informacion_personal?.apellidos || "",
          fecha_nacimiento: userData?.informacion_personal?.fecha_nacimiento
            ? dayjs(userData.informacion_personal.fecha_nacimiento)
            : null,
          genero: userData?.informacion_personal?.genero || "",
          estado_civil: userData?.informacion_personal?.estado_civil || "",
          institucion: userData?.informacion_academica?.institucion || "",
          titulo: userData?.informacion_academica?.titulo || "",
          anio_graduacion: userData?.informacion_academica?.anio_graduacion || "",
          especialidad: userData?.informacion_academica?.especialidad || "",
          registro_senescyt: userData?.informacion_academica?.registro_senescyt || "",
          provincia: userData?.informacion_contacto?.provincia || "",
          ciudad: userData?.informacion_contacto?.ciudad || "",
          calle_principal: userData?.informacion_contacto?.calle_principal || "",
          calle_secundaria: userData?.informacion_contacto?.calle_secundaria || "",
          celular: userData?.informacion_contacto?.celular || "",
        }}
        onFinish={handleSubmit}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Información de Usuario" key="1">
            <Form.Item name="usuario" label="Usuario" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="correo" label="Correo" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contraseña" label="Contraseña" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="id_rol" label="Rol" rules={[{ required: true }]}>
              <Select>
                <Option value="1">Administrador</Option>
                <Option value="2">Doctor</Option>
                <Option value="3">Enfermera</Option>
              </Select>
            </Form.Item>
            <Form.Item name="activo" label="Activo" rules={[{ required: true }]}>
              <Select>
                <Option value={1}>Sí</Option>
                <Option value={0}>No</Option>
              </Select>
            </Form.Item>
          </TabPane>

          <TabPane tab="Información Personal" key="2">
            <Form.Item name="cedula" label="Cédula" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nombres" label="Nombres" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="apellidos" label="Apellidos" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="genero" label="Género">
              <Select>
                <Option value="M">Masculino</Option>
                <Option value="F">Femenino</Option>
                <Option value="O">Otro</Option>
              </Select>
            </Form.Item>
            <Form.Item name="estado_civil" label="Estado Civil">
              <Select>
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
              <Input />
            </Form.Item>
            <Form.Item name="titulo" label="Título">
              <Input />
            </Form.Item>
            <Form.Item name="anio_graduacion" label="Año de Graduación">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="especialidad" label="Especialidad">
              <Input />
            </Form.Item>
            <Form.Item name="registro_senescyt" label="Registro SENESCYT">
              <Input />
            </Form.Item>
          </TabPane>

          <TabPane tab="Información de Contacto" key="4">
            <Form.Item name="provincia" label="Provincia" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="ciudad" label="Ciudad" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="calle_principal" label="Calle Principal" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="calle_secundaria" label="Calle Secundaria" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="celular" label="Celular" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
