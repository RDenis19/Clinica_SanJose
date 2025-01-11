import React, { useState } from 'react';
import PasoTipoFormulario from './steps/PasoTipoFormularioEnfermera';
import PasoFormulario from './steps/PasoFormularioEnfermera';
import PasoBasico from './steps/PasoBasicoEnfermera';
import NavigationSteps from '../../../components/common/NavigationSteps';

function HistoriasClinicasEnfermera() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tipoFormulario, setTipoFormulario] = useState('');

  const formulariosEnfermera = [
    'EMERGENCIA',
    'EVOLUCIÓN Y PRESCRIPCIONES',
    'SIGNOS VITALES',
  ];

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PasoTipoFormulario
            nextStep={nextStep}
            formularios={formulariosEnfermera}
            setTipoFormulario={setTipoFormulario}
          />
        );
      case 2:
        return (
          <PasoFormulario
            nextStep={nextStep}
            prevStep={prevStep}
            tipoFormulario={tipoFormulario}
          />
        );
      case 3:
        return (
          <PasoBasico
            prevStep={prevStep}
            nextStep={nextStep}
            tipoFormulario={tipoFormulario}
          />
        );
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

export default HistoriasClinicasEnfermera;
