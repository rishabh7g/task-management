import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import corsOptions from 'src/config/cors-options.config';
import credentials from 'src/middleware/credentials.middleware';
import { headerMiddleware } from 'src/middleware/headers.middleware';
import networkErrorMiddleware from 'src/middleware/network-error.middleware';
import verifyJWT from 'src/middleware/verify-jwt.middleware';
import loginRoutes from 'src/routes/login.routes';
import logoutRoutes from 'src/routes/logout.routes';
import refreshTokenRoutes from 'src/routes/refresh-token.routes';
import registerRoutes from 'src/routes/register.routes';
import taskRoutes from 'src/routes/tasks.routes';
import swaggerSetup from 'src/swagger';

// can you generate 16 bytes secret key
require('crypto').randomBytes(16).toString('hex');

require('dotenv').config();

const app = express();

app.use(credentials);
swaggerSetup(app);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(headerMiddleware(process.env.FRONTEND_URL || ''));
app.use('/api-docs', swaggerSetup);

app.use(registerRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(refreshTokenRoutes);

app.use(verifyJWT);
app.use(taskRoutes);

app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.use(networkErrorMiddleware);

const PORT = process.env.PORT || 8090;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
