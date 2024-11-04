// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const auth = require('../middlewares/auth');

// Crear instancia del controlador
const clientController = new ClientController();

// Rutas para clientes
router.post('/', 
    auth, 
    (req, res, next) => {
        // Pasar el userId del middleware de auth al body
        req.body.id_usuario = req.user.userId;
        next();
    },
    clientController.createClient.bind(clientController)
);

router.get('/users/:userId/clients', 
    auth,
    (req, res, next) => {
        // Verificar que el usuario autenticado solo acceda a sus propios clientes
        if (req.user.userId !== parseInt(req.params.userId)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para acceder a estos clientes'
            });
        }
        next();
    },
    clientController.getClientsByUser.bind(clientController)
);

module.exports = router;