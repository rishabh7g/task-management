const { HttpStatusCode } = require('axios');
const { verify } = require('jsonwebtoken');
const {
    MESSAGE_ERROR_GENERATING_REFRESH_TOKEN,
} = require('../constant/message.constant');
const { getUserByRefreshToken } = require('../data/user.data');
const { generateAccessToken } = require('../util/auth.util');
const { ACCESS_TOKEN_EXPIRES_IN } = require('../constant/time.constant');

const generateNewToken = async (req, res) => {
    const cookies = req.cookies;
    const isCookiesNotContainsJWT = !cookies?.jwt;
    if (isCookiesNotContainsJWT)
        return res.sendStatus(HttpStatusCode.Unauthorized);

    const refreshToken = cookies.jwt;
    const isRefreshTokenEmpty = !refreshToken;
    if (isRefreshTokenEmpty) return res.sendStatus(HttpStatusCode.Unauthorized);

    const foundUser = await getUserByRefreshToken(refreshToken);
    const isUserNotFound = !foundUser;
    if (isUserNotFound) return res.sendStatus(HttpStatusCode.Forbidden);

    try {
        verify(
            refreshToken,
            process.env.REFRESH_ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) {
                    return res.status(HttpStatusCode.Forbidden).json({
                        message: MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN,
                    });
                }
                const { id, email, roles } = user;
                const userPayload = { id, email, roles };
                const accessToken = generateAccessToken(
                    userPayload,
                    ACCESS_TOKEN_EXPIRES_IN,
                );
                res.json({ accessToken, roles });
            },
        );
    } catch (error) {
        return res
            .status(HttpStatusCode.Unauthorized)
            .json({ message: MESSAGE_ERROR_GENERATING_REFRESH_TOKEN });
    }
};

module.exports = { generateNewToken };
