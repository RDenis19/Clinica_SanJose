import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin, notification, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchFormularios, deleteFormulario } from "../../../../../utils/api";

const ListaFormularios = ({ onAgregar }) => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // Cargar los formularios desde la API
    const loadFormularios = async () => {
        setLoading(true);
        try {
            const data = await fetchFormularios();
            setFormularios(Array.isArray(data) ? data : []);
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo cargar la lista de formularios." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFormularios();
    }, []);

    // Eliminar un formulario con confirmación
    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteFormulario(id);
            notification.success({ message: "Éxito", description: "El formulario se eliminó correctamente." });
            loadFormularios(); // Recargar la lista después de eliminar
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo eliminar el formulario." });
        } finally {
            setDeletingId(null);
        }
    };

    // Columnas de la tabla
    const columns = [
        { title: "ID", dataIndex: "id_formulario", key: "id_formulario" },
        { title: "Nombre", dataIndex: "nombre", key: "nombre" },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />}>Editar</Button>
                    <Popconfirm
                        title="¿Estás seguro de eliminar este formulario?"
                        okText="Sí"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id_formulario)}
                    >
                        <Button icon={<DeleteOutlined />} danger loading={deletingId === record.id_formulario}>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAgregar} style={{ marginBottom: "20px" }}>
                Agregar
            </Button>

            {loading ? (
                <Spin tip="Cargando formularios..." style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <Table columns={columns} dataSource={formularios} rowKey="id_formulario" pagination={{ pageSize: 10 }} />
            )}
        </div>
    );
};

export default ListaFormularios;
