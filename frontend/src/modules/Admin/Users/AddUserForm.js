import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";

const AddUserForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    direccionDomicilio: "",
    telefono: "",
    sexo: "M", // Predeterminado
    correo: "",
    estadoCivil: "Sol", // Predeterminado
    especialidad: "",
    fotografia: null, // Soporte para fotos
    consultorio: "",
    estado: "Act", // Predeterminado
    rol: "Doctor", // Predeterminado
    usuario: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.identificacion || formData.identificacion.length !== 10) {
      newErrors.identificacion = "La identificación debe tener 10 caracteres.";
    }
    if (!formData.nombres) {
      newErrors.nombres = "El nombre es obligatorio.";
    }
    if (!formData.fechaNacimiento.match(/^\d{4}-\d{2}-\d{2}$/)) {
      newErrors.fechaNacimiento = "La fecha de nacimiento debe estar en formato YYYY-MM-DD.";
    }
    if (!formData.correo.includes("@")) {
      newErrors.correo = "Correo inválido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onAdd(formData);
      setErrors({});
      onClose();
    } catch (error) {
      const apiErrors = {};
      if (error.identificacionExists) {
        apiErrors.identificacion = "Identificación ya existe.";
      }
      if (error.usuarioExists) {
        apiErrors.usuario = "Usuario ya existe.";
      }
      if (error.correoExists) {
        apiErrors.correo = "Correo ya existe.";
      }
      setErrors(apiErrors);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>Crear Usuario</h2>
      </div>
      <form className="form-grid">
        <div className="form-field">
          <label>Identificación</label>
          <input
            type="text"
            value={formData.identificacion}
            onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
          />
          {errors.identificacion && <span className="error">{errors.identificacion}</span>}
        </div>
        <div className="form-field">
          <label>Nombres</label>
          <input
            type="text"
            value={formData.nombres}
            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
          />
          {errors.nombres && <span className="error">{errors.nombres}</span>}
        </div>
        <div className="form-field">
          <label>Apellidos</label>
          <input
            type="text"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
          />
          {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}
        </div>
        <div className="form-field">
          <label>Dirección</label>
          <input
            type="text"
            value={formData.direccionDomicilio}
            onChange={(e) => setFormData({ ...formData, direccionDomicilio: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input
            type="text"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Sexo</label>
          <select
            value={formData.sexo}
            onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="form-field">
          <label>Correo</label>
          <input
            type="email"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          />
          {errors.correo && <span className="error">{errors.correo}</span>}
        </div>
        <div className="form-field">
          <label>Estado Civil</label>
          <select
            value={formData.estadoCivil}
            onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
          >
            <option value="Sol">Soltero</option>
            <option value="Cas">Casado</option>
            <option value="Div">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
        </div>
        <div className="form-field">
          <label>Especialidad</label>
          <input
            type="text"
            value={formData.especialidad}
            onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Fotografía</label>
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, fotografia: e.target.files[0] })}
          />
        </div>
        <div className="form-field">
          <label>Consultorio</label>
          <input
            type="text"
            value={formData.consultorio}
            onChange={(e) => setFormData({ ...formData, consultorio: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
          >
            <option value="Act">Activo</option>
            <option value="Ina">Inactivo</option>
          </select>
        </div>
        <div className="form-field">
          <label>Rol</label>
          <select
            value={formData.rol}
            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
          >
            <option value="Doctor">Doctor</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>
        <div className="form-field">
          <label>Usuario</label>
          <input
            type="text"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
          />
          {errors.usuario && <span className="error">{errors.usuario}</span>}
        </div>
        <div className="form-field">
          <label>Contraseña</label>
          <input
            type="password"
            value={formData.contraseña}
            onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
          />
        </div>
        <Button label="Crear Usuario" className="primary" onClick={handleSubmit} />
      </form>
    </Modal>
  );
};

export default AddUserForm;
