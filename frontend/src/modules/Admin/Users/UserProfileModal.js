import React from "react";
import { Modal, Descriptions } from "antd";
import dayjs from "dayjs";

const UserProfileModal = ({ visible, onClose, userData }) => {
  return (
    <Modal
      visible={visible}
      title={`Perfil del Usuario: ${userData?.usuario || "N/A"}`}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions title="Información del Usuario" bordered column={1}>
        <Descriptions.Item label="Usuario">{userData?.usuario || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Correo">{userData?.correo || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Registro">
          {userData?.fecha_registro
            ? dayjs(userData.fecha_registro).format("YYYY-MM-DD HH:mm:ss")
            : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Último Login">
          {userData?.ultimo_login
            ? dayjs(userData.ultimo_login).format("YYYY-MM-DD HH:mm:ss")
            : "Sin dato"}
        </Descriptions.Item>
        <Descriptions.Item label="Estado">
          {userData?.estado === "activo" ? "🟢 Activo" : "🔴 Inactivo"}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Información Personal" bordered column={1}>
        <Descriptions.Item label="Cédula">
          {userData?.informacion_personal?.cedula || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Nombres">
          {userData?.informacion_personal?.nombres || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Apellidos">
          {userData?.informacion_personal?.apellidos || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Nacimiento">
          {userData?.informacion_personal?.fecha_nacimiento
            ? dayjs(userData.informacion_personal.fecha_nacimiento).format(
                "YYYY-MM-DD"
              )
            : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Género">
          {userData?.informacion_personal?.genero || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Estado Civil">
          {userData?.informacion_personal?.estado_civil || "N/A"}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Información Académica" bordered column={1}>
        <Descriptions.Item label="Institución">
          {userData?.informacion_academica?.institucion || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Título">
          {userData?.informacion_academica?.titulo || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Año de Graduación">
          {userData?.informacion_academica?.anio_graduacion || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Especialidad">
          {userData?.informacion_academica?.especialidad || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Registro SENESCYT">
          {userData?.informacion_academica?.registro_senescyt || "N/A"}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Información de Contacto" bordered column={1}>
        <Descriptions.Item label="Provincia">
          {userData?.informacion_contacto?.provincia || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Ciudad">
          {userData?.informacion_contacto?.ciudad || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Calle Principal">
          {userData?.informacion_contacto?.calle_principal || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Calle Secundaria">
          {userData?.informacion_contacto?.calle_secundaria || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Celular">
          {userData?.informacion_contacto?.celular || "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserProfileModal;
