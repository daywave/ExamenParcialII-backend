const Loan = require('../../domain/entities/Loan');
const connection = require('../config/database');

const mysql = require('mysql2');

class MySQLLoanRepository {

    constructor() {
        this.initializePool();
    }

    async getAllLoans() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM loans');
            return rows;
        } catch (error) {
            throw error;
        }
    }
    async createLoan(loan) {
        try {
            await connection.promise().beginTransaction();

            // Insertar solo el préstamo en la tabla `Prestamos`
            const [loanResult] = await connection.promise().query(
                'INSERT INTO Prestamos (id_cliente, monto, meses, interes, estado) VALUES (?, ?, ?, ?, ?)',
                [loan.id_cliente, loan.monto, loan.meses, loan.interes, 'PENDIENTE']
            );

            const loanId = loanResult.insertId;

            await connection.promise().commit();

            // Retornar el objeto `Loan` creado
            return new Loan(
                loanId,
                loan.id_cliente,
                loan.monto,
                loan.meses,
                loan.interes,
                'PENDIENTE'
            );
        } catch (error) {
            await connection.promise().rollback();
            throw error;
        }
    }

    async initializePool() {
        try {
            this.pool = await mysql.createPool({
                host: dbConfig.host,
                user: dbConfig.user,
                password: dbConfig.password,
                database: dbConfig.database,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log('Pool de conexiones MySQL inicializado correctamente');
        } catch (error) {
            console.error('Error al inicializar el pool de conexiones MySQL:', error);
            throw error;
        }
    }

    async getLoansByClientId(clientId) {
        try {
            const [loans] = await this.pool.query(`
                SELECT 
                    p.id_prestamo,
                    p.id_cliente,
                    p.monto,
                    p.meses,
                    p.interes,
                    p.estado,
                    c.correo_electronico as email_cliente,
                    c.nombre as nombre_cliente
                FROM prestamos p
                JOIN clientes c ON p.id_cliente = c.id_cliente
                WHERE p.id_cliente = ?
            `, [clientId]);

            console.log('Préstamos encontrados en la base de datos:', loans);
            
            return loans;
        } catch (error) {
            console.error('Error en getLoansByClientId:', error);
            throw error;
        }
    }

}

module.exports = MySQLLoanRepository;