import * as cartService from '../services/cart.service.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getActiveCart(req.user.userId);
    res.status(200).json({ ok: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ ok: false, error: 'productId y quantity (>=1) son obligatorios' });
    }
    const item = await cartService.addItemToCart(req.user.userId, productId, Number(quantity));
    res.status(201).json({ ok: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await cartService.removeItemFromCart(req.user.userId, itemId);
    res.status(200).json({ ok: true, message: 'Item eliminado del carrito' });
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
    const order = await cartService.checkout(req.user.userId);
    res.status(201).json({ ok: true, data: order });
  } catch (error) {
    if (error.message === 'El carrito esta vacio') {
      return res.status(400).json({ ok: false, error: error.message });
    }
    if (error.message.startsWith('Stock insuficiente')) {
      return res.status(400).json({ ok: false, error: error.message });
    }
    next(error);
  }
};
