// src/components/EditarFormularioModal.jsx

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Spin, notification, Select, DatePicker } from "antd";
import { 
    fetchSeccionByTipoFormulario, 
    fetchSeccionByTipoFormularioYSeccion, 
    editarRespuestaCampo,
    fetchFormularioRespuestabyId // Asegúrate de importar correctamente la función
} from "../../../../../utils/api";
import dayjs from "dayjs";

const { Option } = Select;

const EditarFormularioModal = ({ visible, onClose, formulario }) => { // Recibe el objeto 'formulario'
    const [form] = Form.useForm();
    const [secciones, setSecciones] = useState([]);
    const [campos, setCampos] = useState([]);
    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const [loadingSecciones, setLoadingSecciones] = useState(false);
    const [loadingCampos, setLoadingCampos] = useState(false);
    const [loadingGuardar, setLoadingGuardar] = useState(false);
    const [currentCampoIndex, setCurrentCampoIndex] = useState(0); // Para seguimiento del progreso

    // Cargar secciones cuando el modal se abre
    useEffect(() => {
        if (!visible || !formulario) return;

        const loadSecciones = async () => {
            setLoadingSecciones(true);
            try {
                const data = await fetchSeccionByTipoFormulario(formulario.id_formulario_tipo);
                console.log("Secciones cargadas:", data); // Log para depuración
                const seccionesArray = Array.isArray(data) ? data : [data]; // Asegúrate de que sea un array
                setSecciones(seccionesArray);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar las secciones." });
            } finally {
                setLoadingSecciones(false);
            }
        };

        loadSecciones();
    }, [visible, formulario]);

    // Cargar campos y sus respuestas cuando se selecciona una sección
    useEffect(() => {
        const loadCamposYRespuestas = async () => {
            if (!selectedSeccion || !formulario) return;
            setLoadingCampos(true);
            try {
                // Obtener los campos de la sección seleccionada
                const dataCampos = await fetchSeccionByTipoFormularioYSeccion(formulario.id_formulario_tipo, selectedSeccion);
                console.log("Campos cargados:", dataCampos); // Log para depuración
                const camposArray = Array.isArray(dataCampos) ? dataCampos : [dataCampos];
                setCampos(camposArray);

                // Obtener las respuestas actuales para cada campo
                const respuestasPromises = camposArray.map(campo => 
                    fetchFormularioRespuestabyId(formulario.id_formulario, campo.id_campo)
                        .then(response => {
                            console.log(`Respuesta para campo ${campo.id_campo}:`, response); // Log para depuración
                            return { id_campo: campo.id_campo, valor: response.valor };
                        })
                        .catch(error => {
                            console.error(`Error al obtener la respuesta para el campo ${campo.id_campo}:`, error);
                            return { id_campo: campo.id_campo, valor: "" }; // Valor por defecto en caso de error
                        })
                );

                const respuestas = await Promise.all(respuestasPromises);
                console.log("Respuestas obtenidas:", respuestas); // Log para depuración

                // Crear un mapa de respuestas para acceso rápido
                const respuestasMap = {};
                respuestas.forEach(respuesta => {
                    respuestasMap[respuesta.id_campo] = respuesta.valor;
                });

                // Crear los valores iniciales para el formulario
                const initialValues = {};
                camposArray.forEach(campo => {
                    let valor = respuestasMap[campo.id_campo];
                    if (campo.tipo_dato.toLowerCase() === "date" && valor) {
                        valor = dayjs(valor); // Convertir a objeto dayjs para DatePicker
                    }
                    initialValues[`campo_${campo.id_campo}`] = valor || "";
                });

                console.log("Valores iniciales para el formulario:", initialValues); // Log para depuración

                // Establecer los valores iniciales en el formulario
                form.setFieldsValue(initialValues);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar los campos y respuestas de la sección." });
            } finally {
                setLoadingCampos(false);
            }
        };

        loadCamposYRespuestas();
    }, [selectedSeccion, formulario, form]);

    // Manejar el cambio de selección de sección
    const handleSelectSeccion = (value) => {
        setSelectedSeccion(value);
    };

    // Manejar el envío del formulario
    const handleGuardar = async (values) => {
        setLoadingGuardar(true);
        setCurrentCampoIndex(0); // Reiniciar el índice al iniciar
        try {
            for (let i = 0; i < campos.length; i++) {
                const campo = campos[i];
                let valor = values[`campo_${campo.id_campo}`];

                // Si el campo es de tipo fecha, formatear el valor
                if (campo.tipo_dato.toLowerCase() === "date" && valor) {
                    valor = valor.format('YYYY-MM-DD');
                }

                // Actualizar el estado del campo actual
                setCurrentCampoIndex(i + 1);

                await editarRespuestaCampo({
                    id_formulario: formulario.id_formulario, // Usar id_formulario
                    id_campo: campo.id_campo,
                    valor,
                });

                // Opcional: Puedes agregar una pequeña pausa para evitar sobrecargar el servidor
                // await new Promise(resolve => setTimeout(resolve, 100)); // 100 ms de pausa
            }

            notification.success({ message: "Éxito", description: "El formulario se actualizó correctamente." });
            onClose(); // Cerrar el modal después de guardar
        } catch (error) {
            console.error("Error al guardar las respuestas:", error); // Log para depuración
            notification.error({ message: "Error", description: "No se pudieron actualizar todas las respuestas." });
        } finally {
            setLoadingGuardar(false);
            setCurrentCampoIndex(0); // Reiniciar el índice después de finalizar
        }
    };

    // Resetear el formulario y el estado cuando el modal se cierra
    useEffect(() => {
        if (!visible) {
            form.resetFields();
            setSecciones([]);
            setCampos([]);
            setSelectedSeccion(null);
            setCurrentCampoIndex(0);
        }
    }, [visible, form]);

    return (
        <Modal
            visible={visible}
            title="Editar Formulario"
            onCancel={onClose}
            footer={null}
            width={800}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleGuardar}>
                {/* Selección de Sección */}
                <Form.Item
                    label="Seleccionar Sección"
                    name="seccion"
                    rules={[{ required: true, message: "Por favor, selecciona una sección." }]}
                >
                    {loadingSecciones ? (
                        <Spin />
                    ) : (
                        <Select placeholder="Selecciona una sección" onChange={handleSelectSeccion} allowClear>
                            {secciones.map(seccion => (
                                <Option key={seccion.id_seccion} value={seccion.id_seccion}>
                                    {seccion.nombre_seccion}
                                </Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>

                {/* Campos de la Sección Seleccionada */}
                {selectedSeccion && (
                    <>
                        <h3>Campos de la Sección</h3>
                        {loadingCampos ? (
                            <Spin tip="Cargando campos..." />
                        ) : (
                            campos.map(campo => (
                                <Form.Item
                                    key={campo.id_campo}
                                    label={campo.nombre_campo}
                                    name={`campo_${campo.id_campo}`}
                                    rules={[
                                        { required: campo.requerido === 1, message: `Por favor, ingresa el valor para ${campo.nombre_campo}.` },
                                        // Puedes agregar más validaciones según el tipo de dato
                                    ]}
                                >
                                    {(() => {
                                        switch (campo.tipo_dato.toLowerCase()) {
                                            case "text":
                                                return <Input />;
                                            case "number":
                                                return <Input type="number" />;
                                            case "date":
                                                return <DatePicker style={{ width: "100%" }} />;
                                            case "boolean":
                                                return (
                                                    <Select>
                                                        <Option value={true}>Sí</Option>
                                                        <Option value={false}>No</Option>
                                                    </Select>
                                                );
                                            case "enum":
                                                return (
                                                    <Select placeholder="Selecciona una opción">
                                                        {campo.opciones && campo.opciones.split(',').map((option, index) => (
                                                            <Option key={index} value={option.trim()}>
                                                                {option.trim()}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                );
                                            case "float":
                                                return <Input type="number" step="0.01" />;
                                            default:
                                                return <Input />;
                                        }
                                    })()}
                                </Form.Item>
                            ))
                        )}
                    </>
                )}

                {/* Indicador de Progreso */}
                {loadingGuardar && (
                    <div style={{ marginBottom: "16px" }}>
                        <Spin tip={`Actualizando campo ${currentCampoIndex} de ${campos.length}...`} />
                    </div>
                )}

                {/* Botones de Acción */}
                <Form.Item>
                    <Button onClick={onClose} style={{ marginRight: "8px" }} disabled={loadingGuardar}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loadingGuardar} disabled={!selectedSeccion}>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditarFormularioModal;
