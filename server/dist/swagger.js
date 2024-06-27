'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const PORT = process.env.PORT || 8090;
const AUTH_PORT = process.env.AUTH_PORT || 8091;
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
                    id: { type: 'string', description: 'Task ID' },
                    title: { type: 'string', description: 'Task title' },
                    description: {
                        type: 'string',
                        description: 'Task description',
                    },
                    category: { type: 'string', description: 'Task category' },
                    status: { type: 'string', description: 'Task status' },
                },
            },
        },
    },
    servers: [
        { url: `http://localhost:${PORT}`, description: 'Main server' },
        { url: `http://localhost:${AUTH_PORT}`, description: 'Auth server' },
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
    encoding: 'utf-8',
    failOnErrors: false,
    verbose: false,
    format: 'json',
    swaggerDefinition,
    definition: {},
    apis: ['./routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);
exports.default = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
