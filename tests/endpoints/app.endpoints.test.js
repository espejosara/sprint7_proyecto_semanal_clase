import { jest } from '@jest/globals';
import request from 'supertest';

jest.unstable_mockModule('../../src/services/auth.service.js', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

const authService = await import('../../src/services/auth.service.js');
const { default: app } = await import('../../src/app.js');

describe('Endpoint tests with Supertest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('System routes', () => {
    it('GET / should return API metadata', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          message: 'API Ecommerce activa',
          health: '/health',
          docs: '/api/docs',
        }),
      );
    });

    it('GET /health should return server status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ok: true,
        data: { message: 'Servidor funcionando correctamente' },
      });
    });
  });

  describe('Auth routes', () => {
    it('POST /api/auth/register should fail when email or password is missing', async () => {
      const response = await request(app).post('/api/auth/register').send({ email: '' });

      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
      expect(response.body.error).toBe('Email y password son obligatorios');
    });

    it('POST /api/auth/register should create a user', async () => {
      authService.registerUser.mockResolvedValue({
        id: 'user-1',
        email: 'user@test.com',
        role: 'USER',
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'user@test.com', password: 'secret123' });

      expect(response.status).toBe(201);
      expect(authService.registerUser).toHaveBeenCalledWith('user@test.com', 'secret123');
      expect(response.body).toEqual({
        ok: true,
        data: {
          id: 'user-1',
          email: 'user@test.com',
          role: 'USER',
        },
      });
    });

    it('POST /api/auth/login should fail with invalid credentials', async () => {
      authService.loginUser.mockRejectedValue(new Error('Credenciales inválidas'));

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'bad@test.com', password: 'badpass' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ ok: false, error: 'Credenciales inválidas' });
    });

    it('POST /api/auth/login should return a token', async () => {
      authService.loginUser.mockResolvedValue('fake-jwt-token');

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@test.com', password: 'secret123' });

      expect(response.status).toBe(200);
      expect(authService.loginUser).toHaveBeenCalledWith('user@test.com', 'secret123');
      expect(response.body).toEqual({
        ok: true,
        data: { token: 'fake-jwt-token' },
      });
    });

    it('POST /api/auth/logout should return a success message', async () => {
      const response = await request(app).post('/api/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(response.body.message).toContain('Sesión cerrada');
    });
  });

  describe('Not found routes', () => {
    it('GET /api/uploads/products should return not found because upload route is POST', async () => {
      const response = await request(app).get('/api/uploads/products');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        ok: false,
        code: 'NOT_FOUND',
        error: 'Ruta no encontrada: GET /api/uploads/products',
      });
    });
  });
});
