import React, { useState, useEffect } from "react";
import { Input, Card, Button, Typography, Space, Row, Col, Avatar, notification } from "antd";
import { PlusOutlined, SearchOutlined, IdcardOutlined, ManOutlined, WomanOutlined, CalendarOutlined } from "@ant-design/icons";
import { fetchPatients } from "../../../utils/api";
import AddPatientModal from "./AddPatientModal";
import PatientProfileModal from "./PatientProfileModal";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const PacientesDoctor = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                console.error("Error al cargar pacientes:", error);
                notification.error({
                    message: "Error",
                    description: "No se pudo cargar la lista de pacientes.",
                });
            }
        };
        loadPatients();
    }, []);

    const handleSearch = (value) => {
        setSearchValue(value);
        if (!value) {
            setFilteredPatients(patients);
        } else {
            const filtered = patients.filter((patient) =>
                patient.nro_identificacion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPatients(filtered);
        }
    };

    const handlePatientAdded = () => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                console.error("Error al actualizar lista de pacientes:", error);
                notification.error({
                    message: "Error",
                    description: "No se pudo actualizar la lista de pacientes.",
                });
            }
        };
        loadPatients();
    };

    const handleMoreDetails = (patientId) => {
        setSelectedPatientId(patientId);
        setIsProfileModalVisible(true);
    };

    return (
        <div style={{ padding: 20, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>Gestión de Pacientes</Title>

            <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <Input
                    placeholder="Buscar por cédula o identificación"
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Crear Paciente
                </Button>
            </Space>

            <Row gutter={[8, 8]} justify="start">
                {filteredPatients.map((patient) => (
                    <Col key={patient.nro_identificacion} xs={24} sm={12} md={6} lg={4}>
                        <Card size="small" hoverable style={{ textAlign: "center", width: 160, padding: 10 }}>
                            <Avatar
                                size={35}
                                icon={patient.genero === "M" ? <ManOutlined /> : <WomanOutlined />}
                                style={{ backgroundColor: patient.genero === "M" ? "#1890ff" : "#eb2f96", marginBottom: 8 }}
                            />
                            <Title level={5} style={{ fontSize: "14px" }}>{patient.primer_nombre} {patient.primer_apellido}</Title>
                            <Space direction="vertical" size={2}>
                                <Text style={{ fontSize: "12px" }}><IdcardOutlined /> {patient.nro_identificacion}</Text>
                                <Text style={{ fontSize: "12px" }}><CalendarOutlined /> {patient.fecha_nacimiento ? dayjs(patient.fecha_nacimiento).format("YYYY-MM-DD") : "No especificada"}</Text>
                            </Space>
                            <Button type="link" size="small" onClick={() => handleMoreDetails(patient.nro_identificacion)}>Más Detalles</Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            <AddPatientModal visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onPatientAdded={handlePatientAdded} />
            <PatientProfileModal patientId={selectedPatientId} visible={isProfileModalVisible} onClose={() => setIsProfileModalVisible(false)} />
        </div>
    );
};

export default PacientesDoctor;
