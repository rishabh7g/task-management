const cors = require('cors');

const corsMiddleware = (allowedOrigins) => {
    const corsOptions = {
        origin: allowedOrigins,
        credentials: true, // This is important for setting cookies
    };
    return cors(corsOptions);
};

module.exports = corsMiddleware;
