// VerFormularioModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, InputNumber, DatePicker, Select, Switch } from "antd";
import { fetchSeccionByTipoFormulario, fetchCamposByFormularioYSeccion } from "../../../../../utils/api";
import dayjs from "dayjs";

/**
 * Función para renderizar dinámicamente el componente según "tipo_dato".
 */
const renderCampo = (campo) => {
  switch (campo.tipo_dato) {
    case "TEXT":
      return <Input />;
    case "NUMBER":
      return <Input type="number" />;
    case "DATE":
      return <DatePicker style={{ width: "100%" }} />;
    case "BOOLEAN":
      return <Switch />;
    case "ENUM":
      // Si "opciones" es un string, por ejemplo "Masculino,Femenino"
      if (campo.opciones) {
        const opcionesArray = campo.opciones.split(",");
        return (
          <Select>
            {opcionesArray.map((opt) => (
              <Select.Option key={opt} value={opt}>
                {opt}
              </Select.Option>
            ))}
          </Select>
        );
      }
      return <Select />;
    case "FLOAT":
      return <InputNumber style={{ width: "100%" }} step={0.01} />;
    default:
      return <Input />;
  }
};

const VerFormularioModal = ({ visible, onClose, formulario }) => {
  // Estado: lista de secciones (contiene id_formulario_tipo, id_seccion, nombre_seccion)
  const [secciones, setSecciones] = useState([]);
  // Índice de la sección activa
  const [seccionActiva, setSeccionActiva] = useState(0);
  // Campos de la sección activa
  const [campos, setCampos] = useState([]);

  /**
   * 1) Al abrir el modal y si existe "id_formulario_tipo" en `formulario`,
   * obtenemos la lista de secciones desde la API.
   */
  useEffect(() => {
    if (!visible || !formulario?.id_formulario_tipo) return;

    (async () => {
      try {
        // Llamada a la API para obtener todas las secciones de este formulario_tipo
        const data = await fetchSeccionByTipoFormulario(formulario.id_formulario_tipo);

        // Guardamos también "id_formulario_tipo" para luego poder usarlo al cargar los campos
        const mapeado = data.map((obj) => ({
          id_seccion: obj.id_seccion,
          id_formulario_tipo: obj.id_formulario_tipo,
          nombre_seccion: obj.nombre_seccion,
        }));

        setSecciones(mapeado);
        setSeccionActiva(0); // por defecto, seleccionamos la primera sección
      } catch (error) {
        console.error("Error al cargar secciones:", error);
      }
    })();
  }, [visible, formulario]);

  /**
   * 2) Cada vez que secciones o seccionActiva cambien, cargamos los campos
   *    usando "id_formulario_tipo" y "id_seccion".
   */
  useEffect(() => {
    // Si aún no cargamos secciones o no tenemos una sección activa, no hacemos nada
    if (secciones.length === 0) return;

    const seccionSeleccionada = secciones[seccionActiva];
    if (!seccionSeleccionada?.id_formulario_tipo || !seccionSeleccionada?.id_seccion) return;

    (async () => {
      try {
        // Llamada a la API usando id_formulario_tipo e id_seccion
        const dataCampos = await fetchCamposByFormularioYSeccion(
          seccionSeleccionada.id_formulario_tipo,
          seccionSeleccionada.id_seccion
        );
        setCampos(dataCampos);
      } catch (error) {
        console.error("Error al cargar campos:", error);
      }
    })();
  }, [secciones, seccionActiva]);

  // Al hacer clic en una sección, cambiamos el índice
  const handleCambiarSeccion = (indice) => {
    setSeccionActiva(indice);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {/* Contenedor principal con dos columnas */}
      <div style={{ display: "flex" }}>
        
        {/* Columna izquierda: lista de secciones */}
        <div
          style={{
            width: "220px",
            borderRight: "1px solid #f0f0f0",
            padding: "16px",
          }}
        >
          <h2>Secciones</h2>
          {secciones.map((sec, i) => (
            <Button
              key={sec.id_seccion}
              block
              type={i === seccionActiva ? "primary" : "default"}
              style={{ marginBottom: "10px", textAlign: "left" }}
              onClick={() => handleCambiarSeccion(i)}
            >
              {sec.nombre_seccion}
            </Button>
          ))}
        </div>
        <div style={{ flex: 1, padding: "16px" }}>
          {/* Render de la sección activa */}
          {secciones.length > 0 && secciones[seccionActiva] ? (
            <>
              <Form layout="vertical">
                {campos.length > 0 ? (
                  campos.map((campo) => (
                    <Form.Item
                      key={campo.id_campo}
                      label={campo.nombre_campo}
                      name={`campo-${campo.id_campo}`}
                      rules={[
                        {
                          required: campo.requerido === 1,
                          message: `${campo.nombre_campo} es requerido`,
                        },
                      ]}
                    >
                      {renderCampo(campo)}
                    </Form.Item>
                  ))
                ) : (
                  <p>No hay campos disponibles para esta sección.</p>
                )}
              </Form>
            </>
          ) : (
            <p>No hay secciones disponibles.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VerFormularioModal;
