const { HttpStatusCode } = require('axios');
const { verify } = require('jsonwebtoken');
const {
    MESSAGE_ERROR_GENERATING_REFRESH_TOKEN,
} = require('../constant/message.constant');
const { getUserByRefreshToken } = require('../data/user.data');
const { generateAccessToken } = require('../util/auth.util');

const generateNewToken = async (req, res) => {
    const cookies = req.cookies;
    const isCookiesNotContainsJWT = !cookies?.jwt;
    if (isCookiesNotContainsJWT)
        return res.sendStatus(HttpStatusCode.Unauthorized);

    const refreshToken = cookies.jwt;
    const isRefreshTokenEmpty = !refreshToken;
    if (isRefreshTokenEmpty) return res.sendStatus(HttpStatusCode.Unauthorized);

    const user = await getUserByRefreshToken(refreshToken);
    const isUserNotFound = !user;
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
                const { id, email } = user;
                const userPayload = { id, email };
                const accessToken = generateAccessToken(userPayload);
                res.json({ accessToken });
            },
        );
    } catch (error) {
        return res
            .status(HttpStatusCode.Unauthorized)
            .json({ message: MESSAGE_ERROR_GENERATING_REFRESH_TOKEN });
    }
};

module.exports = { generateNewToken };
