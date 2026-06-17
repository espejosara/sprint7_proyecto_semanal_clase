import { jest } from '@jest/globals';

// 1. Mockeamos las librerías externas y Prisma ANTES de importar el servicio
jest.unstable_mockModule('bcrypt', () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn()
  }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn()
  }
}));

jest.unstable_mockModule('../../lib/prisma.js', () => ({
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
}));

// 2. Importamos las dependencias dinámicamente
const { default: bcrypt } = await import('bcrypt');
const { default: jwt } = await import('jsonwebtoken');
const { default: prisma } = await import('../../src/lib/prisma.js');
const { registerUser, loginUser } = await import('../../src/services/auth.service.js');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('debería hashear la contraseña y crear el usuario', async () => {
      prisma.user.findUnique.mockResolvedValue(null); // Simulamos que el correo está libre
      bcrypt.hash.mockResolvedValue('hashedPassword123'); // Simulamos el hash resultante
      prisma.user.create.mockResolvedValue({ id: 1, email: 'test@test.com' });

      await registerUser('test@test.com', 'password123');

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { email: 'test@test.com', password: 'hashedPassword123' }
      });
    });
  });

  describe('loginUser', () => {
    it('debería comparar las contraseñas y devolver un token', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@test.com', password: 'hashedPassword123', role: 'USER' });
      bcrypt.compare.mockResolvedValue(true); // Simulamos que la contraseña coincide
      jwt.sign.mockReturnValue('fake-jwt-token');

      const token = await loginUser('test@test.com', 'password123');

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
      expect(token).toBe('fake-jwt-token');
    });
  });
});