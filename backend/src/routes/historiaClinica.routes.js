const { Router } = require('express');
const { getHistorias, getHistoria, postHistoria, putHistoria, deleteHistoriaById, } = require('../controllers/historiaClinica.controller');

const router = Router();

// GET /historia -> Obtiene todas las historias clínicas
router.get('/', getHistorias);

// GET /historia/:idHistoriaClinica/:pacienteIdentificacion -> Obtiene una historia específica
router.get('/:pacienteIdentificacion', getHistoria);

// POST /historia -> Crea una nueva historia clínica
router.post('/', postHistoria);

// PUT /historia/:idHistoriaClinica/:pacienteIdentificacion -> Actualiza una historia clínica
router.put('/:idHistoriaClinica/:pacienteIdentificacion', putHistoria);

// DELETE /historia/:idHistoriaClinica/:pacienteIdentificacion -> Elimina una historia clínica
router.delete('/:idHistoriaClinica/:pacienteIdentificacion', deleteHistoriaById);

module.exports = router;
