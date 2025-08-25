// controllers/taskController.js

const express = require('express');
const task = require('../models/task');
const { readFile, writeFile } = require('../models/file');
const path = require('path');

const TASKS = path.join(__dirname, "../json/tasks.json");
const USERS_FILE = path.join(__dirname, "../json/users.json");



//POST    create a task
exports.createTask = async (req, res, next) => {
	const{ title, content, priority } = req.body;

	if(!title || !content || !priority){
		return res.status(400).send('Task title, content and priority are required');
	}

	let tasks = readFile(TASKS);

	const newTask = {
		id: Date.now(),
	    name: req.session.user.name,   // store username
   		email: req.session.user.email, // store email 
	    title,
	    content,
	    priority
	}

	tasks.push(newTask);
	writeFile(TASKS, tasks);


	res.json(newTask);
};



//GET   Get all tasks
exports.getTask = async (req, res, next) => {
	let tasks = readFile(TASKS);

	const userTask = tasks.filter(t => t.email === req.session.user.email);

	res.json(userTask);
};


//UPDATE   update a task by id
exports.updateTask = async (req, res, next) => {
	let tasks = readFile(TASKS);

	const task = tasks.find(t => t.id == req.params.id && t.email === req.session.user.email);

	if(!task) 
		return res.status(404).send('Task not found');

	const{ title, content, priority } = req.body;

	 task.title = title || task.title;
	 task.content = content || task.content;
  	 task.priority = priority || task.priority;


  	 writeFile(TASKS, tasks)
  	 res.json(task);

};


//DELETE   Delete a task by id
exports.deleteTask = async (req, res, next) => {
	let tasks = readFile(TASKS);

	const taskId = Number(req.params.id);


	const updatedTasks = tasks.filter(
		t => !(t.id == taskId && t.email === req.session.user.email)
		);


	if (updatedTasks.length === tasks.length) {
	    return res.status(404).send('Task not found');
	  }

	writeFile(TASKS, updatedTasks);
	res.json({ message: 'Task deleted', id: taskId });
};