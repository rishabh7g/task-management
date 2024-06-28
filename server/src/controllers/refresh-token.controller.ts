import { HttpStatusCode } from 'src/constant/http-status-code';

import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { MESSAGE_ERROR_GENERATING_REFRESH_TOKEN } from 'src/constant/message.constant';
import { getUserByRefreshToken } from 'src/data/user.data';

const generateNewToken = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    if (!refreshToken) {
        res.sendStatus(HttpStatusCode.Unauthorized);
        return;
    }

    try {
        const foundUser = await getUserByRefreshToken(refreshToken);
        if (!foundUser) {
            res.sendStatus(HttpStatusCode.Forbidden);
            return;
        }

        const accessToken = verify(
            refreshToken,
            process.env.REFRESH_ACCESS_TOKEN_SECRET as string,

            // (err: any, decoded: JwtPayload | undefined) => {
            //     if (err || !decoded) {
            //         res.status(HttpStatusCode.Forbidden).json({
            //             message: MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN,
            //         });
            //         return;
            //     }

            //     const { id, email, roles } = decoded;
            //     const userPayload = { id, email, roles };
            //     const accessToken = generateAccessToken(
            //         userPayload,
            //         ACCESS_TOKEN_EXPIRES_IN,
            //     );

            //     res.json({ accessToken, roles });
            // },
        );
        res.json({ accessToken, roles: foundUser.roles });
    } catch (error) {
        res.status(HttpStatusCode.Unauthorized).json({
            message: MESSAGE_ERROR_GENERATING_REFRESH_TOKEN,
        });
    }
};

export { generateNewToken };
