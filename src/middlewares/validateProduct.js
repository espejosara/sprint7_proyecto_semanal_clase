export const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (req.method === 'POST') {
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        ok: false,
        error: "El campo 'name' es obligatorio y debe ser texto",
      });
    }
    if (price === undefined || typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        ok: false,
        error: "El campo 'price' es obligatorio y debe ser un número >= 0",
      });
    }
  } else if (req.method === 'PUT') {
    if (name !== undefined && typeof name !== 'string') {
      return res.status(400).json({ ok: false, error: "El campo 'name' debe ser texto" });
    }
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return res.status(400).json({ ok: false, error: "El campo 'price' debe ser un número >= 0" });
    }
  }

  next(); // Si las validaciones pasan, le decimos que continúe hacia el controlador
};