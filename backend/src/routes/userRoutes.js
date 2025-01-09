// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const { body, param } = require('express-validator');

// Validaciones para crear y actualizar usuarios
const validateUser = [
  body('identificacion')
    .isLength({ min: 10, max: 11 })
    .withMessage('La identificación debe tener entre 10 y 11 caracteres.'),
  body('nombres')
    .notEmpty()
    .withMessage('Los nombres son obligatorios.'),
  body('apellidos')
    .notEmpty()
    .withMessage('Los apellidos son obligatorios.'),
  body('fechaNacimiento')
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser una fecha válida.'),
  body('telefono')
    .isLength({ min: 7, max: 15 })
    .withMessage('El teléfono debe tener entre 7 y 15 caracteres.'),
  body('sexo')
    .isIn(['F', 'M'])
    .withMessage('El sexo debe ser "F" o "M".'),
  body('correo')
    .isEmail()
    .withMessage('El correo electrónico debe ser válido.'),
  body('estadoCivil')
    .optional()
    .isIn(['S', 'C', 'U', 'D', 'V'])
    .withMessage('Estado civil inválido.'),
  body('usuario')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio.'),
  body('contraseña')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.'),
  body('especialidad')
    .notEmpty()
    .withMessage('La especialidad es obligatoria.'),
  body('estado')
    .isIn(['Activo', 'Inactivo', 'Suspendido'])
    .withMessage('Estado inválido.'),
  body('rol')
    .isIn(['Admin', 'Doctor', 'Enfermera'])
    .withMessage('Rol inválido.'),
  body('InternaClinica_idInternaClinica')
    .isInt()
    .withMessage('El ID de InternaClinica debe ser un número entero.'),
  body('FirmaElectronica_idFirmaElec')
    .isInt()
    .withMessage('El ID de FirmaElectronica debe ser un número entero.')
];

// Validaciones para parámetros de ID
const validateId = [
  param('idUsuario')
    .isInt()
    .withMessage('El ID del usuario debe ser un número entero.')
];

// Rutas protegidas: CRUD de usuarios
router.get('/', verifyToken, userController.getAllUsers); // Obtener todos los usuarios
router.post('/', verifyToken, validateUser, userController.createUser); // Crear un nuevo usuario
router.get('/:idUsuario', verifyToken, validateId, userController.getUserById); // Obtener un usuario por ID
router.put('/:idUsuario', verifyToken, validateId.concat(validateUser), userController.updateUser); // Actualizar un usuario por ID
router.delete('/:idUsuario', verifyToken, validateId, userController.deleteUser); // Eliminar un usuario por ID

module.exports = router;
