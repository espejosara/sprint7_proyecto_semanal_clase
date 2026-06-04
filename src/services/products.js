import prisma from '../config/prismaClient.js';

// Retorna todos los productos
export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

// Busca y retorna un producto por su ID
export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: id }
  }); 
};

// Crea un nuevo producto y lo añade a la base de datos
export const createProduct = async (data) => {
  return await prisma.product.create({
    data: { ...data, stock: data.stock || 0 } // Si no envían stock, le ponemos 0 por defecto
  });
};

// Actualiza un producto existente
export const updateProduct = async (id, dataToUpdate) => {
  const productExists = await getProductById(id);
  if (!productExists) return null; // Si no existe, cortamos aquí

  return await prisma.product.update({
    where: { id: id },
    data: dataToUpdate
  });
};

// Elimina un producto existente
export const deleteProduct = async (id) => {
  const productExists = await getProductById(id);
  if (!productExists) return null; // Si no existe, cortamos aquí

  return await prisma.product.delete({
    where: { id: id }
  });
};