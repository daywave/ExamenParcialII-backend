
class GetClientsByUserUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }

    async execute(userId) {
        return await this.clientRepository.getClientsByUserId(userId);
    }
}

module.exports = GetClientsByUserUseCase;