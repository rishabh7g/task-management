require('dotenv').config();

export const readEnvVariable = (varName: string) => {
    const data = process.env[varName];
    return data;
};
