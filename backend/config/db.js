const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = new URL(process.env.DB_URI);

const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: Number(dbUrl.port),
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  connectTimeout: 20000
});

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
      )
    `);
    connection.release();
    console.log("Conectado a SQL en la nube y tabla Users lista");
  } catch (err) {
    console.error("Error de conexión a SQL:", err.code || err.message, err);
  }
}

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err.message);
  }
}

module.exports = { connectDB, connectMongoDB, pool };