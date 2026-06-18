import process from 'node:process';

try {
  process.loadEnvFile();
} catch (error) {}

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  }
};

