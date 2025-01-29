import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Card, Descriptions, Collapse, Tag, Spin, Row, Col, Typography } from "antd";
import { UserOutlined, IdcardOutlined, FileOutlined, FormOutlined, CalendarOutlined, ManOutlined } from "@ant-design/icons";
import { fetchPatientDetails, fetchHistoriaClinica, fetchFormularios } from "../../../utils/api";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const PatientProfileModal = ({ visible, onClose, patient }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clinicalRecords, setClinicalRecords] = useState([]);
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    const loadPatientData = async () => {
      setLoading(true);
      try {
        const patientDetails = await fetchPatientDetails(patient.nro_identificacion);
        setPatientData(patientDetails);
      } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadClinicalRecords = async () => {
      try {
        const records = await fetchHistoriaClinica();
        const patientRecords = records.filter(r => r.nro_identificacion === patient.nro_identificacion);
        setClinicalRecords(patientRecords);
      } catch (error) {
        console.error("Error al cargar historias clínicas:", error);
      }
    };

    const loadFormularios = async () => {
      try {
        const forms = await fetchFormularios();
        const patientForms = forms.filter(f => f.nro_identificacion === patient.nro_identificacion);
        setFormularios(patientForms);
      } catch (error) {
        console.error("Error al cargar formularios:", error);
      }
    };

    if (patient) {
      loadPatientData();
      loadClinicalRecords();
      loadFormularios();
    }
  }, [patient]);

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width={800}>
      <Title level={3} style={{ textAlign: "center" }}>{`${patient.primer_nombre} ${patient.segundo_nombre || ""} ${patient.primer_apellido}`}</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Información General" key="1">
          {loading ? (
            <Spin tip="Cargando..." style={{ width: "100%" }} />
          ) : (
            <Card>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Número de Identificación">
                  {patientData.nro_identificacion}
                </Descriptions.Item>
                <Descriptions.Item label="Tipo de Identificación">
                  {patientData.tipo_identificacion}
                </Descriptions.Item>
                <Descriptions.Item label="Género">
                  {patientData.genero === "M" ? "Masculino" : patientData.genero === "F" ? "Femenino" : "Otro"}
                </Descriptions.Item>
                <Descriptions.Item label="Fecha de Nacimiento">
                  {new Date(patientData.fecha_nacimiento).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </TabPane>
        
        <TabPane tab="Historial Clínico" key="2">
          <Collapse>
            {clinicalRecords.length > 0 ? (
              clinicalRecords.map(record => (
                <Panel header={`Historia Clínica #${record.nro_archivo}`} key={record.nro_archivo}>
                  <p><strong>Fecha de Creación:</strong> {new Date(record.fecha_creacion).toLocaleDateString()}</p>
                </Panel>
              ))
            ) : (
              <p>No hay registros de historias clínicas.</p>
            )}
          </Collapse>
        </TabPane>
        
        <TabPane tab="Formularios Completados" key="3">
          <Row gutter={[16, 16]}>
            {formularios.length > 0 ? (
              formularios.map(form => (
                <Col span={12} key={form.id_formulario}>
                  <Card title={`Formulario #${form.id_formulario}`}>
                    <p><strong>Estado:</strong> {form.estado}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(form.fecha_creacion).toLocaleDateString()}</p>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No se encontraron formularios completados.</p>
            )}
          </Row>
        </TabPane>
      </Tabs>
      <Button type="primary" onClick={onClose} block>Cerrar</Button>
    </Modal>
  );
};

export default PatientProfileModal;