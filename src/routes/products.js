import { Router } from 'express';
import * as productsController from '../controllers/products.js';

const router = Router();

// Endpoint 1: Listar todos los productos
router.get('/api/products', productsController.getAllProducts);

// Endpoint 2: Obtener un producto por ID
router.get('/api/products/:id', productsController.getProductById);

export default router;