import React, { useState, useEffect } from "react";
import { Card, Button, Space, Select, Input, Typography, Row, Col, notification, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchPatients, deletePatient } from "../../../utils/api";
import AddPatientModal from "./AddPatientModal";
import EditPatientForm from "./EditPatientForm";
import PatientDetailsView from "./PatientDetailsView";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

const DoctorPatientsView = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [allPatients, setAllPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [genderFilter, setGenderFilter] = useState(null);
    const [idTypeFilter, setIdTypeFilter] = useState(null);
    const [editingPatient, setEditingPatient] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [activeView, setActiveView] = useState("list");

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();
                setAllPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: "No se pudo cargar la lista de pacientes.",
                });
            }
        };
        loadPatients();
    }, []);

    useEffect(() => {
        let filtered = allPatients;
        if (searchValue) {
            filtered = filtered.filter((p) => p.primer_nombre.toLowerCase().includes(searchValue.toLowerCase()));
        }
        if (genderFilter) {
            filtered = filtered.filter((p) => p.genero === genderFilter);
        }
        if (idTypeFilter) {
            filtered = filtered.filter((p) => p.tipo_identificacion === idTypeFilter);
        }
        setFilteredPatients(filtered);
    }, [searchValue, genderFilter, idTypeFilter, allPatients]);

    const handleDelete = async (id) => {
        try {
            await deletePatient(id);
            notification.success({
                message: "Paciente eliminado",
                description: `El paciente con ID ${id} fue eliminado correctamente.`,
            });
            setAllPatients(allPatients.filter((p) => p.nro_identificacion !== id));
        } catch (error) {
            notification.error({
                message: "Error",
                description: "No se pudo eliminar el paciente.",
            });
        }
    };

    return (
        <div>
            {activeView === "list" ? (
                <>
                    <Title level={2} style={{ marginBottom: 24 }}>Pacientes</Title>
                    <Space style={{ marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
                        <Search placeholder="Buscar pacientes por nombre" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} style={{ width: 300 }} />
                        <Select placeholder="Filtrar por género" value={genderFilter} onChange={setGenderFilter} allowClear style={{ width: 150 }}>
                            <Option value="M">Masculino</Option>
                            <Option value="F">Femenino</Option>
                            <Option value="O">Otro</Option>
                        </Select>
                        <Select placeholder="Filtrar por tipo de ID" value={idTypeFilter} onChange={setIdTypeFilter} allowClear style={{ width: 150 }}>
                            <Option value="cedula">Cédula</Option>
                            <Option value="pasaporte">Pasaporte</Option>
                        </Select>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>Agregar Paciente</Button>
                    </Space>
                    <Row gutter={[16, 16]}>
                        {filteredPatients.map((patient) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={patient.nro_identificacion}>
                                <Card title={`${patient.primer_nombre} ${patient.primer_apellido}`} bordered>
                                    <p><b>Identificación:</b> {patient.nro_identificacion}</p>
                                    <p><b>Tipo:</b> {patient.tipo_identificacion}</p>
                                    <p><b>Género:</b> {patient.genero}</p>
                                    <p><b>Fecha Nacimiento:</b> {dayjs(patient.fecha_nacimiento).format("YYYY-MM-DD")}</p>
                                    <Space>
                                        <Button icon={<EyeOutlined />} onClick={() => { setSelectedPatient(patient); setActiveView("details"); }}>Ver</Button>
                                        <Button icon={<EditOutlined />} onClick={() => { setEditingPatient(patient); setIsEditModalOpen(true); }}>Editar</Button>
                                        <Popconfirm title="¿Eliminar este paciente?" onConfirm={() => handleDelete(patient.nro_identificacion)} okText="Sí" cancelText="No">
                                            <Button icon={<DeleteOutlined />} danger />
                                        </Popconfirm>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            ) : (
                <PatientDetailsView patient={selectedPatient} onBack={() => setActiveView("list")} />
            )}
            <AddPatientModal visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onPatientAdded={() => {}} />
            <EditPatientForm visible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onPatientUpdated={() => {}} initialData={editingPatient} />
        </div>
    );
};

export default DoctorPatientsView;