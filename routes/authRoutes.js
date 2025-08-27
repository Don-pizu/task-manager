//routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { auth } = require('../middleware/auth');


/**
 * @swagger
 * /auth/register:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 required:
 *                    - name
 *                    - email
 *                    - password
 *                 properties:
 *                    name:
 *                       type: string
 *                    email:
 *                       type: string
 *                    password:
 *                       type: string
 *      responses:
 *         201:
 *           description: User registered successfully
 *         400:
 *           description: Validation error 
 * 
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user 
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []   
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: User not authenticated
 */


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
