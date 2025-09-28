const express = require('express');
const { register, login, getMe, validateRegister, validateLogin } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Rotas protegidas
router.get('/me', auth, getMe);

module.exports = router;

