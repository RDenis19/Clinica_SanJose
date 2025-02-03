// VerFormularioModal.js
import React from "react";
import { Modal, Button } from "antd";
import dayjs from "dayjs";

const VerFormularioModal = ({ visible, onClose, formulario }) => {
  return (
    <Modal
      title="Ver Formulario"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cerrar" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
    >
      {formulario ? (
        <>
          <p>
            <strong>Nombre del Formulario:</strong> {formulario.nombre_tipo_formulario}
          </p>
          <p>
            <strong>Cédula del Paciente:</strong> {formulario.cedula_paciente}
          </p>
          <p>
            <strong>Usuario Creador:</strong> {formulario.nombre_creador}
          </p>
          <p>
            <strong>Fecha de Creación:</strong>{" "}
            {dayjs(formulario.fecha_creacion).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <p>
            <strong>Estado:</strong> {formulario.estado}
          </p>
        </>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </Modal>
  );
};

export default VerFormularioModal;
