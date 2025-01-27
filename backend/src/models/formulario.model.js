const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM formulario';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id) {
    const query = `
        SELECT *
        FROM formulario
        WHERE id_formulario = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
        INSERT INTO formulario (id_formulario_tipo, nro_archivo, id_usuario_creador, fecha_creacion, estado)
        VALUES (?, ?, ?, NOW(), ?)
    `;
    const { id_formulario_tipo, nro_archivo, id_usuario_creador, estado } = data;

    const [result] = await db.query(query, [id_formulario_tipo, nro_archivo, id_usuario_creador, estado]);

    return {
        id_formulario: result.insertId,
        ...data,
    };
}

async function actualizar(id, data) {
    const query = `
        UPDATE formulario
        SET id_formulario_tipo = ?,
            nro_archivo = ?,
            id_usuario_creador = ?,
            estado = ?
        WHERE id_formulario = ?
    `;
    const { id_formulario_tipo, nro_archivo, id_usuario_creador, estado } = data;

    await db.query(query, [id_formulario_tipo, nro_archivo, id_usuario_creador, estado, id]);

    return obtenerPorId(id);
}

async function eliminar(id) {
    const query = `
        DELETE FROM formulario
        WHERE id_formulario = ?
    `;
    await db.query(query, [id]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
};
