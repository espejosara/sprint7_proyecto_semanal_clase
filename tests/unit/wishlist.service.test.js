import { jest } from '@jest/globals';


jest.unstable_mockModule('../../src/models/wishlist.model.js', () => ({
  default: {
    findOne: jest.fn()
  }
}));

const { toggleProductInWishlist } = await import('../../src/services/wishlist.service.js');
const { default: Wishlist } = await import('../../src/models/wishlist.model.js');

describe('Wishlist Service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleProductInWishlist', () => {
    it('debería agregar un producto a la wishlist si no existe', async () => {
      const userId = 'user-1';
      const productId = 'product-1';
      
      const mockWishlist = {
        userId,
        productIds: [],
        save: jest.fn().mockResolvedValue(true)
      };

      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await toggleProductInWishlist(userId, productId);

      expect(mockWishlist.productIds).toContain(productId);
      expect(mockWishlist.save).toHaveBeenCalledTimes(1);
    });

    it('debería eliminar un producto de la wishlist si ya existe', async () => {
      const userId = 'user-1';
      const productId = 'product-1';
      
      const mockWishlist = {
        userId,
        productIds: [productId, 'product-2'],
        save: jest.fn().mockResolvedValue(true)
      };
      Wishlist.findOne.mockResolvedValue(mockWishlist);

      await toggleProductInWishlist(userId, productId);

      expect(mockWishlist.productIds).not.toContain(productId);
      expect(mockWishlist.productIds).toContain('product-2');
      expect(mockWishlist.save).toHaveBeenCalledTimes(1);
    });
  });
});