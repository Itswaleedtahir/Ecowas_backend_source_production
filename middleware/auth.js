const jwt = require('jsonwebtoken');

// Authenticates response data using a token provided in the header
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    // Checks if token is provided
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // Validates token
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}