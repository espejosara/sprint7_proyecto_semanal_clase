import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'No autorizado. Falta el token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decodedPayload;
    
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: 'Token inválido o caducado.' });
  }
};