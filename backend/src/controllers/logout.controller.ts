import { CookieOptions, Request, Response } from 'express';
import { HttpStatusCode } from 'src/constant/http-status-code';
import { UserModel } from 'src/model/user.modal';

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
    const users = await UserModel.find();
    const user = users.find((user) => user.refreshToken === refreshToken);

    const isUserNotFound = !user;
    if (isUserNotFound) {
        _clearCookie(res);
        return;
    }

    user.refreshToken = '';
    _clearCookie(res);
};

const _clearCookie = (res: Response): void => {
    res.clearCookie('jwt', CLEAR_COOKIE_CONFIG);
    res.sendStatus(HttpStatusCode.NoContent);
};

export { logout };
