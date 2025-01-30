// routes/campo_formulario.routes.js

const express = require('express');
const router = express.Router();

const campoFormularioController = require('../controllers/campo_formulario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los campos de formulario
router.get('/', authMiddleware, campoFormularioController.obtenerCamposFormulario);

// GET: Obtener un campo de formulario por id_campo
router.get('/:id_campo', authMiddleware, campoFormularioController.obtenerCampoFormularioPorId);

// POST: Crear un nuevo campo de formulario
router.post('/', authMiddleware, campoFormularioController.crearCampoFormulario);

// PUT: Actualizar un campo de formulario existente
router.put('/:id_campo', authMiddleware, campoFormularioController.actualizarCampoFormulario);

// DELETE: Eliminar un campo de formulario por id_campo
router.delete('/:id_campo', authMiddleware, campoFormularioController.eliminarCampoFormulario);

module.exports = router;
