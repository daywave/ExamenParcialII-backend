class AmortizationService {
    static calculateAmortizationTable(monto, meses, interes) {
        const amortizationTable = [];
        let saldo = monto;
        const monthlyInterest = interes / 100 / 12;
        const cuota = (saldo * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -meses));

        for (let i = 1; i <= meses; i++) {
            const interesCuota = saldo * monthlyInterest;
            const capitalCuota = cuota - interesCuota;
            saldo -= capitalCuota;

            amortizationTable.push({
                numero_cuota: i,
                monto_cuota: cuota.toFixed(2),
                interes_cuota: interesCuota.toFixed(2),
                capital_cuota: capitalCuota.toFixed(2),
                saldo_restante: saldo.toFixed(2),
            });
        }

        return amortizationTable;
    }
}

module.exports = AmortizationService;