const { CreateLoanUseCase, GetClientLoansUseCase, UpdateLoanStatusUseCase } = require('../../../domain/useCases/loan');
const LoanRepository = require('../../repositories/MySQLLoanRepository');
const ClientRepository = require('../../repositories/MySQLClientRepository');
const AmortizationService = require('../../../domain/services/AmortizationService');


class LoanController {
    constructor() {
        this.loanRepository = new LoanRepository();
        this.clientRepository = new ClientRepository();
        this.createLoanUseCase = new CreateLoanUseCase(this.loanRepository);
        this.getClientLoansUseCase = new GetClientLoansUseCase(this.loanRepository);
        this.updateLoanStatusUseCase = new UpdateLoanStatusUseCase(this.loanRepository);
    }

    async createLoan(req, res) {
        try {
            const { monto, meses, interes, correo_electronico } = req.body;

            const client = await this.clientRepository.getClientByEmail(correo_electronico);
            if (!client) {
                return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
            }

            const loanData = {
                id_cliente: client.id_cliente,
                monto: parseFloat(monto),
                meses: parseInt(meses),
                interes: parseFloat(interes)
            };

            const loan = await this.createLoanUseCase.execute(loanData);

            res.status(201).json({
                success: true,
                message: 'Préstamo creado exitosamente',
                data: loan
            });
        } catch (error) {
            console.error('Error al crear préstamo:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    async getClientLoans(req, res) {
        try {
            const { clientId } = req.params;
            
            if (!clientId) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'El ID del cliente es requerido' 
                });
            }

            const loanRecords = await this.getClientLoansUseCase.execute(clientId);
            
            const processedLoans = loanRecords.map(record => {
                const amortizationTable = this.calculateAmortizationTable(
                    parseFloat(record.monto),
                    parseInt(record.meses),
                    parseFloat(record.interes)
                );

                return {
                    ...record,
                    amortizationTable
                };
            });

            return res.status(200).json({
                success: true,
                data: processedLoans,
                message: processedLoans.length > 0 
                    ? 'Préstamos encontrados exitosamente' 
                    : 'No se encontraron préstamos para este cliente'
            });
        } catch (error) {
            console.error('Error al obtener préstamos del cliente:', error);
            res.status(500).json({
                success: false,
                error: error.message || 'Error al obtener los préstamos del cliente'
            });
        }
    }

    async getLoanHistoryByEmail(req, res) {
        try {
            const { correo_electronico } = req.query;
            console.log('Buscando préstamos para el email:', correo_electronico);

            if (!correo_electronico) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'El correo electrónico es requerido' 
                });
            }

            const client = await this.clientRepository.getClientByEmail(correo_electronico);
            if (!client) {
                console.log('Cliente no encontrado para el email:', correo_electronico);
                return res.status(404).json({ 
                    success: false, 
                    message: 'Cliente no encontrado' 
                });
            }

            console.log('Cliente encontrado:', client);

            const loanRecords = await this.getClientLoansUseCase.execute(client.id_cliente);
            
            const processedLoans = loanRecords.map(record => {
                const amortizationTable = AmortizationService.calculateAmortizationTable(
                    parseFloat(record.monto),
                    parseInt(record.meses),
                    parseFloat(record.interes)
                );

                return {
                    ...record,
                    amortizationTable
                };
            });

            console.log('Préstamos procesados con tabla de amortización:', processedLoans);

            return res.status(200).json({
                success: true,
                data: processedLoans,
                message: processedLoans.length > 0 
                    ? 'Préstamos encontrados exitosamente' 
                    : 'No se encontraron préstamos para este cliente'
            });
        } catch (error) {
            console.error('Error detallado al obtener historial de préstamos:', error);
            res.status(500).json({
                success: false,
                error: error.message || 'Error al obtener el historial de préstamos'
            });
        }
    }
    async updateLoanStatus(req, res) {
        try {
            const { loanId } = req.params;
            const { newStatus } = req.body;

            await this.updateLoanStatusUseCase.execute(loanId, newStatus);

            res.status(200).json({
                success: true,
                message: 'Estado del préstamo actualizado exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar estado del préstamo:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = LoanController;