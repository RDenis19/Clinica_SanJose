// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas protegidas: CRUD de usuarios
router.get('/', verifyToken, userController.getAllUsers); // Obtener todos los usuarios
router.post('/', verifyToken, userController.createUser); // Crear un nuevo usuario
router.get('/:idUsuario', verifyToken, userController.getUserById); // Obtener un usuario por ID
router.put('/:idUsuario', verifyToken, userController.updateUser); // Actualizar un usuario por ID
router.delete('/:idUsuario', verifyToken, userController.deleteUser); // Eliminar un usuario por ID

module.exports = router;
