//routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const { auth } = require('../middleware/auth');



/**
 * @swagger
 * /task:
 *    post:
 *      summary: Create a task
 *      tags: [Task]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               required:
 *                  - title
 *                  - content
 *                  - priority
 *               properties:
 *                   title:
 *                      type: string
 *                   content:
 *                       type: string
 *                   priority:
 *                       type: string
 *                       enum: [Low, Medium, High]
 *      responses:
 *         201:
 *           description: Task created successfully
 *         400:
 *           description: Validation error 
 *                 
 * 
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Task]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update Task
 *     tags: [Task]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               priority:
 *                  type: string
 *                  enum: [Low, Medium, High]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */


 

router.post('/task', auth, createTask);
router.get('/tasks', auth, getTask);
router.put('/update/:id', auth, updateTask);
router.delete('/delete/:id', auth, deleteTask);

module.exports = router;
