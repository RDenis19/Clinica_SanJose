import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Spin, notification, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchTiposFormulario, deleteTipoFormulario } from "../../../../../utils/api";
import AddTipoFormulario from "./AddTipoFormulario";
import EditTipoFormulario from "./EditTipoFormulario";
import dayjs from "dayjs";

const TipoFormularioList = () => {
    const [tipoFormularios, setTipoFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    // Control de visibilidad del Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null); // 'add' o 'edit'
    const [editingTipoFormularioId, setEditingTipoFormularioId] = useState(null);

    useEffect(() => {
        loadTipoFormularios();
    }, []);

    // Cargar formularios desde la API
    const loadTipoFormularios = async () => {
        setLoading(true);
        try {
            const data = await fetchTiposFormulario();
            setTipoFormularios(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar los formularios:", error);
            notification.error({
                message: "Error",
                description: "No se pudo cargar la lista de formularios.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un formulario
    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteTipoFormulario(id);
            notification.success({
                message: "Éxito",
                description: "La plantilla se eliminó correctamente.",
            });
            loadTipoFormularios();
        } catch (error) {
            console.error("Error al eliminar la plantilla:", error);
            notification.error({
                message: "Error",
                description: "No se pudo eliminar la plantilla.",
            });
        } finally {
            setDeletingId(null);
        }
    };

    // Configuración de las columnas de la tabla
    const columns = [
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
                            setModalType("edit");
                            setIsModalVisible(true);
                        }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        loading={deletingId === record.id_formulario_tipo}
                        onClick={() => handleDelete(record.id_formulario_tipo)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            {/* Encabezado */}
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
                    onClick={() => {
                        setModalType("add");
                        setIsModalVisible(true);
                    }}
                >
                Agregar Plantilla
                </Button>
            </div>

            {/* Tabla de formularios */}
            {loading ? (
                <Spin tip="Cargando formularios..." style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <Table
                    columns={columns}
                    dataSource={tipoFormularios.filter((formulario) =>
                        formulario.nombre.toLowerCase().includes(searchText.toLowerCase())
                    )}
                    rowKey="id_formulario_tipo"
                    pagination={{ pageSize: 10 }}
                />
            )}

            {/* Modal para Agregar/Editar */}
            <Modal
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                closable={true}
                centered
                width={900}
            >
                {modalType === "edit" ? (
                    <EditTipoFormulario
                        tipoFormularioId={editingTipoFormularioId}
                        onClose={() => {
                            setIsModalVisible(false);
                            loadTipoFormularios();
                        }}
                    />
                ) : (
                    <AddTipoFormulario
                        onClose={() => {
                            setIsModalVisible(false);
                            loadTipoFormularios();
                        }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default TipoFormularioList;
