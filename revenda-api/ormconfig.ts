import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '050625gui',
  database: process.env.DB_DATABASE || 'revenda',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts', 'src/db/seeds/*.ts'],
  synchronize: false,
  logging: true,
});
