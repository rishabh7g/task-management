const { HttpStatusCode } = require('axios');
const { createUser, getUserByEmail } = require('../data/user.data');
const { isValidEmail, isValidText } = require('../util/validation.util');
const {
    MESSAGE_EMAIL_EXISTS,
    MESSAGE_INVALID_PASSWORD,
    MESSAGE_USER_REGISTER_FAILED,
    MESSAGE_USER_CREATED,
} = require('../constant/message.constant');

const register = async (req, res, next) => {
    const data = req.body;
    let errors = {};

    if (!isValidEmail(data.email)) {
        errors.email = ERRINV;
    } else {
        try {
            const existingUser = await getUserByEmail(data.email);
            if (existingUser) {
                errors.email = MESSAGE_EMAIL_EXISTS;
            }
        } catch (error) {}
    }

    if (!isValidText(data.password, 6)) {
        errors.password = MESSAGE_INVALID_PASSWORD;
    }

    if (Object.keys(errors).length > 0) {
        return res.status(HttpStatusCode.UnprocessableEntity).json({
            message: MESSAGE_USER_REGISTER_FAILED,
            errors,
        });
    }

    try {
        const user = {
            ...data,
            roles: ['user'],
        };

        await createUser(user);
        res.status(HttpStatusCode.Created).json({
            message: MESSAGE_USER_CREATED,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register };
