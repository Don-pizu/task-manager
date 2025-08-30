// swagger.js


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager App',
      version: '1.0.0',
      description: 'API documentation for user registration, login and task routes',
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // for local development
        description: 'Local server',
      },
      
      {
        url: 'https://task-manager-qzog.onrender.com/api', // for Render deployment
        description: 'Production server',
      },
      
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',   // default session cookie name
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger will look for JSDoc comments in your route files
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
