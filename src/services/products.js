import { products } from '../db/products.js';

// Retorna todos los productos
export const getAllProducts = () => {
  return products;
};

// Busca y retorna un producto por su ID
export const getProductById = (id) => {
  const idNumber = Number(id);
  const productoEncontrado = products.find(producto => producto.id === idNumber);
  return productoEncontrado; 
};

// Crea un nuevo producto y lo añade al array
export const createProduct = (data) => {
  // Calculamos el nuevo ID basándonos en el último producto (o 1 si el array está vacío)
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...data };
  products.push(newProduct);
  return newProduct;
};

// Actualiza un producto existente por su ID
export const updateProduct = (id, dataToUpdate) => {
  const idNumber = Number(id);
  const productIndex = products.findIndex(p => p.id === idNumber);

  if (productIndex === -1) {
    return null; // Retorna null si el producto no se encuentra
  }

  // Actualiza el producto en el array
  const updatedProduct = { ...products[productIndex], ...dataToUpdate };
  products[productIndex] = updatedProduct;
  return updatedProduct;
};

// Elimina un producto existente por su ID
export const deleteProduct = (id) => {
  const idNumber = Number(id);
  const productIndex = products.findIndex(p => p.id === idNumber);

  if (productIndex === -1) {
    return null; // Retorna null si no existe
  }

  const deletedProduct = products.splice(productIndex, 1);
  return deletedProduct[0]; // Retornamos el producto que acabamos de borrar
};