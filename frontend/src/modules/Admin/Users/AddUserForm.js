import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";

const AddUserForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    correo: "",
    contraseña: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    direccionDomicilio: "",
    telefono: "",
    sexo: "M", 
    estadoCivil: "Sol", 
    especialidad: "",
    fotografia: null, 
    consultorio: "",
    estado: "Act",
    rol: "Doctor",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Blob = reader.result.split(",")[1];
        setFormData({ ...formData, fotografia: base64Blob });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identificacion) newErrors.identificacion = "La identificación es obligatoria.";
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo))
      newErrors.correo = "El correo electrónico no es válido.";
    if (!formData.contraseña || formData.contraseña.length < 6)
      newErrors.contraseña = "La contraseña debe tener al menos 6 caracteres.";
    if (!formData.nombres) newErrors.nombres = "Los nombres son obligatorios.";
    if (!formData.apellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onAdd(formData);
      onClose(); 
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      setErrors({ general: "Ocurrió un error al agregar el usuario. Intente nuevamente." });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Usuario</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Identificación</label>
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleInputChange}
          />
          {errors.identificacion && <span className="error">{errors.identificacion}</span>}
        </div>
        <div className="form-field">
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
          />
          {errors.correo && <span className="error">{errors.correo}</span>}
        </div>
        <div className="form-field">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
          />
          {errors.contraseña && <span className="error">{errors.contraseña}</span>}
        </div>
        <div className="form-field">
          <label>Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
          />
          {errors.nombres && <span className="error">{errors.nombres}</span>}
        </div>
        <div className="form-field">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
          />
          {errors.apellidos && <span className="error">{errors.apellidos}</span>}
        </div>
        <div className="form-field">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
          />
          {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}
        </div>
        <div className="form-field">
          <label>Dirección</label>
          <input
            type="text"
            name="direccionDomicilio"
            value={formData.direccionDomicilio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Sexo</label>
          <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="form-field">
          <label>Estado Civil</label>
          <select name="estadoCivil" value={formData.estadoCivil} onChange={handleInputChange}>
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
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Fotografía</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-field">
          <label>Consultorio</label>
          <input
            type="text"
            name="consultorio"
            value={formData.consultorio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleInputChange}>
            <option value="Act">Activo</option>
            <option value="Ina">Inactivo</option>
          </select>
        </div>
        <div className="form-field">
          <label>Rol</label>
          <select name="rol" value={formData.rol} onChange={handleInputChange}>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Administrador</option>
            <option value="Enfermera">Enfermera</option>
          </select>
        </div>
        <Button type="submit" label="Agregar Usuario" className="primary" />
      </form>
    </Modal>
  );
};

export default AddUserForm;
