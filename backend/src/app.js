const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const rolRoutes = require('./routes/rol.routes');
const usuarioInformacionPersonalRoutes = require('./routes/usuario_informacion_personal.routes');
const usuarioInformacionAcademicaRoutes = require('./routes/usuario_informacion_academica.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/rol', rolRoutes);
app.use('/uip', usuarioInformacionPersonalRoutes);
app.use('/uia', usuarioInformacionAcademicaRoutes);

// Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
