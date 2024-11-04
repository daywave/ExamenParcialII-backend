require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificar la conexión
pool.getConnection((error, connection) => {
    if (error) {
        console.error('Error al conectar con la base de datos:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
    connection.release();
});

module.exports = pool.promise(); // Exportamos la versión promise del pool