class Amortization {
    constructor(id_amortizacion, id_prestamo, numero_cuota, monto_cuota, fecha_pago, interes_cuota, capital_cuota, saldo_restante) {
        this.id_amortizacion = id_amortizacion;
        this.id_prestamo = id_prestamo;
        this.numero_cuota = numero_cuota;
        this.monto_cuota = monto_cuota;
        this.fecha_pago = fecha_pago;
        this.interes_cuota = interes_cuota;
        this.capital_cuota = capital_cuota;
        this.saldo_restante = saldo_restante;
    }
}


module.exports = Amortization;