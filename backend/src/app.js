require('express-async-errors');
const express = require("express");
const dotenv = require("dotenv");
const createError = require("http-errors");
const cors = require("cors");
const logger = require("./utils/logger");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();

const app = express();

// Middlewares globales
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/patient", patientRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  next(createError(404, "Ruta no encontrada."));
});

// Middleware de manejo de errores
const errorHandler = require("./middlewares/errorMiddleware");
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});
