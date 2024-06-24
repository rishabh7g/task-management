const allowedOrigins = require('./allowed-origins.config');

const corsOptions = {
    origin: (origin, callback) => {
        const isOriginAllowed = allowedOrigins.indexOf(origin) !== -1;
        if (isOriginAllowed || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;
