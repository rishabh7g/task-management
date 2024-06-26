import { Request, Response } from 'express';
import { HttpStatusCode } from 'src/constant/http-status-code';
import {
    MESSAGE_TASK_NOT_FOUND,
    MESSAGE_USER_NOT_FOUND,
} from 'src/constant/message.constant';
import {
    addNewTask,
    getUserById,
    removeTask,
    updateExistingTask,
} from 'src/data/user.data';
import { Task } from 'src/types/data.types';
import { v4 as uuidv4 } from 'uuid';

const _userNotFound = (res: Response) => {
    return res
        .status(HttpStatusCode.NotFound)
        .json({ error: MESSAGE_USER_NOT_FOUND });
};

export const createTask = async (req: Request, res: Response) => {
    const userId = (<any>req).user?.id;
    const user = await getUserById(userId);
    const isUserNotFound = !user;
    if (isUserNotFound) {
        return _userNotFound(res);
    }

    const task = {
        id: uuidv4(),
        ...req.body,
    };

    await addNewTask(task, userId);
    res.status(HttpStatusCode.Created).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
    const user = await getUserById((<any>req).user?.id);
    const isUserNotFound = !user;
    if (isUserNotFound) {
        return _userNotFound(res);
    }

    res.json(user.tasks);
};

export const getTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const user = await getUserById((<any>req).user?.id);
    const isUserNotFound = !user;
    if (isUserNotFound) {
        return _userNotFound(res);
    }

    const task = user.tasks.find((t) => t.id === taskId);
    const isTaskNotFound = !task;
    if (isTaskNotFound) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_TASK_NOT_FOUND });
    }

    res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const userId = (<any>req).user?.id;
    const user = await getUserById(userId);
    const isUserNotFound = !user;

    if (isUserNotFound) {
        return _userNotFound(res);
    }
    const newTask: Task = {
        id: taskId,
        ...req.body,
    };
    await updateExistingTask(newTask, userId);
    res.json(newTask);
};

export const deleteTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const userId = (<any>req).user?.id;
    const user = await getUserById(userId);
    const isUserNotFound = !user;
    if (isUserNotFound) {
        return _userNotFound(res);
    }
    await removeTask(taskId, userId);
    res.status(HttpStatusCode.NoContent).send();
};
