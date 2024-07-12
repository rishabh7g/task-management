import express from 'express';
import { generateNewToken } from 'src/controllers/refresh-token.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints related to user authentication
 */

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Generate a new access token using a refresh token
 *     tags: [Authentication]
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
router.post('/refresh-token', generateNewToken);

export default router;
