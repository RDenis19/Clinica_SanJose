const User = require('../models/User');
const createError = require('http-errors');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  const usuarios = await User.findAll();
  res.status(200).json({
    mensaje: 'Lista de usuarios obtenida exitosamente.',
    usuarios
  });
};

// Obtener un usuario por idUsuario
exports.getUserById = async (req, res) => {
  const { idUsuario } = req.params;
  const usuario = await User.findById(idUsuario);
  if (!usuario) {
    throw createError(404, 'Usuario no encontrado.');
  }
  logger.info(`Obtenido usuario con idUsuario: ${idUsuario}`);
  res.status(200).json({
    mensaje: 'Usuario obtenido exitosamente.',
    usuario
  });
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  // Validar datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map(err => err.msg).join(', ');
    throw createError(400, errorMsgs);
  }

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
  } = req.body;

<<<<<<< HEAD
  // Verificar si existen campos duplicados
  const checkUser = await User.checkBeforeCreateUser(identificacion, usuario, correo);
=======
  try {
    const checkUser = await User.checkBeforeCreateUsuer(identificacion, usuario, correo);
    console.log(checkUser);
>>>>>>> parent of db55132 (Correcion API user)

  if (checkUser.identificacionExists || checkUser.usuarioExists || checkUser.correoExists) {
    return res.status(400).json({
      mensaje: 'Hay campos que ya están en uso.',
      identificacionExists: !!checkUser.identificacionExists,
      usuarioExists: !!checkUser.usuarioExists,
      correoExists: !!checkUser.correoExists,
    });
  }

  // Crear el usuario
  const newUser = await User.create({
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
  });

  logger.info(`Creado nuevo usuario con idUsuario: ${newUser.idUsuario}`);

  res.status(201).json({
    mensaje: 'Usuario creado exitosamente.',
    usuario: newUser
  });
};

// Actualizar un usuario por idUsuario
exports.updateUser = async (req, res) => {
  const { idUsuario } = req.params;

  // Validar datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map(err => err.msg).join(', ');
    throw createError(400, errorMsgs);
  }

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
    FirmaElectronica_idFirmaElec
  } = req.body;

<<<<<<< HEAD
  // Verificar si existen campos duplicados (excluir el usuario actual)
  const checkUser = await User.checkBeforeCreateUser(identificacion, usuario, correo, idUsuario);

  if (checkUser.identificacionExists || checkUser.usuarioExists || checkUser.correoExists) {
    return res.status(400).json({
      mensaje: 'Hay campos que ya están en uso.',
      identificacionExists: !!checkUser.identificacionExists,
      usuarioExists: !!checkUser.usuarioExists,
      correoExists: !!checkUser.correoExists,
    });
=======
  try {
    // Obtener el usuario actual
    const usuarioActual = await User.findById(idUsuario);
    if (!usuarioActual) {
      throw createError(404, 'Usuario no encontrado.');
    }

    // Verificar si el correo o nombre de usuario se están actualizando a uno existente
    if (correo !== usuarioActual.correo) {
      const [existingUserByCorreo] = await pool.execute('SELECT * FROM usuario WHERE correo = ?', [correo]);
      if (existingUserByCorreo.length > 0) {
        throw createError(409, 'El correo electrónico ya está en uso.');
      }
    }

    if (usuario !== usuarioActual.usuario) {
      const [existingUserByUsername] = await pool.execute('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
      if (existingUserByUsername.length > 0) {
        throw createError(409, 'El nombre de usuario ya está en uso.');
      }
    }

    // Actualizar el usuario
    const updatedUser = await User.update(idUsuario, {
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
      FirmaElectronica_idFirmaElec
    });

    if (!updatedUser) {
      throw createError(500, 'No se pudo actualizar el usuario.');
    }

    logger.info(`Actualizado usuario con idUsuario: ${idUsuario}`);

    res.status(200).json({
      mensaje: 'Usuario actualizado exitosamente.',
      usuario: updatedUser
    });
  } catch (error) {
    logger.error(`Error al actualizar usuario: ${error.message}`);
    next(error);
>>>>>>> parent of db55132 (Correcion API user)
  }

  // Actualizar el usuario
  const updatedUser = await User.update(idUsuario, {
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
    usuario
  });

  if (!updatedUser) {
    throw createError(404, 'Usuario no encontrado.');
  }

  logger.info(`Actualizado usuario con idUsuario: ${idUsuario}`);

  res.status(200).json({
    mensaje: 'Usuario actualizado exitosamente.',
    usuario: updatedUser
  });
};

// Eliminar un usuario por idUsuario
exports.deleteUser = async (req, res) => {
  const { idUsuario } = req.params;
<<<<<<< HEAD
  const deleted = await User.delete(idUsuario);
  if (!deleted) {
    throw createError(404, 'Usuario no encontrado.');
=======

  try {
    const usuario = await User.findById(idUsuario);
    if (!usuario) {
      throw createError(404, 'Usuario no encontrado.');
    }

    const deleted = await User.delete(idUsuario);
    if (!deleted) {
      throw createError(500, 'No se pudo eliminar el usuario.');
    }

    logger.info(`Eliminado usuario con idUsuario: ${idUsuario}`);

    res.status(200).json({
      mensaje: 'Usuario eliminado exitosamente.'
    });
  } catch (error) {
    logger.error(`Error al eliminar usuario: ${error.message}`);
    next(error);
>>>>>>> parent of db55132 (Correcion API user)
  }

  logger.info(`Eliminado usuario con idUsuario: ${idUsuario}`);

  res.status(200).json({
    mensaje: 'Usuario eliminado exitosamente.'
  });
};
