import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpStatusCode } from 'src/constant/http-status-code';

/**
 * Middleware to authorize access token from request header.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the call stack.
 */
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(HttpStatusCode.Unauthorized);
    }

    verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: any, user: any) => {
            if (err) {
                return res.sendStatus(HttpStatusCode.Forbidden);
            }
            (<any>req).user = user;
            next();
        },
    );
};

export default verifyJWT;
