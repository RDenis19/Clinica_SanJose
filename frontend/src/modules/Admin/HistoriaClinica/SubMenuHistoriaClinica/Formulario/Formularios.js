import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin, notification, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchFormularios, deleteFormulario } from "../../../../../utils/api";
import dayjs from "dayjs";
import EditarFormularioModal from "./EditarFormularioModal"; // Importar el nuevo componente

const ListaFormularios = ({ onAgregar }) => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [isEditarModalVisible, setIsEditarModalVisible] = useState(false);
    const [formularioAEditar, setFormularioAEditar] = useState(null);

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

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteFormulario(id);
            notification.success({ message: "Éxito", description: "El formulario se eliminó correctamente." });
            loadFormularios();
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo eliminar el formulario." });
        } finally {
            setDeletingId(null);
        }
    };

    const handleEditar = (formulario) => {
        setFormularioAEditar(formulario);
        setIsEditarModalVisible(true);
    };

    const handleCerrarEditarModal = () => {
        setIsEditarModalVisible(false);
        setFormularioAEditar(null);
        loadFormularios();
    };

    const columns = [
        { title: "Nombre del Formulario", dataIndex: "nombre_tipo_formulario", key: "nombre_tipo_formulario" },
        { title: "Cédula del Paciente", dataIndex: "cedula_paciente", key: "cedula_paciente" },
        { title: "Usuario Creador", dataIndex: "nombre_creador", key: "nombre_creador" },
        {
            title: "Fecha de Creación",
            dataIndex: "fecha_creacion",
            key: "fecha_creacion",
            render: (fecha) => dayjs(fecha).format("YYYY-MM-DD HH:mm:ss")
        },
        { title: "Estado", dataIndex: "estado", key: "estado" },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEditar(record)}>
                        Editar
                    </Button>
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

            {/* Modal para editar formulario */}
            {formularioAEditar && (
                <EditarFormularioModal
                    visible={isEditarModalVisible}
                    onClose={handleCerrarEditarModal}
                    formulario={formularioAEditar}
                />
            )}
        </div>
    );
};

export default ListaFormularios;
