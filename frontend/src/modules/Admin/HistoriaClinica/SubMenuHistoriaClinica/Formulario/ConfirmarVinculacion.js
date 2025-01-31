import React from "react";
import { Button } from "antd";

const ConfirmarVinculacion = ({ onConfirmar, onAtras }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "20px" }}>
                <img src="https://via.placeholder.com/80" alt="Warning" />
                <h3>¿Está seguro de vincular este formulario?</h3>
            </div>
            <Button type="primary" onClick={onConfirmar} style={{ marginRight: "10px" }}>Sí</Button>
            <Button onClick={onAtras}>No</Button>
        </div>
    );
};

export default ConfirmarVinculacion;
