// backend/controllers/userController.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByUsername(req.user.usuario);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    // Omitir la contraseña en la respuesta
    const { contraseña, ...userData } = user;

    res.json({ usuario: userData });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};
