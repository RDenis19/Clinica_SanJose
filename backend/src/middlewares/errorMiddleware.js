// middlewares/errorMiddleware.js

const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Error del servidor.';

  // Log del error
  logger.error(`${req.method} ${req.originalUrl} - ${message}`);

  res.status(statusCode).json({
    mensaje: message
  });
};

module.exports = errorHandler;
