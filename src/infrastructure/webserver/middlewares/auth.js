const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Cambia 'your_secret_key' por tu clave secreta real
        req.userId = decoded.userId; // Guarda el ID del usuario decodificado en el request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};
