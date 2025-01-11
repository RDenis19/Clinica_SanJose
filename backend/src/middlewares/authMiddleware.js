const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyTokenMiddleware = (req, res, next) => {
  const { authorization: authHeader = '' } = req.headers;

  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ mensaje: 'Acceso restringido. Falta token o formato inválido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso restringido. Falta token.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Error en la verificación de JWT:', error);
    return res
      .status(403)
      .json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = verifyTokenMiddleware;
