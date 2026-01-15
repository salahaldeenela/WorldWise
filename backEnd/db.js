import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: "switchback.proxy.rlwy.net",
  port: 52426,
  user: "root",
  password: "XxMpAvxJkvMwSeShiCVsFfcyzceyHwbg",
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,
});
