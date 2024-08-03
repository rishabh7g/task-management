import { Request, Response } from 'express';
import { HttpStatusCode } from 'src/constant/http-status-code';
import {
    MESSAGE_TASK_NOT_FOUND,
    MESSAGE_USER_NOT_FOUND,
} from 'src/constant/message.constant';
import { UserModel } from 'src/model/user.modal';
import { v4 as uuidv4 } from 'uuid';

const _userNotFound = (res: Response) => {
    return res
        .status(HttpStatusCode.NotFound)
        .json({ error: MESSAGE_USER_NOT_FOUND });
};

export const createTask = async (req: Request, res: Response) => {
    const userId = (<any>req).user?.id;
    const task = {
        id: uuidv4(),
        ...req.body,
    };

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return _userNotFound(res);
        }

        user.tasks.push(task);
        await user.save();

        res.status(HttpStatusCode.Created).json(task);
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({
            error,
        });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    const userId = (<any>req).user?.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return _userNotFound(res);
        }

        res.json(user.tasks);
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({
            error,
        });
    }
};

export const getTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const userId = (<any>req).user?.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return _userNotFound(res);
        }

        const task = user.tasks.find((t) => t.id === taskId);
        if (!task) {
            return res
                .status(HttpStatusCode.NotFound)
                .json({ error: MESSAGE_TASK_NOT_FOUND });
        }

        res.json(task);
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({
            error,
        });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const userId = (<any>req).user?.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return _userNotFound(res);
        }
        const updatedTasks = user.tasks.map((t) => {
            const isTaskFound = t.id === taskId;
            if (isTaskFound) {
                return { ...t, ...req.body };
            }
        });

        user.tasks = updatedTasks;
        await user.save();
        res.status(201).end();
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const userId = (<any>req).user?.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return _userNotFound(res);
        }

        user.tasks = user.tasks.filter((t) => t.id !== taskId);
        await user.save();

        res.status(HttpStatusCode.NoContent).end();
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({
            error,
        });
    }
};
