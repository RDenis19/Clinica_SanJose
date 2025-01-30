import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Spin, notification } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchTiposFormulario, deleteTipoFormulario } from "../../../../../utils/api";
import AddTipoFormulario from "./AddTipoFormulario";
import EditTipoFormulario from "./EditTipoFormulario";
import dayjs from "dayjs";

const TipoFormularioList = () => {
    const [view, setView] = useState("list");
    const [tipoFormularios, setTipoFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingTipoFormularioId, setEditingTipoFormularioId] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (view === "list") {
            loadTipoFormularios();
        }
    }, [view]);

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

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteTipoFormulario(id);
            notification.success({
                message: "Exito",
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
                            setView("edit");
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

    if (view === "add") {
        return <AddTipoFormulario setView={setView} />;
    }

    if (view === "edit" && editingTipoFormularioId) {
        return <EditTipoFormulario setView={setView} tipoFormularioId={editingTipoFormularioId} />;
    }

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
                    onClick={() => setView("add")}
                >
                    Agregar Plantilla
                </Button>
            </div>
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
        </div>
    );
};

export default TipoFormularioList;
