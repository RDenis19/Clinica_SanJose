import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Spin, notification, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { fetchTiposFormulario } from "../../../../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/es";
import FormularioCampos from "./FormularioCampos";

dayjs.locale("es");

const { Title } = Typography;
const { Search } = Input;

const FormularioTipo = ({ setView }) => {
  const [tipoFormularios, setTipoFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedTipoFormulario, setSelectedTipoFormulario] = useState(null);

  useEffect(() => {
    cargarTiposFormulario();
  }, []);

  const cargarTiposFormulario = async () => {
    try {
      const data = await fetchTiposFormulario();
      setTipoFormularios(Array.isArray(data) ? data : []);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "No se pudo cargar la lista de tipos de formulario.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegresarLista = () => {
    setSelectedTipoFormulario(null); // Reiniciar la selección
    setView("formularios"); // Cambiar la vista a la lista de formularios
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id_formulario_tipo",
      key: "id_formulario_tipo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "fecha_creacion",
      key: "fecha_creacion",
      render: (text) => dayjs(text).format("D [de] MMMM [de] YYYY"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<RightOutlined />}
            onClick={() => setSelectedTipoFormulario(record.id_formulario_tipo)}
          />
        </Space>
      ),
    },
  ];

  if (selectedTipoFormulario) {
    return <FormularioCampos tipoFormularioId={selectedTipoFormulario} setView={handleRegresarLista} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="link"
        icon={<LeftOutlined />}
        onClick={handleRegresarLista} // Usa la función corregida
        style={{ marginBottom: 16, fontSize: "16px", color: "#1890ff" }}
      >
        Regresar a la Lista
      </Button>

      <Title level={3} style={{ marginBottom: 24 }}>Lista de Tipos de Formularios</Title>
      <Search
        placeholder="Buscar por nombre de formulario"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />

      {loading ? (
        <Spin tip="Cargando tipos de formulario..." style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={tipoFormularios.filter((formulario) =>
            formulario.nombre.toLowerCase().includes(searchText.toLowerCase())
          )}
          rowKey="id_formulario_tipo"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default FormularioTipo;
