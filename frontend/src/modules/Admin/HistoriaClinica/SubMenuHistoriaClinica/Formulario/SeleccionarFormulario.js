import React, { useState } from "react";
import { Select, Button } from "antd";

const SeleccionarFormulario = ({ onSiguiente, onAtras }) => {
    const [formulario, setFormulario] = useState(null);
    const [paciente, setPaciente] = useState(null);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Formulario</h2>
            <Select placeholder="Seleccionar tipo de formulario" style={{ width: "600px" }} onChange={setFormulario} />
            <h2>Paciente</h2>
            <Select placeholder="Seleccionar paciente" style={{ width: "600px" }} onChange={setPaciente} />
            <div style={{ marginTop: "20px" }}>
                <Button onClick={onAtras} style={{ marginRight: "10px" }}>Atrás</Button>
                <Button type="primary" disabled={!formulario || !paciente} onClick={() => onSiguiente(formulario, paciente)}>
                    Siguiente
                </Button>
            </div>
        </div>
    );
};

export default SeleccionarFormulario;
