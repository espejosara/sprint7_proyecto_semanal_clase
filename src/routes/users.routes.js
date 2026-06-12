import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

// Ruta protegida: Solo usuarios logueados pueden ver su propio perfil
router.get('/api/users/profile', authenticate, usersController.getProfile);

export default router;