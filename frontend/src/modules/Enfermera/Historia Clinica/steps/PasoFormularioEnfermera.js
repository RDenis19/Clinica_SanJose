import React, { useEffect, useState } from 'react';
import Formulario from '../../../../components/common/FormularioG';
import Button from '../../../../components/common/Button';
import { fetchFormularioEstructura } from '../../../../utils/api';

function PasoFormulario({ prevStep, nextStep, tipoFormulario }) {
  const [estructura, setEstructura] = useState(null);

  useEffect(() => {
    const cargarEstructura = async () => {
      try {
        const data = await fetchFormularioEstructura(tipoFormulario);
        setEstructura(data);
      } catch (error) {
        console.error('Error al cargar el formulario:', error);
      }
    };

    cargarEstructura();
  }, [tipoFormulario]);

  const handleChange = (campo, valor) => {
    setEstructura((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  if (!estructura) return <p>Cargando formulario...</p>;

  return (
    <div>
      <h2>Formulario Detallado</h2>
      <Formulario estructura={estructura} onChange={handleChange} />
      <div style={{ marginTop: '1rem' }}>
        <Button label="Atrás" onClick={prevStep} className="secondary" />
        <Button label="Siguiente" onClick={nextStep} style={{ marginLeft: '10px' }} />
      </div>
    </div>
  );
}

export default PasoFormulario;
