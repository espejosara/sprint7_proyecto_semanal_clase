import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    data: {
      message: 'API Ecommerce activa',
      health: '/health',
      docs: '/api/docs'
    }
  });
});

router.get('/health', (req, res) => {
  res.status(200).json({ ok: true, data: { message: 'Servidor funcionando correctamente' } });
});

export default router;