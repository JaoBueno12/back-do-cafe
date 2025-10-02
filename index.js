require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

// CORS
app.use(cors());

// Habilitar o parser de JSON em todas as rotas
app.use(express.json());

// Root
app.get("/", (req, res) => {
  return res.send("API Cafeteria rodando");
});

// Usar rotas
app.use('/api', routes);

// Rota de teste
app.get("/ping", (req, res) => {
  console.log("recebeu ping");
  res.send("pong");
});

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
    console.error("⚠️ Aviso: MongoDB não conectado - ", error.message);
    console.log("⚠️ Servidor continuará rodando sem banco de dados");
  }
}

const port = process.env.PORT || 3001;

startDatabase().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`\n✅ Servidor Cafeteria rodando na porta ${port}`);
    console.log(`📡 API: http://localhost:${port}/api`);
    
    // Mostra o IP local para uso com Expo
    const os = require('os');
    const interfaces = os.networkInterfaces();
    console.log('\n🌐 URLs para dispositivos móveis:');
    Object.keys(interfaces).forEach(iface => {
      interfaces[iface].forEach(details => {
        if (details.family === 'IPv4' && !details.internal) {
          console.log(`   http://${details.address}:${port}/api`);
        }
      });
    });
    console.log('');
  });
}).catch(err => {
  console.error("❌ Erro ao iniciar servidor:", err);
});