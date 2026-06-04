export const notFound = (req, res, next) => {
  res.status(404).json({ ok: false, error: { message: "Ruta no encontrada" } });
};