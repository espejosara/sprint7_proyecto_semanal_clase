import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'node:fs';
import rateLimit from 'express-rate-limit';
import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const swaggerDocument = JSON.parse(readFileSync(new URL('../swagger.json', import.meta.url)));

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde."
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(indexRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(usersRoutes);
app.use(reviewsRoutes);
app.use(wishlistRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;