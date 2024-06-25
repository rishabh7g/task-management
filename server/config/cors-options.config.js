const allowedOrigins = require('./allowed-origins.config');

const corsOptions = {
    origin: (origin, callback) => {
        const isOriginAllowed = allowedOrigins.indexOf(origin) !== -1;
        const isSelfServer = !origin;
        if (isOriginAllowed || isSelfServer) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;
