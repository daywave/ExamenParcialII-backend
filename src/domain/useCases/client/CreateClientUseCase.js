class CreateClientUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }

    async execute(clientData) {
        return await this.clientRepository.createClient(clientData);
    }
}

module.exports = CreateClientUseCase;
