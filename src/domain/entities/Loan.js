class Loan {
    constructor(id_prestamo, id_cliente, monto, meses, interes, estado) {
        this.id_prestamo = id_prestamo;
        this.id_cliente = id_cliente;
        this.monto = monto;
        this.meses = meses;
        this.interes = interes;
        this.estado = estado;
    }

    // Optionally, add any validation or data formatting methods here if needed.
}

module.exports = Loan;
