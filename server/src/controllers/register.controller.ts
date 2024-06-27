import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import {
    MESSAGE_EMAIL_EXISTS,
    MESSAGE_INVALID_PASSWORD,
    MESSAGE_USER_CREATED,
    MESSAGE_USER_REGISTER_FAILED,
} from '../constant/message.constant';
import { createUser, getUserByEmail } from '../data/user.data';
import { User } from '../types/data.types';
import { isValidEmail, isValidText } from '../util/validation.util';

interface ErrorObject {
    email?: string;
    password?: string;
}

const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const data: User = req.body;
    const errors: ErrorObject = {};

    if (!isValidEmail(data.email)) {
        errors.email = MESSAGE_EMAIL_EXISTS;
    } else {
        try {
            const existingUser = await getUserByEmail(data.email);
            if (existingUser) {
                errors.email = MESSAGE_EMAIL_EXISTS;
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }

    if (!isValidText(data.password, 6)) {
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

export { register };
