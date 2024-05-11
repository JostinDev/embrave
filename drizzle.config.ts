import { loadEnvConfig } from '@next/env';
import { type Config } from 'drizzle-kit';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const postgresURL = process.env.POSTGRES_URL;
if (!postgresURL) {
  throw new Error('POSTGRES_URL is not set');
}

export default {
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: postgresURL,
  },
  url: postgresURL,
} satisfies Config;
