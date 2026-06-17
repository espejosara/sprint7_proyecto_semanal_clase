import Wishlist from '../models/wishlist.model.js';

export const getWishlistByUserId = async (userId) => {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, productIds: [] });
  }
  return wishlist;
};

export const toggleProductInWishlist = async (userId, productId) => {
  let wishlist = await getWishlistByUserId(userId);

  const productIndex = wishlist.productIds.indexOf(productId);
  
  if (productIndex > -1) {
    wishlist.productIds.splice(productIndex, 1);
  } else {
    wishlist.productIds.push(productId);
  }
  
  return await wishlist.save();
};