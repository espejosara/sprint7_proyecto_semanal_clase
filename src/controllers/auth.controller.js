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
    next(error);
  }
};