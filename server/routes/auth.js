const express = require("express");
const { add, get } = require("../data/user");
const { createJSONToken, isValidPassword } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints related to user authentication
 */

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: User registration
 *     description: Endpoint for user registration. Validates the provided email and password, checks for existing users, and creates a new user if validation passes.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for registration.
 *               password:
 *                 type: string
 *                 description: User's password for registration. Must be at least 6 characters long.
 *     responses:
 *       201:
 *         description: User created successfully. Returns user details and authentication token.
 *       422:
 *         description: User signup failed due to validation errors. Returns error messages.
 */
router.post("/sign-up", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = "Email exists already.";
      }
    } catch (error) {}
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: User login
 *     description: Authenticates a user by validating the provided email and password. Returns a token upon successful authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for login.
 *               password:
 *                 type: string
 *                 description: User's password for login.
 *     responses:
 *       200:
 *         description: Login successful, returns authentication token.
 *       401:
 *         description: Authentication failed due to invalid credentials or other errors.
 *       422:
 *         description: Validation error for incorrect email or password format.
 */
router.post("/sign-in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});

module.exports = router;
