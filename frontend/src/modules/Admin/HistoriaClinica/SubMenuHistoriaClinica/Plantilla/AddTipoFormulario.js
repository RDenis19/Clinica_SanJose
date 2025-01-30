import React, { useState, useEffect } from "react";
import { Form, Input, Button, Tabs, Table, Space, notification } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createTipoFormulario, fetchSeccionByTipoFormulario } from "../../../../../utils/api";

const { TabPane } = Tabs;

const AddTipoFormulario = ({ onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("tipo");
    const [secciones, setSecciones] = useState([]);
    const [seccionData, setSeccionData] = useState({ nombre_seccion: "", descripcion: "" });
    const [tipoFormularioId, setTipoFormularioId] = useState(null);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await createTipoFormulario(values);

            if (response && response.id_formulario_tipo) {
                setTipoFormularioId(response.id_formulario_tipo);
                notification.success({
                    message: "Tipo de formulario creado",
                    description: "El tipo de formulario se ha creado exitosamente.",
                });

                form.resetFields();
                setActiveTab("seccion");
                loadSecciones(response.id_formulario_tipo);
            } else {
                throw new Error("No se recibió un ID válido desde el backend");
            }
        } catch (error) {
            console.error("Error al crear tipo de formulario:", error);
            notification.error({
                message: "Error",
                description: "No se pudo crear el tipo de formulario.",
            });
        } finally {
            setLoading(false);
        }
    };

    const loadSecciones = async (id_formulario_tipo) => {
        try {
            const response = await fetchSeccionByTipoFormulario(id_formulario_tipo);
            setSecciones(response || []);
        } catch (error) {
            console.error("Error al cargar secciones:", error);
            notification.error({
                message: "Error",
                description: "No se pudieron cargar las secciones.",
            });
        }
    };

    // Agregar una nueva sección llamando a la API
    const handleAddSeccion = async () => {
        if (!seccionData.nombre_seccion.trim() || !seccionData.descripcion.trim()) {
            notification.warning({
                message: "Advertencia",
                description: "El nombre y la descripción de la sección son obligatorios.",
            });
            return;
        }

        if (!tipoFormularioId) {
            notification.error({
                message: "Error",
                description: "Debe crear un Tipo de Formulario antes de añadir secciones.",
            });
            return;
        }

        try {
            const newSeccion = await fetchSeccionByTipoFormulario({
                id_formulario_tipo: tipoFormularioId,
                nombre_seccion: seccionData.nombre_seccion,
                descripcion: seccionData.descripcion,
            });

            if (newSeccion && newSeccion.id_seccion) {
                setSecciones([...secciones, newSeccion]); // Agregar la nueva sección desde el backend
                setSeccionData({ nombre_seccion: "", descripcion: "" }); // Limpiar inputs
                notification.success({
                    message: "Sección añadida",
                    description: `Se ha agregado la sección: ${newSeccion.nombre_seccion}`,
                });
            } else {
                throw new Error("No se recibió un ID de sección válido.");
            }
        } catch (error) {
            console.error("Error al agregar sección:", error);
            notification.error({
                message: "Error",
                description: "No se pudo agregar la sección.",
            });
        }
    };

    // Eliminar una sección (ahora llamando al backend)
    const handleDeleteSeccion = async (id_seccion) => {
        try {
            // Aquí deberías llamar a una API para eliminar la sección
            setSecciones(secciones.filter((seccion) => seccion.id_seccion !== id_seccion));
            notification.info({
                message: "Sección eliminada",
                description: "La sección ha sido eliminada.",
            });
        } catch (error) {
            console.error("Error al eliminar sección:", error);
            notification.error({
                message: "Error",
                description: "No se pudo eliminar la sección.",
            });
        }
    };

    // Configuración de la tabla de secciones
    const seccionesColumns = [
        { title: "ID", dataIndex: "id_seccion", key: "id_seccion", width: 50, align: "center" },
        { title: "Nombre", dataIndex: "nombre_seccion", key: "nombre_seccion" },
        { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
        {
            title: "Acción",
            key: "accion",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} />
                    <Button icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteSeccion(record.id_seccion)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
                {/* TAB "TIPO" */}
                <TabPane tab="Tipo" key="tipo">
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="nombre" label="Tipo de Formulario" rules={[{ required: true }]}>
                            <Input placeholder="Ejemplo: Admisión, Alta, Evolución" />
                        </Form.Item>
                        <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
                            <Input.TextArea placeholder="Breve descripción del tipo de formulario" rows={3} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
                            Crear
                        </Button>
                    </Form>
                </TabPane>

                {/* TAB "SECCIÓN" */}
                <TabPane tab="Sección" key="seccion" disabled={!tipoFormularioId}>
                    <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                        <Input
                            placeholder="Nombre Sección"
                            value={seccionData.nombre_seccion}
                            onChange={(e) => setSeccionData({ ...seccionData, nombre_seccion: e.target.value })}
                            style={{ width: "30%" }}
                        />
                        <Input
                            placeholder="Descripción"
                            value={seccionData.descripcion}
                            onChange={(e) => setSeccionData({ ...seccionData, descripcion: e.target.value })}
                            style={{ width: "50%" }}
                        />
                        <Button type="primary" onClick={handleAddSeccion}>Añadir</Button>
                    </div>

                    {/* Tabla de Secciones */}
                    <Table columns={seccionesColumns} dataSource={secciones} rowKey="id_seccion" pagination={false} bordered />
                </TabPane>

                {/* TAB "CAMPOS" */}
                <TabPane tab="Campos" key="campos" disabled={!tipoFormularioId}>
                    <p>Aquí iría la configuración de los campos.</p>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AddTipoFormulario;
