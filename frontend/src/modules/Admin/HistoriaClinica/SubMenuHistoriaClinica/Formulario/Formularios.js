import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Space, Popconfirm, notification, DatePicker, Typography } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchFormularios, deleteFormulario } from "../../../../../utils/api";
import FormularioTipo from "./FormularioTipo";
import ViewFormulario from "./ViewFormulario";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/es";

dayjs.extend(advancedFormat);
dayjs.locale("es");

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const Formulario = () => {
  const [view, setView] = useState("formularios");
  const [formularios, setFormularios] = useState([]);
  const [filteredFormularios, setFilteredFormularios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState(null);
  const [sortRecent, setSortRecent] = useState(false);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    if (view === "formularios") {
      cargarFormularios();
    }
  }, [view]);

  const cargarFormularios = async () => {
    try {
      const data = await fetchFormularios();
      setFormularios(data);
      setFilteredFormularios(data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "No se pudo cargar la lista de formularios.",
      });
    }
  };

  const handleSearch = useCallback(() => {
    let filtered = formularios;

    if (searchValue) {
      filtered = filtered.filter((formulario) =>
        formulario.nro_archivo.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter((formulario) => {
        const fecha = dayjs(formulario.fecha_creacion);
        return fecha.isAfter(start) && fecha.isBefore(end);
      });
    }

    filtered = [...filtered].sort((a, b) =>
      sortRecent
        ? new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
        : new Date(a.fecha_creacion) - new Date(b.fecha_creacion)
    );

    setFilteredFormularios(filtered);
    setCurrentPage(1);
  }, [formularios, searchValue, dateRange, sortRecent]);

  useEffect(() => {
    handleSearch();
  }, [searchValue, dateRange, sortRecent, handleSearch]);

  if (view === "ver_formulario") {
    return <ViewFormulario formularioId={selectedFormulario} setView={setView} />;
  }

  if (view === "tipos_formulario") {
    return <FormularioTipo setView={setView} />;
  }

  const eliminarFormulario = async (id) => {
    try {
      await deleteFormulario(id);
      notification.success({
        message: "Formulario eliminado",
        description: `El formulario con ID ${id} fue eliminado correctamente.`,
      });
      cargarFormularios();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "No se pudo eliminar el formulario.",
      });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id_formulario", key: "id_formulario" },
    { title: "Tipo", dataIndex: "id_formulario_tipo", key: "id_formulario_tipo" },
    { title: "Nro Archivo", dataIndex: "nro_archivo", key: "nro_archivo" },
    { title: "Usuario Creador", dataIndex: "id_usuario_creador", key: "id_usuario_creador" },
    { title: "Fecha Creación", dataIndex: "fecha_creacion", key: "fecha_creacion", render: (text) => dayjs(text).format("D [de] MMMM [de] YYYY, h:mm:ss A") },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => { setSelectedFormulario(record.id_formulario); setView("ver_formulario"); }} />
          <Button icon={<EditOutlined />} />
          <Popconfirm title="¿Eliminar?" onConfirm={() => eliminarFormulario(record.id_formulario)} okText="Sí" cancelText="No">
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const paginatedData = filteredFormularios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Lista de Formularios
      </Title>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar por Número de Archivo"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }}
        />
        <RangePicker
          onChange={(dates) =>
            setDateRange(dates ? [dates[0].startOf("day"), dates[1].endOf("day")] : null)
          }
        />
        <Button type="default" onClick={() => setSortRecent(!sortRecent)}>
          {sortRecent ? "Ordenar: Antiguos" : "Ordenar: Recientes"}
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setView("tipos_formulario")}>
          Agregar Nuevo
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="id_formulario"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredFormularios.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default Formulario;
