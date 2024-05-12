import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const postgresURL = process.env.POSTGRES_URL;
if (!postgresURL) {
  throw new Error('POSTGRES_URL is not set');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: postgresURL,
  },
});
