import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.js';
import authRoutes from './routes/auth.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por cada IP en esos 15 minutos
  message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde."
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);
app.use(authRoutes);
app.use(productsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;