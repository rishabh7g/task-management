const jwt = require('jsonwebtoken');
const { HttpStatusCode } = require('axios');

/**
 * Middleware to authorize access token from request header.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the call stack.
 */
const verifyJWT = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(HttpStatusCode.Unauthorized);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(HttpStatusCode.Forbidden);
        }

        req.user = user;
        next();
    });
};

module.exports = verifyJWT;
