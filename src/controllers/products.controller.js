import * as productsService from '../services/products.service.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({ ok: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoEncontrado = await productsService.getProductById(id);
    
    if (!productoEncontrado) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }
    
    res.status(200).json({ ok: true, data: productoEncontrado });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, imageUrl } = req.body;
    const newProduct = await productsService.createProduct({ name, price, description, stock, imageUrl });
    res.status(201).json({ ok: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, imageUrl } = req.body;
    const updatedProduct = await productsService.updateProduct(id, { name, price, description, stock, imageUrl });

    if (!updatedProduct) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }
    
    res.status(200).json({ ok: true, data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }
    
    res.status(200).json({ ok: true, data: deletedProduct });
  } catch (error) {
    next(error);
  }
};