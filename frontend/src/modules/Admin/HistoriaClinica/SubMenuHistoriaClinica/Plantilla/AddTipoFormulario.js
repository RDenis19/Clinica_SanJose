import React, { useState, useEffect } from "react";
import { Form, Input, Button, Divider, notification } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { createTipoFormulario } from "../../../../../utils/api";
import CamposFormularioList from "./CamposFormularioList";

const AddTipoFormulario = ({ setView }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [tipoFormularioId, setTipoFormularioId] = useState(null);

    useEffect(() => {
        document.getElementById("root").scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const newTipoFormulario = await createTipoFormulario(values);

            notification.success({
                message: "Tipo de formulario creado",
                description: "El tipo de formulario se ha creado exitosamente.",
            });

            setTipoFormularioId(newTipoFormulario.id_formulario_tipo);
            form.resetFields();
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

    return (
        <div style={{ padding: 24 }}>
            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => setView("list")}
                style={{ marginBottom: 16 }}
            >
                Regresar a la Lista
            </Button>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="nombre"
                    label="Nombre del Tipo de Formulario"
                    rules={[{ required: true, message: "Ingrese el nombre del tipo de formulario." }]}>
                    <Input placeholder="Ejemplo: Admisión, Alta, Evolución" />
                </Form.Item>

                <Form.Item
                    name="descripcion"
                    label="Descripción"
                    rules={[{ required: true, message: "Ingrese una descripción." }]}>
                    <Input.TextArea
                        placeholder="Breve descripción del tipo de formulario"
                        rows={3}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                        loading={loading}
                        block
                    >
                        Crear Tipo de Formulario
                    </Button>
                </Form.Item>
            </Form>

            {tipoFormularioId && (
                <>
                    <Divider />
                    <CamposFormularioList tipoFormularioId={tipoFormularioId} />
                </>
            )}
        </div>
    );
};

export default AddTipoFormulario;
