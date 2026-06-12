import { defineConfig } from '@prisma/config';

try {
  process.loadEnvFile();
} catch (error) {}

if (!process.env.DATABASE_URL) {
  console.error("❌ ALERTA: No se encontró DATABASE_URL. Revisa que tu archivo .env esté bien escrito y en la carpeta raíz.");
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});