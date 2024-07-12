import { NextFunction, Request, Response } from 'express';
import { allowedOrigins } from 'src/config/allowed-origins.config';

const credentials = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.headers.origin as string;
    const isOriginAllowed = allowedOrigins.includes(origin);
    if (isOriginAllowed) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};

export default credentials;
