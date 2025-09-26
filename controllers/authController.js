const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Gerar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'senac-portal-aluno-secret-key-2024',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email 
          ? 'Email já está em uso' 
          : 'Matrícula já está em uso'
      });
    }

    // Criar novo usuário
    const user = new User({ name, email, password });

    await user.save();

    // Gerar token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      token,
      user: { id: user._id, name: user.name, email: user.email, status: user.status, role: user.role }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// @desc    Login do usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se usuário está ativo
    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Conta desativada. Entre em contato com o administrador.' });
    }

    // Gerar token
    const token = generateToken(user._id);

    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user._id, name: user.name, email: user.email, status: user.status, role: user.role }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// @desc    Obter perfil do usuário logado
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
