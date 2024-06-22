const express = require("express");
const {
  signIn,
  signUp,
  generateNewToken,
  logout,
} = require("../controllers/auth.controller");

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
router.post("/sign-up", signUp);

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
router.post("/sign-in", signIn);

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate a new access token using a refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/token", generateNewToken);

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout and invalidate the refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       204:
 *         description: Successfully logged out and refresh token invalidated
 */
router.delete("/sign-out", logout);

module.exports = router;
