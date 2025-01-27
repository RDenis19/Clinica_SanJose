const db = require('../config/db');

async function obtenerTodos() {
  const query = 'SELECT * FROM archivo_clinico';
  const [rows] = await db.query(query);
  return rows;
}

async function obtenerPorId(nroArchivo) {
  const query = 'SELECT * FROM archivo_clinico WHERE nro_archivo = ?';
  const [rows] = await db.query(query, [nroArchivo]);
  return rows.length ? rows[0] : null;
}

async function crear(data) {
  const query = `
    INSERT INTO archivo_clinico (nro_identificacion)
    VALUES (?)
  `;
  const { nro_identificacion } = data;

  const [result] = await db.query(query, [nro_identificacion]);

  return {
    nro_archivo: result.insertId,
    ...data,
  };
}

async function actualizar(nroArchivo, data) {
  const query = `
    UPDATE archivo_clinico
    SET nro_identificacion = ?
    WHERE nro_archivo = ?
  `;
  const { nro_identificacion } = data;

  await db.query(query, [nro_identificacion, nroArchivo]);

  return { nro_archivo: nroArchivo, ...data };
}

async function eliminar(nroArchivo) {
  const query = 'DELETE FROM archivo_clinico WHERE nro_archivo = ?';
  await db.query(query, [nroArchivo]);
  return true;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
