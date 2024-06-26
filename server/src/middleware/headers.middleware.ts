import { NextFunction, Request, Response } from 'express';

export const headerMiddleware =
    (allowedOrigin: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization',
        );
        next();
    };
