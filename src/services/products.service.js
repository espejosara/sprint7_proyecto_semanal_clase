import { products } from '../db/productos.js';

// Retorna todos los productos
export const getAllProducts = () => {
  return products;
};

// Busca y retorna un producto por su ID
export const getProductById = (id) => {
  const idNumber = Number(id);
  const productoEncontrado = products.find(producto => producto.id === idNumber);
  return productoEncontrado; // Retornará el producto o undefined si no lo encuentra
};

// Crea un nuevo producto y lo añade al array
export const createProduct = (data) => {
  // Calculamos el nuevo ID basándonos en el último producto (o 1 si el array está vacío)
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...data };
  products.push(newProduct);
  return newProduct;
};