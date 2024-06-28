import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'src/constant/http-status-code';
import {
    MESSAGE_EMAIL_EXISTS,
    MESSAGE_INVALID_PASSWORD,
    MESSAGE_USER_CREATED,
    MESSAGE_USER_REGISTER_FAILED,
} from 'src/constant/message.constant';
import { createUser, getUserByEmail } from 'src/data/user.data';
import { User } from 'src/types/data.types';
import { isValidEmail, isValidText } from 'src/util/validation.util';

interface ErrorObject {
    email?: string;
    password?: string;
}

const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const newUser: User = req.body;
    const errors: ErrorObject = {};

    if (!isValidEmail(newUser.email)) {
        errors.email = MESSAGE_EMAIL_EXISTS;
    } else {
        const existingUser = await getUserByEmail(newUser.email);
        const isUserAlreadyExist = !!existingUser;
        if (isUserAlreadyExist) {
            errors.email = MESSAGE_EMAIL_EXISTS;
        }
    }

    if (!isValidText(newUser.password, 6)) {
        errors.password = MESSAGE_INVALID_PASSWORD;
    }

    if (Object.keys(errors).length > 0) {
        res.status(HttpStatusCode.UnprocessableEntity).json({
            message: MESSAGE_USER_REGISTER_FAILED,
            errors,
        });
        return;
    }

    try {
        const user: User = {
            ...newUser,
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

export { register };
