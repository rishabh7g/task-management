import { Request, Response } from 'express';

interface CustomError extends Error {
    statusCode?: number;
}

const networkErrorMiddleware = (
    err: CustomError,
    req: Request,
    res: Response,
): void => {
    const status = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred.';
    res.status(status).json({ error: message });
};

export default networkErrorMiddleware;
