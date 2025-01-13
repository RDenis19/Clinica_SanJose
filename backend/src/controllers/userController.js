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

  // Verificar si existen campos duplicados
  const checkUser = await User.checkBeforeCreateUser(identificacion, usuario, correo);

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
  } = req.body;

  // Verificar si existen campos duplicados (excluir el usuario actual)
  const checkUser = await User.checkBeforeCreateUser(identificacion, usuario, correo, idUsuario);

  if (checkUser.identificacionExists || checkUser.usuarioExists || checkUser.correoExists) {
    return res.status(400).json({
      mensaje: 'Hay campos que ya están en uso.',
      identificacionExists: !!checkUser.identificacionExists,
      usuarioExists: !!checkUser.usuarioExists,
      correoExists: !!checkUser.correoExists,
    });
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
  const deleted = await User.delete(idUsuario);
  if (!deleted) {
    throw createError(404, 'Usuario no encontrado.');
  }

  logger.info(`Eliminado usuario con idUsuario: ${idUsuario}`);

  res.status(200).json({
    mensaje: 'Usuario eliminado exitosamente.'
  });
};
