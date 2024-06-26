const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { NotAuthError } = require('./errors.util');

function createJSONToken(user, secret, expiresIn) {
    const config = expiresIn ? { expiresIn } : {};
    const accessToken = sign({ ...user }, secret, config);
    return accessToken;
}

function validateJSONToken(token) {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (!req.headers.authorization) {
        return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        return next(new NotAuthError('Not authenticated.'));
    }
    const authToken = authFragments[1];
    try {
        const validatedToken = validateJSONToken(authToken);
        req.token = validatedToken;
    } catch (error) {
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}

const generateAccessToken = (payload, expiresIn) => {
    const accessToken = createJSONToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        expiresIn,
    );
    return accessToken;
};

const generateRefreshAccessToken = (payload, expiresIn) => {
    const accessToken = createJSONToken(
        payload,
        process.env.REFRESH_ACCESS_TOKEN_SECRET,
        expiresIn,
    );
    return accessToken;
};

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshAccessToken = generateRefreshAccessToken;
