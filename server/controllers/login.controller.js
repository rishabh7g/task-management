const { HttpStatusCode } = require('axios');
const { getUserByEmail, addRefreshToken } = require('../data/user.data');
const {
    createJSONToken,
    isValidPassword,
    generateAccessToken,
} = require('../util/auth.util');

const {
    MESSAGE_INVALID_CREDENTIALS,
    MESSAGE_INVALID_EMAIL_OR_PASSWORD,
    MESSAGE_EMAIL_NOT_EXISTS,
} = require('../constant/message.constant');

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
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = createJSONToken(
        userPayload,
        process.env.REFRESH_ACCESS_TOKEN_SECRET,
    );
    await addRefreshToken(id, refreshToken);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, REFRESH_TOKEN_COOKIE_CONFIG);

    res.json({ accessToken, roles });
};

module.exports = { login };
