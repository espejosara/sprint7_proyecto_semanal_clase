import { jest } from '@jest/globals';

// Con jest.unstable_mockModule (para ESM), le decimos a Jest que reemplace el modelo
// por una versión "falsa" (un mock) que podemos controlar.
// IMPORTANTE: Esto DEBE ir antes de importar el servicio.
jest.unstable_mockModule('../../models/wishlist.model.js', () => ({
  default: {
    findOne: jest.fn()
  }
}));

// Importamos dinámicamente el servicio y el modelo DESPUÉS del mock
const { toggleProductInWishlist } = await import('../../services/wishlist.service.js');
const { default: Wishlist } = await import('../../models/wishlist.model.js');

describe('Wishlist Service', () => {

  // Limpiamos todos los mocks después de cada test para que no interfieran entre sí.
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleProductInWishlist', () => {
    it('debería agregar un producto a la wishlist si no existe', async () => {
      // 1. Arrange (Preparación)
      const userId = 'user-1';
      const productId = 'product-1';
      
      // Creamos un objeto falso que simula una wishlist vacía y una función "save"
      const mockWishlist = {
        userId,
        productIds: [],
        save: jest.fn().mockResolvedValue(true)
      };

      // Le decimos a nuestro mock que cuando se llame a Wishlist.findOne, devuelva la wishlist falsa.
      Wishlist.findOne.mockResolvedValue(mockWishlist);

      // 2. Act (Ejecución)
      await toggleProductInWishlist(userId, productId);

      // 3. Assert (Verificación)
      expect(mockWishlist.productIds).toContain(productId); // Esperamos que el producto se haya añadido al array.
      expect(mockWishlist.save).toHaveBeenCalledTimes(1); // Esperamos que se haya llamado a la función para guardar.
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

      expect(mockWishlist.productIds).not.toContain(productId); // Esperamos que el producto haya sido eliminado.
      expect(mockWishlist.productIds).toContain('product-2'); // Nos aseguramos que no borró los otros productos.
      expect(mockWishlist.save).toHaveBeenCalledTimes(1);
    });
  });
});