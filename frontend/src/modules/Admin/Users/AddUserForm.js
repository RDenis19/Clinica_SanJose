import React, { useState } from "react";
import "../../../styles/modules/Administrador/user/addUserForm.css";
import Modal from "../../../components/common/Modal";

const AddUserForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    direccion: "",
    telefono: "",
    sexo: "F",
    correo: "",
    estadoCivil: "S", // Estado Civil predeterminado
    usuario: "",
    contraseña: "",
    especialidad: "",
    estado: "Activo", // Estado predeterminado
    rol: "Admin", // Rol predeterminado
    InternaClinica_idInternaClinica: "",
    FirmaElectronica_idFirmaElec: "",
  });

  const handleSubmit = () => {
    console.log("Datos enviados al backend:", formData);

    if (!formData.InternaClinica_idInternaClinica || isNaN(formData.InternaClinica_idInternaClinica)) {
      alert("El ID de Interna Clínica debe ser un número entero.");
      return;
    }
    if (!formData.FirmaElectronica_idFirmaElec || isNaN(formData.FirmaElectronica_idFirmaElec)) {
      alert("El ID de Firma Electrónica debe ser un número entero.");
      return;
    }
    if (!formData.identificacion || formData.identificacion.length < 10) {
      alert("La identificación debe tener al menos 10 caracteres.");
      return;
    }
    if (!formData.nombres) {
      alert("El campo 'Nombres' es obligatorio.");
      return;
    }
    if (!formData.apellidos) {
      alert("El campo 'Apellidos' es obligatorio.");
      return;
    }
    if (!formData.fechaNacimiento) {
      alert("El campo 'Fecha de Nacimiento' es obligatorio.");
      return;
    }
    if (!formData.telefono || formData.telefono.length < 7) {
      alert("El teléfono debe tener al menos 7 caracteres.");
      return;
    }
    if (!formData.correo.includes("@")) {
      alert("El correo electrónico debe ser válido.");
      return;
    }
    if (!formData.usuario) {
      alert("El campo 'Usuario' es obligatorio.");
      return;
    }
    if (!formData.contraseña || formData.contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (!formData.especialidad) {
      alert("El campo 'Especialidad' es obligatorio.");
      return;
    }

    onAdd({
      ...formData,
      InternaClinica_idInternaClinica: parseInt(formData.InternaClinica_idInternaClinica),
      FirmaElectronica_idFirmaElec: parseInt(formData.FirmaElectronica_idFirmaElec),
    });

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>Agregar Usuario</h2>
      </div>
      <form className="form-grid">
        <div className="form-field">
          <label>Identificación</label>
          <input
            type="text"
            value={formData.identificacion}
            onChange={(e) =>
              setFormData({ ...formData, identificacion: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Nombres</label>
          <input
            type="text"
            value={formData.nombres}
            onChange={(e) =>
              setFormData({ ...formData, nombres: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Apellidos</label>
          <input
            type="text"
            value={formData.apellidos}
            onChange={(e) =>
              setFormData({ ...formData, apellidos: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) =>
              setFormData({ ...formData, fechaNacimiento: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Dirección</label>
          <input
            type="text"
            value={formData.direccion}
            onChange={(e) =>
              setFormData({ ...formData, direccion: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input
            type="text"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={formData.correo}
            onChange={(e) =>
              setFormData({ ...formData, correo: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Estado Civil</label>
          <select
            value={formData.estadoCivil}
            onChange={(e) =>
              setFormData({ ...formData, estadoCivil: e.target.value })
            }
          >
            <option value="S">Soltero</option>
            <option value="C">Casado</option>
            <option value="U">Unión Libre</option>
            <option value="D">Divorciado</option>
            <option value="V">Viudo</option>
          </select>
        </div>
        <div className="form-field">
          <label>Usuario</label>
          <input
            type="text"
            value={formData.usuario}
            onChange={(e) =>
              setFormData({ ...formData, usuario: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Contraseña</label>
          <input
            type="password"
            value={formData.contraseña}
            onChange={(e) =>
              setFormData({ ...formData, contraseña: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>Especialidad</label>
          <input
            type="text"
            value={formData.especialidad}
            onChange={(e) =>
              setFormData({ ...formData, especialidad: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>ID de Interna Clínica</label>
          <input
            type="number"
            value={formData.InternaClinica_idInternaClinica}
            onChange={(e) =>
              setFormData({ ...formData, InternaClinica_idInternaClinica: e.target.value })
            }
          />
        </div>
        <div className="form-field">
          <label>ID de Firma Electrónica</label>
          <input
            type="number"
            value={formData.FirmaElectronica_idFirmaElec}
            onChange={(e) =>
              setFormData({ ...formData, FirmaElectronica_idFirmaElec: e.target.value })
            }
          />
        </div>
        <button className="add-user-button" type="button" onClick={handleSubmit}>
          Agregar Usuario
        </button>
      </form>
    </Modal>
  );
};

export default AddUserForm;
