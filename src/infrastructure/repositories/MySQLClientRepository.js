const IClientRepository = require('../../domain/repositories/IClientRepository');
const Client = require('../../domain/entities/Client');
const connection = require('../config/database');


class MySQLClientRepository extends IClientRepository {
    async createClient(client) {
        try {
            const [result] = await connection.promise().query(
                'INSERT INTO Clientes (id_usuario, nombre, direccion, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?)',
                [client.id_usuario, client.nombre, client.direccion, client.telefono, client.correo_electronico]
            );

            return new Client(
                result.insertId,
                client.id_usuario,
                client.nombre,
                client.direccion,
                client.telefono,
                client.correo_electronico
            );
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }

    async getClientById(id) {
        try {
            const [rows] = await connection.promise().query(
                'SELECT * FROM Clientes WHERE id_cliente = ?',
                [id]
            );

            if (rows.length === 0) return null;

            const row = rows[0];
            return new Client(
                row.id_cliente,
                row.id_usuario,
                row.nombre,
                row.direccion,
                row.telefono,
                row.correo_electronico
            );
        } catch (error) {
            console.error('Error al obtener cliente por ID:', error);
            throw error;
        }
    }

    async getClientsByUserId(userId) {
        try {
            const [rows] = await connection.promise().query(
                'SELECT * FROM Clientes WHERE id_usuario = ?',
                [userId]
            );

            return rows.map(row => new Client(
                row.id_cliente,
                row.id_usuario,
                row.nombre,
                row.direccion,
                row.telefono,
                row.correo_electronico
            ));
        } catch (error) {
            console.error('Error al obtener clientes por ID de usuario:', error);
            throw error;
        }
    }

    async getClientByEmail(email) {
        try {
            const [rows] = await connection.promise().query(
                'SELECT * FROM Clientes WHERE correo_electronico = ?',
                [email]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error al obtener cliente por correo:', error);
            throw error;
        }
    }
    
    async updateClient(client) {
        try {
            await connection.promise().query(
                'UPDATE Clientes SET nombre = ?, direccion = ?, telefono = ?, correo_electronico = ? WHERE id_cliente = ?',
                [client.nombre, client.direccion, client.telefono, client.correo_electronico, client.id_cliente]
            );

            return client;
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            throw error;
        }
    }

    async deleteClient(id) {
        try {
            await connection.promise().query(
                'DELETE FROM Clientes WHERE id_cliente = ?',
                [id]
            );
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }
}

module.exports = MySQLClientRepository;