const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

// Middleware para verificar token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate' });
        req.user = decoded; // Guardamos la información del token
        next();
    });
};

// Middleware para verificar roles
const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
};

module.exports = { authenticate, authorize };