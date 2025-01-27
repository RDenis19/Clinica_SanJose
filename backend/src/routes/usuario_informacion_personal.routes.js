const express = require('express');
const router = express.Router();

const uipController = require('../controllers/usuario_informacion_personal.controller');

// GET: Todas las filas de información personal
router.get('/', uipController.obtenerInformacionPersonal);

// GET: Una fila por id_informacion_personal
router.get('/:id_informacion_personal', uipController.obtenerInformacionPersonalPorId);

// GET: Información personal por id_usuario
router.get('/usuario/:id_usuario', uipController.obtenerInformacionPersonalPorUsuario);

// POST: Crear nuevo registro de información personal
router.post('/', uipController.crearInformacionPersonal);

// PUT: Actualizar información personal por id_informacion_personal
router.put('/:id_informacion_personal', uipController.actualizarInformacionPersonal);

// DELETE: Eliminar información personal
router.delete('/:id_informacion_personal', uipController.eliminarInformacionPersonal);

module.exports = router;
