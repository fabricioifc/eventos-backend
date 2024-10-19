const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token not found', status: 401 });
    }

    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token not found', status: 401 });
    }

    // console.log('token', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Trata erros específicos relacionados ao token JWT
        if (error.name === jwt.TokenExpiredError.name) {
            return res.status(401).json({ message: 'Token expirou', status: 401 });
        }
        if (error.name === jwt.JsonWebTokenError.name) {
            return res.status(401).json({ message: 'Token inválido', status: 401 });
        }

        // Tratamento para outros erros inesperados
        res.status(500).json({ message: 'An error occurred during authentication' });
    }
};

module.exports = auth;
