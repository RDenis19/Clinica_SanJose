import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Tabs, notification, DatePicker, Card, Divider } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BookOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  createUser,
  createUserPersonalInfo,
  createUserAcademicInfo,
  createUserContactInfo,
  fetchRoles,
} from "../../../utils/api";

const { Option } = Select;
const { TabPane } = Tabs;

const AddUserModal = ({ visible, onClose, onUserAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al obtener roles:", error);
        notification.error({
          message: "Error",
          description: "No se pudieron cargar los roles disponibles.",
        });
      }
    };
    loadRoles();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Crear usuario principal
      const userData = {
        usuario: values.usuario,
        correo: values.correo,
        contraseña: values.contraseña,
        id_rol: values.id_rol,
      };
      const newUser = await createUser(userData);
      const userId = newUser.id_usuario;

      // Guardar Información Personal
      if (values.cedula || values.nombres || values.apellidos) {
        await createUserPersonalInfo({
          id_usuario: userId,
          cedula: values.cedula,
          nombres: values.nombres,
          apellidos: values.apellidos,
          fecha_nacimiento: values.fecha_nacimiento ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD") : null,
          genero: values.genero,
          estado_civil: values.estado_civil,
        });
      }

      // Guardar Información Académica
      if (values.institucion || values.titulo || values.anio_graduacion) {
        await createUserAcademicInfo({
          id_usuario: userId,
          institucion: values.institucion,
          titulo: values.titulo,
          anio_graduacion: values.anio_graduacion,
          especialidad: values.especialidad,
          registro_senescyt: values.registro_senescyt,
        });
      }

      // Guardar Información de Contacto
      if (values.provincia || values.ciudad || values.calle_principal) {
        await createUserContactInfo({
          id_usuario: userId,
          provincia: values.provincia,
          ciudad: values.ciudad,
          calle_principal: values.calle_principal,
          calle_secundaria: values.calle_secundaria,
          celular: values.celular,
        });
      }

      notification.success({
        message: "Usuario agregado",
        description: "El usuario y su información se han guardado exitosamente.",
      });

      onUserAdded();
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      notification.error({
        message: "Error",
        description: error.message || "No se pudo crear el usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Agregar Usuario" visible={visible} onCancel={onClose} footer={null} width={700}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Tabs defaultActiveKey="1" tabPosition="top">
          {/* DATOS BÁSICOS */}
          <TabPane tab="Datos Básicos" key="1">
            <Card>
              <Form.Item name="usuario" label="Usuario" rules={[{ required: true, message: "Ingrese un usuario." }]}>
                <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
              </Form.Item>
              <Form.Item name="correo" label="Correo Electrónico" rules={[{ required: true, type: "email", message: "Ingrese un correo válido." }]}>
                <Input prefix={<MailOutlined />} placeholder="Correo electrónico" />
              </Form.Item>
              <Form.Item name="contraseña" label="Contraseña" rules={[{ required: true, message: "Ingrese una contraseña." }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
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

          {/* INFORMACIÓN PERSONAL */}
          <TabPane tab="Información Personal" key="2">
            <Card>
              <Form.Item name="cedula" label="Cédula">
                <Input prefix={<IdcardOutlined />} placeholder="Número de cédula" />
              </Form.Item>
              <Form.Item name="nombres" label="Nombres">
                <Input prefix={<UserOutlined />} placeholder="Nombres completos" />
              </Form.Item>
              <Form.Item name="apellidos" label="Apellidos">
                <Input prefix={<UserOutlined />} placeholder="Apellidos completos" />
              </Form.Item>
              <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento">
                <DatePicker style={{ width: "100%" }} prefix={<CalendarOutlined />} />
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

          {/* INFORMACIÓN ACADÉMICA */}
          <TabPane tab="Información Académica" key="3">
            <Card>
              <Form.Item name="institucion" label="Institución">
                <Input prefix={<BookOutlined />} placeholder="Institución educativa" />
              </Form.Item>
              <Form.Item name="titulo" label="Título">
                <Input placeholder="Título académico" />
              </Form.Item>
              <Form.Item name="anio_graduacion" label="Año de Graduación">
                <Input placeholder="2020" maxLength={4} />
              </Form.Item>
              <Form.Item name="especialidad" label="Especialidad">
                <Input placeholder="Especialidad médica" />
              </Form.Item>
              <Form.Item name="registro_senescyt" label="Registro SENESCYT">
                <Input placeholder="Registro SENESCYT" />
              </Form.Item>
            </Card>
          </TabPane>

          {/* INFORMACIÓN DE CONTACTO */}
          <TabPane tab="Información de Contacto" key="4">
            <Card>
              <Form.Item name="provincia" label="Provincia">
                <Input prefix={<HomeOutlined />} placeholder="Provincia" />
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
                <Input prefix={<PhoneOutlined />} placeholder="Número de celular" />
              </Form.Item>
            </Card>
          </TabPane>
        </Tabs>

        <Divider />
        <Button type="primary" htmlType="submit" loading={loading} block>Guardar Usuario</Button>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
