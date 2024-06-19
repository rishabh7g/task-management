const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/task.controller");
const taskSchema = require("../validators/task-schema.js");
const validateSchemaMiddleware = require("../middleware/validate.js");
const authorizeAccessTokenMiddleware = require("../middleware/authorize.js");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
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
  "/tasks",
  authorizeAccessTokenMiddleware,
  validateSchemaMiddleware(taskSchema),
  tasksController.createTask,
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tasks not found
 */
router.get("/tasks", authorizeAccessTokenMiddleware, tasksController.getTasks);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a specific task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get(
  "/tasks/:taskId",
  authorizeAccessTokenMiddleware,
  tasksController.getTask,
);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update a specific task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
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
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: Invalid input
 */
router.put(
  "/tasks/:taskId",
  authorizeAccessTokenMiddleware,
  validateSchemaMiddleware(taskSchema),
  tasksController.updateTask,
);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a specific task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete(
  "/tasks/:taskId",
  authorizeAccessTokenMiddleware,
  tasksController.deleteTask,
);

module.exports = router;
