import { HttpStatusCode } from '../constant/http-status-code.constant';
import { CookieOptions, Request, Response } from 'express';
import {
	MESSAGE_EMAIL_NOT_EXISTS,
	MESSAGE_INVALID_CREDENTIALS,
	MESSAGE_INVALID_EMAIL_OR_PASSWORD,
} from '../constant/message.constant';
import {
	ACCESS_TOKEN_EXPIRES_IN,
	REFRESH_TOKEN_EXPIRES_IN,
} from '../constant/time.constant';
import { addRefreshToken, getUserByEmail } from '../data/user.data';
import {
	generateAccessToken,
	generateRefreshAccessToken,
	isValidPassword,
} from '../util/auth.util';

const DURATION_24_HOURS = 24 * 60 * 60 * 1000;

const REFRESH_TOKEN_COOKIE_CONFIG: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: 'none',
	maxAge: DURATION_24_HOURS,
};

const login = async (req: Request, res: Response): Promise<void> => {
	const email: string = req.body.email;
	const password: string = req.body.password;

	let user;
	try {
		user = await getUserByEmail(email);
	} catch (error) {
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

	const { id, roles } = user;

	const userPayload = { id, email, roles };
	const accessToken: string = generateAccessToken(
		userPayload,
		ACCESS_TOKEN_EXPIRES_IN
	);
	const refreshToken: string = generateRefreshAccessToken(
		userPayload,
		REFRESH_TOKEN_EXPIRES_IN
	);
	await addRefreshToken(id, refreshToken);

	// Creates Secure Cookie with refresh token
	res.cookie('jwt', refreshToken, REFRESH_TOKEN_COOKIE_CONFIG);

	res.json({ accessToken, roles });
};

export { login };
