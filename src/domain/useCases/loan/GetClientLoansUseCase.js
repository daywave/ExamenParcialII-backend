class GetClientLoansUseCase {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    async execute(clientId) {
        return await this.loanRepository.getLoansByClientId(clientId);
    }
}

module.exports = GetClientLoansUseCase;
