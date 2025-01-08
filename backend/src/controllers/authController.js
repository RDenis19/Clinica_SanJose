// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validar que se recibieron email y password
  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Por favor, ingresa email y password.' });
  }

  try {
    // Buscar al usuario por correo
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    // Dado que las contraseñas están en texto plano, simplemente comparamos las cadenas
    if (password !== user.contraseña) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.idUsuario, usuario: user.usuario, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Preparar la respuesta sin la contraseña
    const { contraseña, ...userData } = user;

    res.json({
      mensaje: 'Login exitoso.',
      token,
      rol: user.rol,
      usuario: userData
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};
