import { HttpStatusCode } from '../constant/http-status-code.constant';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { MESSAGE_ERROR_GENERATING_REFRESH_TOKEN, MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN } from '../constant/message.constant';
import { getUserByRefreshToken } from '../data/user.data';
import { generateAccessToken } from '../util/auth.util';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constant/time.constant';

const generateNewToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
		   (err: any, user: any) => {
				if (err || !user) {
					res.status(HttpStatusCode.Forbidden).json({
						message: MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN,
					});
					return;
				}
				const { id, email, roles } = user;
				const userPayload = { id, email, roles };
				const accessToken = generateAccessToken(
					userPayload,
					ACCESS_TOKEN_EXPIRES_IN,
				);
				res.json({ accessToken, roles });
				next();
			},
		);
	} catch (error) {
		res.status(HttpStatusCode.Unauthorized).json({
			message: MESSAGE_ERROR_GENERATING_REFRESH_TOKEN,
		});
	}
};

export { generateNewToken };
