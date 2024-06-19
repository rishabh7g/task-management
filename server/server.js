require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");

const taskRoutes = require("./routes/tasks.routes");
const swaggerSetup = require("./swagger");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(taskRoutes);

// Swagger setup
swaggerSetup(app);

// Error handling middleware
app.use((error, req, res) => {
  const status = error.statusCode || 500;
  const message = error.message || "An unexpected error occurred.";
  res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
