import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a new PostgreSQL connection pool
// Note: In a real environment, you would provide the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
