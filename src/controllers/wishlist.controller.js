import * as wishlistService from '../services/wishlist.service.js';

export const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    res.status(200).json({ ok: true, data: wishlist });
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    
    const updatedWishlist = await wishlistService.toggleProductInWishlist(userId, productId);
    res.status(200).json({ ok: true, data: updatedWishlist });
  } catch (error) {
    next(error);
  }
};