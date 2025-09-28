const express = require('express');
const authRoutes = require('./auth');
const productRoutes = require('./products');

const routes = express.Router();

// Healthcheck simples
routes.get('/ping', (req, res) => {
  res.send('pong');
});

// Rotas
routes.use('/auth', authRoutes);
routes.use('/products', productRoutes);

routes.get('/', (req, res) => {
  return res.send('API Cafeteria rodando');
});

module.exports = routes;
