import { HttpStatusCode } from 'axios';
import { CookieOptions, Request, Response } from 'express';
import { getUserByRefreshToken, eraseRefreshToken } from '../data/user.data';

const CLEAR_COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
};

const logout = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    const isCookiesNotContainsJWT = !cookies?.jwt;

    if (isCookiesNotContainsJWT) {
        res.sendStatus(HttpStatusCode.NoContent);
        return;
    }

    const refreshToken = cookies.jwt;
    const user = await getUserByRefreshToken(refreshToken);
    const isUserNotFound = !user;

    if (isUserNotFound) {
        _clearCookie(res);
        return;
    }

    await eraseRefreshToken(user.id);
    _clearCookie(res);
};

const _clearCookie = (res: Response): void => {
    res.clearCookie('jwt', CLEAR_COOKIE_CONFIG);
    res.sendStatus(HttpStatusCode.NoContent);
};

export { logout };
