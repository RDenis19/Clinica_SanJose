import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Space, Popconfirm, notification } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchHistoriaClinica, deleteHistoriaClinica } from "../../../../utils/api"; // Ajusta esta ruta
import AddHistoriaClinica from "./AddHistoriaClinica";
import EditHistoriaClinica from "./EditHistoriaClinica";
import HistoriaClinicaProfile from "./HistoriaClinicaProfile";
import dayjs from "dayjs";

const { Search } = Input;

const HistoriaClinica = () => {
  const [historias, setHistorias] = useState([]);
  const [filteredHistorias, setFilteredHistorias] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingHistoria, setEditingHistoria] = useState(null);
  const [viewingHistoria, setViewingHistoria] = useState(null);
  const itemsPerPage = 7;

  useEffect(() => {
    loadHistorias();
  }, []);

  const loadHistorias = async () => {
    try {
      const data = await fetchHistoriaClinica();
      setHistorias(data);
      setFilteredHistorias(data.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Error al cargar historias clínicas:", error);
      notification.error({
        message: "Error",
        description: "No se pudo cargar la lista de historias clínicas.",
      });
    }
  };

  const handleSearch = useCallback(() => {
    const filtered = historias.filter((historia) =>
      historia.nro_identificacion.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredHistorias(filtered.slice(0, itemsPerPage));
  }, [historias, searchValue, itemsPerPage]);

  useEffect(() => {
    handleSearch();
  }, [searchValue, handleSearch]);

  const handleDelete = async (nroArchivo) => {
    try {
      await deleteHistoriaClinica(nroArchivo);
      notification.success({
        message: "Historia clínica eliminada",
        description: `La historia clínica con número ${nroArchivo} fue eliminada correctamente.`,
      });
      loadHistorias();
    } catch (error) {
      console.error("Error al eliminar historia clínica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar la historia clínica.",
      });
    }
  };

  const columns = [
    {
      title: "Número de Archivo",
      dataIndex: "nro_archivo",
      key: "nro_archivo",
      render: (text) => text.toString().padStart(6, "0"), // Formato de 6 dígitos
    },    
    {
      title: "Identificación del Paciente",
      dataIndex: "nro_identificacion",
      key: "nro_identificacion",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "fecha_creacion",
      key: "fecha_creacion",
      render: (text) => dayjs(text).format("YYYY-MM-DD"), // Formato de fecha
    },    
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewingHistoria(record);
              setIsProfileModalOpen(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingHistoria(record);
              setIsEditModalOpen(true);
            }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar esta historia clínica?"
            onConfirm={() => handleDelete(record.nro_archivo)}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar por paciente"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar Historia Clínica
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredHistorias}
        rowKey="nro_archivo"
        pagination={{
          pageSize: itemsPerPage,
          onChange: (page) => setFilteredHistorias(historias.slice((page - 1) * itemsPerPage, page * itemsPerPage)),
        }}
      />
      <AddHistoriaClinica
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onHistoriaAdded={loadHistorias}
      />
      <EditHistoriaClinica
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        historia={editingHistoria}
        onHistoriaUpdated={loadHistorias}
      />
      <HistoriaClinicaProfile
        visible={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        historia={viewingHistoria}
      />
    </div>
  );
};

export default HistoriaClinica;
