import * as productsService from '../services/products.js';

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

export const createProduct = (req, res) => {
  const { name, price, description, stock, imageUrl } = req.body;

  // 1. Validaciones requeridas
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ ok: false, error: { message: "El nombre es obligatorio y debe ser texto" } });
  }
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ ok: false, error: { message: "El precio es obligatorio y debe ser un número >= 0" } });
  }

  // 2. Llamar al servicio si todo es válido
  const newProduct = productsService.createProduct({ name, price, description, stock, imageUrl });
  res.status(201).json({ ok: true, data: newProduct });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock, imageUrl } = req.body;

  // 1. Validaciones (opcionales, solo si el campo viene)
  if (name !== undefined && typeof name !== 'string') {
    return res.status(400).json({ ok: false, error: { message: "El nombre debe ser texto" } });
  }
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ ok: false, error: { message: "El precio debe ser un número >= 0" } });
  }

  // 2. Llamar al servicio para actualizar
  const updatedProduct = productsService.updateProduct(id, { name, price, description, stock, imageUrl });

  // 3. Devolver la respuesta
  if (updatedProduct) {
    res.status(200).json({ ok: true, data: updatedProduct });
  } else {
    // Si el servicio devolvió null, es porque no encontró el producto
    res.status(404).json({ ok: false, error: { message: "Product not found" } });
  }
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const deletedProduct = productsService.deleteProduct(id);

  if (deletedProduct) {
    res.status(200).json({ ok: true, data: deletedProduct });
  } else {
    res.status(404).json({ ok: false, error: { message: "Product not found" } });
  }
};