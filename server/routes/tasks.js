const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/task");
const { checkAuth } = require("../util/auth");
const { isValidText } = require("../util/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints related to task management
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Fetches a list of all tasks from the database and returns them.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks. Each task object contains task details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The task's unique identifier.
 *                   name:
 *                     type: string
 *                     description: The name of the task.
 *                   description:
 *                     type: string
 *                     description: A description of the task.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the task will take place.
 *       500:
 *         description: Internal server error. Could not fetch tasks.
 */
router.get("/", async (req, res, next) => {
  try {
    const tasks = await getAll();
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     description: Fetches details of a specific task by its unique identifier.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The task's unique identifier.
 *                     name:
 *                       type: string
 *                       description: The name of the task.
 *                     description:
 *                       type: string
 *                       description: A description of the task.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the task will take place.
 *       404:
 *         description: task not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const task = await get(req.params.id);
    res.json({ task });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to the database after validating the input data. Requires title, description, date, and image URL.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task.
 *               description:
 *                 type: string
 *                 description: A detailed description of the task.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the task is scheduled to occur.
 *               image:
 *                 type: string
 *                 description: A URL to an image representing the task.
 *     responses:
 *       201:
 *         description: task created successfully. Returns the saved task data.
 *       422:
 *         description: Validation error. One or more fields are invalid.
 *       500:
 *         description: Internal server error. Failed to save the task.
 */
router.post("/", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidText(data.category)) {
    errors.category = "Invalid category.";
  }

  if (!isValidText(data.status)) {
    errors.status = "Invalid status.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the task failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "task saved.", task: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update an task
 *     description: Updates the details of an existing task by its ID. Validates the input data before updating.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the task.
 *               description:
 *                 type: string
 *                 description: A new detailed description of the task.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The new date and time when the task is scheduled to occur.
 *               image:
 *                 type: string
 *                 description: A new URL to an image representing the task.
 *     responses:
 *       200:
 *         description: task updated successfully. Returns the updated task data.
 *       422:
 *         description: Validation error. One or more fields are invalid.
 *       404:
 *         description: task not found.
 *       500:
 *         description: Internal server error. Failed to update the task.
 */
router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidText(data.date)) {
    errors.category = "Invalid category.";
  }

  if (!isValidText(data.image)) {
    errors.status = "Invalid status.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the task failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "task updated.", task: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete an task
 *     description: Deletes an task by its unique ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the task to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: task deleted successfully.
 *       404:
 *         description: task not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "task deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
