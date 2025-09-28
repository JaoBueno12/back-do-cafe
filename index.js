require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  credentials: true
}));

// Habilitar o parser de JSON em todas as rotas
app.use(express.json());

// Root
app.get("/", (req, res) => {
  return res.send("API Cafeteria rodando");
});

// Usar rotas
app.use('/api', routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

async function startDatabase() {
  const { DB_USER, DB_PASS, DB_NAME, MONGODB_URI } = process.env;
  const atlas = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.i1ywpkx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
  const uri = MONGODB_URI || atlas;

  try {
    await mongoose.connect(uri);
    console.log("✅ Conectado ao MongoDB");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB: ", error.message);
    process.exit(1);
  }
}

startDatabase().then(() => {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Servidor Cafeteria rodando na porta ${port}`);
    console.log(` API: http://localhost:${port}/api`);
  });
});
