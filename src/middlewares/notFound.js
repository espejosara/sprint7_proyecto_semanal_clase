export const notFound = (req, res, next) => {
  res.status(404).json({
    ok: false,
    code: 'NOT_FOUND',
    error: `Ruta no encontrada: ${req.method} ${req.url}`,
  });
};