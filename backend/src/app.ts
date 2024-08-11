import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import corsOptions from 'src/config/cors-options.config';
import { EnvVariableName } from 'src/constant/dotenv.constant';
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
import { readEnvVariable } from 'src/util/dotenv';

export const app = express();
const frontendUrl = readEnvVariable(EnvVariableName.FRONTEND_URL) || '';

app.use(helmet());
app.use(credentials);
swaggerSetup(app);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(headerMiddleware(frontendUrl));
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
