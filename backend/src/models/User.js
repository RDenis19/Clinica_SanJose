const pool = require('../config/db');

const User = {
  // Obtener todos los usuarios básicos
  findAll: async () => {
    const query = `
      SELECT 
        idUsuario,
        identificacion,
        nombres,
        apellidos,
        correo,
        rol,
        estado
      FROM usuario
    `;
    const [rows] = await pool.execute(query);
    return rows;
  },

  // Buscar usuario por su correo
  findByEmail: async (correo) => {
    const query = `
      SELECT
        idUsuario,
        correo,
        contraseña,
        estado,
        rol
      FROM usuario
      WHERE correo = ?
    `;
    const [rows] = await pool.execute(query, [correo]);
    return rows[0];
  },

  // Obtener un usuario por idUsuario
  findById: async (idUsuario) => {
    const query = `
      SELECT 
        idUsuario,
        identificacion,
        nombres,
        apellidos,
        fechaNacimiento,
        direccionDomicilio,
        telefono,
        sexo,
        correo,
        estadoCivil,
        especialidad,
        fotografia,
        consultorio,
        estado,
        rol,
        usuario,
        fechaCreacion,
        fechaModificacion
      FROM 
        usuario
      WHERE 
        idUsuario = ?
    `;
    const [rows] = await pool.execute(query, [idUsuario]);
    return rows[0];
  },

  // Verificar si existe una identificación, usuario o correo
  checkBeforeCreateUser: async (identificacion, usuario, correo, idUsuario = null) => {
    let query = `
      SELECT 
        EXISTS(SELECT 1 FROM usuario WHERE identificacion = ?) AS identificacionExists,
        EXISTS(SELECT 1 FROM usuario WHERE usuario = ?) AS usuarioExists,
        EXISTS(SELECT 1 FROM usuario WHERE correo = ?) AS correoExists
    `;
    const params = [identificacion, usuario, correo];

    // Si se está actualizando, excluir el usuario actual de la verificación
    if (idUsuario) {
      query = `
        SELECT 
          EXISTS(SELECT 1 FROM usuario WHERE identificacion = ? AND idUsuario != ?) AS identificacionExists,
          EXISTS(SELECT 1 FROM usuario WHERE usuario = ? AND idUsuario != ?) AS usuarioExists,
          EXISTS(SELECT 1 FROM usuario WHERE correo = ? AND idUsuario != ?) AS correoExists
      `;
      params.push(idUsuario, usuario, idUsuario, correo, idUsuario);
    }

    const [rows] = await pool.execute(query, params);
    return rows[0];
  },

  // Crear un nuevo usuario
  create: async (data) => {
    const {
      identificacion,
      nombres,
      apellidos,
      fechaNacimiento,
      direccionDomicilio,
      telefono,
      sexo,
      correo,
      estadoCivil,
      especialidad,
      fotografia,
      consultorio,
      estado,
      rol,
      usuario,
      contraseña,
    } = data;

    const query = `
      INSERT INTO usuario (
        identificacion,
        nombres,
        apellidos,
        fechaNacimiento,
        direccionDomicilio,
        telefono,
        sexo,
        correo,
        estadoCivil,
        especialidad,
        fotografia,
        consultorio,
        estado,
        rol,
        usuario,
        contraseña
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      identificacion,
      nombres,
      apellidos,
      fechaNacimiento,
      direccionDomicilio,
      telefono,
      sexo,
      correo,
      estadoCivil,
      especialidad,
      fotografia,
      consultorio,
      estado,
      rol,
      usuario,
      contraseña,
    ];

    const [result] = await pool.execute(query, params);
    return { idUsuario: result.insertId, ...data };
  },

  // Actualizar un usuario por idUsuario
  update: async (idUsuario, data) => {
    const {
      identificacion,
      nombres,
      apellidos,
      fechaNacimiento,
      direccionDomicilio,
      telefono,
      sexo,
      correo,
      estadoCivil,
      especialidad,
      fotografia,
      consultorio,
      estado,
      rol,
      usuario,
      // contraseña, // Asumiendo que la contraseña no se actualiza aquí
    } = data;

    const query = `
      UPDATE usuario SET 
        identificacion = ?, 
        nombres = ?, 
        apellidos = ?, 
        fechaNacimiento = ?, 
        direccionDomicilio = ?, 
        telefono = ?, 
        sexo = ?, 
        correo = ?, 
        estadoCivil = ?, 
        especialidad = ?, 
        fotografia = ?, 
        consultorio = ?, 
        estado = ?, 
        rol = ?, 
        usuario = ?
      WHERE idUsuario = ?
    `;
    const params = [
      identificacion,
      nombres,
      apellidos,
      fechaNacimiento,
      direccionDomicilio,
      telefono,
      sexo,
      correo,
      estadoCivil,
      especialidad,
      fotografia,
      consultorio,
      estado,
      rol,
      usuario,
      idUsuario,
    ];

    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0 ? { idUsuario, ...data } : null;
  },

  // Eliminar un usuario por idUsuario
  delete: async (idUsuario) => {
    const query = `
      DELETE FROM usuario WHERE idUsuario = ?
    `;
    const [result] = await pool.execute(query, [idUsuario]);
    return result.affectedRows > 0;
  },
};

module.exports = User;
