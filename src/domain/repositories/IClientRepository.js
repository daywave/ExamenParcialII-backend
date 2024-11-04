
class IClientRepository {
    async createClient(client) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    async getClientById(id) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    async getClientsByUserId(userId) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    async updateClient(client) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    async deleteClient(id) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = IClientRepository;