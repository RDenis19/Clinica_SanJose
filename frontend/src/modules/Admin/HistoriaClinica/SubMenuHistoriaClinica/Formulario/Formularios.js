import React from "react";
import { Table, Button, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ListaFormularios = ({ onAgregar }) => {
    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Nombre", dataIndex: "nombre", key: "nombre" },
        { title: "Acciones", key: "acciones",
            render: () => (
                <Space>
                    <Button icon={<EditOutlined />}>Editar</Button>
                    <Button icon={<DeleteOutlined />} danger>Eliminar</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAgregar}>
                Agregar
            </Button>
            <Table columns={columns} dataSource={[]} rowKey="id" style={{ marginTop: "20px" }} />
        </div>
    );
};

export default ListaFormularios;
