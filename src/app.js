import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aquí configuraremos las rutas más adelante

export default app;