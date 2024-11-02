class Loan {
    constructor(id, idCliente, monto, meses, intereses) {
        this.id = id;
        this.idCliente = idCliente;
        this.monto = monto;
        this.meses = meses;
        this.intereses = intereses;
    }
}

module.exports = Loan;
