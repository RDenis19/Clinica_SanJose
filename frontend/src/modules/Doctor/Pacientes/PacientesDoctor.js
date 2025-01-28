import React, { useState, useEffect } from "react";
import { Input, Card, Button, Typography, Space, Row, Col, notification } from "antd";
import { PlusOutlined, SearchOutlined, IdcardOutlined, ManOutlined, WomanOutlined, CalendarOutlined } from "@ant-design/icons";
import { fetchPatients } from "../../../utils/api";
import AddPatientModal from "./AddPatientModal";
import PatientProfileModal from "./PatientProfileModal";
import "./PacientesDoctor.css";
import dayjs from "dayjs";

const { Title } = Typography;
const { Meta } = Card;

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
        <div className="pacientes-doctor-container">
            <Title level={2} className="pacientes-title">
                Gestión de Pacientes
            </Title>

            <Space className="pacientes-actions">
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

            <Row gutter={[16, 16]} className="pacientes-grid">
                {filteredPatients.map((patient) => (
                    <Col key={patient.nro_identificacion} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            className="paciente-card"
                            hoverable
                            actions={[
                                <Button
                                    type="link"
                                    icon={<IdcardOutlined />}
                                    onClick={() => handleMoreDetails(patient.nro_identificacion)}
                                >
                                    Más Detalles
                                </Button>,
                            ]}
                        >
                            <Meta
                                avatar={
                                    patient.genero === "M" ? (
                                        <ManOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
                                    ) : (
                                        <WomanOutlined style={{ fontSize: "32px", color: "#eb2f96" }} />
                                    )
                                }
                                title={`${patient.primer_nombre} ${patient.primer_apellido}`}
                                description={
                                    <div>
                                        <p><IdcardOutlined /> ID: {patient.nro_identificacion}</p>
                                        <p><CalendarOutlined /> Fecha de Nacimiento: {patient.fecha_nacimiento ? dayjs(patient.fecha_nacimiento).format("YYYY-MM-DD") : "No especificada"}</p>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <AddPatientModal
                visible={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onPatientAdded={handlePatientAdded}
            />

            <PatientProfileModal
                patientId={selectedPatientId}
                visible={isProfileModalVisible}
                onClose={() => setIsProfileModalVisible(false)}
            />
        </div>
    );
};

export default PacientesDoctor;