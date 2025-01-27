const campoModel = require('../models/campo_formulario.model');

exports.obtenerCampos = async (req, res) => {
    try {
        const campos = await campoModel.obtenerTodos();
        return res.json(campos);
    } catch (error) {
        console.error('Error al obtener campos de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener campos de formulario' });
    }
};

exports.obtenerCampoPorId = async (req, res) => {
    const { id_campo } = req.params;
    try {
        const campo = await campoModel.obtenerPorId(id_campo);
        if (!campo) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }
        return res.json(campo);
    } catch (error) {
        console.error('Error al obtener campo de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener campo de formulario' });
    }
};

exports.obtenerCamposPorFormularioTipo = async (req, res) => {
    const { id_formulario_tipo } = req.params;
    try {
        const campos = await campoModel.obtenerPorFormularioTipo(id_formulario_tipo);
        return res.json(campos);
    } catch (error) {
        console.error('Error al obtener campos por tipo de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener campos por tipo de formulario' });
    }
};

exports.crearCampo = async (req, res) => {
    try {
        const {
            id_formulario_tipo,
            nombre_campo,
            tipo_dato,
            requerido,
            opciones
        } = req.body;

        if (!id_formulario_tipo || !nombre_campo || !tipo_dato) {
            return res.status(400).json({
                message: 'Faltan campos requeridos: id_formulario_tipo, nombre_campo, tipo_dato'
            });
        }

        const tiposValidos = ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'ENUM', 'FLOAT'];
        if (!tiposValidos.includes(tipo_dato)) {
            return res.status(400).json({
                message: `tipo_dato inválido. Debe ser uno de: ${tiposValidos.join(', ')}`
            });
        }

        if (tipo_dato === 'ENUM' && !opciones) {
            return res.status(400).json({
                message: 'El campo "opciones" es obligatorio cuando tipo_dato es "ENUM"'
            });
        }

        const nuevoCampo = await campoModel.crear({
            id_formulario_tipo,
            nombre_campo,
            tipo_dato,
            requerido: requerido ? 1 : 0,
            opciones: opciones || null
        });

        return res.status(201).json(nuevoCampo);
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        return res.status(500).json({ message: 'Error al crear campo de formulario' });
    }
};

exports.actualizarCampo = async (req, res) => {
    const { id_campo } = req.params;
    try {
        const {
            id_formulario_tipo,
            nombre_campo,
            tipo_dato,
            requerido,
            opciones
        } = req.body;

        if (!id_formulario_tipo || !nombre_campo || !tipo_dato) {
            return res.status(400).json({
                message: 'Faltan campos requeridos: id_formulario_tipo, nombre_campo, tipo_dato'
            });
        }

        const tiposValidos = ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'ENUM', 'FLOAT'];
        if (!tiposValidos.includes(tipo_dato)) {
            return res.status(400).json({
                message: `tipo_dato inválido. Debe ser uno de: ${tiposValidos.join(', ')}`
            });
        }

        if (tipo_dato === 'ENUM' && !opciones) {
            return res.status(400).json({
                message: 'El campo "opciones" es obligatorio cuando tipo_dato es "ENUM"'
            });
        }

        const campoExistente = await campoModel.obtenerPorId(id_campo);
        if (!campoExistente) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }

        const campoActualizado = await campoModel.actualizar(id_campo, {
            id_formulario_tipo,
            nombre_campo,
            tipo_dato,
            requerido: requerido ? 1 : 0,
            opciones: opciones || null
        });

        return res.json(campoActualizado);
    } catch (error) {
        console.error('Error al actualizar campo de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar campo de formulario' });
    }
};

exports.eliminarCampo = async (req, res) => {
    const { id_campo } = req.params;
    try {
        const campo = await campoModel.obtenerPorId(id_campo);
        if (!campo) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }

        await campoModel.eliminar(id_campo);
        return res.json({ message: 'Campo de formulario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar campo de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar campo de formulario' });
    }
};
