import * as productsService from '../services/products.service.js';

export const getAllProducts = (req, res) => {
  const products = productsService.getAllProducts();
  res.status(200).json({ ok: true, data: products });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const productoEncontrado = productsService.getProductById(id);
  
  if (productoEncontrado) {
    res.status(200).json({ ok: true, data: productoEncontrado });
  } else {
    res.status(404).json({ ok: false, error: { message: "Product not found" } });
  }
};