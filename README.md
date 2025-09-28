# 🍵 Sistema de Cafeteria - Frontend + Backend

Sistema completo de cafeteria com autenticação, menu de produtos e carrinho de compras.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (local ou Atlas)
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio / Xcode (para desenvolvimento mobile)

## 🚀 Configuração e Instalação

### 1. Backend (Node.js + Express + MongoDB)

```bash
cd back-do-cafe-main
npm install
```

#### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `back-do-cafe-main` com as seguintes variáveis:

```env
# Configurações do Banco de Dados MongoDB
DB_USER=seu_usuario_mongodb
DB_PASS=sua_senha_mongodb
DB_NAME=cafeteria_db
MONGODB_URI=mongodb://localhost:27017/cafeteria_db

# Configurações JWT
JWT_SECRET=cafeteria-super-secret-key-2024
JWT_EXPIRES_IN=7d

# Configurações do Servidor
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:8081
```

#### Executar o Backend

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start

# Testar conexão com banco
npm run test:connection

# Popular banco com dados de exemplo
npm run seed
```

### 2. Frontend (React Native + Expo)

```bash
cd caf-front-main
npm install
```

#### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `caf-front-main`:

```env
# URL da API Backend
EXPO_PUBLIC_API_URL=http://localhost:3001/api

# Configurações de desenvolvimento
EXPO_PUBLIC_ENV=development
```

#### Executar o Frontend

```bash
# Iniciar o Expo
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no Web
npm run web
```

## 🔧 Funcionalidades Implementadas

### Backend
- ✅ Autenticação JWT (login/registro)
- ✅ Validação de dados com express-validator
- ✅ Middleware de autenticação robusto
- ✅ Modelo de usuário com roles (customer, admin, staff)
- ✅ CORS configurado
- ✅ Tratamento de erros aprimorado
- ✅ Scripts de teste e seed

### Frontend
- ✅ Tela de login
- ✅ Tela de registro
- ✅ Store de autenticação com Zustand
- ✅ Persistência de dados com AsyncStorage
- ✅ Tratamento de erros melhorado
- ✅ API client com suporte a autenticação

## 🧪 Usuários de Teste

Após executar `npm run seed` no backend, você terá os seguintes usuários:

- **Cliente**: `joao@teste.com` / `123456`
- **Admin**: `admin@teste.com` / `123456`
- **Staff**: `staff@teste.com` / `123456`

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter perfil (requer autenticação)

### Outros
- `GET /api/ping` - Health check
- `GET /` - Status da API

## 🐛 Solução de Problemas

### Backend não conecta ao MongoDB
1. Verifique se o MongoDB está rodando
2. Confirme as credenciais no arquivo `.env`
3. Execute `npm run test:connection` para diagnosticar

### Frontend não conecta ao Backend
1. Verifique se o backend está rodando na porta 3001
2. Confirme a URL no arquivo `.env` do frontend
3. Verifique se não há firewall bloqueando a conexão

### Erro de CORS
1. Verifique se `CORS_ORIGIN` no backend está correto
2. Para desenvolvimento mobile, use o IP da sua máquina em vez de localhost

## 📱 Desenvolvimento Mobile

Para desenvolvimento mobile, você precisará:

1. **Android**: Instalar Android Studio e configurar emulador
2. **iOS**: Instalar Xcode (apenas no macOS)
3. **Expo Go**: App para testar no dispositivo físico

### Usando IP Real (para dispositivo físico)

Se quiser testar no dispositivo físico, substitua `localhost` pelo IP da sua máquina:

```env
# Backend
CORS_ORIGIN=http://192.168.1.100:8081

# Frontend
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001/api
```

## 🚀 Próximos Passos

- [ ] Implementar CRUD de produtos
- [ ] Sistema de carrinho de compras
- [ ] Sistema de pedidos
- [ ] Upload de imagens
- [ ] Notificações push
- [ ] Testes automatizados

## 📄 Licença

Este projeto é para fins educacionais.
