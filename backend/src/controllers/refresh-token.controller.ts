import { HttpStatusCode } from 'src/constant/http-status-code';

import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN } from 'src/constant/message.constant';
import { ACCESS_TOKEN_EXPIRES_IN } from 'src/constant/time.constant';
import { UserModel } from 'src/model/user.modal';
import { generateAccessToken } from 'src/util/auth.util';

const generateNewToken = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    const isRefreshTokenEmpty = !refreshToken;

    if (isRefreshTokenEmpty) {
        res.sendStatus(HttpStatusCode.Unauthorized);
        return;
    }

    try {
        const users = await UserModel.find();
        const foundUser = users.find(
            (user) => user.refreshToken === refreshToken,
        );
        const isUserNotFound = !foundUser;
        if (isUserNotFound) {
            res.sendStatus(HttpStatusCode.Forbidden);
            return;
        }

        verify(
            refreshToken,
            process.env.REFRESH_ACCESS_TOKEN_SECRET as string,
            (err: any, decoded: any) => {
                if (err || !decoded) {
                    res.status(HttpStatusCode.Forbidden).json({
                        message: MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN,
                    });
                    return;
                }

                const { id, email, roles } = decoded;
                const userPayload = { id, email, roles };
                const accessToken = generateAccessToken(
                    userPayload,
                    ACCESS_TOKEN_EXPIRES_IN,
                );

                res.json({ accessToken });
            },
        );
    } catch (error) {
        res.sendStatus(HttpStatusCode.InternalServerError);
    }
};

export { generateNewToken };
