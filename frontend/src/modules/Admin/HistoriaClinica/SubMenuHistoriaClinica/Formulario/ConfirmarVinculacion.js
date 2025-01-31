import React, { useEffect, useState } from "react";
import { Button, Spin, notification } from "antd";
import { createTipoFormulario, fetchHistoriaClinica, guardarRespuestasFormulario } from "../../../../../utils/api";
import jwt_decode from "jwt-decode";

const ConfirmarVinculacion = ({ onConfirmar, onAtras, formularioId, pacienteId, respuestas }) => {
    const [loading, setLoading] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);
    const [nroArchivo, setNroArchivo] = useState(null);

    // Obtener el ID del usuario desde el token JWT
    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setIdUsuario(decoded.id);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);

    // Obtener el número de archivo del paciente
    useEffect(() => {
        if (!pacienteId) return;

        const fetchNroArchivo = async () => {
            try {
                const historiaClinica = await fetchHistoriaClinica(pacienteId);
                if (historiaClinica.length > 0) {
                    setNroArchivo(historiaClinica[0].id);
                } else {
                    notification.error({ message: "Error", description: "No se encontró historia clínica para este paciente." });
                }
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudo obtener la historia clínica." });
            }
        };

        fetchNroArchivo();
    }, [pacienteId]);

    // Manejar la confirmación
    const handleConfirmar = async () => {
        if (!idUsuario || !nroArchivo || !formularioId) {
            notification.warning({ message: "Advertencia", description: "Faltan datos para completar la vinculación." });
            return;
        }

        setLoading(true);
        try {
            const nuevoFormulario = await createTipoFormulario({
                id_formulario_tipo: formularioId,
                nro_archivo: nroArchivo,
                id_usuario_creador: idUsuario,
                estado: "COMPLETADO",
            });

            if (!nuevoFormulario || !nuevoFormulario.id_formulario) throw new Error("Error en la creación del formulario.");

            const respuestasArray = Object.entries(respuestas).flatMap(([seccionId, campos]) =>
                Object.entries(campos).map(([id_campo, valor]) => ({
                    id_formulario: nuevoFormulario.id_formulario,
                    id_campo,
                    valor,
                }))
            );

            for (const respuesta of respuestasArray) {
                await guardarRespuestasFormulario(respuesta);
            }

            notification.success({ message: "Éxito", description: "Formulario vinculado exitosamente." });
            onConfirmar();
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo vincular el formulario." });
        } finally {
            setLoading(false);
        }
    };

    return <Button type="primary" onClick={handleConfirmar} disabled={loading}>Confirmar</Button>;
};

export default ConfirmarVinculacion;