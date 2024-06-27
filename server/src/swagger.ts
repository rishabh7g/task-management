import { Express } from 'express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

require('dotenv').config();

const PORT = process.env.PORT || 8090;

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
                    status: { type: 'string', description: 'Task status' },
                },
            },
        },
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Main server' }],
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

const options: Options = {
    encoding: 'utf-8',
    failOnErrors: false,
    verbose: false,
    format: 'json',
    swaggerDefinition,
    definition: {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the project',
        },
    },
    apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
