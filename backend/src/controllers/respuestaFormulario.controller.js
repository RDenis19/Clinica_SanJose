const RespuestaFormulario = require('../models/respuestaFormularioModel');

const getAllRespuestas = async (req, res) => {
    try {
        const respuestas = await RespuestaFormulario.getAllRespuestas();
        res.status(200).json(respuestas);
    } catch (error) {
        console.error('Error al obtener las respuestas:', error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const getRespuestaById = async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await RespuestaFormulario.getRespuestaById(id);
        if (!respuesta) {
            return res.status(404).json({ message: 'Respuesta no encontrada.' });
        }
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al obtener la respuesta:', error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const createRespuesta = async (req, res) => {
    const { id_formulario, id_campo, valor } = req.body;

    if (!id_formulario || !id_campo) {
        return res.status(400).json({ message: 'id_formulario e id_campo son obligatorios.' });
    }

    try {
        const nuevaRespuesta = await RespuestaFormulario.createRespuesta({ id_formulario, id_campo, valor });
        res.status(201).json(nuevaRespuesta);
    } catch (error) {
        console.error('Error al crear la respuesta:', error.message);
        if (error.message === 'Ya existe una respuesta para este formulario y campo.') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const updateRespuesta = async (req, res) => {
    const { id } = req.params;
    const { valor } = req.body;

    if (valor === undefined) {
        return res.status(400).json({ message: 'El campo valor es obligatorio para actualizar.' });
    }

    try {
        const respuestaActualizada = await RespuestaFormulario.updateRespuesta(id, valor);
        if (!respuestaActualizada) {
            return res.status(404).json({ message: 'Respuesta no encontrada.' });
        }
        res.status(200).json(respuestaActualizada);
    } catch (error) {
        console.error('Error al actualizar la respuesta:', error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const deleteRespuesta = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await RespuestaFormulario.deleteRespuesta(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Respuesta no encontrada.' });
        }
        res.status(200).json({ message: 'Respuesta eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar la respuesta:', error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {
    getAllRespuestas,
    getRespuestaById,
    createRespuesta,
    updateRespuesta,
    deleteRespuesta
};
