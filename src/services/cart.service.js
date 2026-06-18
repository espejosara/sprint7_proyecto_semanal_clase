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
  return await prisma.cartItem.delete({ where: { id: itemId } });
};

export const checkout = async (userId) => {
  const cart = await getActiveCart(userId);
  if (cart.items.length === 0) throw new Error('El carrito esta vacio');

  let total = 0;
  const orderItemsData = cart.items.map(item => {
    total += item.product.price * item.quantity;
    return { productId: item.productId, quantity: item.quantity, priceAtPurchase: item.product.price };
  });

  return await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({ data: { userId, total, items: { create: orderItemsData } } });
    await tx.cart.update({ where: { id: cart.id }, data: { status: 'CHECKED_OUT' } });
    return newOrder;
  });
};