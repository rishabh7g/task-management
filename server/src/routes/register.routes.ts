import express from 'express';
import { register } from '../controllers/register.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints related to user authentication
 */

/**
 * @swagger
 * /register:
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
 *         description: User registration failed due to validation errors. Returns error messages.
 */

router.post('/register', register);

export default router;
