import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'src/constant/http-status-code';
import {
    MESSAGE_EMAIL_EXISTS,
    MESSAGE_INVALID_PASSWORD,
    MESSAGE_USER_CREATED,
} from 'src/constant/message.constant';
import { UserModel } from 'src/model/user.modal';
import { User } from 'src/types/data.types';
import { isValidText } from 'src/util/validation.util';

const register = async (req: Request, res: Response): Promise<any> => {
    const newUser: User = req.body;

    if (!isValidText(newUser.password, 6)) {
        return res.status(HttpStatusCode.UnprocessableEntity).json({
            message: MESSAGE_INVALID_PASSWORD,
        });
    }

    try {
        const hashedPassword = await hash(newUser.password, 12);
        const userModel = new UserModel({
            ...newUser,
            password: hashedPassword,
        });
        const user = await userModel.save();

        return res.status(HttpStatusCode.Created).json({
            message: MESSAGE_USER_CREATED,
            user,
        });
    } catch (error) {
        return res.status(HttpStatusCode.UnprocessableEntity).json({
            message: MESSAGE_EMAIL_EXISTS,
        });
    }
};

export { register };
