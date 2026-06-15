import app from './app.js';

if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL ERROR: JWT_SECRET no está definido en el archivo .env. Servidor detenido por seguridad.");
  process.exit(1); 
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
