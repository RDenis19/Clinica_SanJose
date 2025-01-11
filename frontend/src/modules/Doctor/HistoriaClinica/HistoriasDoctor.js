// src/modules/Doctor/HistoriasClinicas.js
import React, { useState } from 'react';
import PasoTipoFormulario from './steps/PasoTipoFormulario';
import PasoFormulario from './steps/PasoFormulario';
import PasoBasico from './steps/PasoBasico';
import NavigationSteps from '../../../components/common/NavigationSteps';
import '../../../styles/modules/Doctor/HistoriasClinicas/HistoriasClinicas.css'; 

function HistoriasClinicas() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PasoTipoFormulario nextStep={nextStep} />;
      case 2:
        return <PasoFormulario nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <PasoBasico prevStep={prevStep} onSubmit={() => alert('Registro finalizado')} />;
      default:
        return <PasoTipoFormulario nextStep={nextStep} />;
    }
  };

  return (
    <div className="historias-clinicas-container">
      <NavigationSteps step={currentStep} />
      <div>{renderStep()}</div>
    </div>
  );
}

export default HistoriasClinicas;
