const Loan = require('../../entities/Loan');

class CreateLoanUseCase {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    async execute(loanData) {
        const loan = new Loan(
            null,
            loanData.id_cliente,
            loanData.monto,
            loanData.meses,
            loanData.interes,
            'PENDIENTE'
        );

        loan.validate();
        return await this.loanRepository.createLoan(loan);
    }
}

module.exports = CreateLoanUseCase;
