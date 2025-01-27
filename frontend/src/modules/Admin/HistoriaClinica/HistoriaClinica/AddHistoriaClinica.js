import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createHistoriaClinica } from "../../../../utils/api"; // Ajusta esta ruta

const AddHistoriaClinica = ({ visible, onClose, onHistoriaAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await createHistoriaClinica(values); // Llama a la API para agregar la historia clínica
            notification.success({
                message: "Historia clínica agregada",
                description: "La historia clínica se ha creado exitosamente.",
            });
            onHistoriaAdded(); // Actualiza la lista en el componente principal
            form.resetFields();
            onClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al agregar historia clínica:", error);
            notification.error({
                message: "Error",
                description: "No se pudo agregar la historia clínica.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Agregar Historia Clínica"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="nro_identificacion"
                    label="Identificación del Paciente"
                    rules={[{ required: true, message: "Este campo es obligatorio." }]}
                >
                    <Input placeholder="Número de identificación del paciente" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<PlusOutlined />}
                        block
                    >
                        Crear Historia Clínica
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddHistoriaClinica;
