// backend/models/User.js
const pool = require('../config/db');

const User = {
  findByEmail: async (correo) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Usuario WHERE correo = ?',
      [correo]
    );
    return rows[0];
  }
};

module.exports = User;