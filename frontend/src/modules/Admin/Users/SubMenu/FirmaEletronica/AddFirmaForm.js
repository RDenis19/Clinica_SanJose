import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { createFirma, fetchUsers } from '../../../../../utils/api';
import '../../../../../styles/modules/Administrador/autocomplete.css';

const AddFirmaForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nombreCertificado: '',
    serialNumber: '',
    validoDesde: '',
    validoHasta: '',
    clavePublica: '',
    archivoCertificado: null,
    Usuario_identificacion: '',
  });

  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [usuarioExiste, setUsuarioExiste] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await fetchUsers();
        setUsuarios(data.data || []);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    cargarUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivoCertificado: e.target.files[0] });
  };

  const handleSearchChange = (value) => {
    setFormData({ ...formData, Usuario_identificacion: value });

    const filtered = usuarios.filter((usuario) =>
      usuario.identificacion.startsWith(value)
    );
    setFilteredUsuarios(filtered);

    const existe = usuarios.some(
      (usuario) => usuario.identificacion === value
    );
    setUsuarioExiste(existe);
  };

  const handleUsuarioSelect = (usuario) => {
    setFormData({ ...formData, Usuario_identificacion: usuario.identificacion });
    setFilteredUsuarios([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Usuario_identificacion) {
      alert('El campo "Identificación de Usuario" es obligatorio.');
      return;
    }

    if (usuarioExiste === false) {
      alert('El usuario no existe. Por favor, créalo primero.');
      return;
    }

    try {
      const firmaData = new FormData();
      Object.keys(formData).forEach((key) => {
        firmaData.append(key, formData[key]);
      });

      await createFirma(firmaData);
      alert('Firma electrónica creada exitosamente.');
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error al crear la firma:', error);
      alert(
        error.response?.data?.message || 'Error al crear la firma electrónica.'
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre Certificado</label>
          <input
            type="text"
            name="nombreCertificado"
            value={formData.nombreCertificado}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Válido Desde</label>
          <input
            type="date"
            name="validoDesde"
            value={formData.validoDesde}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Válido Hasta</label>
          <input
            type="date"
            name="validoHasta"
            value={formData.validoHasta}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Clave Pública</label>
          <input
            type="text"
            name="clavePublica"
            value={formData.clavePublica}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Archivo Certificado</label>
          <input
            type="file"
            name="archivoCertificado"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-field">
          <label>Buscar Usuario</label>
          <input
            type="text"
            placeholder="Ingrese la identificación del usuario"
            value={formData.Usuario_identificacion}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {filteredUsuarios.length > 0 && (
            <ul className="autocomplete-list">
              {filteredUsuarios.map((usuario) => (
                <li
                  key={usuario.identificacion}
                  onClick={() => handleUsuarioSelect(usuario)}
                >
                  <span className="id">{usuario.identificacion}</span>
                  <span className="name">{usuario.nombre}</span>
                </li>
              ))}
            </ul>
          )}
          {usuarioExiste === true && (
            <p style={{ color: 'green' }}>Usuario encontrado.</p>
          )}
          {usuarioExiste === false && (
            <p style={{ color: 'red' }}>Usuario no encontrado.</p>
          )}
        </div>
        <Button type="submit" label="Guardar" className="primary" />
      </form>
    </Modal>
  );
};

export default AddFirmaForm;
