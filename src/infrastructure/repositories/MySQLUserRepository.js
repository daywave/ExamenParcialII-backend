const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
const connection = require('../config/database');

class MySQLUserRepository extends IUserRepository {
    async createUser(user) {
        console.log("Datos que se enviarán a la base de datos:", user);

        const [result] = await connection.promise().query(
            'INSERT INTO Usuarios (nombre, correo_electronico, telefono, password, direccion) VALUES (?, ?, ?, ?, ?)',
            [user.nombre, user.correoElectronico, user.telefono, user.password, user.direccion]
        );
        
        // Usar id_usuario en lugar de ID o insertId
        return new User(
            result.insertId, 
            user.nombre, 
            user.correoElectronico, 
            user.telefono, 
            user.password, 
            user.direccion
        );
    }

    async getUserByEmail(email) {
        try {
            console.log("Consultando usuario con email:", email);
            
            const [rows] = await connection.promise().query(
                'SELECT * FROM Usuarios WHERE correo_electronico = ?',
                [email]
            );
    
            console.log("Resultado directo de la base de datos:", rows);
            
            if (rows.length === 0) {
                console.log("No se encontró usuario con ese email");
                return null;
            }
    
            const row = rows[0];
            console.log("Datos de la fila:", row);
    
            const user = new User(
                row.id_usuario,
                row.nombre,
                row.correo_electronico,
                row.telefono,
                row.password,
                row.direccion
            );
    
            console.log("Usuario construido:", user);
            return user;
        } catch (error) {
            console.error("Error en getUserByEmail:", error);
            throw error;
        }
    }
    
    async updateUser(user) {
        await connection.promise().query(
            'UPDATE Usuarios SET nombre = ?, correo_electronico = ?, telefono = ?, password = ?, direccion = ? WHERE id_usuario = ?', // Cambiar ID por id_usuario
            [
                user.nombre, 
                user.correoElectronico, 
                user.telefono, 
                user.password, 
                user.direccion, 
                user.id_usuario // Cambiar id por id_usuario
            ]
        );

        return user;
    }

    async deleteUser(id) {
        await connection.promise().query(
            'DELETE FROM Usuarios WHERE id_usuario = ?', // Cambiar ID por id_usuario
            [id]
        );
    }
}

module.exports = MySQLUserRepository;