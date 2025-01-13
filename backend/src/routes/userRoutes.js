const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const { body } = require('express-validator');

// Rutas protegidas: solo usuarios autenticados
router.use(protect);

// Validaciones para crear y actualizar usuarios
const userValidationRules = [
  body('identificacion')
    .isLength({ min: 5, max: 10 }).withMessage('La identificación debe tener entre 5 y 10 caracteres.'),
  body('nombres')
    .notEmpty().withMessage('Los nombres son obligatorios.'),
  body('apellidos')
    .notEmpty().withMessage('Los apellidos son obligatorios.'),
  body('correo')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
  body('telefono')
    .isLength({ min: 7, max: 10 }).withMessage('El teléfono debe tener entre 7 y 10 dígitos.'),
  body('rol')
    .isIn(['Admin', 'Doctor', 'Enfermera']).withMessage('Rol inválido.'),
  body('estado')
    .isIn(['Act', 'Ina', 'Sus']).withMessage('Estado inválido.'),
  body('sexo')
    .isIn(['F', 'M']).withMessage('Sexo inválido.'),
  // Añade más validaciones según sea necesario
];

// Obtener todos los usuarios (solo para administradores)
router.get(
  '/',
  restrictTo('Admin'),
  userController.getAllUsers
);

// Crear un nuevo usuario (solo para administradores)
router.post(
  '/',
  restrictTo('Admin'),
  userValidationRules,
  userController.createUser
);

// Obtener un usuario por ID (administradores o el propio usuario)
router.get(
  '/:idUsuario',
  async (req, res, next) => {
    const { idUsuario } = req.params;
    if (req.user.rol === 'Admin' || req.user.idUsuario === parseInt(idUsuario)) {
      next();
    } else {
      throw createError(403, 'Acceso denegado.');
    }
  },
  userController.getUserById
);

// Actualizar un usuario por ID (solo para administradores o el propio usuario)
router.put(
  '/:idUsuario',
  async (req, res, next) => {
    const { idUsuario } = req.params;
    if (req.user.rol === 'Admin' || req.user.idUsuario === parseInt(idUsuario)) {
      next();
    } else {
      throw createError(403, 'Acceso denegado.');
    }
  },
  userValidationRules,
  userController.updateUser
);

// Eliminar un usuario por ID (solo para administradores)
router.delete(
  '/:idUsuario',
  restrictTo('Admin'),
  userController.deleteUser
);

module.exports = router;
