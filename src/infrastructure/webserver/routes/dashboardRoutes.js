const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Bienvenido al dashboard', userId: req.userId });
});

module.exports = router;
