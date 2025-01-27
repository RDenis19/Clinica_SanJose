const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Cargar rutas
const authRoutes = require('./routes/auth.routes'); // Por ahora solo autenticación

// Crear la aplicación de Express
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Permitir que el servidor procese JSON

// Configurar rutas principales
app.use('/api/auth', authRoutes); // Ruta para autenticación

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido al backend de Clínica San José');
});

// Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Puerto del servidor
const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
