import React, { useState, useEffect } from "react";
import { Card, Button, Input, Space, Select, Modal, Typography, Row, Col, Avatar, Popconfirm, notification } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchPatients, deletePatient } from "../../../utils/api";
import PatientProfileModal from "./PatientProfileModal";
import AddPatientModal from "./AddPatientModal";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const PacientesDoctor = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [genderFilter, setGenderFilter] = useState(null);
  const [idTypeFilter, setIdTypeFilter] = useState(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };
    loadPatients();
  }, []);

  const applyFilters = () => {
    let filtered = patients;

    if (searchValue) {
      filtered = filtered.filter((patient) =>
        patient.primer_nombre.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((patient) => patient.genero === genderFilter);
    }

    if (idTypeFilter) {
      filtered = filtered.filter((patient) => patient.tipo_identificacion === idTypeFilter);
    }

    setFilteredPatients(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchValue, genderFilter, idTypeFilter]);

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      notification.success({
        message: "Paciente eliminado",
        description: `El paciente con ID ${id} fue eliminado correctamente.`
      });
      setPatients(patients.filter(patient => patient.nro_identificacion !== id));
      setFilteredPatients(filteredPatients.filter(patient => patient.nro_identificacion !== id));
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar el paciente."
      });
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Pacientes</Title>

      {/* Filtros */}
      <Space style={{ marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar paciente por nombre"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Filtrar por género"
          value={genderFilter}
          onChange={(value) => setGenderFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="M">Masculino</Option>
          <Option value="F">Femenino</Option>
          <Option value="O">Otro</Option>
        </Select>
        <Select
          placeholder="Filtrar por tipo de ID"
          value={idTypeFilter}
          onChange={(value) => setIdTypeFilter(value)}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="cedula">Cédula</Option>
          <Option value="pasaporte">Pasaporte</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
          Agregar Paciente
        </Button>
      </Space>

      {/* Listado de pacientes */}
      <Row gutter={[16, 16]}>
        {filteredPatients.map((patient) => (
          <Col xs={24} sm={12} md={8} lg={6} key={patient.nro_identificacion}>
            <Card
              hoverable
              actions={[
                <EyeOutlined key="view" onClick={() => {
                  setSelectedPatient(patient);
                  setIsProfileModalOpen(true);
                }} />,
                <EditOutlined key="edit" onClick={() => console.log("Editar paciente", patient)} />,
                <Popconfirm
                  title="¿Seguro que deseas eliminar este paciente?"
                  onConfirm={() => handleDelete(patient.nro_identificacion)}
                  okText="Sí"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" style={{ color: "red" }} />
                </Popconfirm>
              ]}
            >
              <Card.Meta
                avatar={<Avatar style={{ backgroundColor: "#87d068" }}>{patient.primer_nombre.charAt(0)}</Avatar>}
                title={`${patient.primer_nombre} ${patient.primer_apellido}`}
                description={`ID: ${patient.nro_identificacion}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modales */}
      <AddPatientModal visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {selectedPatient && (
        <PatientProfileModal
          visible={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default PacientesDoctor;
