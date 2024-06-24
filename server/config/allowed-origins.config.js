const PORT = process.env.PORT || 8090;
const allowedOrigins = [`http://localhost:${PORT}`, process.env.FRONTEND_URL];

module.exports = allowedOrigins;
