const express = require('express');
const router = express.Router();

const LoanController = require('../controllers/LoanController');
const auth = require('../middlewares/auth');

const loanController = new LoanController();

// Rutas corregidas
router.post('/', auth, loanController.createLoan.bind(loanController));

// Cambiamos esta ruta para usar el método correcto
router.get('/history', auth, loanController.getLoanHistoryByEmail.bind(loanController));

router.patch('/:loanId/status', auth, loanController.updateLoanStatus.bind(loanController));

module.exports = router;