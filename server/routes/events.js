const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/event");
const { checkAuth } = require("../util/auth");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API endpoints related to event management
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     description: Fetches a list of all events from the database and returns them.
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events. Each event object contains event details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The event's unique identifier.
 *                   name:
 *                     type: string
 *                     description: The name of the event.
 *                   description:
 *                     type: string
 *                     description: A description of the event.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the event will take place.
 *       500:
 *         description: Internal server error. Could not fetch events.
 */
router.get("/", async (req, res, next) => {
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     description: Fetches details of a specific event by its unique identifier.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the event to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The event's unique identifier.
 *                     name:
 *                       type: string
 *                       description: The name of the event.
 *                     description:
 *                       type: string
 *                       description: A description of the event.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the event will take place.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Adds a new event to the database after validating the input data. Requires title, description, date, and image URL.
 *     tags: [Events]
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
 *                 description: The title of the event.
 *               description:
 *                 type: string
 *                 description: A detailed description of the event.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the event is scheduled to occur.
 *               image:
 *                 type: string
 *                 description: A URL to an image representing the event.
 *     responses:
 *       201:
 *         description: Event created successfully. Returns the saved event data.
 *       422:
 *         description: Validation error. One or more fields are invalid.
 *       500:
 *         description: Internal server error. Failed to save the event.
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

  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "Event saved.", event: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an event
 *     description: Updates the details of an existing event by its ID. Validates the input data before updating.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the event to update.
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
 *                 description: The new title of the event.
 *               description:
 *                 type: string
 *                 description: A new detailed description of the event.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The new date and time when the event is scheduled to occur.
 *               image:
 *                 type: string
 *                 description: A new URL to an image representing the event.
 *     responses:
 *       200:
 *         description: Event updated successfully. Returns the updated event data.
 *       422:
 *         description: Validation error. One or more fields are invalid.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error. Failed to update the event.
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

  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Event updated.", event: data });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event by its unique ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the event to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
