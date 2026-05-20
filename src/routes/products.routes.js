import { Router } from 'express';
import { products } from '../db/productos.js';

const router = Router();

// Endpoint 1: Listar todos los productos
router.get('/api/products', (req, res) => {
  res.status(200).json({ ok: true, data: products });
});

// Endpoint 2: Obtener un producto por ID
router.get('/api/products/:id', (req, res) => {
  const idString = req.params.id; 
  
  const idNumber = Number(idString);
  const productoEncontrado = products.find(producto => producto.id === idNumber);
  
  if (productoEncontrado) {
    res.status(200).json({ ok: true, data: productoEncontrado });
  } else {
    res.status(404).json({ ok: false, error: { message: "Product not found" } });
  }
});

export default router;