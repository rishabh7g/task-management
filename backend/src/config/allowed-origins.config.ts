require('dotenv').config();

const PORT = process.env.PORT || 8090;
export const allowedOrigins = [
    `http://localhost:${PORT}`,
    process.env.FRONTEND_URL || '',
];
