import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { NotAuthError } from './errors.util';

export function createJSONToken(
    user: any,
    secret: string,
    expiresIn?: string,
): string {
    const config = expiresIn ? { expiresIn } : {};
    const accessToken = sign({ ...user }, secret, config);
    return accessToken;
}

export function validateJSONToken(token: string, secret: string): any {
    return verify(token, secret);
}

export function isValidPassword(
    password: string,
    storedPassword: string,
): Promise<boolean> {
    return compare(password, storedPassword);
}

export function checkAuthMiddleware(req: any, res: any, next: any): void {
    if (req.method === 'OPTIONS') {
        return next();
    }

    if (!req.headers.authorization) {
        return next(new NotAuthError('Not authenticated.'));
    }

    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        return next(new NotAuthError('Not authenticated.'));
    }

    const authToken = authFragments[1];
    try {
        const validatedToken = validateJSONToken(
            authToken,
            process.env.ACCESS_TOKEN_SECRET!,
        );
        req.token = validatedToken;
    } catch (error) {
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}

export function generateAccessToken(payload: any, expiresIn: string): string {
    return createJSONToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET!,
        expiresIn,
    );
}

export function generateRefreshAccessToken(
    payload: any,
    expiresIn: string,
): string {
    return createJSONToken(
        payload,
        process.env.REFRESH_ACCESS_TOKEN_SECRET!,
        expiresIn,
    );
}
