class UpdateLoanStatusUseCase {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    async execute(loanId, newStatus) {
        const validStatus = ['PENDIENTE', 'APROBADO', 'RECHAZADO', 'PAGADO'];
        if (!validStatus.includes(newStatus)) {
            throw new Error('Estado de préstamo inválido');
        }
        return await this.loanRepository.updateLoanStatus(loanId, newStatus);
    }
}

module.exports = UpdateLoanStatusUseCase;
