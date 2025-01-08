const pool = require('../config/db');

const User = {
  findByEmail: async (correo) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Usuario WHERE correo = ?',
      [correo]
    );
    return rows[0];
  },

  findUsers: async () => {
    const [rows] = await pool.execute(
      'SELECT * FROM Usuario'
    );
    return rows[0];
  }
};

module.exports = User;