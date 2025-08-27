# Title
Task Manager

## Description
Full CRUD task management API using session based authentication

## Features
-User authentication (register, login, logout)

-Session-based auth with secure, HTTP‑only cookies

Full CRUD operations for tasks


## Tech Stack

Node.js, Express.js

express-session (with connect-mongo recommended for production)




## Installation & Usage instructions\
'''bash
git clone https://github.com/Don-pizu/task-manager.git

project-root/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── models/
│   ├── file.js
│   ├── task.js
│   └── user.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── middleware/
├── config/
│   └── session.js
├── tests/
├── app.js
├── server.js
├── swagger.js
├── .env
├── .gitignore
└── README.md

-npm install
-node server.js

## Technologies used
-Node.js
-Express.js
-Session based authentication
-swagger

## API Routes

Authentication Routes

Method                Endpoint                 Description
POST              /api/auth/register         Register a new user
POST              /api/auth/login               Login user
POST              /api/auth/logout              Logout user

Task Routes (CRUD)

Method                Endpoint                 Description
POST                 /api/task              Create a new task
GET                  /api/tasks               Get all tasks
PUT                  /api/update/:id        Update task by ID
DELETE               /api/delete/:id          Delete task by ID



## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

```bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/task-manager.git
git push -u origin main

git commit -m "feat: Registration,login and task CRUD route"