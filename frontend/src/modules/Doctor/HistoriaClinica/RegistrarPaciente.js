// src/modules/Doctor/RegistrarPaciente.js
import React, { useState } from 'react';
import NavigationSteps from '../../../components/common/NavigationSteps';
import PasoBasico from './steps/PasoBasico';
import PasoTipoFormulario from './steps/PasoTipoFormulario';
import PasoFormulario from './steps/PasoFormulario';

function RegistrarPaciente() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFinalSubmit = () => {
    // Podrías hacer una petición al backend, etc.
    alert('¡Registro completado!');
  };

  let contenido;
  if (step === 1) {
    contenido = <PasoBasico nextStep={nextStep} />;
  } else if (step === 2) {
    contenido = <PasoTipoFormulario nextStep={nextStep} prevStep={prevStep} />;
  } else if (step === 3) {
    contenido = <PasoFormulario prevStep={prevStep} onSubmit={handleFinalSubmit} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <NavigationSteps step={step} />
      <div style={{ marginTop: '2rem' }}>
        {contenido}
      </div>
    </div>
  );
}

export default RegistrarPaciente;
