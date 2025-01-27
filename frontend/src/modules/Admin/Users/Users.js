import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, Select, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchUsers, fetchUserById } from "../../../utils/api";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal"; // Importamos el modal de edición

const { Search } = Input;
const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch = user.usuario?.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === null || user.estado === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [searchValue, statusFilter, users]);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      notification.error({
        message: "Error",
        description: error.mensaje || "No se pudo cargar la lista de usuarios.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      setUsers(users.filter((user) => user.id_usuario !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id_usuario !== id));
      notification.success({
        message: "Éxito",
        description: "Usuario eliminado correctamente.",
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar el usuario.",
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUserAdded = () => {
    loadUsers(); // Recargamos la lista de usuarios después de agregar uno nuevo
    setIsAddModalOpen(false);
  };

  const handleEditClick = async (user) => {
    try {
      const userDetails = await fetchUserById(user.id_usuario); // Obtén los datos completos del usuario

      if (!userDetails || !userDetails.personal || !userDetails.academica || !userDetails.contacto) {
        notification.error({
          message: "Error",
          description: "Faltan datos del usuario para editar.",
        });
        return;
      }

      setEditingUser({
        ...userDetails,
        informacion_personal: userDetails.personal,
        informacion_academica: userDetails.academica,
        informacion_contacto: userDetails.contacto
      });

      setIsEditModalOpen(true); // Abre el modal
    } catch (error) {
      console.error("Error al cargar detalles del usuario:", error);
      notification.error({
        message: "Error",
        description: "No se pudieron cargar los detalles del usuario.",
      });
    }
  };


  const handleUserUpdated = () => {
    loadUsers(); // Recargamos la lista de usuarios después de actualizar
    setIsEditModalOpen(false);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "Fecha Registro",
      dataIndex: "fecha_registro",
      key: "fecha_registro",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Último Login",
      dataIndex: "ultimo_login",
      key: "ultimo_login",
      render: (text) => (text !== null ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "Sin dato"),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (text === "activo" ? "🟢 Activo" : "🔴 Inactivo"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => console.log("Ver usuario", record)} />
          <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
          <Popconfirm
            title="¿Estás seguro de eliminar este usuario?"
            onConfirm={() => handleDelete(record.id_usuario)}
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
      <Space style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", width: "100%" }}>
        <h1 style={{ margin: 0 }}>Lista de Usuarios</h1>
        <Search
          placeholder="Buscar por usuario"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Filtrar por estado"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="activo">Activo</Option>
          <Option value="inactivo">Inactivo</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
          Agregar Usuario
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={paginatedUsers}
        rowKey="id_usuario"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredUsers.length,
          onChange: handlePageChange,
        }}
      />
      <AddUserModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
      <EditUserModal
        visible={isEditModalOpen}
        userData={editingUser}
        onClose={() => setIsEditModalOpen(false)}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default Users;