export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role.toUpperCase() !== requiredRole.toUpperCase()) {
      return res.status(403).json({ ok: false, error: 'Acceso denegado. No tienes permisos suficientes.' });
    }
    
    next(); 
  };
};