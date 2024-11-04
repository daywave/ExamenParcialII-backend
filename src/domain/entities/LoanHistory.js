class LoanHistory {
    constructor(id_historial, id_prestamo, fecha, estado_anterior, estado_nuevo, accion) {
        this.id_historial = id_historial;
        this.id_prestamo = id_prestamo;
        this.fecha = fecha;
        this.estado_anterior = estado_anterior;
        this.estado_nuevo = estado_nuevo;
        this.accion = accion;
    }
}


module.exports = LoanHistory;