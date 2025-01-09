const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta Publica: Login
router.post('/login', authController.login);

module.exports = router;
