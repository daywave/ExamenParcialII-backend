// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: 'Acceso denegado. Token no proporcionado o formato inválido.' 
            });
        }

        const token = authHeader.split(' ')[1];
        
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardar la información decodificada en el objeto request
        req.user = {
            userId: decoded.userId,
            // Puedes agregar más información del usuario si la tienes en el token
        };

        console.log('Usuario autenticado:', req.user);
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({ 
            success: false,
            message: 'Token inválido o expirado.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};