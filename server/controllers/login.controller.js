const { HttpStatusCode } = require('axios');
const { getUserByEmail, addRefreshToken } = require('../data/user.data');
const {
    isValidPassword,
    generateAccessToken,
    generateRefreshAccessToken,
} = require('../util/auth.util');

const {
    MESSAGE_INVALID_CREDENTIALS,
    MESSAGE_INVALID_EMAIL_OR_PASSWORD,
    MESSAGE_EMAIL_NOT_EXISTS,
} = require('../constant/message.constant');
const {
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
} = require('../constant/time.constant');

const DURATION_24_HOURS = 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_COOKIE_CONFIG = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: DURATION_24_HOURS,
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let user;
    try {
        user = await getUserByEmail(email);
    } catch (error) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ message: MESSAGE_EMAIL_NOT_EXISTS });
    }

    const pwIsValid = await isValidPassword(password, user.password);
    if (!pwIsValid) {
        return res.status(HttpStatusCode.UnprocessableEntity).json({
            message: MESSAGE_INVALID_CREDENTIALS,
            errors: { credentials: MESSAGE_INVALID_EMAIL_OR_PASSWORD },
        });
    }

    const { id, roles } = user;

    const userPayload = { id, email, roles };
    const accessToken = generateAccessToken(
        userPayload,
        ACCESS_TOKEN_EXPIRES_IN,
    );
    const refreshToken = generateRefreshAccessToken(
        userPayload,
        REFRESH_TOKEN_EXPIRES_IN,
    );
    await addRefreshToken(id, refreshToken);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, REFRESH_TOKEN_COOKIE_CONFIG);

    res.json({ accessToken, roles });
};

module.exports = { login };
