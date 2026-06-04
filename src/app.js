import express from 'express';
import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);
app.use(productsRoutes);

// Middlewares de manejo de errores (¡siempre al final!)
app.use(notFound);
app.use(errorHandler);

export default app;