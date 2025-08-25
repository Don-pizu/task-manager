// .app.js

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// NEW: security libs
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitize = require('mongo-sanitize');
const xss = require('xss-clean');

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

  next();   // ✅ important to call next
});

  //ratelimit
const limiter = rateLimit({ 
windowMs: 15 * 60 * 1000, // 15 minutes 
max: 100, // max 100 requests per IP 
message: 'Too many requests from this IP, please try again later.' 
}); 
app.use('/api', limiter);



// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Session Middleware configuration
app.use(sessionMiddleware);

// public static
app.use(express.static('frontend'));

//Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);


module.exports= app;