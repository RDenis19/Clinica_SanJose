import React, { useState } from "react";
import ListaFormularios from "./Formularios";
import SeleccionarFormularioYPaciente from "./SeleccionarFormulario";
import SeleccionarSecciones from "./SeleccionarSecciones";
import ConfirmarVinculacion from "./ConfirmarVinculacion";

const FormularioWizard = () => {
    const [step, setStep] = useState(1);
    const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [seccionesSeleccionadas, setSeccionesSeleccionadas] = useState({}); // Ahora almacena todas las respuestas

    const avanzarPaso = () => setStep((prev) => prev + 1);
    const retrocederPaso = () => setStep((prev) => prev - 1);

    return (
        <div style={{ padding: "20px" }}>
            {step === 1 && <ListaFormularios onAgregar={() => setStep(2)} />}

            {step === 2 && <SeleccionarFormularioYPaciente onNext={(formulario, paciente) => {
                setFormularioSeleccionado(formulario);
                setPacienteSeleccionado(paciente);
                avanzarPaso();
            }} />}

            {step === 3 && <SeleccionarSecciones formularioId={formularioSeleccionado} onSiguiente={({ seccionId, valoresCampos }) => {
                setSeccionesSeleccionadas((prevSecciones) => ({
                    ...prevSecciones,
                    [seccionId]: valoresCampos,
                }));
                avanzarPaso();
            }} onAtras={retrocederPaso} />}

            {step === 4 && <ConfirmarVinculacion 
                onConfirmar={() => setStep(1)}
                onAtras={retrocederPaso}
                formularioId={formularioSeleccionado}
                pacienteId={pacienteSeleccionado}
                respuestas={seccionesSeleccionadas} 
            />}
        </div>
    );
};

export default FormularioWizard;
