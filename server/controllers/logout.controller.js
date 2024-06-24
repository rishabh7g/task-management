const { HttpStatusCode } = require('axios');
const {
    getUserByRefreshToken,
    removeRefreshToken,
} = require('../data/user.data');

const CLEAR_COOKIE_CONFIG = {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
};

const logout = async (req, res) => {
    const cookies = req.cookies;
    const isCookiesNotContainsJWT = !cookies?.jwt;
    if (isCookiesNotContainsJWT)
        return res.sendStatus(HttpStatusCode.NoContent);

    const refreshToken = cookies.jwt;
    const user = await getUserByRefreshToken(refreshToken);
    const isUserNotFound = !user;

    if (isUserNotFound) {
        return _clearCookie(res);
    }

    await removeRefreshToken(user.id);
    return _clearCookie(res);
};

const _clearCookie = (res) => {
    res.clearCookie('jwt', CLEAR_COOKIE_CONFIG);
    return res.sendStatus(HttpStatusCode.NoContent);
};

module.exports = { logout };
