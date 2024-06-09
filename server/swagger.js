const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the project",
  },
  servers: [
    {
      url: "http://localhost:8090", // URL of your local development server
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "API endpoints related to user authentication",
    },
    {
      name: "Events",
      description: "API endpoints related to event management",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
