import prisma from '../lib/prisma.js';

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: id }
  }); 
};

export const createProduct = async (data) => {
  return await prisma.product.create({
    data: { ...data, stock: data.stock || 0 } 
  });
};

export const updateProduct = async (id, dataToUpdate) => {
  const productExists = await getProductById(id);
  if (!productExists) return null; 

  return await prisma.product.update({
    where: { id: id },
    data: dataToUpdate
  });
};

export const deleteProduct = async (id) => {
  const productExists = await getProductById(id);
  if (!productExists) return null;

  return await prisma.product.delete({
    where: { id: id }
  });
};