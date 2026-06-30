# Sprint 7 - Proyecto Backend E-commerce

Backend de e-commerce preparado para consumo desde frontend (React Ready), con arquitectura hibrida SQL + MongoDB, autenticacion JWT, carrito, checkout y documentacion Swagger.

## Demo en produccion

- API base: https://sprint7-proyecto-semanal-clase.onrender.com
- Health: https://sprint7-proyecto-semanal-clase.onrender.com/health
- Swagger: https://sprint7-proyecto-semanal-clase.onrender.com/api/docs

## Stack tecnologico

- Node.js 18+
- Express
- Prisma ORM
- PostgreSQL (Supabase)
- MongoDB Atlas (Mongoose)
- JWT
- Swagger UI
- Jest + Supertest
- Helmet, CORS, Rate Limiter

## Arquitectura de datos

### PostgreSQL (Supabase)

- User
- Product
- Cart
- CartItem
- Order
- OrderItem

### MongoDB Atlas

- Review
- Wishlist
- Logs de admin (si aplica segun flujo)

## Estructura del proyecto

```text
src/
  app.js
  server.js
  config/
  controllers/
  middlewares/
  models/
  routes/
  services/
prisma/
  schema.prisma
swagger.json
```

## Variables de entorno

Crea un archivo `.env` con estas variables:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
MONGO_URI="mongodb+srv://..."
JWT_SECRET="tu_secreto"
JWT_EXPIRES_IN="7d"
PORT=3000
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
```

Nota importante:
- Para operaciones de esquema Prisma (`db push`) se usa `DIRECT_URL` en `prisma.config.ts`.
- Si no existe `DIRECT_URL`, se usa `DATABASE_URL` como fallback.
- `JWT_EXPIRES_IN` tiene fallback a `7d` si no se define.
- Las variables de Cloudinary son necesarias para el endpoint `POST /api/uploads/products`.

## Instalacion y ejecucion local

```bash
npm install
npm run db:push
npm run dev
```

Scripts disponibles:

```bash
npm run start
npm run dev
npm run test
npm run db:push
```

## Testing automatizado

- `npm run test` ejecuta la suite completa con Jest.
- Incluye tests unitarios de servicios y tests de endpoints con Supertest.
- Cobertura actual de endpoints:
  - `GET /`
  - `GET /health`
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/uploads/products` (caso 404 esperado al usar metodo incorrecto)

## Endpoints principales

### Sistema

- GET `/`
- GET `/health`

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Usuario

- GET `/api/users/profile` (auth)

### Productos

- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products` (ADMIN)
- PUT `/api/products/:id` (ADMIN)
- DELETE `/api/products/:id` (ADMIN)

### Reviews (MongoDB)

- GET `/api/products/:id/reviews`
- POST `/api/products/:id/reviews` (auth)

### Wishlist (MongoDB)

- GET `/api/wishlist` (auth)
- POST `/api/wishlist/:productId` (auth)

### Carrito y checkout

- GET `/api/cart` (auth)
- POST `/api/cart/items` (auth)
- DELETE `/api/cart/items/:itemId` (auth)
- POST `/api/cart/checkout` (auth)

### Documentacion

- GET `/api/docs`

## Ejemplos de uso real (curl)

Usa la variable `API_BASE` para local o produccion:

```bash
API_BASE="http://localhost:3000"
# API_BASE="https://sprint7-proyecto-semanal-clase.onrender.com"
```

### 1) Login (obtener token)

```bash
curl -X POST "$API_BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }'
```

Respuesta esperada (ejemplo):

```json
{
  "ok": true,
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

### 2) Crear producto (ADMIN)

```bash
curl -X POST "$API_BASE/api/products" \
  -H "Authorization: Bearer TU_TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Camiseta basica",
    "description": "Camiseta gris cloudinary",
    "price": 29.99,
    "stock": 20,
    "imageUrl": "https://res.cloudinary.com/tu_cloud/image/upload/v1/ejemplo.png"
  }'
```

### 3) Subir imagen de producto (ADMIN)

```bash
curl -X POST "$API_BASE/api/uploads/products" \
  -H "Authorization: Bearer TU_TOKEN_ADMIN" \
  -F "image=@/ruta/a/tu/imagen.png"
```

Respuesta esperada (ejemplo):

```json
{
  "ok": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/tu_cloud/image/upload/v1/sprint7-products/archivo.png",
    "publicId": "sprint7-products/archivo"
  }
}
```

## Respuesta estandar de la API

Exito:

```json
{
  "ok": true,
  "data": {}
}
```

Error:

```json
{
  "ok": false,
  "code": "ERROR_CODE",
  "error": "Mensaje"
}
```

## Seguridad implementada

- Helmet
- CORS
- Rate limiting
- Password hashing con bcrypt
- JWT con middleware `authenticate`
- Middleware `requireRole('ADMIN')` para acciones de administracion

## Flujo de compra (resumen)

1. Usuario añade productos al carrito
2. Usuario consulta carrito activo
3. Usuario hace checkout
4. El sistema:
   - valida stock
   - crea `Order` + `OrderItem`
   - calcula total
   - descuenta stock
   - marca carrito como `CHECKED_OUT`

## Pruebas recomendadas en Postman

1. Login user y login admin
2. CRUD completo de productos con admin
3. Flujo user: carrito -> checkout
4. Validar que user normal no puede crear/editar/borrar productos (403)

## Deploy

Proyecto desplegado en Render con auto-deploy desde rama principal.

## Estado del proyecto

Backend React Ready completado:

- Autenticacion y roles
- CRUD productos
- Reviews y wishlist (MongoDB)
- Carrito y checkout
- Swagger operativo
- Deploy operativo
- Cloudinary (subida de imagenes)
- Supertest (tests de endpoints)

## Pendientes y proximos pasos

Pendiente minimo antes de cierre completo:

- Verificar en produccion (`Render`) el endpoint `POST /api/uploads/products` con token ADMIN y archivo real.

Mejoras opcionales:

- Integracion con frontend React para consumo de login, productos, carrito y upload de imagen.
- Ampliar cobertura de tests e2e/endpoint para productos, carrito, checkout, wishlist y reviews.
- Integrar tests en CI (GitHub Actions) para ejecutar `npm run test` en cada push/PR.

## Checklist final de validacion

1. Ejecutar tests automatizados:
  - `npm run test`
2. Validar upload en local:
  - `POST /api/uploads/products` con `multipart/form-data` (`image`)
3. Validar flujo funcional:
  - login -> crear/editar producto (ADMIN) -> carrito -> checkout
4. Validar produccion (`Render`):
  - Confirmar variables de entorno (DB, Mongo, JWT, Cloudinary)
  - Repetir prueba de upload y prueba de health/docs
