//routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const { auth } = require('../middleware/auth');


router.post('/task', auth, createTask);
router.get('/tasks', auth, getTask);
router.put('/update/:id', auth, updateTask);
router.delete('/delete/:id', auth, deleteTask);

module.exports = router;
