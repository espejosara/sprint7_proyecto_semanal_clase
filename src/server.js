import app from './app.js';
import { connectDB } from './config/mongo.js';

if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL ERROR: JWT_SECRET no está definido en el archivo .env. Servidor detenido por seguridad.");
  process.exit(1); 
}

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
