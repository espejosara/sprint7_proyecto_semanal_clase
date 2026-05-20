import express from 'express';
import indexRoutes from './routes/index.routes.js';
import productsRoutes from './routes/products.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);
app.use(productsRoutes);

export default app;