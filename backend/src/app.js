const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/usuario.routes');
const titleRoutes = require('./routes/titulo.routes');
const firmaElectronicaRoutes = require('./routes/firmaElectronica.routes');
const jornadaRoutes = require('./routes/jornada.routes');
const pacienteRoutes = require('./routes/paciente.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/title', titleRoutes);
app.use('/firmaelectronica', firmaElectronicaRoutes);
app.use('/jornada', jornadaRoutes);
app.use('/paciente', pacienteRoutes);

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});