import React, { useState } from "react";
import ListaFormularios from "./Formularios";
import SeleccionarFormulario from "./SeleccionarFormulario";
import SeleccionarSecciones from "./SeleccionarSecciones";
import ConfirmarVinculacion from "./ConfirmarVinculacion";

const FormularioWizard = () => {
    const [step, setStep] = useState(1);
    const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [seccionesSeleccionadas, setSeccionesSeleccionadas] = useState([]);

    const avanzarPaso = () => setStep((prev) => prev + 1);
    const retrocederPaso = () => setStep((prev) => prev - 1);

    return (
        <div style={{ padding: "20px" }}>
            {step === 1 && <ListaFormularios onAgregar={() => setStep(2)} />}
            {step === 2 && <SeleccionarFormulario onSiguiente={(formulario, paciente) => {
                setFormularioSeleccionado(formulario);
                setPacienteSeleccionado(paciente);
                avanzarPaso();
            }} onAtras={retrocederPaso} />}
            {step === 3 && <SeleccionarSecciones formularioId={formularioSeleccionado} onSiguiente={(secciones) => {
                setSeccionesSeleccionadas(secciones);
                avanzarPaso();
            }} onAtras={retrocederPaso} />}
            {step === 4 && <ConfirmarVinculacion onConfirmar={() => {
                alert("Formulario vinculado exitosamente!");
                setStep(1); // Regresar al inicio
            }} onAtras={retrocederPaso} />}
        </div>
    );
};

export default FormularioWizard;
