require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8090;
const AUTH_PORT = process.env.AUTH_PORT || 8091;

// Basic Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for the project',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Task: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Task ID',
                    },
                    title: {
                        type: 'string',
                        description: 'Task title',
                    },
                    description: {
                        type: 'string',
                        description: 'Task description',
                    },
                    status: {
                        type: 'string',
                        description: 'Task status',
                    },
                },
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Main server',
        },
        {
            url: `http://localhost:${AUTH_PORT}`,
            description: 'Auth server',
        },
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'API endpoints related to user authentication',
        },
        {
            name: 'Tasks',
            description: 'API endpoints related to task management',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
