import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// ✅ Only require non-optional env vars
const REQUIRED_ENV_VARS = ["DB_HOST", "DB_USER", "DB_NAME"];
REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// ✅ Create MySQL connection pool
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "", // Allow blank password
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Test the connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Successfully connected to MySQL database");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();
