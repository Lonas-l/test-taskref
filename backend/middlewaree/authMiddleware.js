const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);

        if (!authHeader) {
            return res.status(403).json({ message: 'User is not authorized - missing header' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token:', token);

        if (!token) {
            return res.status(403).json({ message: 'User is not authorized - missing token' });
        }

        const decoded = jwt.verify(token, secret);
        console.log('Decoded Token:', decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authorization Error:', error);
        return res.status(403).json({ message: 'User is not authorized - invalid token' });
    }
};