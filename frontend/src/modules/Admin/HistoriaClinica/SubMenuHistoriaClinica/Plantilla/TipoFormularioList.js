  import React, { useEffect, useState } from "react";
  import { Table, Button, Space, Popconfirm, notification, Input, Spin } from "antd";
  import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
  import {
    fetchTiposFormulario,
    deleteTipoFormulario,
  } from "../../../../../utils/api"; // Ajusta la ruta
  import AddTipoFormulario from "./AddTipoFormulario";
  import EditTipoFormulario from "./EditTipoFormulario";
  import dayjs from "dayjs";

  const TipoFormularioList = () => {
    const [tipoFormularios, setTipoFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTipoFormularioId, setEditingTipoFormularioId] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
      loadTipoFormularios();
    }, []);
    
    const loadTipoFormularios = async () => {
      setLoading(true);
      try {
        const data = await fetchTiposFormulario();
        setTipoFormularios(Array.isArray(data) ? data : []); // Asegúrate de que los datos sean un array
      } catch (error) {
        console.error("Error al cargar tipos de formularios:", error);
        notification.error({
          message: "Error",
          description: "No se pudo cargar la lista de tipos de formularios.",
        });
      } finally {
        setLoading(false);
      }
    };
    

    const handleDelete = async (id) => {
      setDeletingId(id);
      try {
        await deleteTipoFormulario(id);
        notification.success({
          message: "Tipo de formulario eliminado",
          description: "El tipo de formulario se eliminó correctamente.",
        });
        loadTipoFormularios();
      } catch (error) {
        console.error("Error al eliminar tipo de formulario:", error);
        notification.error({
          message: "Error",
          description: "No se pudo eliminar el tipo de formulario.",
        });
      } finally {
        setDeletingId(null);
      }
    };

    const filteredData = tipoFormularios.filter((formulario) =>
      formulario.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
      {
        title: "ID",
        dataIndex: "id_formulario_tipo",
        key: "id_formulario_tipo",
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Descripción",
        dataIndex: "descripcion",
        key: "descripcion",
      },
      {
        title: "Fecha de Creación",
        dataIndex: "fecha_creacion",
        key: "fecha_creacion",
        render: (text) => dayjs(text).format("YYYY-MM-DD"),
      },
      {
        title: "Acciones",
        key: "acciones",
        render: (_, record) => (
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditingTipoFormularioId(record.id_formulario_tipo);
                setIsEditModalOpen(true);
              }}
            />
            <Popconfirm
              title="¿Estás seguro de eliminar este tipo de formulario?"
              onConfirm={() => handleDelete(record.id_formulario_tipo)}
              okText="Sí"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                danger
                loading={deletingId === record.id_formulario_tipo}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
          <h1>Lista de Tipos de Formularios</h1>
          <Input
            placeholder="Buscar por nombre"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300, marginRight: 16 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Agregar Tipo de Formulario
          </Button>
        </div>
        {loading ? (
          <Spin tip="Cargando tipos de formularios..." style={{ display: "block", margin: "20px auto" }} />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id_formulario_tipo"
            pagination={{ pageSize: 10 }}
          />
        )}
        <AddTipoFormulario
          visible={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onTipoFormularioAdded={loadTipoFormularios}
        />
        <EditTipoFormulario
          visible={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onTipoFormularioUpdated={loadTipoFormularios}
          tipoFormularioId={editingTipoFormularioId}
        />
      </div>
    );
  };

  export default TipoFormularioList;
