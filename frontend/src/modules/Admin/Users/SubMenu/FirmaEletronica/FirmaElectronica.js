import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Space, Popconfirm, notification, Typography } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchFirmaElectronica, deleteFirmaElectronica } from "../../../../../utils/api";
import AddFirmaForm from "./AddFirmaForm";
import EditFirmaForm from "./EditFirmaForm";
import FirmaProfileModal from "./FirmaProfileModal";
import dayjs from "dayjs";

const { Search } = Input;
const { Title } = Typography;

const FirmaElectronica = () => {
  const [firmas, setFirmas] = useState([]);
  const [filteredFirmas, setFilteredFirmas] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingFirma, setEditingFirma] = useState(null);
  const [viewingFirma, setViewingFirma] = useState(null);
  const itemsPerPage = 6;

  // Cargar firmas electrónicas desde la API
  const loadFirmas = async () => {
    try {
      const data = await fetchFirmaElectronica();
      setFirmas(data);
      setFilteredFirmas(data.slice(0, itemsPerPage)); // Paginación inicial
    } catch (error) {
      console.error("Error al cargar firmas electrónicas:", error);
      notification.error({
        message: "Error",
        description: "No se pudo cargar la lista de firmas electrónicas.",
      });
    }
  };

  useEffect(() => {
    loadFirmas();
  }, []);

  // Aplicar filtros dinámicos
  const applyFilters = useCallback(() => {
    let filtered = firmas;

    // Filtrar por búsqueda (ID del usuario)
    if (searchValue) {
      filtered = filtered.filter((firma) =>
        firma.id_usuario.toString().includes(searchValue)
      );
    }

    // Actualizar datos mostrados según la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredFirmas(filtered.slice(startIndex, endIndex));
  }, [firmas, searchValue, currentPage, itemsPerPage]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFirmaElectronica(id);
      notification.success({
        message: "Firma electrónica eliminada",
        description: `La firma con ID ${id} fue eliminada correctamente.`,
      });
      loadFirmas();
    } catch (error) {
      console.error("Error al eliminar firma electrónica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar la firma electrónica.",
      });
    }
  };

  const handleFirmaAdded = () => {
    loadFirmas();
    setIsAddModalOpen(false);
  };

  const columns = [
    {
      title: "ID Firma",
      dataIndex: "id_firma_electronica",
      key: "id_firma_electronica",
    },
    {
      title: "ID Usuario",
      dataIndex: "id_usuario",
      key: "id_usuario",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "fecha_creacion",
      key: "fecha_creacion",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewingFirma(record);
              setIsProfileModalOpen(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingFirma(record);
              setIsEditModalOpen(true);
            }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar esta firma electrónica?"
            onConfirm={() => handleDelete(record.id_firma_electronica)}
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
      <Title level={2} style={{ marginBottom: 24 }}>
        Lista de Firmas Electrónicas
      </Title>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar por ID de usuario"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar Firma Electrónica
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredFirmas}
        rowKey="id_firma_electronica"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: firmas.length,
          onChange: handlePageChange,
        }}
      />
      <AddFirmaForm
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onFirmaAdded={handleFirmaAdded}
      />
      <EditFirmaForm
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        firma={editingFirma}
        onFirmaUpdated={loadFirmas}
      />
      <FirmaProfileModal
        visible={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        firma={viewingFirma}
      />
    </div>
  );
};

export default FirmaElectronica;
