const pool = require("../config/db");

const User = {
  // Obtener tabla basica de usuarios
  findAll: async () => {
    const [rows] = await pool.execute(`
      SELECT 
      idUsuario,
      identificacion,
      nombres,
      apellidos,
      correo,
      rol,
      estado
      FROM usuario
    `);
    return rows;
  },

  //Buscar usuario por su correo
  findByEmail: async (email) => {
    const [rows] = await pool.execute(
      `
      SELECT
        idUsuario,
        correo,
        contraseña,
        estado,
        rol
      FROM usuario
      WHERE correo = ?
    `,
      [email]
    );

    return rows[0];
  },

  // Obtener un usuario por idUsuario
  findById: async (idUsuario) => {
    const [rows] = await pool.execute(
      `
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
        contraseña,
        fechaCreacion,
        fechaModificacion
      FROM 
        usuario
      WHERE 
        idUsuario = ?;
    `,
      [idUsuario]
    );
    return rows[0];
  },

  //Verificar si existe una cedula, usuario y correo
  checkBeforeCreateUsuer: async (identificacion, usuario, correo) => {
    const [rows] = await pool.execute(
      `
      SELECT 
        EXISTS(SELECT 1 FROM usuario WHERE identificacion = ?) AS identificacion,
        EXISTS(SELECT 1 FROM usuario WHERE usuario = ?)  AS usuario,
        EXISTS(SELECT 1 FROM usuario WHERE correo = ?) AS correo
      FROM DUAL;
      `,
      [identificacion, usuario, correo]
    );
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

    const [result] = await pool.execute(
      `
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
      `,
      [
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
      ]
    );

    return { idUsuario: result.insertId, ...data };
  },

  // Actualizar un usuario por idUsuario
  update: async (idUsuario, data) => {
    const {
      identificacion,
      nombres,
      apellidos,
      fechaNacimiento,
      direccion,
      telefono,
      sexo,
      correo,
      estadoCivil,
      usuario,
      contraseña,
      especialidad,
      fotografia,
      consultorio,
      estado,
      rol,
      InternaClinica_idInternaClinica,
      FirmaElectronica_idFirmaElec,
    } = data;

    const [result] = await pool.execute(
      `
      UPDATE usuario SET 
        identificacion = ?, 
        nombres = ?, 
        apellidos = ?, 
        fechaNacimiento = ?, 
        direccion = ?, 
        telefono = ?, 
        sexo = ?, 
        correo = ?, 
        estadoCivil = ?, 
        usuario = ?, 
        contraseña = ?, 
        especialidad = ?, 
        fotografia = ?, 
        consultorio = ?, 
        estado = ?, 
        rol = ?, 
        InternaClinica_idInternaClinica = ?, 
        FirmaElectronica_idFirmaElec = ?
      WHERE idUsuario = ?
    `,
      [
        identificacion,
        nombres,
        apellidos,
        fechaNacimiento,
        direccion,
        telefono,
        sexo,
        correo,
        estadoCivil,
        usuario,
        contraseña,
        especialidad,
        fotografia,
        consultorio,
        estado,
        rol,
        InternaClinica_idInternaClinica,
        FirmaElectronica_idFirmaElec,
        idUsuario,
      ]
    );

    return result.affectedRows > 0 ? { idUsuario, ...data } : null;
  },

  // Eliminar un usuario por idUsuario
  delete: async (idUsuario) => {
    const [result] = await pool.execute(
      `
      DELETE FROM usuario WHERE idUsuario = ?
    `,
      [idUsuario]
    );
    return result.affectedRows > 0;
  },
};

module.exports = User;
