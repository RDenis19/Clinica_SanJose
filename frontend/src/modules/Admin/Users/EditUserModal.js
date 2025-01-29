import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Tabs, notification, DatePicker, Card, Divider } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BookOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { updateUser, createUserPersonalInfo, updateUserPersonalInfo, createUserAcademicInfo, updateUserAcademicInfo, createUserContactInfo, updateUserContactInfo, fetchRoles } from "../../../utils/api";

const { Option } = Select;
const { TabPane } = Tabs;

const EditUserModal = ({ visible, onClose, onUserUpdated, userData }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar roles (si se desea cambiar el rol)
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "No se pudieron cargar los roles.",
        });
      }
    };
    loadRoles();
  }, []);

  // Prellenar formulario cuando llega userData
  useEffect(() => {
    if (userData) {
      form.resetFields();
      const { informacion_personal, informacion_academica, informacion_contacto } = userData;

      form.setFieldsValue({
        // Datos básicos
        usuario: userData.usuario,
        correo: userData.correo,
        contraseña: "", // Para no mostrar la real
        id_rol: userData.id_rol,

        // Info personal
        cedula: informacion_personal?.cedula || "",
        nombres: informacion_personal?.nombres || "",
        apellidos: informacion_personal?.apellidos || "",
        fecha_nacimiento: informacion_personal?.fecha_nacimiento
          ? dayjs(informacion_personal.fecha_nacimiento)
          : null,
        genero: informacion_personal?.genero || null,
        estado_civil: informacion_personal?.estado_civil || null,

        // Info académica
        institucion: informacion_academica?.institucion || "",
        titulo: informacion_academica?.titulo || "",
        anio_graduacion: informacion_academica?.anio_graduacion || "",
        especialidad: informacion_academica?.especialidad || "",
        registro_senescyt: informacion_academica?.registro_senescyt || "",

        // Info contacto
        provincia: informacion_contacto?.provincia || "",
        ciudad: informacion_contacto?.ciudad || "",
        calle_principal: informacion_contacto?.calle_principal || "",
        calle_secundaria: informacion_contacto?.calle_secundaria || "",
        celular: informacion_contacto?.celular || "",
      });
    }
  }, [userData, form]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  // Guardar cambios (editar usuario)
  const handleFinish = async (values) => {
    if (!userData) return;

    setLoading(true);
    try {
      const idUsuario = userData.id_usuario;

      // 1) Actualizar tabla "usuario"
      // Si la contraseña queda vacía, puede que el backend falle.
      // Ajusta según tu lógica: si está vacía => usar la anterior, o no actualizarla.
      await updateUser(idUsuario, {
        usuario: values.usuario,
        correo: values.correo,
        contraseña: values.contraseña, // O haz merge con userData.contraseña
        id_rol: values.id_rol,
      });

      // 2) Información Personal
      const personalExists = userData.informacion_personal;
      if (personalExists) {
        // Validaciones por si el usuario borra campos obligatorios ya existentes
        if (personalExists.cedula && !values.cedula) {
          throw new Error("No puede dejar la cédula vacía (existía un valor).");
        }
        if (personalExists.nombres && !values.nombres) {
          throw new Error("No puede dejar los nombres vacíos (existía un valor).");
        }
        if (personalExists.apellidos && !values.apellidos) {
          throw new Error("No puede dejar los apellidos vacíos (existía un valor).");
        }

        // Fusión (si se vacía, vuelve a usar el valor viejo)
        const updatedPersonalData = {
          cedula: values.cedula || personalExists.cedula,
          nombres: values.nombres || personalExists.nombres,
          apellidos: values.apellidos || personalExists.apellidos,
          fecha_nacimiento: values.fecha_nacimiento
            ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD")
            : personalExists.fecha_nacimiento,
          genero: values.genero || personalExists.genero,
          estado_civil: values.estado_civil || personalExists.estado_civil,
        };

        await updateUserPersonalInfo(
          personalExists.id_informacion_personal,
          updatedPersonalData
        );
      } else {
        // Crear info personal si no existía
        await createUserPersonalInfo({
          id_usuario: idUsuario,
          cedula: values.cedula,
          nombres: values.nombres,
          apellidos: values.apellidos,
          fecha_nacimiento: values.fecha_nacimiento
            ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD")
            : null,
          genero: values.genero,
          estado_civil: values.estado_civil,
        });
      }

      // 3) Información Académica
      const academicExists = userData.informacion_academica;
      if (academicExists) {
        const updatedAcademicData = {
          institucion: values.institucion || academicExists.institucion,
          titulo: values.titulo || academicExists.titulo,
          anio_graduacion: values.anio_graduacion || academicExists.anio_graduacion,
          especialidad: values.especialidad || academicExists.especialidad,
          registro_senescyt: values.registro_senescyt || academicExists.registro_senescyt,
        };
        await updateUserAcademicInfo(academicExists.id_informacion_academica, updatedAcademicData);
      } else {
        // Crear si no existía
        await createUserAcademicInfo({
          id_usuario: idUsuario,
          institucion: values.institucion,
          titulo: values.titulo,
          anio_graduacion: values.anio_graduacion,
          especialidad: values.especialidad,
          registro_senescyt: values.registro_senescyt,
        });
      }

      // 4) Información de Contacto
      const contactExists = userData.informacion_contacto;
      if (contactExists) {
        const updatedContactData = {
          provincia: values.provincia || contactExists.provincia,
          ciudad: values.ciudad || contactExists.ciudad,
          calle_principal: values.calle_principal || contactExists.calle_principal,
          calle_secundaria: values.calle_secundaria || contactExists.calle_secundaria,
          celular: values.celular || contactExists.celular,
        };
        await updateUserContactInfo(contactExists.id_informacion_contacto, updatedContactData);
      } else {
        await createUserContactInfo({
          id_usuario: idUsuario,
          provincia: values.provincia,
          ciudad: values.ciudad,
          calle_principal: values.calle_principal,
          calle_secundaria: values.calle_secundaria,
          celular: values.celular,
        });
      }

      notification.success({
        message: "Usuario actualizado",
        description: "Los datos se han guardado correctamente.",
      });

      form.resetFields();
      onClose();
      if (onUserUpdated) onUserUpdated();

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
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Tabs defaultActiveKey="1">
          {/* ======== DATOS BÁSICOS ======== */}
          <TabPane tab="Datos Básicos" key="1">
            <Card>
              <Form.Item
                name="usuario"
                label="Usuario"
                rules={[{ required: true, message: "Ingrese un usuario." }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
              </Form.Item>
              <Form.Item
                name="correo"
                label="Correo Electrónico"
                rules={[{ required: true, type: "email", message: "Ingrese un correo válido." }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Correo electrónico" />
              </Form.Item>
              <Form.Item
                name="contraseña"
                label="Contraseña"
                tooltip="Si no deseas cambiarla, deja este campo vacío."
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Nueva contraseña" />
              </Form.Item>
              <Form.Item
                name="id_rol"
                label="Rol"
                rules={[{ required: true, message: "Seleccione un rol." }]}
              >
                <Select placeholder="Seleccione un rol">
                  {roles.map((rol) => (
                    <Option key={rol.id_rol} value={rol.id_rol}>
                      {rol.nombre_rol}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </TabPane>

          {/* ======== INFORMACIÓN PERSONAL ======== */}
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
                <DatePicker style={{ width: "100%" }} />
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

          {/* ======== INFORMACIÓN ACADÉMICA ======== */}
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

          {/* ======== INFORMACIÓN DE CONTACTO ======== */}
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
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar Cambios
        </Button>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
