import React from "react";
import { Card, Col, Row, Statistic, Layout, Button, Space } from "antd";
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Content } = Layout;

const Dashboard = () => {
  const dataIngresosAltas = [
    { mes: "Jan", ingresos: 40, altas: 30 },
    { mes: "Feb", ingresos: 50, altas: 35 },
    { mes: "Mar", ingresos: 60, altas: 45 },
    { mes: "Apr", ingresos: 55, altas: 40 },
    { mes: "May", ingresos: 70, altas: 60 },
    { mes: "Jun", ingresos: 80, altas: 70 },
    { mes: "Jul", ingresos: 75, altas: 65 },
  ];

  const dataLineMultiple = [
    { mes: "Jan", Emergencia: 200, Cirugía: 150, UCI: 100, Pediatría: 120 },
    { mes: "Feb", Emergencia: 220, Cirugía: 130, UCI: 110, Pediatría: 130 },
    { mes: "Mar", Emergencia: 250, Cirugía: 160, UCI: 120, Pediatría: 140 },
    { mes: "Apr", Emergencia: 260, Cirugía: 170, UCI: 130, Pediatría: 130 },
    { mes: "May", Emergencia: 240, Cirugía: 150, UCI: 140, Pediatría: 150 },
    { mes: "Jun", Emergencia: 280, Cirugía: 180, UCI: 160, Pediatría: 155 },
    { mes: "Jul", Emergencia: 300, Cirugía: 190, UCI: 170, Pediatría: 160 },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden", backgroundColor: "#fff" }}>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {/* Estadísticas Rápidas */}
          <Col span={6}>
            <Card
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <Statistic
                title="Ingresos"
                value={340}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <Statistic
                title="Altas"
                value={245}
                prefix={<LineChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <Statistic
                title="Ocupación"
                value="75%"
                prefix={<PieChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <Statistic
                title="Reingresos"
                value={16}
                prefix={<SyncOutlined spin />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Gráfico de Barras */}
          <Col span={12}>
            <Card
              title="Ingresos vs Altas"
              bordered
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dataIngresosAltas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ingresos" fill="#82ca9d" name="Ingresos" />
                  <Bar dataKey="altas" fill="#8884d8" name="Altas" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Gráfico de Líneas */}
          <Col span={12}>
            <Card
              title="Ocupación Mensual"
              bordered
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dataLineMultiple}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Emergencia" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Cirugía" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="UCI" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Card
              title="Acciones Rápidas"
              bordered
              hoverable
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
              }}
            >
              <Space>
                <Button type="primary">Nueva Historia Clínica</Button>
                <Button type="default">Revisar Notificaciones</Button>
                <Button type="danger">Reportar Incidencia</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
