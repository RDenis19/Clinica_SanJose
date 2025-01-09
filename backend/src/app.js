// server.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const createError = require('http-errors');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./utils/logger');

dotenv.config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Importar middleware de manejo de errores
const errorHandler = require('./middlewares/errorMiddleware');

// Middlewares globales
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  next(createError(404, 'Ruta no encontrada.'));
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});
