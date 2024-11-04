class User {
    constructor(id_usuario, nombre, correoElectronico, telefono, password, direccion) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.correo_electronico = correoElectronico; // Cambiado a correo_electronico para coincidir con la BD
        this.telefono = telefono;
        this.password = password;
        this.direccion = direccion;
    }
}

module.exports = User;