const express = require('express');
const router = express.Router();

const campoController = require('../controllers/campo_formulario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los campos de formulario
router.get('/', authMiddleware, campoController.obtenerCampos);

// GET: Obtener un campo de formulario por ID
router.get('/:id_campo', authMiddleware, campoController.obtenerCampoPorId);

// GET: Obtener campos de formulario por id_formulario_tipo
router.get('/formulario_tipo/:id_formulario_tipo', authMiddleware, campoController.obtenerCamposPorFormularioTipo);

// POST: Crear un nuevo campo de formulario
router.post('/', authMiddleware, campoController.crearCampo);

// PUT: Actualizar un campo de formulario existente
router.put('/:id_campo', authMiddleware, campoController.actualizarCampo);

// DELETE: Eliminar un campo de formulario
router.delete('/:id_campo', authMiddleware, campoController.eliminarCampo);

module.exports = router;
