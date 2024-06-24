const express = require('express');
const { login } = require('../controllers/login.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints related to user authentication
 */

/**
 * @swagger
 * /login:
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
router.post('/login', login);

module.exports = router;
