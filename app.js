// .app.js

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


// NEW: security libs
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitize = require('mongo-sanitize');
const xss = require('xss-clean');
const { swaggerUi, swaggerSpec } = require('./swagger');

const sessionMiddleware = require('./config/session');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');




// Security hardening
//helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }  // browser will not block the access of files from backend to frontebd
  })
);

//mongoSanitize
app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  if (req.query) req.query = sanitize(req.query);
  next();
});


// xss
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  if (req.params && typeof req.params === 'object') {
    for (let key in req.params) {
      if (typeof req.params[key] === 'string') {
        req.params[key] = xss(req.params[key]);
      }
    }
  }

  next();   
});

  //ratelimit
const limiter = rateLimit({ 
windowMs: 15 * 60 * 1000, // 15 minutes 
max: 100, // max 100 requests per IP 
message: 'Too many requests from this IP, please try again later.' 
}); 
app.use('/api', limiter);


// CORS configuration
const allowedOrigins = [
  'http://localhost:5000',   
  'https://task-manager-qzog.onrender.com',// deployed backend
  'https://task-manager-three-peach.vercel.app', // frontend
  ]; 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//to work from vercel frontend i will have to comment this static out
app.use(express.static(path.join(__dirname, "public"))); // serve frontend



// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Session Middleware configuration
app.use(sessionMiddleware);

// public static
app.use(express.static('frontend'));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



module.exports= app;