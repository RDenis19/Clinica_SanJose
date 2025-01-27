const db = require('../config/db');

async function obtenerTodos() {
  const query = 'SELECT * FROM campo_formulario';
  const [rows] = await db.query(query);
  return rows;
}

async function obtenerPorId(id) {
  const query = 'SELECT * FROM campo_formulario WHERE id_campo = ?';
  const [rows] = await db.query(query, [id]);
  return rows.length ? rows[0] : null;
}

async function obtenerPorFormularioTipo(idFormularioTipo) {
  const query = 'SELECT * FROM campo_formulario WHERE id_formulario_tipo = ?';
  const [rows] = await db.query(query, [idFormularioTipo]);
  return rows;
}

async function crear(data) {
  const query = `
    INSERT INTO campo_formulario (
      id_formulario_tipo,
      nombre_campo,
      tipo_dato,
      requerido,
      opciones
    ) VALUES (?, ?, ?, ?, ?)
  `;
  const { id_formulario_tipo, nombre_campo, tipo_dato, requerido, opciones } = data;

  const [result] = await db.query(query, [
    id_formulario_tipo,
    nombre_campo,
    tipo_dato,
    requerido || 0,
    opciones || null
  ]);

  return {
    id_campo: result.insertId,
    ...data,
  };
}

async function actualizar(id, data) {
  const query = `
    UPDATE campo_formulario
    SET
      id_formulario_tipo = ?,
      nombre_campo = ?,
      tipo_dato = ?,
      requerido = ?,
      opciones = ?
    WHERE id_campo = ?
  `;
  const { id_formulario_tipo, nombre_campo, tipo_dato, requerido, opciones } = data;

  await db.query(query, [
    id_formulario_tipo,
    nombre_campo,
    tipo_dato,
    requerido || 0,
    opciones || null,
    id
  ]);

  return { id_campo: id, ...data };
}

async function eliminar(id) {
  const query = 'DELETE FROM campo_formulario WHERE id_campo = ?';
  await db.query(query, [id]);
  return true;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorFormularioTipo,
  crear,
  actualizar,
  eliminar,
};
