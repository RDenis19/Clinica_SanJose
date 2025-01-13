// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Ingresa email y password' });
  }

  try {
    const user = await User.findByEmail(email);

    if (user.estado == 'Ina' || user.estado == 'Sus') {
      return res.status(401).json({ mensaje: 'Usuario no disponible' })
    }

    if (email !== user.correo) {
      return res.status(401).json({ mensaje: 'Correo invalido' });
    }

    if (password !== user.contraseña) {
      return res.status(401).json({ mensaje: 'Contraseña invalida' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.idUsuario,},
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      mensaje: 'Login exitoso.',
      token,
      rol
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};
