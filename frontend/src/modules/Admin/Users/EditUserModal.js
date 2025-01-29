import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Tabs, DatePicker, Card, Avatar } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { updateUser, updateUserPersonalInfo, updateUserAcademicInfo, updateUserContactInfo, fetchRoles } from "../../../utils/api";

const { Option } = Select;
const { TabPane } = Tabs;

const EditUserModal = ({ visible, onClose, onUserUpdated, userData }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };
    loadRoles();
  }, []);

  useEffect(() => {
    if (userData) {
      form.resetFields();
      form.setFieldsValue({
        usuario: userData.usuario,
        correo: userData.correo,
        contraseña: "",
        id_rol: userData.id_rol,
        ...userData.informacion_personal,
        fecha_nacimiento: userData.informacion_personal?.fecha_nacimiento ? dayjs(userData.informacion_personal.fecha_nacimiento) : null,
        ...userData.informacion_academica,
        ...userData.informacion_contacto,
      });
    }
  }, [userData, form]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleFinish = async (values) => {
    if (!userData) return;
    setLoading(true);
    try {
      const idUsuario = userData.id_usuario;

      await updateUser(idUsuario, { usuario: values.usuario, correo: values.correo, contraseña: values.contraseña ? values.contraseña : userData.contraseña, id_rol: values.id_rol, });

      await updateUserPersonalInfo(userData.informacion_personal?.id, {
        ...values,
        fecha_nacimiento: values.fecha_nacimiento ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD") : null,
      });
      console.log(userData);
      await updateUserAcademicInfo(userData.informacion_academica?.id, values);
      await updateUserContactInfo(userData.informacion_contacto?.id, values);

      onUserUpdated?.();
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} title={null} onCancel={handleCancel} footer={null} width={700} centered>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar size={100} icon={<UserOutlined />} src={userData?.avatar || "/default-avatar.png"} />
        <h2>{userData?.usuario || "Usuario Desconocido"}</h2>
      </div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Usuario" key="1">
            <Card>
              <Form.Item name="usuario" label="Usuario" rules={[{ required: true, message: "Ingrese un usuario." }]}>
                <Input placeholder="Nombre de usuario" />
              </Form.Item>
              <Form.Item name="correo" label="Correo Electrónico" rules={[{ required: true, type: "email", message: "Ingrese un correo válido." }]}>
                <Input placeholder="Correo electrónico" />
              </Form.Item>
              <Form.Item name="contraseña" label="Contraseña">
                <Input.Password prefix={<LockOutlined />} placeholder="Nueva contraseña" />
              </Form.Item>
              <Form.Item name="id_rol" label="Rol" rules={[{ required: true, message: "Seleccione un rol." }]}>
                <Select placeholder="Seleccione un rol">
                  {roles.map((rol) => (
                    <Option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </TabPane>
          <TabPane tab="Personal" key="2">
            <Card>
              <Form.Item name="cedula" label="Cédula">
                <Input placeholder="Número de cédula" />
              </Form.Item>
              <Form.Item name="nombres" label="Nombres">
                <Input placeholder="Nombres completos" />
              </Form.Item>
              <Form.Item name="apellidos" label="Apellidos">
                <Input placeholder="Apellidos completos" />
              </Form.Item>
              <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item name="genero" label="Género">
                <Select placeholder="Seleccione un género">
                  <Option value="M">Masculino</Option>
                  <Option value="F">Femenino</Option>
                  <Option value="O">Otro</Option>
                </Select>
              </Form.Item>
              <Form.Item name="estado_civil" label="Estado Civil">
                <Select placeholder="Seleccione el estado civil">
                  <Option value="SOLTERO">Soltero</Option>
                  <Option value="CASADO">Casado</Option>
                  <Option value="DIVORCIADO">Divorciado</Option>
                  <Option value="VIUDO">Viudo</Option>
                  <Option value="OTRO">Otro</Option>
                </Select>
              </Form.Item>
            </Card>
          </TabPane>
          <TabPane tab="Académica" key="3">
            <Card>
              <Form.Item name="institucion" label="Institución">
                <Input placeholder="Institución educativa" />
              </Form.Item>
              <Form.Item name="titulo" label="Título">
                <Input placeholder="Título académico" />
              </Form.Item>
              <Form.Item name="anio_graduacion" label="Año de Graduación">
                <Input placeholder="Año de graduación" />
              </Form.Item>
              <Form.Item name="especialidad" label="Especialidad">
                <Input placeholder="Especialidad" />
              </Form.Item>
              <Form.Item name="registro_senescyt" label="Registro SENESCYT">
                <Input placeholder="Registro SENESCYT" />
              </Form.Item>
            </Card>
          </TabPane>
          <TabPane tab="Contacto" key="4">
            <Card>
              <Form.Item name="provincia" label="Provincia">
                <Input placeholder="Provincia" />
              </Form.Item>
              <Form.Item name="ciudad" label="Ciudad">
                <Input placeholder="Ciudad" />
              </Form.Item>
              <Form.Item name="calle_principal" label="Calle Principal">
                <Input placeholder="Calle principal" />
              </Form.Item>
              <Form.Item name="calle_secundaria" label="Calle Secundaria">
                <Input placeholder="Calle secundaria" />
              </Form.Item>
              <Form.Item name="celular" label="Celular">
                <Input placeholder="Número de celular" />
              </Form.Item>
            </Card>
          </TabPane>
        </Tabs>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar Cambios
        </Button>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
