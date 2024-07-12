import express from 'express';
import { logout } from 'src/controllers/logout.controller';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints related to user authentication
 */

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout and invalidate the refresh token
 *     tags: [Authentication]
 *     responses:
 *       204:
 *         description: Successfully logged out and refresh token invalidated
 */
router.delete('/logout', logout);

export default router;
