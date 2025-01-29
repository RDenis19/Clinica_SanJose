import React, { useEffect, useState, useCallback } from "react";
import { Button, Input, Spin, notification, Steps, Form, Card, Select, DatePicker, Switch } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { fetchCamposFormulario, fetchHistoriaClinica, asignarFormularioAHistoria } from "../../../../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const { Step } = Steps;
const { Search } = Input;
const { Option } = Select;

const FormularioCampos = ({ tipoFormularioId, setView }) => {
  const [campos, setCampos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [historiaClinica, setHistoriaClinica] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedHistoria, setSelectedHistoria] = useState(null);
  const [form] = Form.useForm();

  const cargarCampos = useCallback(async () => {
    if (!tipoFormularioId) return;
    setLoading(true);
    try {
      const data = await fetchCamposFormulario(tipoFormularioId);
      setCampos(Array.isArray(data) ? data : []);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "No se pudo cargar los campos del formulario.",
      });
    } finally {
      setLoading(false);
    }
  }, [tipoFormularioId]);

  useEffect(() => {
    cargarCampos();
  }, [cargarCampos]);

  const buscarHistoriaClinica = async (cedula) => {
    if (!cedula || cedula.length < 3) {
      setHistoriaClinica([]);
      return;
    }
    try {
      const data = await fetchHistoriaClinica();
      const filtrados = data.filter((hc) => hc.nro_identificacion.includes(cedula));
      setHistoriaClinica(filtrados);
    } catch (error) {
      setHistoriaClinica([]);
      notification.error({ message: "Error", description: "No se pudo obtener la historia clínica." });
    }
  };

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

  const handleGuardar = async () => {
    if (!selectedHistoria) {
      notification.warning({
        message: "Selección Requerida",
        description: "Debe seleccionar una historia clínica antes de asignar el formulario.",
      });
      return;
    }
    try {
      await asignarFormularioAHistoria(selectedHistoria.nro_archivo, tipoFormularioId);
      notification.success({ message: "Formulario Asignado", description: "Formulario asignado exitosamente." });
      setCurrentStep(2);
    } catch (error) {
      notification.error({ message: "Error", description: "No se pudo asignar el formulario." });
    }
  };

  const renderInput = (campo) => {
    switch (campo.tipo_dato) {
      case "TEXT":
        return <Input placeholder={`Ingrese ${campo.nombre_campo}`} />;
      case "NUMBER":
        return <Input type="number" placeholder={`Ingrese ${campo.nombre_campo}`} />;
      case "DATE":
        return <DatePicker style={{ width: "100%" }} />;
      case "BOOLEAN":
        return <Switch />;
      case "ENUM":
        return (
          <Select placeholder={`Seleccione ${campo.nombre_campo}`}>
            {campo.opciones?.split(",").map((opcion, index) => (
              <Option key={index} value={opcion.trim()}>{opcion.trim()}</Option>
            ))}
          </Select>
        );
      default:
        return <Input placeholder={`Ingrese ${campo.nombre_campo}`} />;
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Button type="link" icon={<LeftOutlined />} onClick={() => setView("tipos_formulario")} style={{ marginBottom: 16, fontSize: "16px", color: "#1890ff" }}>Regresar</Button>
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        <Step title="Llenar Campos" />
        <Step title="Buscar Historia Clínica" />
      </Steps>
      {currentStep === 0 && (
        <Card title="Llenar Campos del Formulario">
          <Form layout="vertical" form={form}>
            {campos.map((campo) => (
              <Form.Item key={campo.id_campo} label={campo.nombre_campo} name={campo.id_campo} rules={campo.requerido ? [{ required: true, message: `El campo ${campo.nombre_campo} es obligatorio` }] : []}>
                {renderInput(campo)}
              </Form.Item>
            ))}
          </Form>
          <Button type="primary" onClick={handleNextStep}>Siguiente</Button>
        </Card>
      )}
      {currentStep === 1 && (
        <Card title="Buscar Historia Clínica">
          <Search placeholder="Ingrese cédula" value={searchValue} onChange={(e) => { setSearchValue(e.target.value); buscarHistoriaClinica(e.target.value); }} style={{ width: 300, marginBottom: 16 }} />
          {historiaClinica.length > 0 ? (
            <Select style={{ width: "100%" }} placeholder="Seleccione una historia clínica" onChange={(value) => setSelectedHistoria(historiaClinica.find(hc => hc.nro_identificacion === value))}>
              {historiaClinica.map((hc) => (
                <Option key={hc.nro_identificacion} value={hc.nro_identificacion}>{hc.nro_identificacion} - {hc.nombre_paciente}</Option>
              ))}
            </Select>
          ) : (<p>Ingrese la cédula del paciente</p>)}
          <Button type="primary" onClick={handleGuardar} style={{ marginTop: 16 }}>Asignar Formulario</Button>
        </Card>
      )}
      {loading && <Spin tip="Cargando campos..." style={{ display: "block", margin: "20px auto" }} />}
    </div>
  );
};

export default FormularioCampos;
