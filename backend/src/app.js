// backend/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3301;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', authRoutes);

// Ruta de verificacion de prueba
app.get('/api/hello', (req, res) => {
  res.json({ mensaje: 'Hola desde el servidor Express!' });
});

// Servir el frontend en producción (si decides implementar en el futuro)
if (process.env.NODE_ENV === 'production') {
  // Configura la carpeta estática de React
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Manejar cualquier ruta que no sea la API y servir index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
