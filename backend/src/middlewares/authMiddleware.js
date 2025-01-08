const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyTokenMiddleware = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  
  // El formato esperado es "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso Restringido'});
  }

  try {
    // Verificar el token sin decodificarlo completamente
    jwt.verify(token, process.env.JWT_SECRET, { complete: false });
    next();
  } catch (error) {
    console.error('Error en la verificación de JWT:', error);
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verifyTokenMiddleware;
