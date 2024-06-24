const allowedOrigins = require('../config/allowed-origins.config');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    const isOriginAllowed = allowedOrigins.includes(origin);
    if (isOriginAllowed) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};

module.exports = credentials;
