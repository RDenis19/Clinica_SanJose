import React, { useEffect, useState } from "react";
import { Button, Spin, Modal, notification, Input } from "antd";
import { fetchSeccionByTipoFormulario, fetchSeccionByTipoFormularioYSeccion } from "../../../../../utils/api";

const DetalleTipoFormularioModal = ({ formularioId, isVisible, onClose }) => {
    const [secciones, setSecciones] = useState([]);
    const [campos, setCampos] = useState([]);
    const [loadingSecciones, setLoadingSecciones] = useState(false);
    const [loadingCampos, setLoadingCampos] = useState(false);
    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const [respuestas, setRespuestas] = useState([]); // Solo para mostrar, no editable

    // Cargar secciones
    useEffect(() => {
        if (!formularioId || !isVisible) return;

        const loadSecciones = async () => {
            setLoadingSecciones(true);
            try {
                const data = await fetchSeccionByTipoFormulario(formularioId);
                let seccionesArray = Array.isArray(data[0]) ? data[0] : data;
                setSecciones(seccionesArray);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar las secciones." });
            } finally {
                setLoadingSecciones(false);
            }
        };

        loadSecciones();
    }, [formularioId, isVisible]);

    // Cargar campos de la sección seleccionada
    useEffect(() => {
        if (!selectedSeccion || !formularioId) return;

        const loadCampos = async () => {
            setLoadingCampos(true);
            try {
                const data = await fetchSeccionByTipoFormularioYSeccion(formularioId, selectedSeccion);
                setCampos(Array.isArray(data) ? data : []);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar los campos de la sección." });
            } finally {
                setLoadingCampos(false);
            }
        };

        loadCampos();
    }, [selectedSeccion, formularioId]);

    return (
        <Modal
            title="Detalles del Tipo de Formulario"
            open={isVisible}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Cerrar
                </Button>
            ]}
            width={800}
        >
            <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
                <div style={{ flex: "1", minWidth: "200px" }}>
                    <h3>Secciones</h3>
                    {loadingSecciones ? (
                        <Spin tip="Cargando secciones..." style={{ display: "block", margin: "20px auto" }} />
                    ) : (
                        secciones.map((seccion) => (
                            <Button
                                key={seccion.id_seccion}
                                block
                                style={{ marginBottom: "10px" }}
                                type={selectedSeccion === seccion.id_seccion ? "primary" : "default"}
                                onClick={() => setSelectedSeccion(seccion.id_seccion)}
                            >
                                {seccion.nombre_seccion}
                            </Button>
                        ))
                    )}
                </div>

                <div style={{ flex: "2", paddingLeft: "20px" }}>
                    <h3>Campos</h3>
                    {loadingCampos ? (
                        <Spin tip="Cargando campos..." style={{ display: "block", margin: "20px auto" }} />
                    ) : selectedSeccion ? (
                        campos.length > 0 ? (
                            campos.map((campo) => (
                                <div key={campo.id_campo} style={{ marginBottom: "10px" }}>
                                    <label>{campo.nombre_campo}: </label>
                                    <Input
                                        type={campo.tipo_dato.toLowerCase()}
                                        value={respuestas.find((r) => r.id_campo === campo.id_campo)?.valor || ""}
                                        readOnly
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No hay campos en esta sección.</p>
                        )
                    ) : (
                        <p>Seleccione una sección para ver los campos.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DetalleTipoFormularioModal;
