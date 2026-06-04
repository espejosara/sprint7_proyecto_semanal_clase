export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Muestra el error feo en tu terminal para que tú lo veas
  res.status(500).json({ ok: false, error: { message: err.message || "Error interno del servidor" } }); // Le muestra un error bonito al cliente
};