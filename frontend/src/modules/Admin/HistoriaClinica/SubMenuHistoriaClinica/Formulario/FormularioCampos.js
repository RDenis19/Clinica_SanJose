import React, { useEffect, useState, useCallback } from "react";
import { Button, Input, notification, Steps, Form, Card, Select, DatePicker, Switch } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { fetchCamposFormulario, asignarFormularioAHistoria, guardarRespuestasFormulario } from "../../../../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const { Step } = Steps;
const { Option } = Select;

const FormularioCampos = ({ tipoFormularioId, setView }) => {
  const [campos, setCampos] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedHistoria] = useState(null);
  const [form] = Form.useForm();

  // Cargar los campos del formulario según el tipo seleccionado
  const cargarCampos = useCallback(async () => {
    if (!tipoFormularioId) return;
    try {
      const data = await fetchCamposFormulario(tipoFormularioId);
      console.log("📥 Campos obtenidos del servidor:", data);
      setCampos(Array.isArray(data) ? data : []);

      // Inicializar valores en el formulario
      const valoresIniciales = {};
      data.forEach((campo) => {
        valoresIniciales[campo.id_campo] = ""; // Valor inicial vacío
      });
      form.setFieldsValue(valoresIniciales);

    } catch (error) {
      console.error("❌ Error al obtener los campos del formulario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo cargar los campos del formulario.",
      });
    }
  }, [tipoFormularioId, form]);

  useEffect(() => {
    cargarCampos();
  }, [cargarCampos]);

  // Validar campos antes de pasar al siguiente paso
  const handleNextStep = async () => {
    try {
      await form.validateFields();
      setCurrentStep(1);
    } catch (error) {
      notification.warning({
        message: "Campos Incompletos",
        description: "Por favor, complete todos los campos requeridos antes de continuar.",
      });
    }
  };

  // Guardar las respuestas en la base de datos
  const handleGuardar = async () => {
    if (!selectedHistoria) {
      notification.warning({
        message: "Selección Requerida",
        description: "Debe seleccionar una historia clínica antes de asignar el formulario.",
      });
      return;
    }

    try {
      // Obtener valores del formulario
      let valores = form.getFieldsValue();
      console.log("📌 Valores obtenidos del formulario:", valores);

      // Formatear los valores antes de enviarlos
      const respuestas = Object.keys(valores)
        .filter((id_campo) => valores[id_campo] !== undefined && valores[id_campo] !== "")
        .map((id_campo) => {
          let valor = valores[id_campo];

          // Convertir tipos de dato según el campo
          const campoInfo = campos.find((c) => c.id_campo.toString() === id_campo);
          if (campoInfo) {
            if (campoInfo.tipo_dato === "FLOAT") valor = parseFloat(valor) || 0;
            if (campoInfo.tipo_dato === "DATE") valor = valor ? dayjs(valor).format("YYYY-MM-DD") : "";
            if (campoInfo.tipo_dato === "BOOLEAN") valor = valor ? "1" : "0";
            if (campoInfo.tipo_dato === "ENUM" && typeof valor === "object") valor = valor.value;
          }

          return {
            id_campo: parseInt(id_campo, 10),
            valor: valor,
          };
        });

      console.log("✅ Respuestas listas para enviar:", respuestas);

      if (respuestas.length === 0) {
        console.error("❌ Error: No se pueden enviar respuestas vacías.");
        notification.warning({
          message: "Campos Vacíos",
          description: "No se pueden enviar respuestas vacías. Complete al menos un campo.",
        });
        return;
      }

      console.log("🚀 Enviando datos a la API...", {
        id_formulario: selectedHistoria.nro_archivo,
        respuestas,
      });

      // **1. Primero asignar el formulario a la historia**
      await asignarFormularioAHistoria(selectedHistoria.nro_archivo, tipoFormularioId);

      // **2. Luego guardar las respuestas**
      await guardarRespuestasFormulario(selectedHistoria.nro_archivo, respuestas);

      notification.success({
        message: "Formulario Guardado",
        description: "Las respuestas han sido registradas correctamente.",
      });

      setCurrentStep(2);
    } catch (error) {
      console.error("❌ Error al guardar respuestas:", error.response?.data || error.message);
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "No se pudo guardar las respuestas.",
      });
    }
  };

  // Renderizar campos según el tipo de dato
  const renderInput = (campo) => {
    switch (campo.tipo_dato) {
      case "TEXT":
        return <Input />;
      case "NUMBER":
        return <Input type="number" />;
      case "FLOAT":
        return <Input type="number" step="0.1" />;
      case "DATE":
        return <DatePicker format="YYYY-MM-DD" />;
      case "BOOLEAN":
        return <Switch />;
      case "ENUM":
        return (
          <Select>
            {campo.opciones?.split(",").map((opcion, index) => (
              <Option key={index} value={opcion.trim()}>{opcion.trim()}</Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Button type="link" icon={<LeftOutlined />} onClick={() => setView("tipos_formulario")} style={{ marginBottom: 16, fontSize: "16px", color: "#1890ff" }}>
        Regresar
      </Button>
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        <Step title="Llenar Campos" />
        <Step title="Confirmar Datos" />
      </Steps>

      {/* Paso 1: Llenar los campos del formulario */}
      {currentStep === 0 && (
        <Card title="Llenar Campos del Formulario">
          <Form layout="vertical" form={form} initialValues={{}}>
            {campos.map((campo) => (
              <Form.Item
                key={campo.id_campo}
                label={campo.nombre_campo}
                name={campo.id_campo.toString()} // Asegura que el name sea un string
                rules={campo.requerido ? [{ required: true, message: `El campo ${campo.nombre_campo} es obligatorio` }] : []}
              >
                {renderInput(campo)}
              </Form.Item>
            ))}
          </Form>
          <Button type="primary" onClick={handleNextStep}>Siguiente</Button>
        </Card>
      )}

      {/* Paso 2: Confirmar datos antes de enviar */}
      {currentStep === 1 && (
        <Card title="Confirmar Datos">
          <p>Revise la información antes de enviarla.</p>
          <Button type="primary" onClick={handleGuardar} style={{ marginTop: 16 }}>Guardar Formulario</Button>
        </Card>
      )}
    </div>
  );
};

export default FormularioCampos;
