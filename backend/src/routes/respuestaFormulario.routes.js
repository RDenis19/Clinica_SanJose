const express = require('express');
const router = express.Router();
const respuestaFormularioController = require('../controllers/respuestaFormulario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Obtener todas las respuestas
router.get('/', authMiddleware, respuestaFormularioController.getAllRespuestas);

// Obtener una respuesta por ID
router.get('/:id', authMiddleware, respuestaFormularioController.getRespuestaById);

// Crear una nueva respuesta
router.post('/', authMiddleware, respuestaFormularioController.createRespuesta);

// Actualizar una respuesta existente
router.put('/:id', authMiddleware, respuestaFormularioController.updateRespuesta);

// Eliminar una respuesta
router.delete('/:id', authMiddleware, respuestaFormularioController.deleteRespuesta);

module.exports = router;
