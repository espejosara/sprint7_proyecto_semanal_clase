// src/routes/index.routes.js
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ ok: true, data: { status: 'OK', message: 'Servicio funcional' } });
});

export default router;
