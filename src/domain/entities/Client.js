class Client {
    constructor(id, nombre, direccion, telefono, correoElectronico, idUsuario) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correoElectronico = correoElectronico;
        this.idUsuario = idUsuario;
    }
}

module.exports = Client;
