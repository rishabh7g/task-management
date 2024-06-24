const { v4: uuidv4 } = require('uuid');
let { users } = require('../db.json');
const { writeData } = require('../util/file.util');
const { HttpStatusCode } = require('axios');
const {
    MESSAGE_TASK_NOT_FOUND,
    MESSAGE_USER_NOT_FOUND,
} = require('../constant/message.constant');

const createTask = async (req, res) => {
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_USER_NOT_FOUND });
    }

    const task = {
        id: uuidv4(),
        ...req.body,
    };

    user.tasks.push(task);
    writeData({ users });
    res.status(HttpStatusCode.Created).json(task);
};

const getTasks = async (req, res) => {
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_USER_NOT_FOUND });
    }

    res.json(user.tasks);
};

const getTask = async (req, res) => {
    const { taskId } = req.params;
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_USER_NOT_FOUND });
    }

    const task = user.tasks.find((t) => t.id === taskId);

    if (!task) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_TASK_NOT_FOUND });
    }

    res.json(task);
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_USER_NOT_FOUND });
    }

    const taskIndex = user.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_TASK_NOT_FOUND });
    }

    user.tasks[taskIndex] = { ...user.tasks[taskIndex], ...req.body };
    writeData({ users });
    res.json(user.tasks[taskIndex]);
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_USER_NOT_FOUND });
    }

    const taskIndex = user.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
        return res
            .status(HttpStatusCode.NotFound)
            .json({ error: MESSAGE_TASK_NOT_FOUND });
    }

    user.tasks.splice(taskIndex, 1);
    writeData({ users });
    res.status(HttpStatusCode.NoContent).send();
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};
