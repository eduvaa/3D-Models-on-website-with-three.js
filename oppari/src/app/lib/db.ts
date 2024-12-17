import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "3d-models",
  password: "qwerty",
  port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
