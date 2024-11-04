const jwt = require('jsonwebtoken');
const CreateClientUseCase = require('../../../domain/useCases/client/CreateClientUseCase');
const ClientRepository = require('../../repositories/MySQLClientRepository');
const GetClientsByUserUseCase = require('../../../domain/useCases/client/GetClientUseCase');

// controllers/ClientController.js
class ClientController {
    constructor() {
        this.clientRepository = new ClientRepository();
        this.createClientUseCase = new CreateClientUseCase(this.clientRepository);
        this.getClientsByUserUseCase = new GetClientsByUserUseCase(this.clientRepository);
    }

    async createClient(req, res) {
        try {
            // Ya no necesitamos verificar el token aquí porque lo hace el middleware
            const clientData = {
                id_usuario: req.body.id_usuario, // Establecido por el middleware
                nombre: req.body.nombre,
                direccion: req.body.direccion || '',
                telefono: req.body.telefono || '',
                correo_electronico: req.body.correo_electronico
            };

            console.log('Creando cliente con datos:', clientData);

            const client = await this.createClientUseCase.execute(clientData);

            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente',
                data: client
            });

        } catch (error) {
            console.error('Error en createClient:', error);
            res.status(error.message.includes('validación') ? 400 : 500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getClientsByUser(req, res) {
        try {
            const userId = req.params.userId;
            const clients = await this.getClientsByUserUseCase.execute(userId);

            res.status(200).json({
                success: true,
                data: clients
            });
        } catch (error) {
            console.error('Error en getClientsByUser:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = ClientController;