const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Establecer el código de estado
  const statusCode = err.status || 500;

  // Log del error con Winston
  logger.error(
    `${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  // Respuesta al cliente
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor.',
    // Incluir la pila de errores solo en desarrollo
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
