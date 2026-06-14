import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email y password son obligatorios' });
    }

    const newUser = await authService.registerUser(email, password);

    res.status(201).json({
      ok: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    if (error.message === 'El correo electrónico ya está registrado') {
      return res.status(400).json({ ok: false, error: error.message });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email y password son obligatorios' });
    }

    const token = await authService.loginUser(email, password);

    res.status(200).json({
      ok: true,
      data: { token }
    });
  } catch (error) {
    if (error.message === 'Credenciales inválidas') return res.status(401).json({ ok: false, error: error.message });
    next(error);
  }
};