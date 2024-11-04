class Client {
    constructor(id_cliente, id_usuario, nombre, direccion, telefono, correo_electronico) {
        this.id_cliente = id_cliente;
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo_electronico = correo_electronico;
    }
}

module.exports = Client;
