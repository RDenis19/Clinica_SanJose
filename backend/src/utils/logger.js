const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
  ],
  exitOnError: false, // Evita que el logger detenga la aplicación
});

// Manejar excepciones no capturadas
logger.exceptions.handle(
  new transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
);

// Manejar rechazos de promesas no capturados
process.on('unhandledRejection', (ex) => {
  throw ex;
});

module.exports = logger;
