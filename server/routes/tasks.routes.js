const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/task.controller");
const taskSchema = require("../validators/task-schema.js");
const validate = require("../middleware/validate.js");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /users/{userId}/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/users/:userId/tasks",
  validate(taskSchema),
  tasksController.createTask,
);

/**
 * @swagger
 * /users/{userId}/tasks:
 *   get:
 *     summary: Get all tasks for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/users/:userId/tasks", tasksController.getTasks);

/**
 * @swagger
 * /users/{userId}/tasks/{taskId}:
 *   get:
 *     summary: Get a specific task for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Task not found
 */
router.get("/users/:userId/tasks/:taskId", tasksController.getTask);

/**
 * @swagger
 * /users/{userId}/tasks/{taskId}:
 *   put:
 *     summary: Update a specific task for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: Invalid input
 */
router.put(
  "/users/:userId/tasks/:taskId",
  validate(taskSchema),
  tasksController.updateTask,
);

/**
 * @swagger
 * /users/{userId}/tasks/{taskId}:
 *   delete:
 *     summary: Delete a specific task for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/users/:userId/tasks/:taskId", tasksController.deleteTask);

module.exports = router;
