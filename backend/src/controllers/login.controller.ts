import { CookieOptions, Request, Response } from 'express';
import { HttpStatusCode } from 'src/constant/http-status-code';
import {
    MESSAGE_EMAIL_NOT_EXISTS,
    MESSAGE_INVALID_CREDENTIALS,
    MESSAGE_INVALID_EMAIL_OR_PASSWORD,
} from 'src/constant/message.constant';
import {
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
} from 'src/constant/time.constant';
import { UserModel } from 'src/model/user.modal';
import {
    generateAccessToken,
    generateRefreshAccessToken,
    isValidPassword,
} from 'src/util/auth.util';

const DURATION_24_HOURS = 24 * 60 * 60 * 1000;

enum SameSite {
    None = 'none',
    Lax = 'lax',
    Strict = 'strict',
}

const isEnvProd = process.env.NODE_ENV === 'production';

const REFRESH_TOKEN_COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: isEnvProd,
    sameSite: isEnvProd ? SameSite.None : SameSite.Lax,
    maxAge: DURATION_24_HOURS,
};

const login = async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await UserModel.findOne({ email });

    const isUserNotFound = !user;
    if (isUserNotFound) {
        res.status(HttpStatusCode.NotFound).json({
            message: MESSAGE_EMAIL_NOT_EXISTS,
        });
        return;
    }

    const pwIsValid: boolean = await isValidPassword(password, user.password);
    if (!pwIsValid) {
        res.status(HttpStatusCode.UnprocessableEntity).json({
            message: MESSAGE_INVALID_CREDENTIALS,
            errors: { credentials: MESSAGE_INVALID_EMAIL_OR_PASSWORD },
        });
        return;
    }

    const { _id: id, roles } = user;
    const userPayload = { id, email, roles };
    const accessToken: string = generateAccessToken(
        userPayload,
        ACCESS_TOKEN_EXPIRES_IN,
    );
    const refreshToken: string = generateRefreshAccessToken(
        userPayload,
        REFRESH_TOKEN_EXPIRES_IN,
    );
    await UserModel.findByIdAndUpdate(id, { refreshToken });

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, REFRESH_TOKEN_COOKIE_CONFIG);

    res.json({ accessToken, id });
};

export { login };
