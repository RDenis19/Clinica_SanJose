import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Spin, notification } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchFormularios, deleteFormulario } from "../../../../../utils/api";
import FormularioModal from "./FormularioModal";
import dayjs from "dayjs";

const FormularioList = () => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [editingFormularioId, setEditingFormularioId] = useState(null);

    useEffect(() => {
        loadFormularios();
    }, []);

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

    const columns = [
        { title: "Nombre", dataIndex: "nombre", key: "nombre" },
        { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
        { title: "Fecha de Creación", dataIndex: "fecha_creacion", key: "fecha_creacion", render: (text) => dayjs(text).format("YYYY-MM-DD") },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => {
                        setEditingFormularioId(record.id_formulario);
                        setModalType("edit");
                        setIsModalVisible(true);
                    }} />
                    <Button icon={<DeleteOutlined />} danger loading={deletingId === record.id_formulario} onClick={() => handleDelete(record.id_formulario)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Gestión de Formularios</h1>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <Input 
                    placeholder="Buscar por nombre" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)} 
                    style={{ width: 300, marginRight: 16 }} 
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { 
                    setModalType("add"); 
                    setIsModalVisible(true); 
                }}>
                    Agregar Formulario
                </Button>
            </div>

            {loading ? (
                <Spin tip="Cargando formularios..." style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <Table 
                    columns={columns} 
                    dataSource={formularios.filter((formulario) => formulario.nombre.toLowerCase().includes(searchText.toLowerCase()))} 
                    rowKey="id_formulario" 
                    pagination={{ pageSize: 10 }} 
                />
            )}

            <FormularioModal 
                isVisible={isModalVisible} 
                onClose={() => setIsModalVisible(false)} 
                modalType={modalType} 
                editingFormularioId={editingFormularioId} 
                reloadFormularios={loadFormularios} 
            />
        </div>
    );
};

export default FormularioList;
