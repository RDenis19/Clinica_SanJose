import React, { useEffect } from "react";

const FormulariosEnfermera = () => {
    useEffect(() => {
        try {
            console.log("Renderizando FormulariosEnfermera...");
        } catch (error) {
            console.error("Error en FormulariosEnfermera:", error);
        }
    }, []);

    return <h1>Formulario de Enfermera</h1>;
};

export default FormulariosEnfermera;
