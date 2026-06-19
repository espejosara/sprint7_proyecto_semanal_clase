import prisma from '../lib/prisma.js';

export const getActiveCart = async (userId) => {
  let cart = await prisma.cart.findFirst({
    where: { userId, status: 'ACTIVE' },
    include: { items: { include: { product: true } } }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId, status: 'ACTIVE' },
      include: { items: { include: { product: true } } }
    });
  }
  return cart;
};

export const addItemToCart = async (userId, productId, quantity) => {
  const cart = await getActiveCart(userId);
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  }
  return await prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity }
  });
};

export const removeItemFromCart = async (userId, itemId) => {
  const cart = await getActiveCart(userId);
  const itemBelongsToUser = cart.items.some(item => item.id === itemId);
  if (!itemBelongsToUser) {
    throw new Error('Item no encontrado en tu carrito');
  }
  return await prisma.cartItem.delete({ where: { id: itemId } });
};

export const checkout = async (userId) => {
  const cart = await getActiveCart(userId);
  if (cart.items.length === 0) throw new Error('El carrito esta vacio');

  return await prisma.$transaction(async (tx) => {
    let total = 0;
    const orderItemsData = [];

    for (const item of cart.items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${product?.name ?? item.productId}`);
      }
      total += product.price * item.quantity;
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity }
      });
    }

    const newOrder = await tx.order.create({
      data: { userId, total, items: { create: orderItemsData } }
    });
    await tx.cart.update({ where: { id: cart.id }, data: { status: 'CHECKED_OUT' } });
    return newOrder;
  });
};