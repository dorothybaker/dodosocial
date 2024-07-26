import mysql2 from "mysql2";
import { config } from "dotenv";

config();

export const connectToDb = mysql2.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});
