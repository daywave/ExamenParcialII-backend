const IUserRepository = require('../../domain/repositories/IUserRepository'); // Asegúrate de que la ruta es correcta
const User = require('../../domain/entities/User'); // Asegúrate de que la ruta es correcta
const connection = require('../config/database'); // Asegúrate de que la conexión esté configurada correctamente

class MySQLUserRepository extends IUserRepository {
    async createUser(user) {

        console.log("Datos que se enviarán a la base de datos:", user);

        // Inserta un nuevo usuario en la base de datos
        const [result] = await connection.promise().query(
            'INSERT INTO Usuarios (nombre, correo_electronico, telefono, password, direccion) VALUES (?, ?, ?, ?, ?)',
            [user.nombre, user.correoElectronico, user.telefono, user.password, user.direccion]
        );
        return new User(result.insertId, user.nombre, user.correoElectronico, user.telefono, user.password, user.direccion);
        

        // Retorna un nuevo objeto User con el ID generado automáticamente
        return new User(result.insertId, user.nombre, user.correoElectronico, user.telefono, user.password);
    }

    async getUserById(id) {
        // Consulta un usuario por su ID
        const [rows] = await connection.promise().query(
            'SELECT * FROM Usuarios WHERE ID = ?',
            [id]
        );

        // Si no encuentra registros, retorna null
        if (rows.length === 0) return null;

        // Retorna un objeto User con los datos obtenidos
        const row = rows[0];
        return new User(row.ID, row.nombre, row.correo_electronico, row.telefono, row.password, row.direccion);
    }

    async getUserByEmail(email) {
        // Consulta un usuario por su correo electrónico
        const [rows] = await connection.promise().query(
            'SELECT * FROM Usuarios WHERE correo_electronico = ?',
            [email]
        );

        console.log("Resultado de la consulta por email :", rows);
        // Si no encuentra registros, retorna null
        if (rows.length === 0) return null;

        // Retorna un objeto User con los datos obtenidos
        const row = rows[0];
        return new User(row.ID, row.nombre, row.correo_electronico, row.telefono, row.password, row.direccion);
    }
    
    async updateUser(user) {
        // Actualiza los datos de un usuario existente
        await connection.promise().query(
            'UPDATE Usuarios SET nombre = ?, correo_electronico = ?, telefono = ?, password = ? , direccion = ?,WHERE ID = ?',
            [user.nombre, user.correoElectronico, user.telefono, user.password, user.direccion, user.id]
        );

        // Retorna el objeto User actualizado
        return user;
    }

    async deleteUser(id) {
        // Elimina un usuario por su ID
        await connection.promise().query(
            'DELETE FROM usuario WHERE ID = ?',
            [id]
        );
    }
}

module.exports = MySQLUserRepository;
