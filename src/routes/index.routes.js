import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ ok: true, data: { message: 'Servidor funcionando correctamente' } });
});

export default router;