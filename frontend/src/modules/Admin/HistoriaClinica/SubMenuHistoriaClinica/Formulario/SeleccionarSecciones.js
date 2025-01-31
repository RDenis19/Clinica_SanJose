import React, { useState } from "react";
import { Button, Input } from "antd";

const seccionesMock = ["Sección A", "Sección B", "Sección C"];

const SeleccionarSecciones = ({ onSiguiente, onAtras }) => {
    const [campos, setCampos] = useState({});

    const handleChange = (seccion, value) => {
        setCampos({ ...campos, [seccion]: value });
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
                <h3>Secciones</h3>
                {seccionesMock.map((seccion) => (
                    <Button key={seccion} block style={{ marginBottom: "10px" }}>{seccion}</Button>
                ))}
                <Button type="primary" onClick={() => onSiguiente(campos)} style={{ marginTop: "10px" }}>
                    Siguiente
                </Button>
            </div>
            <div style={{ flex: "2", paddingLeft: "20px" }}>
                <h3>Campos</h3>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ marginBottom: "10px" }}>
                        <label>Campo {i + 1}: </label>
                        <Input onChange={(e) => handleChange(`Campo ${i + 1}`, e.target.value)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeleccionarSecciones;
