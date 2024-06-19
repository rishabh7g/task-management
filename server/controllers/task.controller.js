const { v4: uuidv4 } = require("uuid");
let { users } = require("../db.json");
const { writeData } = require("../util/file.util");

const createTask = async (req, res) => {
  const { userId } = req.params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const task = {
    id: uuidv4(),
    ...req.body,
  };

  user.tasks.push(task);
  writeData({ users });
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const { userId } = req.params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user.tasks);
};

const getTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const task = user.tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

const updateTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const taskIndex = user.tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  user.tasks[taskIndex] = { ...user.tasks[taskIndex], ...req.body };
  writeData({ users });
  res.json(user.tasks[taskIndex]);
};

const deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const taskIndex = user.tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  user.tasks.splice(taskIndex, 1);
  writeData({ users });
  res.status(204).send();
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
