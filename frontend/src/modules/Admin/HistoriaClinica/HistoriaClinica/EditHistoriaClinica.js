import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateHistoriaClinica } from "../../../../utils/api"; // Ajusta esta ruta

const EditHistoriaClinica = ({ visible, onClose, historia, onHistoriaUpdated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (historia) {
            form.setFieldsValue(historia); // Carga los datos iniciales de la historia clínica
        }
    }, [historia, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await updateHistoriaClinica(historia.nro_archivo, values); // Llama a la API para actualizar la historia clínica
            notification.success({
                message: "Historia clínica actualizada",
                description: "La historia clínica se ha actualizado exitosamente.",
            });
            onHistoriaUpdated(); // Actualiza la lista en el componente principal
            onClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al actualizar historia clínica:", error);
            notification.error({
                message: "Error",
                description: "No se pudo actualizar la historia clínica.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Editar Historia Clínica"
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
                        icon={<EditOutlined />}
                        block
                    >
                        Guardar Cambios
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditHistoriaClinica;
