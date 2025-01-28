import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Space, Popconfirm, notification } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchCamposFormulario,
  deleteCampoFormulario,
} from "../../../../../utils/api"; // Asegúrate de ajustar la ruta
import AddCampoFormulario from "./AddCampoFormulario";
import EditCampoFormulario from "./EditCampoFormulario";

const CamposFormularioList = ({ tipoFormularioId }) => {
  const [campos, setCampos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCampoId, setEditingCampoId] = useState(null);

  // Mover loadCampos fuera de useEffect para evitar reglas de dependencias
  const loadCampos = useCallback(async () => {
    if (!tipoFormularioId) {
      console.warn("tipoFormularioId no proporcionado.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchCamposFormulario(tipoFormularioId); // Llama a la API para obtener los campos
      console.log("Datos recibidos de la API:", data); // Verifica los datos recibidos
      setCampos(Array.isArray(data) ? data : []); // Asegúrate de que los datos sean un array
    } catch (error) {
      console.error("Error al cargar campos:", error);
      notification.error({
        message: "Error",
        description: "No se pudo cargar la lista de campos.",
      });
    } finally {
      setLoading(false);
    }
  }, [tipoFormularioId]);

  useEffect(() => {
    loadCampos();
  }, [loadCampos]); // Agrega loadCampos como dependencia

  const handleDelete = async (id) => {
    try {
      await deleteCampoFormulario(id); // Llama a la API para eliminar un campo
      notification.success({
        message: "Campo eliminado",
        description: "El campo se eliminó correctamente.",
      });
      loadCampos(); // Refresca la lista
    } catch (error) {
      console.error("Error al eliminar campo:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar el campo.",
      });
    }
  };

  const columns = [
    {
      title: "Nombre del Campo",
      dataIndex: "nombre_campo",
      key: "nombre_campo",
    },
    {
      title: "Tipo de Dato",
      dataIndex: "tipo_dato",
      key: "tipo_dato",
    },
    {
      title: "Opciones",
      dataIndex: "opciones",
      key: "opciones",
      render: (text) => text || "N/A",
    },
    {
      title: "Requerido",
      dataIndex: "requerido",
      key: "requerido",
      render: (text) => (text ? "Sí" : "No"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCampoId(record.id_campo);
              setIsEditModalOpen(true);
            }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este campo?"
            onConfirm={() => handleDelete(record.id_campo)}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <h2>Campos del Tipo de Formulario</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar Campo
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={campos}
        rowKey="id_campo"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <AddCampoFormulario
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCampoAdded={loadCampos}
        tipoFormularioId={tipoFormularioId}
      />
      <EditCampoFormulario
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onCampoUpdated={loadCampos}
        campoId={editingCampoId}
      />
    </div>
  );
};

export default CamposFormularioList;
