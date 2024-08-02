import { EnvVariableName } from 'src/constant/dotenv.constant';
import { readEnvVariable } from 'src/util/dotenv';

const PORT = readEnvVariable(EnvVariableName.PORT) || 8090;

export const allowedOrigins: string[] = [
    `http://localhost:${PORT}`,
    process.env.FRONTEND_URL || '',
];
